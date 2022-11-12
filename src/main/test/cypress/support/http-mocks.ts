import { faker } from '@faker-js/faker'
import { Method } from 'axios'

export const mockInvalidCredentialsError = (url: RegExp): void => {
  cy.intercept('POST', url, {
    statusCode: 401,
    body: {
      error: faker.random.words()
    },
    delay: 50
  }).as('request')
}

export const mockUnexpectedError = (url: RegExp, method: Method): void => {
  cy.intercept(method, url, {
    statusCode: faker.helpers.arrayElement([400, 404, 500]),
    body: {
      error: faker.random.words()
    },
    delay: 50
  }).as('request')
}

export const mockOk = (
  url: RegExp,
  method: Method,
  bodyResponse: any
): void => {
  cy.intercept(method, url, {
    statusCode: 200,
    body: bodyResponse,
    delay: 100
  }).as('request')
}
