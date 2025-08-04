import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';

import { FeatureFlagProvider } from '../context/FeatureFlagContext';
import { useFeatureFlag } from '../hooks/useFeatureFlag';

import { useAuth } from '@/features/auth/context/AuthContext';

// Mock external dependencies
vi.mock('@/features/auth/context/AuthContext');
vi.mock('@/lib/supabase/client'); // Prevent real client from being created

const mockedUseAuth = useAuth as Mock;

// Mock the fetch call to our API route
const mockFetch = vi.fn();
global.fetch = mockFetch;

const TestComponent = ({ featureNames }: { featureNames: string[] }) => {
  const { flags, isLoading } = useFeatureFlag(featureNames);

  if (isLoading) {
    return <div>Loading flags...</div>;
  }

  return (
    <div>
      {Object.entries(flags).map(([name, isEnabled]) => (
        <div key={name}>
          <span>{name}:</span>
          {isEnabled ? (
            <span data-testid={`${name}-enabled`}>Enabled</span>
          ) : (
            <span data-testid={`${name}-disabled`}>Disabled</span>
          )}
        </div>
      ))}
    </div>
  );
};

const renderWithFlags = (
  ui: React.ReactElement,
  apiResponse: {
    flags: Array<{
      name: string;
      is_enabled: boolean;
      rollout_percentage: number;
    }>;
    userTypes: Array<{ typeName: string; displayName: string }>;
    userGroups: Array<{ groupName: string; displayName: string }>;
  }
) => {
  mockFetch.mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(apiResponse),
  });
  return render(<FeatureFlagProvider>{ui}</FeatureFlagProvider>);
};

describe('Feature Flag System Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseAuth.mockReturnValue({
      user: { id: 'test-user-id' },
      isAuthenticated: true,
      isLoading: false,
      isAuthOperationLoading: false,
    });
  });

  it('should render correctly based on feature flag states', async () => {
    renderWithFlags(
      <TestComponent featureNames={['feature-a', 'feature-b', 'feature-c']} />,
      {
        flags: [
          { name: 'feature-a', is_enabled: true, rollout_percentage: 100 },
          { name: 'feature-b', is_enabled: false, rollout_percentage: 0 },
        ],
        userTypes: [],
        userGroups: [],
      }
    );

    await waitFor(() => {
      expect(screen.getByTestId('feature-a-enabled')).toBeInTheDocument();
      expect(screen.getByTestId('feature-b-disabled')).toBeInTheDocument();
      expect(screen.getByTestId('feature-c-disabled')).toBeInTheDocument();
    });
  });

  it('should show a loading state initially', async () => {
    mockFetch.mockReturnValue(new Promise(() => {})); // Never resolves
    render(
      <FeatureFlagProvider>
        <TestComponent featureNames={['any-feature']} />
      </FeatureFlagProvider>
    );
    expect(await screen.findByText('Loading flags...')).toBeInTheDocument();
  });

  it('should return all flags as disabled for an unauthenticated user', async () => {
    mockedUseAuth.mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isAuthOperationLoading: false,
    });

    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ flags: [] }),
    });

    render(
      <FeatureFlagProvider>
        <TestComponent featureNames={['feature-a', 'feature-b']} />
      </FeatureFlagProvider>
    );

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/feature-flags/public');
      expect(screen.getByTestId('feature-a-disabled')).toBeInTheDocument();
      expect(screen.getByTestId('feature-b-disabled')).toBeInTheDocument();
    });
  });

  it('should filter flags based on user roles and groups', async () => {
    // Mock a user with premium role and beta_testers group
    mockedUseAuth.mockReturnValue({
      user: {
        id: 'test-user-id',
        userRoles: ['premium'],
        userGroups: ['beta_testers'],
      },
      isAuthenticated: true,
      isLoading: false,
      isAuthOperationLoading: false,
    });

    // Mock the API response to simulate role/group filtering
    mockFetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          flags: [
            {
              name: 'notification_system_feature',
              is_enabled: true,
              rollout_percentage: 100,
            },
            {
              name: 'premium_feature',
              is_enabled: true,
              rollout_percentage: 100,
            },
          ],
        }),
    });

    render(
      <FeatureFlagProvider>
        <TestComponent
          featureNames={[
            'notification_system_feature',
            'premium_feature',
            'basic_feature',
          ]}
        />
      </FeatureFlagProvider>
    );

    await waitFor(() => {
      // Should only show flags that match user's roles/groups
      expect(
        screen.getByTestId('notification_system_feature-enabled')
      ).toBeInTheDocument();
      expect(screen.getByTestId('premium_feature-enabled')).toBeInTheDocument();
      expect(screen.getByTestId('basic_feature-disabled')).toBeInTheDocument();
    });
  });
});
