import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  maxFailures: Infinity,
  workers: 5,
  reporter: [
    ['html'], // Keep HTML reporter for visibility
    ['allure-playwright', {
      outputFolder: './allure-results', // Ensure results are saved in this folder
      details: true, // Provide detailed information in the Allure report
    }],
    ['junit', {
      outputFile: './test-results/results.xml', // Path where the JUnit XML will be saved
      suiteName: 'Playwright Test Suite', // Suite name (optional)
    }],
  ],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on',
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
