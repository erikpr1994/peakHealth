import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { AccessDeniedPage } from './AccessDeniedPage';

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations:
    (namespace: string) =>
    (key: string): string => {
      const translations: Record<string, Record<string, string>> = {
        accessDenied: {
          title: 'Access Denied',
          subtitle: 'You do not have permission to access this resource.',
          heading: 'Access Denied',
          message: 'You do not have permission to access this resource.',
          signOut: 'Sign Out',
          backToAppSelection: 'Back to App Selection',
          contactAdmin:
            'Please contact your administrator if you believe this is an error.',
          backToHome: 'Back to Home',
        },
        common: {
          back: 'back',
        },
      };
      return translations[namespace]?.[key] || key;
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

// Mock window.location
const mockLocation = {
  href: '',
};
Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

describe('AccessDeniedPage', (): void => {
  it('renders access denied page with back button', (): void => {
    render(<AccessDeniedPage />);

    // Check that the back button is present
    expect(screen.getByRole('button', { name: 'back' })).toBeDefined();

    // Check that the page content is present
    expect(
      screen.getByRole('heading', { level: 1, name: 'Access Denied' })
    ).toBeDefined();
    // Check that the message appears (there are two instances - one in header, one in content)
    const messageElements = screen.getAllByText(
      'You do not have permission to access this resource.'
    );
    expect(messageElements).toHaveLength(2);
    expect(screen.getByRole('button', { name: 'Sign Out' })).toBeDefined();
    expect(screen.getByText('Back to App Selection')).toBeDefined();
  });
});
