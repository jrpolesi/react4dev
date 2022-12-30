import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalRunAllSpecs: true,
    baseUrl: 'http://localhost:8080',
    fixturesFolder: 'src/main/test/cypress/fixtures',
    supportFile: 'src/main/test/cypress/support/index.ts',
    specPattern: 'src/main/test/cypress/integration/**/*.cy.ts',
    video: false
  }
})
