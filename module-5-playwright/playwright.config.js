// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  // Task requirement: run tests in parallel using 2 instances
  workers: 2,

  // Task requirement: retry failed tests 2 times
  retries: 2,

  reporter: 'html',

  use: {
    baseURL: 'https://practicesoftwaretesting.com',

    // Task requirement: headless mode
    headless: true,

    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});