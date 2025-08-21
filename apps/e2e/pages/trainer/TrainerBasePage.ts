import { Page as PlaywrightPage } from '@playwright/test';
import { Page } from '../base/Page';

/**
 * Base page for trainer user pages
 * Contains common elements and methods for trainer user pages
 */
export class TrainerBasePage extends Page {
  // Selectors for common elements on trainer pages
  protected readonly navbarSelector = 'nav';
  protected readonly dashboardLinkSelector = 'a[href*="dashboard"]';
  protected readonly clientsLinkSelector = 'a[href*="clients"]';
  protected readonly routinesLinkSelector =
    'nav a[href="/routines"], a[href="/routines"]';
  protected readonly profileLinkSelector = 'a[href*="profile"]';
  protected readonly toastSelector = '.peakhealth-toast-message';

  /**
   * Constructor for the TrainerBasePage
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
   * Navigate to the clients page
   * @returns Promise that resolves when navigation is complete
   */
  async navigateToClients(): Promise<void> {
    await this.click(this.clientsLinkSelector);
    await this.waitForPageLoad();
  }

  /**
   * Navigate to the routines page
   * @returns Promise that resolves when navigation is complete
   */
  async navigateToRoutines(): Promise<void> {
    // Wait for the element to be visible
    await this.waitForSelector(this.routinesLinkSelector);

    // Click the routines link
    await this.click(this.routinesLinkSelector);

    // Wait for navigation to complete
    await this.page.waitForURL(/localhost:3024\/routines/);
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
      });

      // Additional check for text content
      await this.waitForCondition(async () => {
        const content = await toastLocator.textContent();
        return content !== null && content.includes(text);
      }, timeout);
    }
  }
}
