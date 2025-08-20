import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CTASection } from './CTASection';

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
        title: 'Get Started Today',
        description:
          'Join thousands of users who have transformed their fitness journey',
        getStartedFree: 'Get Started Free',
        learnMore: 'Learn More',
      };
      return translations[key] || key;
    })
  ),
  useLocale: vi.fn((): string => 'en'),
}));

describe('CTASection', () => {
  it('renders the CTA section with correct content', (): void => {
    render(<CTASection />);

    expect(screen.getByText('Get Started Today')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Join thousands of users who have transformed their fitness journey'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('Get Started Free')).toBeInTheDocument();
  });

  it('has proper semantic structure', (): void => {
    render(<CTASection />);

    const genericElements = screen.getAllByRole('generic');
    const section = genericElements.find(el => el.tagName === 'SECTION');
    expect(section).toBeInTheDocument();
    expect(section?.tagName).toBe('SECTION');

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Get Started Today');
  });

  it('has a working call-to-action link', (): void => {
    render(<CTASection />);

    const ctaLink = screen.getByRole('link', { name: /get started free/i });
    expect(ctaLink).toBeInTheDocument();
    expect(ctaLink).toHaveAttribute('href', 'http://localhost:3000/en/signup');
  });
});
