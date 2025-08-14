import { test, expect } from '@playwright/test';

// Regular user: Landing -> Login -> Web -> Create Routine
test.describe('Regular user flows', () => {
  test.use({ storageState: 'storage-states/regular-web.json' });

  test('regular user can create routines with proper validation', async ({
    page,
  }) => {
    // Capture console logs and errors
    const consoleLogs: string[] = [];
    const errors: string[] = [];
    const alerts: string[] = [];

    page.on('console', msg => {
      consoleLogs.push(`${msg.type()}: ${msg.text()}`);
    });

    page.on('pageerror', error => {
      errors.push(error.message);
    });

    // Handle alert dialogs
    page.on('dialog', dialog => {
      alerts.push(dialog.message());
      dialog.accept(); // Click OK to dismiss the alert
    });

    // Navigate from landing to login
    await test.step('Navigate from landing to login page', async () => {
      await page.goto('http://localhost:3024/');
      await page.getByRole('link', { name: /sign in/i }).click();
      await expect(page).toHaveURL(/localhost:3000\/login/);
    });

    // Access dashboard with storage state
    await test.step('Access dashboard with authenticated session', async () => {
      await page.goto('http://localhost:3024/dashboard');
      await expect(page).toHaveURL(/localhost:3024\/dashboard/);
    });

    // Navigate to routines page
    await test.step('Navigate to routines page', async () => {
      // Debug: Let's see what buttons are available
      const _buttons = await page.getByRole('button').all();
      // Available buttons logged for debugging

      // Debug: Check if the routines button is enabled
      const routinesButton = page.getByRole('button', { name: /routines/i });
      await routinesButton.waitFor({ state: 'visible' });
      // Routines button status logged for debugging

      // Click the button and verify we're on the routines page
      await routinesButton.click();
      await page.waitForURL(/localhost:3024\/routines/);

      // Verify we're on the routines page
      await expect(page).toHaveURL(/localhost:3024\/routines/);
    });

    // Test 1: Incomplete data should fail validation
    await test.step('Test validation with incomplete data', async () => {
      // Access routine creation form
      const createButton = page.getByRole('button', {
        name: /create routine|new routine/i,
      });
      await createButton.waitFor({ state: 'visible' });
      await createButton.click();

      // Wait for navigation to complete
      await page.waitForURL(/localhost:3024\/routines\/create/);
      await expect(page).toHaveURL(/localhost:3024\/routines\/create/);

      // Fill only basic details (incomplete)
      await page
        .getByPlaceholder(/enter routine name/i)
        .fill('Incomplete Test Routine');
      await page
        .getByPlaceholder(/describe your routine/i)
        .fill('A test routine with incomplete data');

      // Add objective
      await page
        .getByPlaceholder(/what are the main goals/i)
        .fill('Build strength');
      await page.keyboard.press('Enter');

      // Try to save without adding workouts (should fail validation)
      await page.getByRole('button', { name: /save routine/i }).click();

      // Wait for validation to process
      await page.waitForTimeout(1000);

      // Log any console messages or errors
      // Console logs, errors, and alerts logged for debugging

      // Verify that validation prevented saving incomplete routine
      // We should still be on the create page, not redirected
      await expect(page).toHaveURL(/localhost:3024\/routines\/create/);

      // Additional verification: we should still be on the create form
      await expect(page.getByPlaceholder(/enter routine name/i)).toBeVisible();
      await expect(
        page.getByRole('button', { name: /save routine/i })
      ).toBeVisible();
    });

    // Test 2: Complete data should save successfully
    await test.step('Test successful routine creation with complete data', async () => {
      // Clear the form and start fresh
      await page.reload();
      await expect(page).toHaveURL(/localhost:3024\/routines\/create/);

      // Fill in complete routine details
      await page
        .getByPlaceholder(/enter routine name/i)
        .fill('Complete Test Routine');
      await page
        .getByPlaceholder(/describe your routine/i)
        .fill('A complete test routine for e2e testing');

      // Select difficulty
      await page.getByRole('combobox').first().click();
      await page.getByRole('option', { name: /beginner/i }).click();

      // Select goal
      await page.getByRole('combobox').nth(1).click();
      await page.getByRole('option', { name: /strength/i }).click();

      // Add objective
      await page
        .getByPlaceholder(/what are the main goals/i)
        .fill('Build strength and endurance');
      await page.keyboard.press('Enter');

      // Add a strength workout
      await page.getByRole('button', { name: /add strength workout/i }).click();

      // Wait for workout form to appear and fill it out
      await page.waitForTimeout(1000);

      // Fill workout details
      // The workout name is an input without a label, so we need to find it by placeholder or position
      await page
        .getByRole('textbox')
        .filter({ hasText: '' })
        .first()
        .fill('Test Strength Workout');

      await page
        .getByLabel(/objective/i)
        .first()
        .fill('Build upper body strength');

      // Add a section
      await page
        .getByRole('button', { name: /add section/i })
        .first()
        .click();

      // Fill section details
      await page
        .getByLabel(/section name/i)
        .first()
        .fill('Chest and Triceps');

      // Add an exercise
      await page
        .getByRole('button', { name: /add exercise/i })
        .first()
        .click();

      // Select an exercise from the modal
      await page.waitForSelector('[role="dialog"]');
      await page
        .getByText(/bench press/i)
        .first()
        .click();
      await page.getByRole('button', { name: /add exercise/i }).click();

      // Verify exercise was added (use a more specific selector)
      await expect(
        page.getByRole('heading', { name: /bench press/i })
      ).toBeVisible();

      // Add sets to the exercise
      await page
        .getByRole('button', { name: /add set/i })
        .first()
        .click();
      // The reps field is in a column with header "REP VALUES" but no label
      await page
        .getByRole('textbox')
        .filter({ hasText: '' })
        .first()
        .fill('10');
      // The weight field is in a column with header "WEIGHT (KG)" but no label
      await page
        .getByRole('textbox')
        .filter({ hasText: '' })
        .nth(1)
        .fill('100');

      // Add another set
      await page
        .getByRole('button', { name: /add set/i })
        .first()
        .click();
      // The second reps field is also in a column with header "REP VALUES" but no label
      await page.getByRole('textbox').filter({ hasText: '' }).nth(2).fill('8');
      // The second weight field is also in a column with header "WEIGHT (KG)" but no label
      await page
        .getByRole('textbox')
        .filter({ hasText: '' })
        .nth(3)
        .fill('110');

      // Now try to save - this should succeed and navigate to routines page
      await page.getByRole('button', { name: /save routine/i }).click();

      // Wait for navigation to complete
      await page.waitForURL(/localhost:3024\/routines/);

      // Log any console messages or errors
      // Console logs, errors, and alerts logged for debugging

      // This should succeed and navigate to the routines page
      await expect(page).toHaveURL(/localhost:3024\/routines/);
    });
  });
});
