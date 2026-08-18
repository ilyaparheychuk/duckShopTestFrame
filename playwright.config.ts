import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export const baseURL = 'https://litecart.stqa.ru/en/';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: [['line'], ['allure-playwright']],
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    launchOptions: {
      args: ['--start-maximized'],
    },
  },

  projects: [
    {
      name: 'chromium',
      use: {
        headless: false,
        viewport: null,
      },
    },
  ],
});
