import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, type Mock } from 'vitest';

import Dashboard from './Dashboard';
import { FeatureFlagProvider } from '@/features/feature-flags/context/FeatureFlagContext';

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
vi.mock('@/features/routines/hooks/useRoutines', () => ({
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

// Mock the feature flags hook
vi.mock('@/features/feature-flags/hooks/useFeatureFlag', () => ({
  useFeatureFlag: (): {
    flags: Record<string, boolean>;
    isLoading: boolean;
  } => ({
    flags: {
      trainer_and_clubs_feature: true,
      gyms_feature: true,
    },
    isLoading: false,
  }),
}));

// Mock the feature flags context
vi.mock('@/features/feature-flags/context/FeatureFlagContext', () => ({
  FeatureFlagProvider: ({
    children,
  }: {
    children: React.ReactNode;
  }): React.ReactElement => children as React.ReactElement,
  useFeatureFlags: (): {
    flags: Record<string, boolean>;
    isLoading: boolean;
    error: null;
  } => ({
    flags: {
      trainer_and_clubs_feature: true,
      gyms_feature: true,
      notification_system_feature: true,
      calendar_feature: true,
      performance_feature: true,
      health_feature: true,
      equipment_feature: true,
      suggestions_feature: true,
      account_settings_feature: true,
      app_settings_feature: true,
      help_support_feature: true,
      dashboard_feature: true,
    },
    isLoading: false,
    error: null,
  }),
}));

describe('Dashboard', () => {
  it('renders dashboard component', (): void => {
    render(
      <FeatureFlagProvider>
        <Dashboard />
      </FeatureFlagProvider>
    );

    // Check if the dashboard renders without crashing
    expect(screen.getByText(/good morning/i)).toBeInTheDocument();
  });

  it('shows welcome message for authenticated user', (): void => {
    render(
      <FeatureFlagProvider>
        <Dashboard />
      </FeatureFlagProvider>
    );

    // Check if the welcome message is displayed
    expect(screen.getByText(/good morning/i)).toBeInTheDocument();
  });
});
