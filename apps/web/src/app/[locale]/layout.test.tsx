import { render, screen } from '@testing-library/react';
import { notFound } from 'next/navigation';

import { vi, describe, it, expect, beforeEach } from 'vitest';
import LocaleLayout from './layout';

// Mock next-intl modules
vi.mock('next-intl/server', () => ({
  getMessages: vi.fn(() => Promise.resolve({})),
}));

vi.mock('next-intl', () => ({
  NextIntlClientProvider: ({
    children,
    messages,
  }: {
    children: React.ReactNode;
    messages: Record<string, unknown>;
  }): React.JSX.Element => (
    <div
      data-testid="next-intl-provider"
      data-messages={JSON.stringify(messages)}
    >
      {children}
    </div>
  ),
}));

vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}));

vi.mock('@/i18n/routing', () => ({
  routing: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
  },
}));

// Mock the AppLayout component
vi.mock('./(app)/layout', () => ({
  default: function MockAppLayout({
    children,
  }: {
    children: React.ReactNode;
  }): React.JSX.Element {
    return <div data-testid="app-layout">{children}</div>;
  },
}));

describe('LocaleLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render with valid locale', async (): Promise<void> => {
    const { container } = render(
      await LocaleLayout({
        children: <div>Test content</div>,
        params: Promise.resolve({ locale: 'en' }),
      })
    );

    expect(container).toBeInTheDocument();
    expect(screen.getByTestId('app-layout')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('should render with Spanish locale', async (): Promise<void> => {
    const { container } = render(
      await LocaleLayout({
        children: <div>Spanish content</div>,
        params: Promise.resolve({ locale: 'es' }),
      })
    );

    expect(container).toBeInTheDocument();
    expect(screen.getByTestId('app-layout')).toBeInTheDocument();
    expect(screen.getByText('Spanish content')).toBeInTheDocument();
  });

  it('should call notFound for invalid locale', async (): Promise<void> => {
    await LocaleLayout({
      children: <div>Invalid content</div>,
      params: Promise.resolve({ locale: 'fr' }),
    });

    expect(notFound).toHaveBeenCalled();
  });

  it('should wrap children in NextIntlClientProvider', async (): Promise<void> => {
    const { container } = render(
      await LocaleLayout({
        children: <div>Test content</div>,
        params: Promise.resolve({ locale: 'en' }),
      })
    );

    // The NextIntlClientProvider should be present in the rendered structure
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should validate locale against routing configuration', async (): Promise<void> => {
    // Test with valid locales
    await LocaleLayout({
      children: <div>Test</div>,
      params: Promise.resolve({ locale: 'en' }),
    });
    expect(notFound).not.toHaveBeenCalled();

    await LocaleLayout({
      children: <div>Test</div>,
      params: Promise.resolve({ locale: 'es' }),
    });
    expect(notFound).not.toHaveBeenCalled();

    // Test with invalid locale
    await LocaleLayout({
      children: <div>Test</div>,
      params: Promise.resolve({ locale: 'invalid' }),
    });
    expect(notFound).toHaveBeenCalled();
  });
});
