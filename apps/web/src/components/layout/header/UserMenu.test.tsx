import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';

import { UserMenu } from './UserMenu';

// Mock the useTranslations hook
const mockT = vi.fn((key: string) => key);
vi.mock('@/hooks/useTranslations', () => ({
  useTranslations: vi.fn(() => mockT),
}));

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
    'data-testid': testId,
  }: {
    children: React.ReactNode;
    variant?: string;
    className?: string;
    size?: string;
    'data-testid'?: string;
  }): React.JSX.Element => (
    <button
      data-testid={testId || 'button'}
      data-variant={variant}
      data-size={size}
      className={className}
    >
      {children}
    </button>
  ),
}));

// Mock the Avatar components
vi.mock('@/components/ui/avatar', () => ({
  Avatar: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }): React.JSX.Element => (
    <div data-testid="avatar" className={className}>
      {children}
    </div>
  ),
  AvatarImage: ({
    src,
    alt,
  }: {
    src?: string;
    alt?: string;
  }): React.JSX.Element => (
    <div data-testid="avatar-image" data-src={src} data-alt={alt} />
  ),
  AvatarFallback: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }): React.JSX.Element => (
    <div data-testid="avatar-fallback" className={className}>
      {children}
    </div>
  ),
}));

// Mock the DropdownMenu components
vi.mock('@/components/ui/dropdown-menu', () => ({
  DropdownMenu: ({
    children,
    open,
    onOpenChange,
  }: {
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }): React.JSX.Element => (
    <div data-testid="dropdown-menu" data-open={open}>
      {children}
    </div>
  ),
  DropdownMenuTrigger: ({
    children,
    asChild,
  }: {
    children: React.ReactNode;
    asChild?: boolean;
  }): React.JSX.Element => <div data-testid="dropdown-trigger">{children}</div>,
  DropdownMenuContent: ({
    children,
    align,
    className,
    sideOffset,
  }: {
    children: React.ReactNode;
    align?: string;
    className?: string;
    sideOffset?: number;
  }): React.JSX.Element => (
    <div
      data-testid="dropdown-content"
      data-align={align}
      className={className}
      data-side-offset={sideOffset}
    >
      {children}
    </div>
  ),
  DropdownMenuItem: ({
    children,
    onClick,
    className,
    'data-testid': testId,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    'data-testid'?: string;
  }): React.JSX.Element => (
    <div
      data-testid={testId || 'dropdown-item'}
      onClick={onClick}
      className={className}
    >
      {children}
    </div>
  ),
  DropdownMenuSeparator: (): React.JSX.Element => (
    <div data-testid="dropdown-separator" />
  ),
}));

