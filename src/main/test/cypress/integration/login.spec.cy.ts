import { faker } from '@faker-js/faker'

const baseURL = Cypress.config().baseUrl

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('email')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('have.attr', 'readOnly')
    cy.getByTestId('email-label').should(
      'have.attr',
      'title',
      'Campo obrigatório'
    )

    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'invalid')

    cy.getByTestId('password')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('have.attr', 'readOnly')
    cy.getByTestId('password-label').should(
      'have.attr',
      'title',
      'Campo obrigatório'
    )

    cy.getByTestId('password-wrap').should(
      'have.attr',
      'data-status',
      'invalid'
    )

    cy.getByTestId('submit').should('have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email')
      .focus()
      .type(faker.random.word())
      .should('have.attr', 'title', 'Valor inválido')
    cy.getByTestId('email-label').should('have.attr', 'title', 'Valor inválido')

    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'invalid')

    cy.getByTestId('password')
      .focus()
      .type(faker.random.alphaNumeric(3))
      .should('have.attr', 'title', 'Valor inválido')
    cy.getByTestId('password-label').should(
      'have.attr',
      'title',
      'Valor inválido'
    )

    cy.getByTestId('password-wrap').should(
      'have.attr',
      'data-status',
      'invalid'
    )

    cy.getByTestId('submit').should('have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email')
      .focus()
      .type(faker.internet.email())
      .should('not.have.attr', 'title')
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'valid')

    cy.getByTestId('email-label').should('not.have.attr', 'title')

    cy.getByTestId('password')
      .focus()
      .type(faker.random.alphaNumeric(5))
      .should('not.have.attr', 'title')
    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'valid')

    cy.getByTestId('password-label').should('not.have.attr', 'title')

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
      delay: 100
    })

    cy.getByTestId('email').focus().type(faker.internet.email())

    cy.getByTestId('password')
      .focus()
      .type(faker.random.alphaNumeric(5))
      .type('{enter}')

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

  it('Should prevent multiple submits', () => {
    cy.intercept('POST', /api\/login/, {
      statusCode: 200,
      body: {
        accessToken: faker.random.words()
      },
      delay: 100
    }).as('request')

    cy.getByTestId('email').focus().type(faker.internet.email())

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))

    cy.getByTestId('submit').click().click()

    cy.get('@request.all').should('have.length', 1)
  })

  it('Should not call submit if form is invalid', () => {
    cy.intercept('POST', /api\/login/, {
      statusCode: 200,
      body: {
        accessToken: faker.random.words()
      },
      delay: 100
    }).as('request')

    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter')

    cy.get('@request.all').should('have.length', 0)
  })
})
