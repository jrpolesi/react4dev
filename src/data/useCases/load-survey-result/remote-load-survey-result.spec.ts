import { HttpGetClientSpy } from '@/data/test'
import { RemoteLoadSurveyResult } from '@/data/useCases/load-survey-result/remote-load-survey-result'
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
})
