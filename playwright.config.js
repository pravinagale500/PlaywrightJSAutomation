// @ts-check
const { defineConfig } = require('@playwright/test');


module.exports = defineConfig({
  testDir: './tests',
  testMatch: '**/*spec.js',
  timeout: 30000,
  retries: 0,
  reporter: 'html',
  use: {
    // baseURL: 'https://demo.playwright.dev',
    browserName: 'chromium',
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors:true,
    video: 'retain-on-failure',
    screenshot: 'on',
    trace:   'retain-on-failure'
},
});

