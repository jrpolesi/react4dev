import * as Helper from '@/main/test/cypress/utils/helpers'

describe('PrivateRoutes', () => {
  it('Should logout if survey-list has no token', () => {
    cy.visit('')
    Helper.testUrl('/login')
  })
})
