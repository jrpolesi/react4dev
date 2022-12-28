import { HttpStatusCode } from '@/data/protocols/http'
import { HttpPostClientSpy } from '@/data/test'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import { mockAddAccountModel, mockAddAccountParams } from '@/domain/test'
import { AddAccount } from '@/domain/useCases'
import { faker } from '@faker-js/faker'
import { RemoteAddAccount } from './remote-add-account'

type SutTypes = {
  sut: RemoteAddAccount
  httpPostClientSpy: HttpPostClientSpy<
    AddAccount.Params,
    RemoteAddAccount.Model
  >
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AddAccount.Params,
    AddAccount.Model
  >()

  const sut = new RemoteAddAccount(url, httpPostClientSpy)

  return { sut, httpPostClientSpy }
}

describe('AddAccount', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url()

    const { sut, httpPostClientSpy } = makeSut(url)

    await sut.add(mockAddAccountParams())

    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Should call HttpPostClient with correct body', async () => {
    const addAccountParams = mockAddAccountParams()

    const { sut, httpPostClientSpy } = makeSut()

    await sut.add(addAccountParams)

    expect(httpPostClientSpy.body).toEqual(addAccountParams)
  })

  test('Should throw EmailInUseError if HttpPostClient returns 403', async () => {
    const addAccountParams = mockAddAccountParams()

    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }

    const promise = sut.add(addAccountParams)

    await expect(promise).rejects.toThrow(new EmailInUseError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const authParams = mockAddAccountParams()

    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }

    const promise = sut.add(authParams)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const authParams = mockAddAccountParams()

    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    const promise = sut.add(authParams)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const authParams = mockAddAccountParams()

    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const promise = sut.add(authParams)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return an AddAccount.Model with HttpPostClient return 200', async () => {
    const httpBodyResult = mockAddAccountModel()

    const authParams = mockAddAccountParams()

    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpBodyResult
    }

    const account = await sut.add(authParams)

    expect(account).toEqual(httpBodyResult)
  })
})
