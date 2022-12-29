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

export const setLocalStorageItem = (key: string, value: object): void => {
  localStorage.setItem(key, JSON.stringify(value))
}
