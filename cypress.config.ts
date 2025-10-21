import { defineConfig } from 'cypress'

export default defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  experimentalStudio: true,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  e2e: {
    // setup for Cypress plugins.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:8080',
    experimentalRunAllSpecs: true
  },
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'TestResults/my-test-output-[hash].xml'
  }
})
