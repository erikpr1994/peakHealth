import { Page as PlaywrightPage } from '@playwright/test';
import { TrainerBasePage } from './TrainerBasePage';

/**
 * Page object for the trainer dashboard page
 */
export class DashboardPage extends TrainerBasePage {
  // Selectors specific to the trainer dashboard page
  private readonly welcomeMessageSelector = 'h1:has-text("Welcome")';
  private readonly statsCardSelector = '[data-testid="stats-card"]';
  private readonly clientStatsSelector = '[data-testid="client-stats"]';
  private readonly upcomingSessionsSelector =
    '[data-testid="upcoming-sessions"]';
  private readonly recentActivitySelector = '[data-testid="recent-activity"]';

  /**
   * Constructor for the TrainerDashboardPage
   * @param page - The Playwright page object
   */
  constructor(page: PlaywrightPage) {
    super(page, '/dashboard');
  }

  /**
   * Check if the welcome message is visible
   * @returns Promise that resolves to true if the welcome message is visible
   */
  async isWelcomeMessageVisible(): Promise<boolean> {
    return this.isVisible(this.welcomeMessageSelector);
  }

  /**
   * Get the welcome message text
   * @returns Promise that resolves to the welcome message text
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
   * Check if the client stats section is visible
   * @returns Promise that resolves to true if the client stats section is visible
   */
  async areClientStatsVisible(): Promise<boolean> {
    return this.isVisible(this.clientStatsSelector);
  }

  /**
   * Check if the upcoming sessions section is visible
   * @returns Promise that resolves to true if the upcoming sessions section is visible
   */
  async areUpcomingSessionsVisible(): Promise<boolean> {
    return this.isVisible(this.upcomingSessionsSelector);
  }

  /**
   * Check if the recent activity section is visible
   * @returns Promise that resolves to true if the recent activity section is visible
   */
  async isRecentActivityVisible(): Promise<boolean> {
    return this.isVisible(this.recentActivitySelector);
  }

  /**
   * Take a screenshot of the trainer dashboard page
   * @returns Promise that resolves when the screenshot is taken
   */
  async takeScreenshot(): Promise<void> {
    await super.takeScreenshot('trainer-dashboard', {
      fullPage: true,
      animations: 'disabled',
    });
  }
}
