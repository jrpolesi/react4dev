import { HttpStatusCode } from '@/data/protocols/http'
import { HttpGetClientSpy } from '@/data/test'
import { RemoteLoadSurveyList } from '@/data/useCases/load-survey-list/remote-load-survey-list'
import { UnexpectedError } from '@/domain/errors'
import { mockSurveyListModel } from '@/domain/test'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RemoteLoadSurveyList
  httpGetClientSpy: HttpGetClientSpy<RemoteLoadSurveyList.Model[]>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<RemoteLoadSurveyList.Model[]>()

  const sut = new RemoteLoadSurveyList(url, httpGetClientSpy)

  return {
    sut,
    httpGetClientSpy
  }
}

describe('RemoteLoadSurveyList', () => {
  test('Should call HttpGetClient with correct URL', async () => {
    const URL = faker.internet.url()

    const { sut, httpGetClientSpy } = makeSut(URL)

    await sut.loadAll()

    expect(httpGetClientSpy.url).toBe(URL)
  })

  test('Should throw UnexpectedError if HttpGetClient returns 403', async () => {
    const { sut, httpGetClientSpy } = makeSut()

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }

    const promise = sut.loadAll()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpGetClient returns 404', async () => {
    const { sut, httpGetClientSpy } = makeSut()

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    const promise = sut.loadAll()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const { sut, httpGetClientSpy } = makeSut()

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const promise = sut.loadAll()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return a list of SurveyModels if HttpGetClient return 200', async () => {
    const httpResult = mockSurveyListModel()

    const { sut, httpGetClientSpy } = makeSut()

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }

    const account = await sut.loadAll()

    expect(account).toEqual(httpResult)
  })

  test('Should return an empty list if HttpGetClient return 204', async () => {
    const { sut, httpGetClientSpy } = makeSut()

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.noContent
    }

    const account = await sut.loadAll()

    expect(account).toEqual([])
  })
})
