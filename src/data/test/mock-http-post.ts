import { HttpPostParams } from '@/data/protocols/http'
import { faker } from '@faker-js/faker'

export const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
})
