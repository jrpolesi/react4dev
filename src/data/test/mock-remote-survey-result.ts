import { RemoteLoadSurveyResult } from '@/data/useCases'
import { faker } from '@faker-js/faker'

export const mockRemoteSurveyResultModel =
  (): RemoteLoadSurveyResult.Model => ({
    question: faker.random.words(10),
    date: faker.date.recent().toISOString(),
    answers: [
      {
        image: faker.internet.url(),
        answer: faker.random.words(),
        count: faker.datatype.number(),
        percent: faker.datatype.number({ max: 100 }),
        isCurrentAccountAnswer: faker.datatype.boolean()
      },
      {
        answer: faker.random.words(),
        count: faker.datatype.number(),
        percent: faker.datatype.number({ max: 100 }),
        isCurrentAccountAnswer: faker.datatype.boolean()
      }
    ]
  })
