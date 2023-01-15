import { HttpStatusCode } from '@/data/protocols/http'
import { HttpClientSpy } from '@/data/test'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import {
  mockAuthenticationParams,
  mockAuthenticationModel
} from '@/domain/test'
import { Authentication } from '@/domain/useCases'
import { faker } from '@faker-js/faker'
import { RemoteAuthentication } from './remote-authentication'

type SutTypes = {
  sut: RemoteAuthentication
  httpClientSpy: HttpClientSpy<
    Authentication.Params,
    RemoteAuthentication.Model
  >
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<
    Authentication.Params,
    RemoteAuthentication.Model
  >()

  const sut = new RemoteAuthentication(url, httpClientSpy)

  return { sut, httpClientSpy }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpClient with correct URL and method', async () => {
    const url = faker.internet.url()
    const authParams = mockAuthenticationParams()

    const { sut, httpClientSpy } = makeSut(url)

    await sut.auth(authParams)

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('post')
    expect(httpClientSpy.body).toEqual(authParams)
  })

  test('Should throw InvalidCredentialsError if HttpClient returns 401', async () => {
    const authParams = mockAuthenticationParams()

    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }

    const promise = sut.auth(authParams)

    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  test('Should throw UnexpectedError if HttpClient returns 400', async () => {
    const authParams = mockAuthenticationParams()

    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }

    const promise = sut.auth(authParams)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const authParams = mockAuthenticationParams()

    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    const promise = sut.auth(authParams)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const authParams = mockAuthenticationParams()

    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const promise = sut.auth(authParams)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return an Authentication.Model with HttpClient return 200', async () => {
    const httpBodyResult = mockAuthenticationModel()

    const authParams = mockAuthenticationParams()

    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpBodyResult
    }

    const account = await sut.auth(authParams)

    expect(account).toEqual(httpBodyResult)
  })
})
