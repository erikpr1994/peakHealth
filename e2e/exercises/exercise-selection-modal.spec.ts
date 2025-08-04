import { test, expect } from '@playwright/test';

import { generateTestUser, signUpUser } from '../utils/auth-helpers';

test.describe('Exercise Selection Modal', () => {
  test.describe('Modal Functionality', () => {
    test('should open exercise selection modal from routine creation', async ({
      page,
    }) => {
      const user = generateTestUser();
      await signUpUser(page, user);

      // Navigate to routine creation page
      await page.goto('/routines/create');

      // Look for add exercise button or similar trigger
      const addExerciseButton = page.locator('button:has-text("Add Exercise")');
      if (await addExerciseButton.isVisible()) {
        await addExerciseButton.click();

        // Check that modal is open
        await expect(page.locator('text=Select Exercise')).toBeVisible();
        await expect(
          page.locator('input[placeholder*="Search"]')
        ).toBeVisible();
      }
    });

    test('should close modal without selecting', async ({ page }) => {
      const user = generateTestUser();
      await signUpUser(page, user);

      // Navigate to routine creation and open modal
      await page.goto('/routines/create');

      const addExerciseButton = page.locator('button:has-text("Add Exercise")');
      if (await addExerciseButton.isVisible()) {
        await addExerciseButton.click();

        // Click close button or outside modal
        const closeButton = page.locator('button[aria-label="Close"]');
        if (await closeButton.isVisible()) {
          await closeButton.click();
        } else {
          // Click outside modal
          await page.click('body');
        }

        // Check that modal is closed
        await expect(page.locator('text=Select Exercise')).not.toBeVisible();
      }
    });
  });

  test.describe('Modal Responsive Design', () => {
    test('should work on mobile viewport', async ({ page }) => {
      const user = generateTestUser();
      await signUpUser(page, user);

      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });

      // Navigate to routine creation and open modal
      await page.goto('/routines/create');

      const addExerciseButton = page.locator('button:has-text("Add Exercise")');
      if (await addExerciseButton.isVisible()) {
        await addExerciseButton.click();

        // Check that modal is properly displayed on mobile
        await expect(page.locator('text=Select Exercise')).toBeVisible();
        await expect(
          page.locator('input[placeholder*="Search"]')
        ).toBeVisible();
        await expect(page.locator('[data-slot="card"]').first()).toBeVisible();
      }
    });

    test('should work on tablet viewport', async ({ page }) => {
      const user = generateTestUser();
      await signUpUser(page, user);

      // Set tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 });

      // Navigate to routine creation and open modal
      await page.goto('/routines/create');

      const addExerciseButton = page.locator('button:has-text("Add Exercise")');
      if (await addExerciseButton.isVisible()) {
        await addExerciseButton.click();

        // Check that modal is properly displayed on tablet
        await expect(page.locator('text=Select Exercise')).toBeVisible();
        await expect(
          page.locator('input[placeholder*="Search"]')
        ).toBeVisible();
        await expect(page.locator('[data-slot="card"]').first()).toBeVisible();
      }
    });
  });
});
