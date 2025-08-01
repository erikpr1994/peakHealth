import { test, expect } from '@playwright/test';

import {
  generateTestUser,
  signUpUser,
  loginUser,
  logoutUser,
  expectToBeLoggedIn,
  expectToBeLoggedOut,
} from '../utils/auth-helpers';

test.describe('Authentication Flows', () => {
  test.beforeAll(async () => {
    // Start Supabase locally
    // This will be handled by the test setup script
  });

  test.afterAll(async () => {
    // Stop Supabase locally
    // This will be handled by the test teardown script
  });

  test.describe('Sign Up Flow', () => {
    test('should successfully sign up a new user', async ({ page }) => {
      const user = generateTestUser();

      await signUpUser(page, user);
      await expectToBeLoggedIn(page);
    });

    test('should show validation errors for invalid email', async ({
      page,
    }) => {
      await page.goto('/signup');

      await page.fill('[data-testid="email-input"]', 'invalid-email');
      await page.fill('[data-testid="password-input"]', 'TestPassword123!');
      await page.click('[data-testid="signup-button"]');

      // Should show email validation error
      await expect(page.locator('[data-testid="email-error"]')).toBeVisible();
    });

    test('should show validation errors for weak password', async ({
      page,
    }) => {
      await page.goto('/signup');

      await page.fill('[data-testid="email-input"]', 'test@example.com');
      await page.fill('[data-testid="password-input"]', 'weak');
      await page.click('[data-testid="signup-button"]');

      // Should show password validation error
      await expect(
        page.locator('[data-testid="password-error"]')
      ).toBeVisible();
    });

    test('should show error for existing email', async ({ page }) => {
      const user = generateTestUser();

      // First signup
      await signUpUser(page, user);
      await logoutUser(page);

      // Try to signup with same email
      await page.goto('/signup');
      await page.fill('[data-testid="email-input"]', user.email);
      await page.fill('[data-testid="password-input"]', user.password);
      await page.click('[data-testid="signup-button"]');

      // Should show error for existing email
      await expect(page.locator('[data-testid="signup-error"]')).toBeVisible();
    });
  });

  test.describe('Login Flow', () => {
    test('should successfully login with valid credentials', async ({
      page,
    }) => {
      const user = generateTestUser();

      // First signup the user
      await signUpUser(page, user);
      await logoutUser(page);

      // Then login
      await loginUser(page, user);
      await expectToBeLoggedIn(page);
    });

    test('should show error for invalid credentials', async ({ page }) => {
      await page.goto('/login');

      await page.fill('[data-testid="email-input"]', 'nonexistent@example.com');
      await page.fill('[data-testid="password-input"]', 'wrongpassword');
      await page.click('[data-testid="login-button"]');

      // Should show login error
      await expect(page.locator('[data-testid="login-error"]')).toBeVisible();
    });

    test('should show error for empty fields', async ({ page }) => {
      await page.goto('/login');

      await page.click('[data-testid="login-button"]');

      // Should show validation errors
      await expect(page.locator('[data-testid="email-error"]')).toBeVisible();
      await expect(
        page.locator('[data-testid="password-error"]')
      ).toBeVisible();
    });
  });

  test.describe('Logout Flow', () => {
    test('should successfully logout user', async ({ page }) => {
      const user = generateTestUser();

      // First signup and login
      await signUpUser(page, user);
      await expectToBeLoggedIn(page);

      // Then logout
      await logoutUser(page);
      await expectToBeLoggedOut(page);
    });

    test('should redirect to login after logout', async ({ page }) => {
      const user = generateTestUser();

      // First signup and login
      await signUpUser(page, user);

      // Try to access protected route after logout
      await logoutUser(page);
      await page.goto('/dashboard');

      // Should redirect to login
      await expect(page).toHaveURL(/\/login/);
    });
  });

  test.describe('Navigation and Redirects', () => {
    test('should redirect authenticated user away from login/signup pages', async ({
      page,
    }) => {
      const user = generateTestUser();

      // Signup and login
      await signUpUser(page, user);

      // Try to access login page while authenticated
      await page.goto('/login');
      await expect(page).toHaveURL(/\/dashboard/);

      // Try to access signup page while authenticated
      await page.goto('/signup');
      await expect(page).toHaveURL(/\/dashboard/);
    });

    test('should redirect unauthenticated user to login for protected routes', async ({
      page,
    }) => {
      // Try to access protected route without authentication
      await page.goto('/dashboard');
      await expect(page).toHaveURL(/\/login/);

      await page.goto('/profile');
      await expect(page).toHaveURL(/\/login/);
    });
  });

  test.describe('Session Persistence', () => {
    test('should maintain session after page refresh', async ({ page }) => {
      const user = generateTestUser();

      // Signup and login
      await signUpUser(page, user);
      await expectToBeLoggedIn(page);

      // Refresh the page
      await page.reload();
      await expectToBeLoggedIn(page);
    });

    test('should maintain session across different pages', async ({ page }) => {
      const user = generateTestUser();

      // Signup and login
      await signUpUser(page, user);
      await expectToBeLoggedIn(page);

      // Navigate to different pages
      await page.goto('/profile');
      await expect(page).toHaveURL(/\/profile/);

      await page.goto('/calendar');
      await expect(page).toHaveURL(/\/calendar/);

      // Should still be logged in
      await expect(
        page.locator('[data-testid="user-menu-button"]')
      ).toBeVisible();
    });
  });
});
