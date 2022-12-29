import * as Http from '@/main/test/cypress/support/http-mocks'

const URL_SURVEYS_REGEXP = /api\/surveys/

export const mockUnexpectedError = (): void =>
  Http.mockServerError(URL_SURVEYS_REGEXP, 'GET')
