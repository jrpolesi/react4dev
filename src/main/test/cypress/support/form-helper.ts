export const testInputStatus = (field: string, error?: string): void => {
  cy.getByTestId(`${field}-wrap`).should(
    'have.attr',
    'data-status',
    error ? 'invalid' : 'valid'
  )

  const chainer = `${error ? '' : 'not.'}have.attr`

  cy.getByTestId(field).should(chainer, 'title', error)

  cy.getByTestId(`${field}-label`).should(chainer, 'title', error)
}

export const testMainError = (error: string): void => {
  cy.getByTestId('error-wrap')
    .getByTestId('spinner')
    .should('exist')
    .getByTestId('main-error')
    .should('not.exist')
    .getByTestId('spinner')
    .should('not.exist')
    .getByTestId('main-error')
    .should('contain.text', error)
}

export const testHttpCallsCount = (count: number): void => {
  cy.get('@request.all').should('have.length', count)
}

export const testUrl = (path: string): void => {
  const baseURL = Cypress.config().baseUrl

  if (baseURL) {
    cy.url().should('eq', `${baseURL}${path}`)
  } else {
    throw new Error('Cypress baseUrl not found')
  }
}

export const testLocalStorageItem = (key: string): void => {
  cy.window().then((window) => assert.isOk(window.localStorage.getItem(key)))
}
