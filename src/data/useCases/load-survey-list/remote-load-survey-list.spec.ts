import { HttpStatusCode } from '@/data/protocols/http'
import { HttpClientSpy, mockRemoteSurveyListModel } from '@/data/test'
import { RemoteLoadSurveyList } from '@/data/useCases/load-survey-list/remote-load-survey-list'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RemoteLoadSurveyList
  httpClientSpy: HttpClientSpy<{}, RemoteLoadSurveyList.Model[]>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<{}, RemoteLoadSurveyList.Model[]>()

  const sut = new RemoteLoadSurveyList(url, httpClientSpy)

  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteLoadSurveyList', () => {
  test('Should call HttpClient with correct URL and method', async () => {
    const URL = faker.internet.url()

    const { sut, httpClientSpy } = makeSut(URL)

    await sut.loadAll()

    expect(httpClientSpy.url).toBe(URL)
    expect(httpClientSpy.method).toBe('get')
  })

  test('Should throw AccessDeniedError if HttpClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }

    const promise = sut.loadAll()

    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    const promise = sut.loadAll()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const promise = sut.loadAll()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return a list of SurveyModels if HttpClient return 200', async () => {
    const httpResult = mockRemoteSurveyListModel()

    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }

    const account = await sut.loadAll()

    expect(account).toEqual([
      {
        id: httpResult[0].id,
        question: httpResult[0].question,
        didAnswer: httpResult[0].didAnswer,
        date: new Date(httpResult[0].date)
      },
      {
        id: httpResult[1].id,
        question: httpResult[1].question,
        didAnswer: httpResult[1].didAnswer,
        date: new Date(httpResult[1].date)
      },
      {
        id: httpResult[2].id,
        question: httpResult[2].question,
        didAnswer: httpResult[2].didAnswer,
        date: new Date(httpResult[2].date)
      }
    ])
  })

  test('Should return an empty list if HttpClient return 204', async () => {
    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.noContent
    }

    const account = await sut.loadAll()

    expect(account).toEqual([])
  })
})
