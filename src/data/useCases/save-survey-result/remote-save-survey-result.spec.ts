import { HttpClientSpy } from '@/data/test'
import { RemoteSaveSurveyResult } from '@/data/useCases'
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
})
