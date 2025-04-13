import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  timeout: 30000, // Set a default timeout for tests
  retries: 2, // Retry failed tests twice
  reporter: [['dot'], ['json', { outputFile: 'test-results.json' }],
  ['allure-playwright']
],
  use: {
    baseURL: 'https://conduit-api.bondaracademy.com/api', 
    headless: true,
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    trace: 'on-first-retry',
  },
});
