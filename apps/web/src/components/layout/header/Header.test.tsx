import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import type { User } from '@supabase/supabase-js';

import Header from './Header';

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/dashboard'),
}));

// Mock the auth context
vi.mock('@/features/auth/context/AuthContext', () => ({
  useAuth: vi.fn(() => ({
    logout: vi.fn(),
    user: null,
  })),
}));

// Mock the notifications feature
vi.mock('@/features/notifications', () => ({
  useNotifications: vi.fn(() => ({
    unreadCount: 0,
  })),
  NotificationsBell: ({
    unreadCount,
  }: {
    unreadCount: number;
  }): React.JSX.Element => (
    <div data-testid="notifications-bell" data-count={unreadCount}>
      Notifications Bell
    </div>
  ),
}));

// Mock the useMenuItems hooks
vi.mock('@/hooks/useMenuItems', () => ({
  useNavigationItems: vi.fn(() => [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: vi.fn(() => <div data-testid="dashboard-icon">Dashboard Icon</div>),
      path: '/dashboard',
    },
  ]),
  useUserMenuItems: vi.fn(() => [
    {
      id: 'profile',
      label: 'Profile',
      icon: vi.fn(() => <div data-testid="profile-icon">Profile Icon</div>),
      path: '/profile',
    },
  ]),
  useSettingsMenuItems: vi.fn(() => [
    {
      id: 'settings',
      label: 'Settings',
      icon: vi.fn(() => <div data-testid="settings-icon">Settings Icon</div>),
      path: '/settings',
    },
  ]),
  useSupportMenuItems: vi.fn(() => [
    {
      id: 'help',
      label: 'Help',
      icon: vi.fn(() => <div data-testid="help-icon">Help Icon</div>),
      path: '/help',
    },
  ]),
}));

// Mock the Header sub-components
vi.mock('./DesktopNavigation', () => ({
  DesktopNavigation: ({
    items,
    pathname,
  }: {
    items: Array<{
      id: string;
      label: string;
      icon: React.ComponentType<{ className?: string }>;
      path: string;
    }>;
    pathname: string;
  }): React.JSX.Element => (
    <div data-testid="desktop-navigation" data-pathname={pathname}>
      Desktop Navigation
    </div>
  ),
}));

vi.mock('./SideNav', () => ({
  SideNav: ({
    items,
    pathname,
    isOpen,
    onOpenChange,
  }: {
    items: Array<{
      id: string;
      label: string;
      icon: React.ComponentType<{ className?: string }>;
      path: string;
    }>;
    pathname: string;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
  }): React.JSX.Element => (
    <div data-testid="side-nav" data-open={isOpen} data-pathname={pathname}>
      Side Navigation
    </div>
  ),
}));

vi.mock('./UserMenuSkeleton', () => ({
  default: (): React.JSX.Element => (
    <div data-testid="user-menu-skeleton">User Menu Skeleton</div>
  ),
}));

// Mock the UserMenu component
vi.mock('./UserMenu', () => ({
  UserMenu: ({
    user,
    onLogout,
    userMenuItems,
    settingsMenuItems,
    supportMenuItems,
  }: {
    user: User | null;
    onLogout: () => void;
    userMenuItems: Array<{
      id: string;
      label: string;
      icon: React.ComponentType<{ className?: string }>;
      path: string;
    }>;
    settingsMenuItems: Array<{
      id: string;
      label: string;
      icon: React.ComponentType<{ className?: string }>;
      path: string;
    }>;
    supportMenuItems: Array<{
      id: string;
      label: string;
      icon: React.ComponentType<{ className?: string }>;
      path: string;
    }>;
  }): React.JSX.Element => (
    <div data-testid="user-menu" data-user={user?.email || 'no-user'}>
      User Menu
    </div>
  ),
}));

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
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
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
  }): React.JSX.Element => (
    <div data-testid="dropdown-trigger" data-as-child={asChild}>
      {children}
    </div>
  ),
  DropdownMenuContent: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }): React.JSX.Element => (
    <div data-testid="dropdown-content" className={className}>
      {children}
    </div>
  ),
  DropdownMenuItem: ({
    children,
    className,
    onClick,
  }: {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
  }): React.JSX.Element => (
    <div data-testid="dropdown-item" className={className} onClick={onClick}>
      {children}
    </div>
  ),
  DropdownMenuSeparator: ({
    className,
  }: {
    className?: string;
  }): React.JSX.Element => (
    <hr data-testid="dropdown-separator" className={className} />
  ),
}));

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render header with all components', (): void => {
    render(<Header />);

    expect(screen.getByTestId('side-nav')).toBeInTheDocument();
    expect(screen.getByTestId('desktop-navigation')).toBeInTheDocument();
    expect(screen.getByTestId('user-menu')).toBeInTheDocument();
  });

  it('should render header with Peak Health title', (): void => {
    render(<Header />);

    expect(screen.getByText('Peak Health')).toBeInTheDocument();
  });

  it('should render side navigation with correct props', (): void => {
    render(<Header />);

    const sideNav = screen.getByTestId('side-nav');
    expect(sideNav).toHaveAttribute('data-pathname', '/dashboard');
    expect(sideNav).toHaveAttribute('data-open', 'false');
  });

  it('should render desktop navigation with correct props', (): void => {
    render(<Header />);

    const desktopNav = screen.getByTestId('desktop-navigation');
    expect(desktopNav).toHaveAttribute('data-pathname', '/dashboard');
  });
});
