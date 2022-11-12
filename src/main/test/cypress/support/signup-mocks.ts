import * as Helper from '@/main/test/cypress/support/http-mocks'
import { faker } from '@faker-js/faker'

const URL_LOGIN_REGEXP = /api\/signup/

export const mockEmailInUseError = (): void =>
  Helper.mockEmailInUseError(URL_LOGIN_REGEXP)

export const mockUnexpectedError = (): void =>
  Helper.mockUnexpectedError(URL_LOGIN_REGEXP, 'POST')

export const mockOk = (): void =>
  Helper.mockOk(URL_LOGIN_REGEXP, 'POST', {
    accessToken: faker.random.words()
  })

export const mockInvalidData = (): void =>
  Helper.mockOk(URL_LOGIN_REGEXP, 'POST', {
    invalidProperty: faker.random.words()
  })
