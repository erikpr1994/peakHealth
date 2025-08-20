import { test, expect } from '@playwright/test';

test.describe('Setup: Admin User Landing → Login → Web App', () => {
  test('admin user can navigate from landing to web app', async ({
    browser,
  }) => {
    const email = 'erikpastorrios1994@gmail.com';
    const password = 'password123';

    const context = await browser.newContext();
    const page = await context.newPage();

    // Start from landing page
    await test.step('Navigate to landing page', async () => {
      await page.goto('http://localhost:3024/');
      await expect(page).toHaveTitle(/Peak Health/i);
    });

    // Navigate to login from landing
    await test.step('Navigate from landing to login page', async () => {
      await page.getByRole('link', { name: /sign in/i }).click();
      await expect(page).toHaveURL(/localhost:3000\/en\/login/);
    });

    // Login and verify app selector appears
    await test.step('Login and verify app selector appears', async () => {
      await page.getByLabel(/email/i).fill(email);
      await page.getByLabel(/password/i).fill(password);
      await page.getByRole('button', { name: /sign in|log in/i }).click();
      await page.waitForURL('**/app-selector', { timeout: 120_000 });
      await expect(page.getByText(/Select an Application/i)).toBeVisible();
    });

    // Select web app and verify navigation
    await test.step('Select web app and verify navigation', async () => {
      await page.getByTestId('app-card-web').click();
      await expect(page).toHaveURL(/localhost:3024\/dashboard/i);
    });

    // Save storage state for admin web user
    await test.step('Save storage state for admin web user', async () => {
      await context.storageState({
        path: 'storage-states/admin-web.json',
      });
    });

    await context.close();
  });
});
