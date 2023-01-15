import { HttpStatusCode } from '@/data/protocols/http'
import { HttpClientSpy } from '@/data/test'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import { mockAddAccountModel, mockAddAccountParams } from '@/domain/test'
import { AddAccount } from '@/domain/useCases'
import { faker } from '@faker-js/faker'
import { RemoteAddAccount } from './remote-add-account'

type SutTypes = {
  sut: RemoteAddAccount
  httpClientSpy: HttpClientSpy<AddAccount.Params, RemoteAddAccount.Model>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<AddAccount.Params, AddAccount.Model>()

  const sut = new RemoteAddAccount(url, httpClientSpy)

  return { sut, httpClientSpy }
}

describe('AddAccount', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const addAccountParams = mockAddAccountParams()

    const { sut, httpClientSpy } = makeSut(url)

    await sut.add(addAccountParams)

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('post')
    expect(httpClientSpy.body).toEqual(addAccountParams)
  })

  test('Should throw EmailInUseError if HttpClient returns 403', async () => {
    const addAccountParams = mockAddAccountParams()

    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }

    const promise = sut.add(addAccountParams)

    await expect(promise).rejects.toThrow(new EmailInUseError())
  })

  test('Should throw UnexpectedError if HttpClient returns 400', async () => {
    const authParams = mockAddAccountParams()

    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }

    const promise = sut.add(authParams)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const authParams = mockAddAccountParams()

    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    const promise = sut.add(authParams)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const authParams = mockAddAccountParams()

    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const promise = sut.add(authParams)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return an AddAccount.Model with HttpClient return 200', async () => {
    const httpBodyResult = mockAddAccountModel()

    const authParams = mockAddAccountParams()

    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpBodyResult
    }

    const account = await sut.add(authParams)

    expect(account).toEqual(httpBodyResult)
  })
})
