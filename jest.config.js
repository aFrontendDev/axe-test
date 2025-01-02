module.exports = {
    preset: 'jest-playwright-preset',
    testEnvironmentOptions: {
      'jest-playwright': {
        // Options...
        resetContextPerTest: true,
        browsers: ["chromium"],
        testTimeout: 70000,
      },
    },
  }
  