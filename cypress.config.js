import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:8080',
    fixturesFolder: false,
    supportFile: 'src/main/test/cypress/support/index.ts',
    specPattern: 'src/main/test/cypress/integration/**/*.cy.ts'
  }
})
