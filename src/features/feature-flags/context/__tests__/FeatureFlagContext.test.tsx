import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, Mock, vi } from 'vitest';

import { FeatureFlagProvider, useFeatureFlags } from '../FeatureFlagContext';

import { useAuth } from '@/features/auth/context/AuthContext';

// Mock all external dependencies
vi.mock('@/lib/supabase/client');
vi.mock('@/features/auth/context/AuthContext');

const mockedUseAuth = useAuth as Mock;

// Mock the fetch call
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('FeatureFlagContext', () => {
  const TestComponent = () => {
    const { flags, isLoading, isEnabled } = useFeatureFlags();

    if (isLoading) return <div>Loading...</div>;

    return (
      <div>
        <div data-testid="flag-count">{Object.keys(flags).length}</div>
        <div data-testid="test-feature-enabled">
          {isEnabled('test-feature') ? 'true' : 'false'}
        </div>
      </div>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseAuth.mockReturnValue({
      user: { id: 'test-user-id' },
      isAuthenticated: true,
      isLoading: false,
      isAuthOperationLoading: false,
    });
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ flags: [], userTypes: [], userGroups: [] }),
    });
  });

  it('should load and provide feature flags data', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          flags: [
            { name: 'test-feature', is_enabled: true, rollout_percentage: 100 },
          ],
          userTypes: [],
          userGroups: [],
        }),
    });

    render(
      <FeatureFlagProvider>
        <TestComponent />
      </FeatureFlagProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      expect(screen.getByTestId('flag-count')).toHaveTextContent('1');
      expect(screen.getByTestId('test-feature-enabled')).toHaveTextContent(
        'true'
      );
    });
  });

  it('should handle API errors gracefully', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
    });

    render(
      <FeatureFlagProvider>
        <TestComponent />
      </FeatureFlagProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      // Should default to no flags on error
      expect(screen.getByTestId('flag-count')).toHaveTextContent('0');
    });
  });

  it('should fetch public flags for unauthenticated users', async () => {
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
        <TestComponent />
      </FeatureFlagProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    // Should call public feature flags endpoint
    expect(mockFetch).toHaveBeenCalledWith('/api/feature-flags/public');
    expect(screen.getByTestId('flag-count')).toHaveTextContent('0');
  });
});
