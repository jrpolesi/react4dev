import * as FormHelper from '@/main/test/cypress/utils/form-helpers'
import * as Helper from '@/main/test/cypress/utils/helpers'
import * as Http from '@/main/test/cypress/utils/http-mocks'
import { faker } from '@faker-js/faker'

const URL_LOGIN_REGEXP = /api\/login/

const mockInvalidCredentialsError = (): void =>
  Http.mockUnauthorizedError(URL_LOGIN_REGEXP)

const mockUnexpectedError = (): void =>
  Http.mockServerError(URL_LOGIN_REGEXP, 'POST')

const mockSuccess = (): void => {
  cy.fixture('account').then((account) =>
    Http.mockOk(URL_LOGIN_REGEXP, 'POST', account)
  )
}

const populateFields = (): void => {
  cy.getByTestId('email').focus().type(faker.internet.email())

  cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
}

const simulateValidSubmit = (): void => {
  populateFields()

  cy.getByTestId('submit').click()
}

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readOnly')

    FormHelper.testInputStatus('email', 'Campo obrigatório')

    cy.getByTestId('password').should('have.attr', 'readOnly')

    FormHelper.testInputStatus('password', 'Campo obrigatório')

    cy.getByTestId('submit').should('have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word())

    FormHelper.testInputStatus('email', 'Valor inválido')

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))

    FormHelper.testInputStatus('password', 'Valor inválido')

    cy.getByTestId('submit').should('have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())

    FormHelper.testInputStatus('email')

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))

    FormHelper.testInputStatus('password')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present InvalidCredentials on 401', () => {
    mockInvalidCredentialsError()

    simulateValidSubmit()

    FormHelper.testMainError('Credenciais inválidas')

    Helper.testUrl('/login')
  })

  it('Should present UnexpectedError on default error cases', () => {
    mockUnexpectedError()

    simulateValidSubmit()

    FormHelper.testMainError(
      'Algo de errado aconteceu. Tente novamente em breve.'
    )

    Helper.testUrl('/login')
  })

  it('Should save account if valid credentials are provided', () => {
    mockSuccess()

    simulateValidSubmit()

    cy.getByTestId('error-wrap')
      .getByTestId('spinner')
      .should('exist')
      .getByTestId('main-error')
      .should('not.exist')
      .getByTestId('spinner')
      .should('not.exist')

    Helper.testUrl('/')

    Helper.testLocalStorageItem('account')
  })

  it('Should prevent multiple submits', () => {
    mockSuccess()

    populateFields()

    cy.getByTestId('submit').click().click()

    Helper.testHttpCallsCount(1)
  })

  it('Should not call submit if form is invalid', () => {
    mockSuccess()

    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')

    Helper.testHttpCallsCount(0)
  })
})
