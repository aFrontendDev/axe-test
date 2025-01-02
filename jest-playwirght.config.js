// https://github.com/playwright-community/jest-playwright/#configuration
module.exports = {
    browsers: ["chromium"],
    exitOnPageError: false, // GitHub currently throws errors
    launchOptions: {
      headless: false
    },
    resetContextPerTest: true,
    timeout: 60000,
    testTimeout: 40000,
  }
  