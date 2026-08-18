import { test as base } from '@playwright/test';
import { UserCredentials } from '../types/types';

export const test = base.extend<{ credentials: UserCredentials }>({
  // eslint-disable-next-line no-empty-pattern
  credentials: async ({}, use) => {
    const username = process.env.TEST_USERNAME;
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_PASSWORD;

    await use({ username, email, password });
  },
});
