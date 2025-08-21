import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { AppSelector } from './AppSelector';

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations:
    (namespace: string) =>
    (key: string, values?: Record<string, string | number>): string => {
      const translations: Record<string, Record<string, string>> = {
        appSelector: {
          title: 'Select an Application',
          subtitle:
            'Welcome back, {name}! Choose which Peak Health application you want to use',
          loading: 'Loading available applications...',
          signOut: 'Sign Out',
          'noApps.message': 'No applications available for your account',
          'noApps.logout': 'Sign Out',
          'error.title': 'Error',
          'error.subtitle': 'Failed to load applications',
          'error.tryAgain': 'Try Again',
          'appStatus.accessible': 'Accessible',
          'appStatus.noAccess': 'No Access',
          contactAdmin:
            'Please contact your administrator to request access to applications.',
        },
        common: {
          back: 'back',
        },
      };
      let result = translations[namespace]?.[key] || key;

      // Handle interpolation
      if (values) {
        Object.entries(values).forEach(([placeholder, value]) => {
          result = result.replace(`{${placeholder}}`, String(value));
        });
      }

      return result;
    },
  useLocale: (): string => 'en',
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: (): { push: ReturnType<typeof vi.fn> } => ({
    push: vi.fn(),
  }),
}));

// Mock i18n/navigation
vi.mock('@/i18n/navigation', () => ({
  Link: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }): React.JSX.Element => <a href={href}>{children}</a>,
  useRouter: (): { push: ReturnType<typeof vi.fn> } => ({
    push: vi.fn(),
  }),
}));

// Mock auth-utils
vi.mock('@peakhealth/auth-utils', () => ({
  getUserAccessibleApps: vi.fn(() => [
    {
      appKey: 'web',
      appConfig: {
        name: 'Web App',
        description: 'User dashboard and application features',
      },
      accessible: true,
    },
    {
      appKey: 'admin',
      appConfig: {
        name: 'Admin Panel',
        description: 'Admin panel for managing users and content',
      },
      accessible: false,
      reason: 'Admin access required',
    },
  ]),
  buildAppRedirectUrl: vi.fn(
    (appKey: string) => `https://${appKey}.peakhealth.es`
  ),
}));

// Mock fetch
global.fetch = vi.fn();

// Mock window.location
const mockLocation = {
  href: '',
};
Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

describe('AppSelector', (): void => {
  beforeEach((): void => {
    vi.clearAllMocks();

    // Mock successful API responses
    (global.fetch as ReturnType<typeof vi.fn>)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          user: {
            id: 'test-user-id',
            email: 'test@example.com',
            user_metadata: {
              firstName: 'Test',
              lastName: 'User',
            },
          },
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });
  });

  it('renders app selector with back button', async (): Promise<void> => {
    render(<AppSelector />);

    // Wait for the component to load
    await screen.findByText('Select an Application');

    // Check that the back button is present
    expect(screen.getByRole('button', { name: 'back' })).toBeDefined();

    // Check that the page content is present
    expect(screen.getByText('Select an Application')).toBeDefined();
    expect(
      screen.getByText(
        'Welcome back, Test! Choose which Peak Health application you want to use'
      )
    ).toBeDefined();
  });
});
