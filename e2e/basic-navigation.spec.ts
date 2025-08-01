import { test, expect } from '@playwright/test';

test.describe('Basic Navigation', () => {
  test('should load the landing page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Peak Health/);
  });

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('[data-testid="login-button"]')).toBeVisible();
    await expect(page.locator('[data-testid="email-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="password-input"]')).toBeVisible();
  });

  test('should navigate to signup page', async ({ page }) => {
    await page.goto('/signup');
    await expect(page.locator('[data-testid="signup-button"]')).toBeVisible();
    await expect(page.locator('[data-testid="email-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="password-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="name-input"]')).toBeVisible();
  });

  test('should show validation errors on empty form submission', async ({
    page,
  }) => {
    await page.goto('/login');
    
    // Check if the form is visible
    await expect(page.locator('form')).toBeVisible();
    
    // Click the submit button
    await page.click('[data-testid="login-button"]');

    // Wait a moment for validation to trigger
    await page.waitForTimeout(1000);

    // Debug: Check if any validation errors exist
    const emailErrorExists = await page.locator('[data-testid="email-error"]').count();
    const passwordErrorExists = await page.locator('[data-testid="password-error"]').count();
    
    console.log('Error elements found:', { emailErrorExists, passwordErrorExists });

    // Should show validation errors
    await expect(page.locator('[data-testid="email-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="password-error"]')).toBeVisible();
  });
});
