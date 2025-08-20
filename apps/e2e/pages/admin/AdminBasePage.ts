import { Page as PlaywrightPage } from '@playwright/test';
import { Page } from '../base/Page';

/**
 * Base page for admin user pages
 * Contains common elements and methods for admin user pages
 */
export class AdminBasePage extends Page {
  // Selectors for common elements on admin pages
  protected readonly navbarSelector = 'nav';
  protected readonly dashboardLinkSelector = 'a[href*="dashboard"]';
  protected readonly usersLinkSelector = 'a[href*="users"]';
  protected readonly settingsLinkSelector = 'a[href*="settings"]';
  protected readonly toastSelector = '.peakhealth-toast-message';

  /**
   * Constructor for the AdminBasePage
   * @param page - The Playwright page object
   * @param path - The path of the page
   * @param isAdminApp - Whether this is the admin app (vs web app)
   */
  constructor(
    page: PlaywrightPage,
    path: string = '',
    isAdminApp: boolean = true
  ) {
    // Use the appropriate base URL based on whether this is the admin app or web app
    const baseUrl = isAdminApp
      ? 'http://localhost:3002'
      : 'http://localhost:3024';
    super(page, path, baseUrl);
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
   * Navigate to the users page
   * @returns Promise that resolves when navigation is complete
   */
  async navigateToUsers(): Promise<void> {
    await this.click(this.usersLinkSelector);
    await this.waitForPageLoad();
  }

  /**
   * Navigate to the settings page
   * @returns Promise that resolves when navigation is complete
   */
  async navigateToSettings(): Promise<void> {
    await this.click(this.settingsLinkSelector);
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
