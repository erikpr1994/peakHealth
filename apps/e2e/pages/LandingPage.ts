import { Page as PlaywrightPage } from '@playwright/test';
import { Page } from './base/Page';

/**
 * Page object for the landing page
 */
export class LandingPage extends Page {
  // Selectors for landing page elements
  private readonly getStartedButtonSelector = 'a:has-text("Get Started Free")';
  private readonly signInLinkSelector =
    'a:has-text("Sign In"), a:has-text("Login")';
  private readonly headerSelector = 'header';
  private readonly footerSelector = 'footer';
  private readonly heroSectionSelector = 'section:first-of-type';

  /**
   * Constructor for the LandingPage
   * @param page - The Playwright page object
   */
  constructor(page: PlaywrightPage) {
    super(page, '/', 'http://localhost:3024');
  }

  /**
   * Click the Get Started button
   * @returns Promise that resolves when the button is clicked
   */
  async clickGetStarted(): Promise<void> {
    await this.click(this.getStartedButtonSelector);
    await this.waitForPageLoad();
  }

  /**
   * Click the Sign In link
   * @returns Promise that resolves when the link is clicked
   */
  async clickSignIn(): Promise<void> {
    await this.click(this.signInLinkSelector);
    await this.waitForPageLoad();
  }

  /**
   * Check if the header is visible
   * @returns Promise that resolves to true if the header is visible
   */
  async isHeaderVisible(): Promise<boolean> {
    return this.isVisible(this.headerSelector);
  }

  /**
   * Check if the footer is visible
   * @returns Promise that resolves to true if the footer is visible
   */
  async isFooterVisible(): Promise<boolean> {
    return this.isVisible(this.footerSelector);
  }

  /**
   * Check if the hero section is visible
   * @returns Promise that resolves to true if the hero section is visible
   */
  async isHeroSectionVisible(): Promise<boolean> {
    return this.isVisible(this.heroSectionSelector);
  }

  /**
   * Take a screenshot of the landing page
   * @returns Promise that resolves when the screenshot is taken
   */
  async takeScreenshot(): Promise<void> {
    await super.takeScreenshot('landing', {
      fullPage: true,
      animations: 'disabled',
    });
  }
}
