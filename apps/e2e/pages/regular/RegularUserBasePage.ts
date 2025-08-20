import { Page as PlaywrightPage } from '@playwright/test';
import { Page } from '../base/Page';

/**
 * Base page for regular user pages
 * Contains common elements and methods for regular user pages
 */
export class RegularUserBasePage extends Page {
  // Selectors for common elements on regular user pages
  protected readonly navbarSelector = 'nav';
  protected readonly dashboardLinkSelector = 'a[href*="dashboard"]';
  protected readonly routinesLinkSelector = 'button:has-text("Routines")';
  protected readonly profileLinkSelector = 'a[href*="profile"]';
  protected readonly toastSelector = '.peakhealth-toast-message';

  /**
   * Constructor for the RegularUserBasePage
   * @param page - The Playwright page object
   * @param path - The path of the page
   */
  constructor(page: PlaywrightPage, path: string = '') {
    super(page, path, 'http://localhost:3024');
  }

  /**
   * Navigate to the dashboard page
   * @returns Promise that resolves when navigation is complete
   */
  async navigateToDashboard(): Promise<void> {
    await this.click(this.dashboardLinkSelector);
    await this.waitForPageLoad();
  }

  /**
   * Navigate to the routines page
   * @returns Promise that resolves when navigation is complete
   */
  async navigateToRoutines(): Promise<void> {
    await this.click(this.routinesLinkSelector);
    await this.waitForPageLoad();
  }

  /**
   * Navigate to the profile page
   * @returns Promise that resolves when navigation is complete
   */
  async navigateToProfile(): Promise<void> {
    await this.click(this.profileLinkSelector);
    await this.waitForPageLoad();
  }

  /**
   * Check if a toast message is visible
   * @returns Promise that resolves to true if a toast is visible
   */
  async isToastVisible(): Promise<boolean> {
    return this.isVisible(this.toastSelector);
  }

  /**
   * Get the text of the toast message
   * @returns Promise that resolves to the toast message text
   */
  async getToastMessage(): Promise<string> {
    await this.waitForSelector(this.toastSelector);
    return this.getText(this.toastSelector);
  }

  /**
   * Wait for a toast message to appear
   * @param text - Optional text to check for in the toast
   * @param timeout - Optional timeout in milliseconds
   * @returns Promise that resolves when the toast appears
   */
  async waitForToast(text?: string, timeout?: number): Promise<void> {
    const toastLocator = this.page.locator(this.toastSelector);
    await toastLocator.waitFor({ state: 'visible', timeout });

    if (text) {
      await toastLocator.waitFor({
        state: 'visible',
        timeout,
        predicate: async element => {
          const content = await element.textContent();
          return content !== null && content.includes(text);
        },
      });
    }
  }
}
