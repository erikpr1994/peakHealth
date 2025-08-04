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
  test.describe('Core User Flows', () => {
    test('should successfully login with valid credentials', async ({
      page,
    }) => {
      const user = generateTestUser();

      // First signup the user
      await signUpUser(page, user);
      await logoutUser(page, user);

      // Then login
      await loginUser(page, user);
      await expectToBeLoggedIn(page, user);
    });

    test('should successfully logout user', async ({ page }) => {
      const user = generateTestUser();

      // First signup and login
      await signUpUser(page, user);
      await expectToBeLoggedIn(page, user);

      // Then logout
      await logoutUser(page, user);
      await expectToBeLoggedOut(page, user);
    });
  });

  test.describe('Security & Redirects', () => {
    test('should redirect authenticated user away from login/signup pages', async ({
      page,
    }) => {
      const user = generateTestUser();

      // Signup and login
      await signUpUser(page, user);

      // Try to access login page while authenticated
      await page.goto('/login');
      await expect(page).toHaveURL(/\/dashboard|\/profile/);

      // Try to access signup page while authenticated
      await page.goto('/signup');
      await expect(page).toHaveURL(/\/dashboard|\/profile/);
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

    test('should redirect to login after logout', async ({ page }) => {
      const user = generateTestUser();

      // First signup and login
      await signUpUser(page, user);

      // Try to access protected route after logout
      await logoutUser(page, user);
      await page.goto('/dashboard');

      // Should redirect to login
      await expect(page).toHaveURL(/\/login/);
    });
  });

  test.describe('Session Persistence', () => {
    test('should maintain session after page refresh', async ({ page }) => {
      const user = generateTestUser();

      // Signup and login
      await signUpUser(page, user);
      await expectToBeLoggedIn(page, user);

      // Refresh the page
      await page.reload();
      await expectToBeLoggedIn(page, user);
    });

    test('should maintain session across different pages', async ({ page }) => {
      const user = generateTestUser();

      // Signup and login
      await signUpUser(page, user);
      await expectToBeLoggedIn(page, user);

      // Navigate to different pages
      await page.goto('/profile');
      await expect(page).toHaveURL(/\/profile/);

      await page.goto('/calendar');
      await expect(page).toHaveURL(/\/calendar/);

      // Should still be logged in
      await expect(
        page.locator(
          `[data-testid="user-menu-button"]:has-text("${user.name}")`
        )
      ).toBeVisible();
    });
  });
});
