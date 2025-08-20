import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Footer } from './Footer';

// Mock the auth module
vi.mock('@/lib/auth', () => ({
  getSignupUrl: vi.fn((): string => 'http://localhost:3000/en/signup'),
}));

// Mock the navigation module
vi.mock('@/i18n/navigation', () => ({
  Link: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }): React.JSX.Element => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

// Mock the translations
vi.mock('next-intl', () => ({
  useTranslations: vi.fn(() =>
    vi.fn((key: string): string => {
      const translations: Record<string, string> = {
        description: 'Transform your fitness journey with PeakHealth',
        getStarted: 'Get Started',
        product: 'Product',
        features: 'Features',
        vision: 'Vision',
        roadmap: 'Roadmap',
        feedback: 'Feedback',
        company: 'Company',
        blog: 'Blog',
        careers: 'Careers',
        contact: 'Contact',
        support: 'Support',
        helpCenter: 'Help Center',
        copyright: '© 2025 PeakHealth. All rights reserved.',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
      };
      return translations[key] || key;
    })
  ),
  useLocale: vi.fn((): string => 'en'),
}));

describe('Footer', () => {
  it('renders the footer with correct content', (): void => {
    render(<Footer />);

    expect(
      screen.getByText('Transform your fitness journey with PeakHealth')
    ).toBeInTheDocument();
    expect(screen.getByText('Get Started')).toBeInTheDocument();
    expect(
      screen.getByText('© 2025 PeakHealth. All rights reserved.')
    ).toBeInTheDocument();
  });

  it('has proper semantic structure', (): void => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('has working navigation links', (): void => {
    render(<Footer />);

    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
  });

  it('has a working call-to-action link', (): void => {
    render(<Footer />);

    const ctaLink = screen.getByRole('link', { name: /get started/i });
    expect(ctaLink).toBeInTheDocument();
    expect(ctaLink).toHaveAttribute('href', 'http://localhost:3000/en/signup');
  });

  it('displays copyright information', (): void => {
    render(<Footer />);

    expect(
      screen.getByText('© 2025 PeakHealth. All rights reserved.')
    ).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
  });
});