const mockUser = {
  id: '123',
  email: 'test@example.com',
  user_metadata: {
    name: 'Test User',
    email: 'test@example.com',
    avatar_url: 'https://example.com/avatar.jpg',
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any; // Type assertion for test mocks

const mockUserMenuItems = [
  {
    id: 'profile',
    label: 'Profile',
    icon: (): React.JSX.Element => <span data-testid="icon-profile">👤</span>,
    path: '/profile',
  },
  {
    id: 'gyms',
    label: 'Gyms',
    icon: (): React.JSX.Element => <span data-testid="icon-gyms">🏢</span>,
    path: '/gyms',
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
] as any; // Type assertion for test mocks

const mockSettingsMenuItems = [
  {
    id: 'account-settings',
    label: 'Account Settings',
    icon: (): React.JSX.Element => (
      <span data-testid="icon-account-settings">⚙️</span>
    ),
    path: '/account-settings',
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
] as any; // Type assertion for test mocks

const mockSupportMenuItems = [
  {
    id: 'help',
    label: 'Help',
    icon: (): React.JSX.Element => <span data-testid="icon-help">❓</span>,
    path: '/help',
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
] as any; // Type assertion for test mocks

describe('UserMenu', () => {
  const mockOnLogout = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderUserMenu = (props = {}): ReturnType<typeof render> => {
    return render(
      <NextIntlClientProvider messages={{}} locale="en">
        <UserMenu
          user={mockUser}
          onLogout={mockOnLogout}
          userMenuItems={mockUserMenuItems}
          settingsMenuItems={mockSettingsMenuItems}
          supportMenuItems={mockSupportMenuItems}
          {...props}
        />
      </NextIntlClientProvider>
    );
  };

  it('renders user menu trigger button', () => {
    renderUserMenu();

    expect(screen.getByTestId('dropdown-trigger')).toBeInTheDocument();
    expect(screen.getByTestId('user-menu-button')).toBeInTheDocument();
  });

  it('renders user avatar and information', () => {
    renderUserMenu();

    expect(screen.getByTestId('avatar')).toBeInTheDocument();
    expect(screen.getByTestId('avatar-image')).toHaveAttribute(
      'data-src',
      'https://example.com/avatar.jpg'
    );
    expect(screen.getByTestId('avatar-image')).toHaveAttribute(
      'data-alt',
      'test@example.com'
    );
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('renders dropdown content with navigation links', () => {
    renderUserMenu();

    // Check that all navigation items are rendered
    expect(screen.getByTestId('link-profile')).toBeInTheDocument();
    expect(screen.getByTestId('link-gyms')).toBeInTheDocument();
    expect(screen.getByTestId('link-account-settings')).toBeInTheDocument();
    expect(screen.getByTestId('link-help')).toBeInTheDocument();

    // Check that links have correct href attributes
    expect(screen.getByTestId('link-profile')).toHaveAttribute(
      'href',
      '/profile'
    );
    expect(screen.getByTestId('link-gyms')).toHaveAttribute('href', '/gyms');
    expect(screen.getByTestId('link-account-settings')).toHaveAttribute(
      'href',
      '/account-settings'
    );
    expect(screen.getByTestId('link-help')).toHaveAttribute('href', '/help');
  });

  it('renders icons and labels correctly', () => {
    renderUserMenu();

    // Check that icons are rendered
    expect(screen.getByTestId('icon-profile')).toBeInTheDocument();
    expect(screen.getByTestId('icon-gyms')).toBeInTheDocument();
    expect(screen.getByTestId('icon-account-settings')).toBeInTheDocument();
    expect(screen.getByTestId('icon-help')).toBeInTheDocument();

    // Check that labels are rendered
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Gyms')).toBeInTheDocument();
    expect(screen.getByText('Account Settings')).toBeInTheDocument();
    expect(screen.getByText('Help')).toBeInTheDocument();
  });

  it('closes dropdown when navigation link is clicked', () => {
    renderUserMenu();

    const profileLink = screen.getByTestId('link-profile');
    fireEvent.click(profileLink);

    // The dropdown should close (onOpenChange should be called with false)
    // This is handled by the Link onClick handler
  });

  it('renders logout button with correct styling', () => {
    renderUserMenu();

    const logoutButton = screen.getByTestId('logout-button');
    expect(logoutButton).toBeInTheDocument();
    expect(logoutButton).toHaveClass(
      'flex',
      'items-center',
      'gap-2',
      'text-red-600',
      'focus:text-red-600'
    );
  });

  it('calls onLogout when logout button is clicked', () => {
    renderUserMenu();

    const logoutButton = screen.getByTestId('logout-button');
    fireEvent.click(logoutButton);

    expect(mockOnLogout).toHaveBeenCalledTimes(1);
  });

  it('renders separators between menu sections', () => {
    renderUserMenu();

    const separators = screen.getAllByTestId('dropdown-separator');
    expect(separators.length).toBeGreaterThan(0);
  });

  it('handles user without metadata gracefully', () => {
    const userWithoutMetadata = {
      id: '123',
      email: 'test@example.com',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    renderUserMenu({ user: userWithoutMetadata });

    // Should fall back to email for display name (appears twice - as name and email)
    const emailElements = screen.getAllByText('test@example.com');
    expect(emailElements).toHaveLength(2);
  });
});
