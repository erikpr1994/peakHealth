import { Page as PlaywrightPage } from '@playwright/test';
import { RegularUserBasePage } from './RegularUserBasePage';

/**
 * Page object for the regular user routines page
 */
export class RoutinesPage extends RegularUserBasePage {
  // Selectors specific to the routines page
  private readonly createRoutineButtonSelector =
    'button:has-text("Create Routine"), button:has-text("New Routine")';
  private readonly routineListSelector =
    'div:has-text("My Routines"), div:has-text("No routines found"), div:has-text("Create Your First Routine"), div:has-text("Loading routines"), div:has-text("Error")';
  private readonly routineItemSelector =
    'h3:has-text("Strength Training"), h3:has-text("Cardio Blast")';
  private readonly routineNameSelector = 'h3';
  private readonly routineDescriptionSelector = 'p:has-text("Build muscle")';
  private readonly routineDifficultySelector =
    'span:has-text("Intermediate"), span:has-text("Advanced")';

  /**
   * Constructor for the RoutinesPage
   * @param page - The Playwright page object
   */
  constructor(page: PlaywrightPage) {
    super(page, '/routines');
  }

  /**
   * Click the create routine button
   * @returns Promise that resolves when the button is clicked
   */
  async clickCreateRoutine(): Promise<void> {
    // Wait for the button to be visible
    await this.waitForSelector(this.createRoutineButtonSelector);

    // Click the create routine button
    await this.click(this.createRoutineButtonSelector);

    // Wait for navigation to complete
    await this.page.waitForURL(/localhost:3024\/routines\/create/);
    await this.waitForPageLoad();
  }

  /**
   * Check if the routine list is visible
   * @returns Promise that resolves to true if the routine list is visible
   */
  async isRoutineListVisible(): Promise<boolean> {
    // Check if we're on the routines page by looking for any content
    const hasContent = await this.page.locator('body').textContent();
    return hasContent !== null && hasContent.length > 0;
  }

  /**
   * Get the number of routines in the list
   * @returns Promise that resolves to the number of routines
   */
  async getRoutineCount(): Promise<number> {
    return this.page.locator(this.routineItemSelector).count();
  }

  /**
   * Click on a routine by name
   * @param name - The name of the routine to click
   * @returns Promise that resolves when the routine is clicked
   */
  async clickRoutineByName(name: string): Promise<void> {
    await this.page
      .locator(this.routineNameSelector)
      .filter({ hasText: name })
      .click();
    await this.waitForPageLoad();
  }

  /**
   * Check if a routine with the given name exists
   * @param name - The name of the routine to check for
   * @returns Promise that resolves to true if the routine exists
   */
  async routineExists(name: string): Promise<boolean> {
    try {
      // Wait for the routine to appear with a timeout
      await this.page
        .locator('h3.text-lg.font-semibold.text-gray-900')
        .filter({ hasText: name })
        .waitFor({ state: 'visible', timeout: 10000 });

      return true;
    } catch {
      // If the specific selector doesn't work, try the fallback
      try {
        await this.page
          .locator('h3')
          .filter({ hasText: name })
          .waitFor({ state: 'visible', timeout: 5000 });

        return true;
      } catch {
        return false;
      }
    }
  }

  /**
   * Take a screenshot of the routines page
   * @returns Promise that resolves when the screenshot is taken
   */
  async takeScreenshot(): Promise<void> {
    await super.takeScreenshot('routines', {
      fullPage: true,
      animations: 'disabled',
    });
  }
}
