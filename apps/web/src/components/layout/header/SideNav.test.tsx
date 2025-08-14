import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { SideNav } from './SideNav';

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    onClick,
  }: {
    children: React.ReactNode;
    href: string;
    onClick?: () => void;
  }): React.JSX.Element => (
    <a
      href={href}
      data-testid={`link-${href.replace('/', '')}`}
      onClick={onClick}
    >
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
    size,
  }: {
    children: React.ReactNode;
    variant?: string;
    className?: string;
    size?: string;
  }): React.JSX.Element => (
    <button
      data-testid="button"
      data-variant={variant}
      data-size={size}
      className={className}
    >
      {children}
    </button>
  ),
}));

// Mock the Sheet components
vi.mock('@/components/ui/sheet', () => ({
  Sheet: ({
    children,
    open,
    onOpenChange,
  }: {
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }): React.JSX.Element => (
    <div data-testid="sheet" data-open={open}>
      {children}
    </div>
  ),
  SheetTrigger: ({
    children,
    asChild,
  }: {
    children: React.ReactNode;
    asChild?: boolean;
  }): React.JSX.Element => <div data-testid="sheet-trigger">{children}</div>,
  SheetContent: ({
    children,
    side,
  }: {
    children: React.ReactNode;
    side: string;
  }): React.JSX.Element => (
    <div data-testid="sheet-content" data-side={side}>
      {children}
    </div>
  ),
  SheetHeader: ({
    children,
  }: {
    children: React.ReactNode;
  }): React.JSX.Element => <div data-testid="sheet-header">{children}</div>,
  SheetTitle: ({
    children,
  }: {
    children: React.ReactNode;
  }): React.JSX.Element => <div data-testid="sheet-title">{children}</div>,
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

describe('SideNav', () => {
  const mockOnOpenChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders sheet trigger button', () => {
    render(
      <SideNav
        items={mockItems}
        pathname="/dashboard"
        isOpen={false}
        onOpenChange={mockOnOpenChange}
      />
    );

    expect(screen.getByTestId('sheet-trigger')).toBeInTheDocument();
    // The sheet renders all content but hides it with CSS when closed
    // So we should have 1 trigger button + 3 navigation buttons = 4 total
    const buttons = screen.getAllByTestId('button');
    expect(buttons).toHaveLength(4);
  });

  it('renders sheet content when open', () => {
    render(
      <SideNav
        items={mockItems}
        pathname="/dashboard"
        isOpen={true}
        onOpenChange={mockOnOpenChange}
      />
    );

    expect(screen.getByTestId('sheet-content')).toBeInTheDocument();
    expect(screen.getByTestId('sheet-header')).toBeInTheDocument();
    expect(screen.getByTestId('sheet-title')).toBeInTheDocument();
    expect(screen.getByText('Peak Health')).toBeInTheDocument();
  });

  it('renders navigation items with correct links', () => {
    render(
      <SideNav
        items={mockItems}
        pathname="/dashboard"
        isOpen={true}
        onOpenChange={mockOnOpenChange}
      />
    );

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
    render(
      <SideNav
        items={mockItems}
        pathname="/dashboard"
        isOpen={true}
        onOpenChange={mockOnOpenChange}
      />
    );

    const buttons = screen.getAllByTestId('button');

    // Dashboard should be active (secondary variant)
    expect(buttons[1]).toHaveAttribute('data-variant', 'secondary');

    // Other items should be ghost variant
    expect(buttons[2]).toHaveAttribute('data-variant', 'ghost');
    expect(buttons[3]).toHaveAttribute('data-variant', 'ghost');
  });

  it('applies active variant to sub-routes', () => {
    render(
      <SideNav
        items={mockItems}
        pathname="/routines/create"
        isOpen={true}
        onOpenChange={mockOnOpenChange}
      />
    );

    const buttons = screen.getAllByTestId('button');

    // Routines should be active for sub-route
    expect(buttons[2]).toHaveAttribute('data-variant', 'secondary');

    // Other items should be ghost variant
    expect(buttons[1]).toHaveAttribute('data-variant', 'ghost');
    expect(buttons[3]).toHaveAttribute('data-variant', 'ghost');
  });

  it('renders icons and labels correctly', () => {
    render(
      <SideNav
        items={mockItems}
        pathname="/dashboard"
        isOpen={true}
        onOpenChange={mockOnOpenChange}
      />
    );

    // Check that icons are rendered
    expect(screen.getByTestId('icon-dashboard')).toBeInTheDocument();
    expect(screen.getByTestId('icon-routines')).toBeInTheDocument();
    expect(screen.getByTestId('icon-exercises')).toBeInTheDocument();

    // Check that labels are rendered
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Routines')).toBeInTheDocument();
    expect(screen.getByText('Exercises')).toBeInTheDocument();
  });

  it('closes sheet when navigation link is clicked', () => {
    render(
      <SideNav
        items={mockItems}
        pathname="/dashboard"
        isOpen={true}
        onOpenChange={mockOnOpenChange}
      />
    );

    const dashboardLink = screen.getByTestId('link-dashboard');
    fireEvent.click(dashboardLink);

    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
  });

  it('applies correct CSS classes to navigation buttons', () => {
    render(
      <SideNav
        items={mockItems}
        pathname="/dashboard"
        isOpen={true}
        onOpenChange={mockOnOpenChange}
      />
    );

    const navigationButtons = screen.getAllByTestId('button').slice(1); // Skip the trigger button

    navigationButtons.forEach(button => {
      expect(button).toHaveClass(
        'flex',
        'items-center',
        'justify-start',
        'gap-3',
        'w-full'
      );
    });
  });
});
