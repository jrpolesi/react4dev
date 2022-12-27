import * as FormHelper from '@/main/test/cypress/support/form-helper'
import * as Http from '@/main/test/cypress/support/signup-mocks'
import { faker } from '@faker-js/faker'

const populateFields = (): void => {
  const password = faker.random.alphaNumeric(5)

  cy.getByTestId('name').focus().type(faker.name.fullName())

  cy.getByTestId('email').focus().type(faker.internet.email())

  cy.getByTestId('password').focus().type(password)

  cy.getByTestId('passwordConfirmation').focus().type(password)
}

const simulateValidSubmit = (): void => {
  populateFields()

  cy.getByTestId('submit').click()
}

describe('SignUp', () => {
  beforeEach(() => {
    cy.visit('signup')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('name').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('name', 'Campo obrigatório')

    cy.getByTestId('email').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('email', 'Campo obrigatório')

    cy.getByTestId('password').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('password', 'Campo obrigatório')

    cy.getByTestId('passwordConfirmation').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('passwordConfirmation', 'Campo obrigatório')

    cy.getByTestId('submit').should('have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('name').focus()
    FormHelper.testInputStatus('name', 'Campo obrigatório')

    cy.getByTestId('email').focus().type(faker.random.word())
    FormHelper.testInputStatus('email', 'Valor inválido')

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    FormHelper.testInputStatus('password', 'Valor inválido')

    cy.getByTestId('passwordConfirmation')
      .focus()
      .type(faker.random.alphaNumeric(5))
    FormHelper.testInputStatus('passwordConfirmation', 'Valor inválido')

    cy.getByTestId('submit').should('have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    const password = faker.random.alphaNumeric(5)

    cy.getByTestId('name').focus().type(faker.name.fullName())
    FormHelper.testInputStatus('name')

    cy.getByTestId('email').focus().type(faker.internet.email())
    FormHelper.testInputStatus('email')

    cy.getByTestId('password').focus().type(password)
    FormHelper.testInputStatus('password')

    cy.getByTestId('passwordConfirmation').focus().type(password)
    FormHelper.testInputStatus('passwordConfirmation')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present EmailInUseError on 403', () => {
    Http.mockEmailInUseError()

    simulateValidSubmit()

    FormHelper.testMainError('Esse e-mail já está em uso.')

    FormHelper.testUrl('/signup')
  })

  it('Should present UnexpectedError on default error cases', () => {
    Http.mockUnexpectedError()

    simulateValidSubmit()

    FormHelper.testMainError(
      'Algo de errado aconteceu. Tente novamente em breve.'
    )

    FormHelper.testUrl('/signup')
  })

  it('Should present UnexpectedError if invalid data is returned', () => {
    const password = faker.random.alphaNumeric(5)

    Http.mockInvalidData()

    cy.getByTestId('name').focus().type(faker.name.fullName())

    cy.getByTestId('email').focus().type(faker.internet.email())

    cy.getByTestId('password').focus().type(password)

    cy.getByTestId('passwordConfirmation')
      .focus()
      .type(password)
      .type('{enter}')

    FormHelper.testMainError(
      'Algo de errado aconteceu. Tente novamente em breve.'
    )

    FormHelper.testUrl('/signup')
  })

  it('Should save account if valid credentials are provided', () => {
    Http.mockOk()

    simulateValidSubmit()

    cy.getByTestId('error-wrap')
      .getByTestId('spinner')
      .should('exist')
      .getByTestId('main-error')
      .should('not.exist')
      .getByTestId('spinner')
      .should('not.exist')

    FormHelper.testUrl('/')

    FormHelper.testLocalStorageItem('account')
  })

  it('Should prevent multiple submits', () => {
    Http.mockOk()

    populateFields()

    cy.getByTestId('submit').click().click()

    FormHelper.testHttpCallsCount(1)
  })

  it('Should not call submit if form is invalid', () => {
    Http.mockOk()

    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')

    FormHelper.testHttpCallsCount(0)
  })
})