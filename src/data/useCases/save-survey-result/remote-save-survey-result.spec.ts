import { HttpStatusCode } from '@/data/protocols/http'
import { HttpClientSpy, mockRemoteSurveyResultModel } from '@/data/test'
import { RemoteSaveSurveyResult } from '@/data/useCases'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { mockSaveSurveyResultParams } from '@/domain/test'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RemoteSaveSurveyResult
  httpClientSpy: HttpClientSpy<{}, RemoteSaveSurveyResult.Model>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<{}, RemoteSaveSurveyResult.Model>()

  const sut = new RemoteSaveSurveyResult(url, httpClientSpy)

  return { sut, httpClientSpy }
}

describe('RemoteSaveSurveyResult', () => {
  test('Should call HttpClient with correct URL and method', async () => {
    const URL = faker.internet.url()
    const saveSurveyResultParams = mockSaveSurveyResultParams()

    const { sut, httpClientSpy } = makeSut(URL)

    await sut.save(saveSurveyResultParams)

    expect(httpClientSpy.url).toBe(URL)
    expect(httpClientSpy.method).toBe('put')
    expect(httpClientSpy.body).toBe(saveSurveyResultParams)
  })

  test('Should throw AccessDeniedError if HttpClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }

    const promise = sut.save(mockSaveSurveyResultParams())

    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    const promise = sut.save(mockSaveSurveyResultParams())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const promise = sut.save(mockSaveSurveyResultParams())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return a SurveyResult on 200', async () => {
    const httpResult = mockRemoteSurveyResultModel()

    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }

    const httpResponse = await sut.save(mockSaveSurveyResultParams())

    expect(httpResponse).toEqual({
      question: httpResult.question,
      answers: httpResult.answers,
      date: new Date(httpResult.date)
    })
  })
})
