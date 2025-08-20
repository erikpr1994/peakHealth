import { test, expect } from '@playwright/test';

test.describe('Setup: Trainer User Landing → Login → Web App', () => {
  test('trainer user can navigate from landing to web app', async ({
    browser,
  }) => {
    const email = 'trainer@example.com';
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
      // Wait for the login form to be ready
      await page.waitForSelector('input[placeholder="Enter your email"]', {
        state: 'visible',
      });

      // Clear and fill email field with retry logic
      const emailInput = page.getByPlaceholder('Enter your email');
      await emailInput.clear();
      await emailInput.fill(email);

      // Wait a bit and verify the email was filled correctly
      await page.waitForTimeout(100);
      await expect(emailInput).toHaveValue(email, { timeout: 10000 });

      // Clear and fill password field
      const passwordInput = page.getByPlaceholder('Enter your password');
      await passwordInput.clear();
      await passwordInput.fill(password);

      // Click sign in button
      await page.getByRole('button', { name: /sign in|log in/i }).click();
      await page.waitForURL('**/app-selector', { timeout: 60_000 });
      await expect(page.getByTestId('app-card-web')).toBeVisible();
    });

    // Select web app and verify navigation
    await test.step('Select web app and verify navigation', async () => {
      await page.getByTestId('app-card-web').click();
      await page.waitForURL('http://localhost:3024/**', { timeout: 60_000 });
      await expect(page).toHaveURL(/localhost:3024/);
    });

    // Save storage state for trainer web user
    await test.step('Save storage state for trainer web user', async () => {
      await context.storageState({
        path: 'storage-states/trainer-web.json',
      });
    });

    await context.close();
  });
});
