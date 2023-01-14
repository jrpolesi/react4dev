import * as Helper from '@/main/test/cypress/utils/helpers'
import * as Http from '@/main/test/cypress/utils/http-mocks'

const URL_SURVEYS_REGEXP = /api\/surveys/

const mockUnexpectedError = (): void =>
  Http.mockServerError(URL_SURVEYS_REGEXP, 'GET')

describe('SurveyResult', () => {
  beforeEach(() => {
    cy.fixture('account').then((account) => {
      Helper.setLocalStorageItem('account', account)
    })
  })

  it('Should present error on UnexpectedError', () => {
    mockUnexpectedError()

    cy.visit('/surveys/any_id')

    cy.getByTestId('error').should(
      'contain.text',
      'Algo de errado aconteceu. Tente novamente em breve.'
    )
  })
})
