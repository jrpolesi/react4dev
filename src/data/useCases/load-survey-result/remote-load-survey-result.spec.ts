import { HttpStatusCode } from '@/data/protocols/http'
import { HttpClientSpy, mockRemoteSurveyResultModel } from '@/data/test'
import { RemoteLoadSurveyResult } from '@/data/useCases/load-survey-result/remote-load-survey-result'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RemoteLoadSurveyResult
  httpClientSpy: HttpClientSpy<{}, RemoteLoadSurveyResult.Model>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<{}, RemoteLoadSurveyResult.Model>()

  const sut = new RemoteLoadSurveyResult(url, httpClientSpy)

  return { sut, httpClientSpy }
}

describe('RemoteLoadSurveyResult', () => {
  test('Should call HttpClient with correct URL and method', async () => {
    const URL = faker.internet.url()

    const { sut, httpClientSpy } = makeSut(URL)

    await sut.loadBySurveyId()

    expect(httpClientSpy.url).toBe(URL)
    expect(httpClientSpy.method).toBe('get')
  })

  test('Should throw AccessDeniedError if HttpClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }

    const promise = sut.loadBySurveyId()

    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    const promise = sut.loadBySurveyId()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const promise = sut.loadBySurveyId()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return a SurveyResult on 200', async () => {
    const httpResult = mockRemoteSurveyResultModel()

    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }

    const httpResponse = await sut.loadBySurveyId()

    expect(httpResponse).toEqual({
      question: httpResult.question,
      answers: httpResult.answers,
      date: new Date(httpResult.date)
    })
  })
})
