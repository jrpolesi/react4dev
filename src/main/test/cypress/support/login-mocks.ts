import * as Http from '@/main/test/cypress/support/http-mocks'
import { faker } from '@faker-js/faker'

const URL_LOGIN_REGEXP = /api\/login/

export const mockInvalidCredentialsError = (): void =>
  Http.mockUnauthorizedError(URL_LOGIN_REGEXP)

export const mockUnexpectedError = (): void =>
  Http.mockServerError(URL_LOGIN_REGEXP, 'POST')

export const mockOk = (): void =>
  Http.mockOk(URL_LOGIN_REGEXP, 'POST', {
    accessToken: faker.random.words(),
    name: faker.name.fullName()
  })
