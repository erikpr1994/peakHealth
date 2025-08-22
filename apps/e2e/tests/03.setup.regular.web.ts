import { test, expect } from '@playwright/test';

test.describe('Setup: Regular User Landing → Login → Web App', () => {
  test('regular user can navigate from landing to web app', async ({
    browser,
  }) => {
    const email = 'user@example.com';
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

      // Wait for the input to be ready
      await emailInput.waitFor({ state: 'visible', timeout: 10000 });

      // Fill the email
      await emailInput.fill(email);

      // Verify the email was filled correctly
      await expect(emailInput).toHaveValue(email, { timeout: 10000 });

      // Clear and fill password field
      const passwordInput = page.getByPlaceholder('Enter your password');

      // Wait for the input to be ready
      await passwordInput.waitFor({ state: 'visible', timeout: 10000 });

      // Fill the password
      await passwordInput.fill(password);

      // Verify the password was filled correctly
      await expect(passwordInput).toHaveValue(password, { timeout: 10000 });

      // Click sign in button
      await page.getByRole('button', { name: /sign in|log in/i }).click();

      // Regular users should be redirected directly to the web app dashboard
      await page.waitForURL(/localhost:3024\/en\/dashboard/, {
        timeout: 60_000,
      });
    });

    // Verify final navigation to dashboard
    await test.step('Verify navigation to web app dashboard', async () => {
      // We should already be on the web app dashboard, just verify the final URL
      await expect(page).toHaveURL(/localhost:3024\/en\/dashboard/i);
    });

    // Save storage state for regular web user
    await test.step('Save storage state for regular web user', async () => {
      await context.storageState({
        path: 'storage-states/regular-web.json',
      });
    });

    await context.close();
  });
});
