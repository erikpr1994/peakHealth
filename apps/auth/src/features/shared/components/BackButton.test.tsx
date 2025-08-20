import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { BackButton } from './BackButton';

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations:
    (namespace: string) =>
    (key: string): string => {
      const translations: Record<string, Record<string, string>> = {
        common: {
          back: 'back',
        },
      };
      return translations[namespace]?.[key] || key;
    },
  useLocale: (): string => 'en',
}));

// Mock window.location
const mockLocation = {
  href: '',
};
Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

describe('BackButton', () => {
  beforeEach((): void => {
    mockLocation.href = '';
    vi.clearAllMocks();
  });

  it('renders with correct text', (): void => {
    render(<BackButton />);
    expect(screen.getByRole('button', { name: 'back' })).toBeDefined();
  });

  it('redirects to landing page with locale when clicked', (): void => {
    render(<BackButton />);

    const button = screen.getByRole('button', { name: 'back' });
    fireEvent.click(button);

    // In development, it should redirect to localhost:3024
    expect(mockLocation.href).toBe('http://localhost:3024/en');
  });

  it('applies custom className', (): void => {
    render(<BackButton className="custom-class" />);
    const button = screen.getByRole('button', { name: 'back' });
    expect(button.className).toContain('custom-class');
  });

  it('applies custom variant', (): void => {
    render(<BackButton variant="primary" />);
    const button = screen.getByRole('button', { name: 'back' });
    expect(button.className).toContain('button--primary');
  });

  it('applies custom size', (): void => {
    render(<BackButton size="lg" />);
    const button = screen.getByRole('button', { name: 'back' });
    expect(button.className).toContain('button--lg');
  });
});
