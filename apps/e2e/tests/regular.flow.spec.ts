import { test, expect } from '@playwright/test';

test.describe('Regular user flows', () => {
  test.use({ storageState: 'storage-states/regular-web.json' });

  test('regular user can create routines with proper validation', async ({
    page,
  }) => {
    const consoleLogs: string[] = [];
    const errors: string[] = [];
    const alerts: string[] = [];

    page.on('console', msg => {
      consoleLogs.push(`${msg.type()}: ${msg.text()}`);
    });

    page.on('pageerror', error => {
      errors.push(error.message);
    });

    page.on('dialog', dialog => {
      alerts.push(dialog.message());
      dialog.accept();
    });

    await test.step('Access dashboard with authenticated session', async () => {
      await page.goto('http://localhost:3024/dashboard');
      await expect(page).toHaveURL(/localhost:3024\/dashboard/);
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot({
        fullPage: true,
        animations: 'disabled',
      });
    });

    await test.step('Navigate to routines page', async () => {
      const _buttons = await page.getByRole('button').all();

      await page.getByRole('button', { name: /routines/i }).click();
      await expect(page).toHaveURL(/localhost:3024\/routines/);
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot({
        fullPage: true,
        animations: 'disabled',
      });
    });

    await test.step('Test validation with incomplete data', async () => {
      const createButton = page.getByRole('button', {
        name: /create routine|new routine/i,
      });
      await createButton.waitFor({ state: 'visible' });
      await createButton.click();

      await expect(page).toHaveURL(/localhost:3024\/routines\/create/);
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot({
        fullPage: true,
        animations: 'disabled',
      });

      await page
        .getByPlaceholder(/enter routine name/i)
        .fill('Incomplete Test Routine');
      await page
        .getByPlaceholder(/describe your routine/i)
        .fill('A test routine with incomplete data');

      await page
        .getByPlaceholder(/what are the main goals/i)
        .fill('Build strength');
      await page.keyboard.press('Enter');
      await expect(page).toHaveScreenshot({
        fullPage: true,
        animations: 'disabled',
      });

      await page.getByRole('button', { name: /save routine/i }).click();

      await page.waitForTimeout(1000);

      await expect(page).toHaveURL(/localhost:3024\/routines\/create/);
      await page.waitForTimeout(500);
      await expect(page.getByPlaceholder(/enter routine name/i)).toBeVisible();
      await expect(
        page.getByRole('button', { name: /save routine/i })
      ).toBeVisible();
    });

    await test.step('Test successful routine creation with complete data', async () => {
      await page.reload();
      await expect(page).toHaveURL(/localhost:3024\/routines\/create/);
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot({
        fullPage: true,
        animations: 'disabled',
      });

      await page
        .getByPlaceholder(/enter routine name/i)
        .fill('Complete Test Routine');
      await page
        .getByPlaceholder(/describe your routine/i)
        .fill('A complete test routine for e2e testing');

      await page.getByRole('combobox').first().click();
      await page.getByRole('option', { name: /beginner/i }).click();

      await page.getByRole('combobox').nth(1).click();
      await page.getByRole('option', { name: /strength/i }).click();

      await page
        .getByPlaceholder(/what are the main goals/i)
        .fill('Build strength and endurance');
      await page.keyboard.press('Enter');

      await page.getByRole('button', { name: /add strength workout/i }).click();

      await page.waitForTimeout(1000);

      await page
        .getByRole('textbox')
        .filter({ hasText: '' })
        .first()
        .fill('Test Strength Workout');

      await page
        .getByLabel(/objective/i)
        .first()
        .fill('Build upper body strength');

      await page
        .getByRole('button', { name: /add section/i })
        .first()
        .click();

      await page
        .getByLabel(/section name/i)
        .first()
        .fill('Chest and Triceps');

      await page
        .getByRole('button', { name: /add exercise/i })
        .first()
        .click();

      await page.waitForSelector('[role="dialog"]');
      await page
        .getByText(/bench press/i)
        .first()
        .click();
      await page.getByRole('button', { name: /add exercise/i }).click();

      await expect(
        page.getByRole('heading', { name: /bench press/i })
      ).toBeVisible();

      await page
        .getByRole('textbox')
        .filter({ hasText: '' })
        .first()
        .fill('10');

      await page
        .getByRole('textbox')
        .filter({ hasText: '' })
        .nth(1)
        .fill('100');

      await page.getByRole('textbox').filter({ hasText: '' }).nth(2).fill('8');

      await page
        .getByRole('textbox')
        .filter({ hasText: '' })
        .nth(3)
        .fill('110');

      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot({
        fullPage: true,
        animations: 'disabled',
      });

      await page.getByRole('button', { name: /save routine/i }).click();

      await expect(page).not.toHaveURL(/localhost:3024\/routines\/create/);
      await expect(page).toHaveURL(/localhost:3024\/routines/);

      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot({
        fullPage: true,
        animations: 'disabled',
      });
    });
  });
});
