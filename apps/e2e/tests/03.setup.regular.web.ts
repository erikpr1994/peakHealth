import { test } from '@playwright/test';

test('setup: regular -> web (no selector)', async ({ browser }) => {
  const email = 'user@example.com';
  const password = 'password123';

  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://localhost:3000/login?redirect=http://localhost:3024');
  await page.getByPlaceholder('Enter your email').fill(email);
  await page.getByPlaceholder('Enter your password').fill(password);
  await page.getByRole('button', { name: /sign in|log in/i }).click();
  await page.waitForURL('http://localhost:3024/**', { timeout: 30_000 });
  await context.storageState({ path: 'storage-states/regular-web.json' });
  await context.close();
});
