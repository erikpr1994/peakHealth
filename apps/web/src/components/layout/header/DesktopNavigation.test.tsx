import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { DesktopNavigation } from './DesktopNavigation';

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }): React.JSX.Element => (
    <a href={href} data-testid={`link-${href.replace('/', '')}`}>
      {children}
    </a>
  ),
}));

// Mock the Button component
vi.mock('@/components/ui/button', () => ({
  Button: ({
    children,
    variant,
    className,
  }: {
    children: React.ReactNode;
    variant?: string;
    className?: string;
  }): React.JSX.Element => (
    <button data-testid="button" data-variant={variant} className={className}>
      {children}
    </button>
  ),
}));

const mockItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (): React.JSX.Element => <span data-testid="icon-dashboard">🏠</span>,
    path: '/dashboard',
  },
  {
    id: 'routines',
    label: 'Routines',
    icon: (): React.JSX.Element => <span data-testid="icon-routines">📚</span>,
    path: '/routines',
  },
  {
    id: 'exercises',
    label: 'Exercises',
    icon: (): React.JSX.Element => <span data-testid="icon-exercises">💪</span>,
    path: '/exercises',
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
] as any; // Type assertion for test mocks

describe('DesktopNavigation', () => {
  it('renders navigation items with correct links', () => {
    render(<DesktopNavigation items={mockItems} pathname="/dashboard" />);

    // Check that all navigation items are rendered
    expect(screen.getByTestId('link-dashboard')).toBeInTheDocument();
    expect(screen.getByTestId('link-routines')).toBeInTheDocument();
    expect(screen.getByTestId('link-exercises')).toBeInTheDocument();

    // Check that links have correct href attributes
    expect(screen.getByTestId('link-dashboard')).toHaveAttribute(
      'href',
      '/dashboard'
    );
    expect(screen.getByTestId('link-routines')).toHaveAttribute(
      'href',
      '/routines'
    );
    expect(screen.getByTestId('link-exercises')).toHaveAttribute(
      'href',
      '/exercises'
    );
  });

  it('applies active variant to current path', () => {
    render(<DesktopNavigation items={mockItems} pathname="/dashboard" />);

    const buttons = screen.getAllByTestId('button');

    // Dashboard should be active (default variant)
    expect(buttons[0]).toHaveAttribute('data-variant', 'default');

    // Other items should be ghost variant
    expect(buttons[1]).toHaveAttribute('data-variant', 'ghost');
    expect(buttons[2]).toHaveAttribute('data-variant', 'ghost');
  });

  it('applies active variant to sub-routes', () => {
    render(<DesktopNavigation items={mockItems} pathname="/routines/create" />);

    const buttons = screen.getAllByTestId('button');

    // Routines should be active for sub-route
    expect(buttons[1]).toHaveAttribute('data-variant', 'default');

    // Other items should be ghost variant
    expect(buttons[0]).toHaveAttribute('data-variant', 'ghost');
    expect(buttons[2]).toHaveAttribute('data-variant', 'ghost');
  });

  it('renders icons and labels correctly', () => {
    render(<DesktopNavigation items={mockItems} pathname="/dashboard" />);

    // Check that icons are rendered
    expect(screen.getByTestId('icon-dashboard')).toBeInTheDocument();
    expect(screen.getByTestId('icon-routines')).toBeInTheDocument();
    expect(screen.getByTestId('icon-exercises')).toBeInTheDocument();

    // Check that labels are rendered
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Routines')).toBeInTheDocument();
    expect(screen.getByText('Exercises')).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    render(<DesktopNavigation items={mockItems} pathname="/dashboard" />);

    const buttons = screen.getAllByTestId('button');

    buttons.forEach(button => {
      expect(button).toHaveClass(
        'flex',
        'items-center',
        'gap-2',
        'px-4',
        'py-2'
      );
    });
  });
});
