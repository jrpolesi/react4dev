import * as Helper from '@/main/test/cypress/support/http-mocks'
import { faker } from '@faker-js/faker'

const URL_LOGIN_REGEXP = /api\/login/

export const mockInvalidCredentialsError = (): void =>
  Helper.mockInvalidCredentialsError(URL_LOGIN_REGEXP)

export const mockUnexpectedError = (): void =>
  Helper.mockUnexpectedError(URL_LOGIN_REGEXP, 'POST')

export const mockOk = (): void =>
  Helper.mockOk(URL_LOGIN_REGEXP, 'POST', {
    accessToken: faker.random.words(),
    name: faker.name.fullName()
  })

export const mockInvalidData = (): void =>
  Helper.mockOk(URL_LOGIN_REGEXP, 'POST', {
    invalidProperty: faker.random.words()
  })
