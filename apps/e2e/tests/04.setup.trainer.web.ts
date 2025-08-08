import { test } from '@playwright/test';

test('setup: trainer -> app selector -> web', async ({ browser }) => {
  const email = 'trainer@example.com';
  const password = 'password123';

  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://localhost:3000/login');
  await page.getByPlaceholder('Enter your email').fill(email);
  await page.getByPlaceholder('Enter your password').fill(password);
  await page.getByRole('button', { name: /sign in|log in/i }).click();
  await page.waitForURL('**/app-selector', { timeout: 30_000 });
  await page
    .getByText(/Peak\s*Health/i)
    .first()
    .click();
  await page.waitForURL('http://localhost:3001/**', { timeout: 30_000 });
  await context.storageState({ path: 'storage-states/trainer-web.json' });
  await context.close();
});
