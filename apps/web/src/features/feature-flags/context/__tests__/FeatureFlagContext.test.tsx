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
        <div data-testid="public-feature-enabled">
          {isEnabled('public-feature') ? 'true' : 'false'}
        </div>
        <div data-testid="user-feature-enabled">
          {isEnabled('user-feature') ? 'true' : 'false'}
        </div>
      </div>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockPublicFlags = [
    { name: 'public-feature', is_enabled: true, rollout_percentage: 100 },
  ];
  const mockUserFlags = [
    { name: 'user-feature', is_enabled: true, rollout_percentage: 100 },
  ];

  it('should load only public flags for unauthenticated users', async () => {
    mockedUseAuth.mockReturnValue({ user: null, isLoading: false });
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ flags: mockPublicFlags }),
    });

    render(
      <FeatureFlagProvider>
        <TestComponent />
      </FeatureFlagProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      expect(mockFetch).toHaveBeenCalledWith('/api/feature-flags/public');
      expect(mockFetch).not.toHaveBeenCalledWith('/api/feature-flags');
      expect(screen.getByTestId('flag-count')).toHaveTextContent('1');
      expect(screen.getByTestId('public-feature-enabled')).toHaveTextContent(
        'true'
      );
      expect(screen.getByTestId('user-feature-enabled')).toHaveTextContent(
        'false'
      );
    });
  });

  it('should load public and user flags for authenticated users', async () => {
    mockedUseAuth.mockReturnValue({
      user: { id: 'test-user' },
      isLoading: false,
    });

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ flags: mockPublicFlags }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ flags: mockUserFlags }),
      });

    render(
      <FeatureFlagProvider>
        <TestComponent />
      </FeatureFlagProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      expect(mockFetch).toHaveBeenCalledWith('/api/feature-flags/public');
      expect(mockFetch).toHaveBeenCalledWith('/api/feature-flags');
      expect(screen.getByTestId('flag-count')).toHaveTextContent('2');
      expect(screen.getByTestId('public-feature-enabled')).toHaveTextContent(
        'true'
      );
      expect(screen.getByTestId('user-feature-enabled')).toHaveTextContent(
        'true'
      );
    });
  });

  it('should handle API errors gracefully', async () => {
    mockedUseAuth.mockReturnValue({ user: null, isLoading: false });
    mockFetch.mockResolvedValue({ ok: false });

    render(
      <FeatureFlagProvider>
        <TestComponent />
      </FeatureFlagProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      expect(screen.getByTestId('flag-count')).toHaveTextContent('0');
    });
  });
});
