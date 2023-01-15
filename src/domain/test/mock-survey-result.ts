import { LoadSurveyResult, SaveSurveyResult } from '@/domain/useCases'
import { faker } from '@faker-js/faker'

export const mockSaveSurveyResultParams = (): SaveSurveyResult.Params => ({
  answer: faker.random.words(10)
})

export const mockSurveyResultModel = (): LoadSurveyResult.Model => ({
  question: faker.random.words(10),
  date: faker.date.recent(),
  answers: [
    {
      image: faker.internet.url(),
      answer: faker.random.word(),
      count: faker.datatype.number(),
      percent: faker.datatype.number({ max: 100 }),
      isCurrentAccountAnswer: true
    },
    {
      answer: faker.random.word(),
      count: faker.datatype.number(),
      percent: faker.datatype.number({ max: 100 }),
      isCurrentAccountAnswer: false
    }
  ]
})

export class LoadSurveyResultSpy implements LoadSurveyResult {
  callsCount = 0
  surveyResult = mockSurveyResultModel()

  async loadBySurveyId(): Promise<LoadSurveyResult.Model> {
    this.callsCount++

    return this.surveyResult
  }
}
export class SaveSurveyResultSpy implements SaveSurveyResult {
  params?: SaveSurveyResult.Params
  surveyResult = mockSurveyResultModel()

  async save(params: SaveSurveyResult.Params): Promise<LoadSurveyResult.Model> {
    this.params = params

    return this.surveyResult
  }
}
