import { Page as PlaywrightPage } from '@playwright/test';
import { RegularUserBasePage } from './RegularUserBasePage';

/**
 * Page object for the regular user dashboard page
 */
export class DashboardPage extends RegularUserBasePage {
  // Selectors specific to the dashboard page
  private readonly welcomeMessageSelector = 'h1:has-text("Good morning")';
  private readonly statsCardSelector = '[data-testid="stats-card"]';
  private readonly recentActivitySelector = '[data-testid="recent-activity"]';
  private readonly quickActionsSelector = '[data-testid="quick-actions"]';

  /**
   * Constructor for the DashboardPage
   * @param page - The Playwright page object
   */
  constructor(page: PlaywrightPage) {
    super(page, '/dashboard');
  }

  /**
   * Check if the greeting message is visible
   * @returns Promise that resolves to true if the greeting message is visible
   */
  async isWelcomeMessageVisible(): Promise<boolean> {
    return this.isVisible(this.welcomeMessageSelector);
  }

  /**
   * Get the greeting message text
   * @returns Promise that resolves to the greeting message text
   */
  async getWelcomeMessage(): Promise<string> {
    return this.getText(this.welcomeMessageSelector);
  }

  /**
   * Check if the stats cards are visible
   * @returns Promise that resolves to true if the stats cards are visible
   */
  async areStatsCardsVisible(): Promise<boolean> {
    return this.isVisible(this.statsCardSelector);
  }

  /**
   * Check if the recent activity section is visible
   * @returns Promise that resolves to true if the recent activity section is visible
   */
  async isRecentActivityVisible(): Promise<boolean> {
    return this.isVisible(this.recentActivitySelector);
  }

  /**
   * Check if the quick actions section is visible
   * @returns Promise that resolves to true if the quick actions section is visible
   */
  async areQuickActionsVisible(): Promise<boolean> {
    return this.isVisible(this.quickActionsSelector);
  }

  /**
   * Take a screenshot of the dashboard page
   * @returns Promise that resolves when the screenshot is taken
   */
  async takeScreenshot(): Promise<void> {
    await super.takeScreenshot('dashboard', {
      fullPage: true,
      animations: 'disabled',
    });
  }
}
