import * as Helper from '@/main/test/cypress/utils/helpers'
import * as Http from '@/main/test/cypress/utils/http-mocks'

const URL_SURVEYS_REGEXP = /api\/surveys/

const mockUnexpectedError = (): void =>
  Http.mockServerError(URL_SURVEYS_REGEXP, 'GET')

const mockAccessDeniedError = (): void =>
  Http.mockForbiddenError(URL_SURVEYS_REGEXP, 'GET')

describe('SurveyList', () => {
  beforeEach(() => {
    cy.fixture('account').then((account) => {
      Helper.setLocalStorageItem('account', account)
    })
  })

  it('Should present error on UnexpectedError', () => {
    mockUnexpectedError()

    cy.visit('')

    cy.getByTestId('error').should(
      'contain.text',
      'Algo de errado aconteceu. Tente novamente em breve.'
    )
  })

  it('Should logout on AccessDeniedError', () => {
    mockAccessDeniedError()

    cy.visit('')

    Helper.testUrl('/login')
  })

  it('Should present correct username', () => {
    mockUnexpectedError()

    cy.visit('')

    const { name } = Helper.getLocalStorageItem('account')

    cy.getByTestId('username').should('contain.text', name)
  })

  it('Should logout on logout link click', () => {
    mockUnexpectedError()

    cy.visit('')

    cy.getByTestId('logout').click()

    Helper.testUrl('/login')
  })
})
