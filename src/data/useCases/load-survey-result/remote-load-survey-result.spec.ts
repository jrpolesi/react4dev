import { HttpGetClientSpy } from '@/data/test'
import { RemoteLoadSurveyResult } from '@/data/useCases/load-survey-result/remote-load-survey-result'
import { faker } from '@faker-js/faker'

describe('RemoteLoadSurveyResult', () => {
  test('Should call HttpGetClient with correct URL', async () => {
    const URL = faker.internet.url()

    const httpGetClientSpy =
      new HttpGetClientSpy<RemoteLoadSurveyResult.Model>()

    const sut = new RemoteLoadSurveyResult(URL, httpGetClientSpy)

    await sut.loadBySurveyId()

    expect(httpGetClientSpy.url).toBe(URL)
  })
})
