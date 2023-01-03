import { HttpStatusCode } from '@/data/protocols/http'
import { HttpGetClientSpy } from '@/data/test'
import { RemoteLoadSurveyResult } from '@/data/useCases/load-survey-result/remote-load-survey-result'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RemoteLoadSurveyResult
  httpGetClientSpy: HttpGetClientSpy<RemoteLoadSurveyResult.Model>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<RemoteLoadSurveyResult.Model>()

  const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy)

  return { sut, httpGetClientSpy }
}

describe('RemoteLoadSurveyResult', () => {
  test('Should call HttpGetClient with correct URL', async () => {
    const URL = faker.internet.url()

    const { sut, httpGetClientSpy } = makeSut(URL)

    await sut.loadBySurveyId()

    expect(httpGetClientSpy.url).toBe(URL)
  })

  test('Should throw AccessDeniedError if HttpGetClient returns 403', async () => {
    const { sut, httpGetClientSpy } = makeSut()

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }

    const promise = sut.loadBySurveyId()

    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  test('Should throw UnexpectedError if HttpGetClient returns 404', async () => {
    const { sut, httpGetClientSpy } = makeSut()

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    const promise = sut.loadBySurveyId()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const { sut, httpGetClientSpy } = makeSut()

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const promise = sut.loadBySurveyId()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
