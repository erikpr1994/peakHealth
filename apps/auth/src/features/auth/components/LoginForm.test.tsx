import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { LoginForm } from './LoginForm';

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations:
    (namespace: string) =>
    (key: string): string => {
      const translations: Record<string, Record<string, string>> = {
        login: {
          title: 'Sign In',
          subtitle: 'Welcome back! Please sign in to continue.',
          'email.label': 'Email',
          'email.required': 'Email is required',
          'email.invalid': 'Please enter a valid email address',
          'email.placeholder': 'Enter your email',
          'password.label': 'Password',
          'password.required': 'Password is required',
          'password.placeholder': 'Enter your password',
          'button.default': 'Sign In',
          'button.loading': 'Signing In...',
          'footer.noAccount': "Don't have an account?",
          'footer.signUp': 'Sign up',
        },
        errors: {
          // Add any error translations if needed
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
  useSearchParams: (): URLSearchParams => new URLSearchParams(),
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
}));

// Mock window.location
const mockLocation = {
  href: '',
};
Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

describe('LoginForm', (): void => {
  it('renders login form with back button', (): void => {
    render(<LoginForm />);

    // Check that the back button is present
    expect(screen.getByRole('button', { name: 'back' })).toBeDefined();

    // Check that the form elements are present
    expect(screen.getByRole('heading', { name: 'Sign In' })).toBeDefined();
    expect(
      screen.getByText('Welcome back! Please sign in to continue.')
    ).toBeDefined();
    expect(screen.getByPlaceholderText('Enter your email')).toBeDefined();
    expect(screen.getByPlaceholderText('Enter your password')).toBeDefined();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeDefined();
  });

  it('renders sign up link in footer', (): void => {
    render(<LoginForm />);

    expect(screen.getByText("Don't have an account?")).toBeDefined();
    expect(screen.getByText('Sign up')).toBeDefined();
  });
});
