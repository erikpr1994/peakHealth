import { Page as PlaywrightPage } from '@playwright/test';
import { RegularUserBasePage } from './RegularUserBasePage';

/**
 * Page object for the regular user routines page
 */
export class RoutinesPage extends RegularUserBasePage {
  // Selectors specific to the routines page
  private readonly createRoutineButtonSelector =
    'button:has-text("Create Routine"), button:has-text("New Routine")';
  private readonly routineListSelector = '[data-testid="routine-list"]';
  private readonly routineItemSelector = '[data-testid="routine-item"]';
  private readonly routineNameSelector = '[data-testid="routine-name"]';
  private readonly routineDescriptionSelector =
    '[data-testid="routine-description"]';
  private readonly routineDifficultySelector =
    '[data-testid="routine-difficulty"]';

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
    await this.click(this.createRoutineButtonSelector);
    await this.waitForPageLoad();
  }

  /**
   * Check if the routine list is visible
   * @returns Promise that resolves to true if the routine list is visible
   */
  async isRoutineListVisible(): Promise<boolean> {
    return this.isVisible(this.routineListSelector);
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
    const count = await this.page
      .locator(this.routineNameSelector)
      .filter({ hasText: name })
      .count();
    return count > 0;
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
