import * as Helper from '@/main/test/cypress/support/helpers'
import * as Http from '@/main/test/cypress/support/survey-list-mocks'
import { faker } from '@faker-js/faker'

describe('SurveyList', () => {
  beforeEach(() => {
    Helper.setLocalStorageItem('account', {
      accessToken: faker.datatype.uuid(),
      name: faker.name.fullName()
    })
  })

  it('Should present error on UnexpectedError', () => {
    Http.mockUnexpectedError()

    cy.visit('')

    cy.getByTestId('error').should(
      'contain.text',
      'Algo de errado aconteceu. Tente novamente em breve.'
    )
  })

  it('Should logout on AccessDeniedError', () => {
    Http.mockAccessDeniedError()

    cy.visit('')

    Helper.testUrl('/login')
  })

  it('Should present correct username', () => {
    Http.mockUnexpectedError()

    cy.visit('')

    const { name } = Helper.getLocalStorageItem('account')

    cy.getByTestId('username').should('contain.text', name)
  })
})
