import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, type Mock } from 'vitest';

import Dashboard from './Dashboard';

// Mock the auth context
vi.mock('@/features/auth/context/AuthContext', () => ({
  useAuth: (): {
    isAuthenticated: boolean;
    user: {
      id: string;
      email: string;
      userTypes: string[];
      primaryUserType: string;
      subscriptionTier: string;
      permissions: Record<string, unknown>;
      features: string[];
      dataAccessRules: Record<string, unknown>;
    };
  } => ({
    isAuthenticated: true,
    user: {
      id: 'test-user-id',
      email: 'test@example.com',
      userTypes: ['regular'],
      primaryUserType: 'regular',
      subscriptionTier: 'free',
      permissions: {},
      features: [],
      dataAccessRules: {},
    },
  }),
}));

// Mock the router
vi.mock('next/navigation', () => ({
  useRouter: (): { push: Mock } => ({
    push: vi.fn(),
  }),
  usePathname: (): string => '/dashboard',
}));

// Mock the routines hook
vi.mock('@/features/routines-old/hooks/useRoutines', () => ({
  useRoutines: (): {
    routines: unknown[];
    isLoading: boolean;
    error: null;
    createRoutine: Mock;
    updateRoutine: Mock;
    deleteRoutine: Mock;
  } => ({
    routines: [],
    isLoading: false,
    error: null,
    createRoutine: vi.fn(),
    updateRoutine: vi.fn(),
    deleteRoutine: vi.fn(),
  }),
}));

describe('Dashboard', () => {
  it('renders dashboard component', (): void => {
    render(<Dashboard />);

    // Check if the dashboard renders without crashing
    expect(screen.getByText(/good morning/i)).toBeInTheDocument();
  });

  it('shows welcome message for authenticated user', (): void => {
    render(<Dashboard />);

    // Check if the welcome message is displayed
    expect(screen.getByText(/good morning/i)).toBeInTheDocument();
  });
});
