import { HttpGetClientSpy } from '@/data/test'
import { RemoteLoadSurveyList } from '@/domain/useCases/load-survey-list/remote-load-survey-list'
import { faker } from '@faker-js/faker'

describe('RemoteLoadSurveyList', () => {
  test('Should call HttpGetClient with correct URL', async () => {
    const URL = faker.internet.url()

    const httpGetClientSpy = new HttpGetClientSpy()

    const sut = new RemoteLoadSurveyList(URL, httpGetClientSpy)

    await sut.loadAll()

    expect(httpGetClientSpy.url).toBe(URL)
  })
})
