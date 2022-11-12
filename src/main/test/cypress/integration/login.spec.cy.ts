import { faker } from '@faker-js/faker'

const baseURL = Cypress.config().baseUrl

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readOnly')
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴')

    cy.getByTestId('password').should('have.attr', 'readOnly')
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴')

    cy.getByTestId('submit').should('have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word())
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Valor inválido')
      .should('contain.text', '🔴')

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Valor inválido')
      .should('contain.text', '🔴')

    cy.getByTestId('submit').should('have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢')

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present InvalidCredentials on 401', () => {
    cy.intercept('POST', /api\/login/, {
      statusCode: 401,
      body: {
        error: faker.random.words()
      },
      delay: 50
    })

    cy.getByTestId('email').focus().type(faker.internet.email())

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))

    cy.getByTestId('submit').click()

    cy.getByTestId('error-wrap')
      .getByTestId('spinner')
      .should('exist')
      .getByTestId('main-error')
      .should('not.exist')
      .getByTestId('spinner')
      .should('not.exist')
      .getByTestId('main-error')
      .should('contain.text', 'Credenciais inválidas')

    if (baseURL) {
      cy.url().should('eq', `${baseURL}/login`)
    } else {
      throw new Error('Cypress baseUrl not found')
    }
  })

  it('Should present UnexpectedError on 400', () => {
    cy.intercept('POST', /api\/login/, {
      statusCode: 400,
      body: {
        error: faker.random.words()
      },
      delay: 50
    })

    cy.getByTestId('email').focus().type(faker.internet.email())

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))

    cy.getByTestId('submit').click()

    cy.getByTestId('error-wrap')
      .getByTestId('spinner')
      .should('exist')
      .getByTestId('main-error')
      .should('not.exist')
      .getByTestId('spinner')
      .should('not.exist')
      .getByTestId('main-error')
      .should(
        'contain.text',
        'Algo de errado aconteceu. Tente novamente em breve.'
      )

    if (baseURL) {
      cy.url().should('eq', `${baseURL}/login`)
    } else {
      throw new Error('Cypress baseUrl not found')
    }
  })

  it('Should present UnexpectedError in invalid data is returned', () => {
    cy.intercept('POST', /api\/login/, {
      statusCode: 200,
      body: {
        invalidProperty: faker.random.words()
      },
      delay: 50
    })

    cy.getByTestId('email').focus().type(faker.internet.email())

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))

    cy.getByTestId('submit').click()

    cy.getByTestId('error-wrap')
      .getByTestId('spinner')
      .should('exist')
      .getByTestId('main-error')
      .should('not.exist')
      .getByTestId('spinner')
      .should('not.exist')
      .getByTestId('main-error')
      .should(
        'contain.text',
        'Algo de errado aconteceu. Tente novamente em breve.'
      )

    if (baseURL) {
      cy.url().should('eq', `${baseURL}/login`)
    } else {
      throw new Error('Cypress baseUrl not found')
    }
  })

  it('Should save accessToken if valid credentials are provided', () => {
    cy.intercept('POST', /api\/login/, {
      statusCode: 200,
      body: {
        accessToken: faker.random.words()
      },
      delay: 50
    })

    cy.getByTestId('email').focus().type(faker.internet.email())

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))

    cy.getByTestId('submit').click()

    cy.getByTestId('error-wrap')
      .getByTestId('spinner')
      .should('exist')
      .getByTestId('main-error')
      .should('not.exist')
      .getByTestId('spinner')
      .should('not.exist')

    if (baseURL) {
      cy.url().should('eq', `${baseURL}/`)
    } else {
      throw new Error('Cypress baseUrl not found')
    }

    cy.window().then((window) =>
      assert.isOk(window.localStorage.getItem('accessToken'))
    )
  })
})
