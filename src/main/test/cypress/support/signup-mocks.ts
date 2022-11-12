import * as Helper from '@/main/test/cypress/support/http-mocks'

const URL_LOGIN_REGEXP = /api\/signup/

export const mockEmailInUseError = (): void =>
  Helper.mockEmailInUseError(URL_LOGIN_REGEXP)

export const mockUnexpectedError = (): void =>
  Helper.mockUnexpectedError(URL_LOGIN_REGEXP, 'POST')
