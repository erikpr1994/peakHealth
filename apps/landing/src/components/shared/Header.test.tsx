import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import React from 'react';

// Mock next-intl navigation
vi.mock('@/i18n/navigation', () => ({
  Link: ({
    children,
    href,
    ...props
  }: React.PropsWithChildren<{
    href: string;
    [key: string]: unknown;
  }>): React.JSX.Element => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
  useRouter: (): { replace: () => void } => ({
    replace: vi.fn(),
  }),
  usePathname: (): string => '/en',
}));

import { Header } from './Header';

describe('Header', () => {
  it('renders the header with logo and navigation', () => {
    render(<Header />);

    // Check for logo
    expect(screen.getByTestId('logo')).toBeInTheDocument();

    // Check for navigation links
    expect(screen.getByText(/features/i)).toBeInTheDocument();
    expect(screen.getByText(/vision/i)).toBeInTheDocument();
    expect(screen.getByText(/roadmap/i)).toBeInTheDocument();
    expect(screen.getByText(/feedback/i)).toBeInTheDocument();
    expect(screen.getByText(/blog/i)).toBeInTheDocument();
  });

  it('renders authentication buttons', () => {
    render(<Header />);

    // Check for sign in and sign up buttons
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/get started/i)).toBeInTheDocument();
  });

  it('renders language switcher', () => {
    render(<Header />);

    // Check for language switcher (should show current language)
    expect(screen.getByLabelText(/select language/i)).toBeInTheDocument();
  });
});
