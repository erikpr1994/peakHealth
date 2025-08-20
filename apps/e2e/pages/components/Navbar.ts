import { Page as PlaywrightPage, Locator } from '@playwright/test';

/**
 * Component object for the navigation bar
 */
export class Navbar {
  private readonly navbarSelector = 'nav';
  private readonly page: PlaywrightPage;

  /**
   * Constructor for the Navbar component
   * @param page - The Playwright page object
   */
  constructor(page: PlaywrightPage) {
    this.page = page;
  }

  /**
   * Get the navbar element
   * @returns Locator for the navbar element
   */
  getNavbar(): Locator {
    return this.page.locator(this.navbarSelector);
  }

  /**
   * Check if the navbar is visible
   * @returns Promise that resolves to true if the navbar is visible
   */
  async isVisible(): Promise<boolean> {
    return await this.getNavbar().isVisible();
  }

  /**
   * Click a link in the navbar by text
   * @param text - The text of the link to click
   * @returns Promise that resolves when the link is clicked
   */
  async clickLink(text: string): Promise<void> {
    await this.page
      .locator(`${this.navbarSelector} a, ${this.navbarSelector} button`)
      .filter({ hasText: new RegExp(text, 'i') })
      .click();
  }

  /**
   * Check if a link exists in the navbar
   * @param text - The text of the link to check for
   * @returns Promise that resolves to true if the link exists
   */
  async hasLink(text: string): Promise<boolean> {
    const count = await this.page
      .locator(`${this.navbarSelector} a, ${this.navbarSelector} button`)
      .filter({ hasText: new RegExp(text, 'i') })
      .count();
    return count > 0;
  }

  /**
   * Get all link texts in the navbar
   * @returns Promise that resolves to an array of link texts
   */
  async getLinkTexts(): Promise<string[]> {
    const links = this.page.locator(
      `${this.navbarSelector} a, ${this.navbarSelector} button`
    );
    const count = await links.count();
    const texts: string[] = [];

    for (let i = 0; i < count; i++) {
      const text = await links.nth(i).textContent();
      if (text) {
        texts.push(text.trim());
      }
    }

    return texts;
  }
}
