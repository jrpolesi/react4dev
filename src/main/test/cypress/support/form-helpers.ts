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
