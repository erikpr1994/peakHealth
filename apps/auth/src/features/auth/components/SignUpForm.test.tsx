import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { SignUpForm } from './SignUpForm';

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations:
    (namespace: string) =>
    (key: string): string => {
      const translations: Record<string, Record<string, string>> = {
        signup: {
          title: 'Create Account',
          subtitle: 'Join Peak Health today!',
          'email.required': 'Email is required',
          'email.invalid': 'Please enter a valid email address',
          'email.placeholder': 'Enter your email',
          'password.required': 'Password is required',
          'password.invalid': 'Password is invalid',
          'password.placeholder': 'Create a password',
          'password.tooShort': 'Password must be at least 8 characters long',
          'password.noLowercase':
            'Password must contain at least one lowercase letter',
          'password.noUppercase':
            'Password must contain at least one uppercase letter',
          'password.noNumber': 'Password must contain at least one number',
          'confirmPassword.required': 'Please confirm your password',
          'confirmPassword.mismatch': 'Passwords do not match',
          'confirmPassword.placeholder': 'Confirm your password',
          'firstName.required': 'First name is required',
          'firstName.placeholder': 'Enter your first name',
          'lastName.required': 'Last name is required',
          'lastName.placeholder': 'Enter your last name',
          'button.default': 'Create Account',
          'button.loading': 'Creating Account...',
          'footer.haveAccount': 'Already have an account?',
          'footer.signIn': 'Sign in',
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

describe('SignUpForm', (): void => {
  it('renders signup form with back button', (): void => {
    render(<SignUpForm />);

    // Check that the back button is present
    expect(screen.getByRole('button', { name: 'back' })).toBeDefined();

    // Check that the form elements are present
    expect(
      screen.getByRole('heading', { name: 'Create Account' })
    ).toBeDefined();
    expect(screen.getByText('Join Peak Health today!')).toBeDefined();
    expect(screen.getByPlaceholderText('Enter your first name')).toBeDefined();
    expect(screen.getByPlaceholderText('Enter your last name')).toBeDefined();
    expect(screen.getByPlaceholderText('Enter your email')).toBeDefined();
    expect(screen.getByPlaceholderText('Create a password')).toBeDefined();
    expect(screen.getByPlaceholderText('Confirm your password')).toBeDefined();
    expect(
      screen.getByRole('button', { name: 'Create Account' })
    ).toBeDefined();
  });

  it('renders sign in link in footer', (): void => {
    render(<SignUpForm />);

    expect(screen.getByText('Already have an account?')).toBeDefined();
    expect(screen.getByText('Sign in')).toBeDefined();
  });
});
