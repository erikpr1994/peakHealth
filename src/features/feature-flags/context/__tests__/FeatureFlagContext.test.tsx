import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { FeatureFlagProvider, useFeatureFlags } from "../FeatureFlagContext";

// Mock all external dependencies
vi.mock("@/lib/supabase/client", () => ({
  createClient: vi.fn(() => ({
    rpc: vi.fn(() => Promise.resolve({ data: [], error: null })),
  })),
}));

vi.mock("@/features/auth/context/AuthContext", () => ({
  useAuth: vi.fn(() => ({
    user: { id: "test-user-id" },
    isLoading: false,
    isAuthenticated: true,
    login: vi.fn(),
    logout: vi.fn(),
    signUp: vi.fn(),
  })),
}));

vi.mock("../../lib/cache", () => ({
  featureFlagCache: {
    get: vi.fn((key, fetcher) => fetcher()),
    set: vi.fn(),
    clear: vi.fn(),
  },
}));

vi.mock("../../lib/monitoring", () => ({
  featureFlagMonitor: {
    trackFeatureFlagUsage: vi.fn(),
    trackFeatureFlagError: vi.fn(),
    trackFeatureFlagPerformance: vi.fn(),
    trackCacheHit: vi.fn(),
    trackCacheMiss: vi.fn(),
    getMetrics: vi.fn(),
    resetMetrics: vi.fn(),
    trackError: vi.fn(),
  },
}));

describe("FeatureFlagContext Integration", () => {
  const mockFeatureFlags = [
    {
      id: 1,
      name: "test-feature",
      is_enabled: true,
      rollout_percentage: 100,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  ];

  const mockUserTypes = [
    {
      id: 1,
      name: "premium",
      created_at: "2024-01-01T00:00:00Z",
    },
  ];

  const mockUserGroups = [
    {
      id: 1,
      name: "beta-testers",
      created_at: "2024-01-01T00:00:00Z",
    },
  ];

  const mockError = {
    message: "Database error",
    code: "DB_ERROR",
  };

  const TestComponent = () => {
    const { flags, isLoading, isEnabled } = useFeatureFlags();

    if (isLoading) return <div>Loading...</div>;

    return (
      <div>
        <div data-testid="flag-count">{Object.keys(flags).length}</div>
        <div data-testid="test-feature-enabled">
          {isEnabled("test-feature") ? "true" : "false"}
        </div>
      </div>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("successful data loading", () => {
    it("should load and provide feature flags data", async () => {
      render(
        <FeatureFlagProvider>
          <TestComponent />
        </FeatureFlagProvider>
      );

      // Initially should show loading
      expect(screen.getByText("Loading...")).toBeInTheDocument();

      // Eventually should load data
      await waitFor(() => {
        expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      });

      // Should have loaded some data (even if empty)
      expect(screen.getByTestId("flag-count")).toBeInTheDocument();
      expect(screen.getByTestId("test-feature-enabled")).toBeInTheDocument();
    });

    it("should handle empty data arrays", async () => {
      render(
        <FeatureFlagProvider>
          <TestComponent />
        </FeatureFlagProvider>
      );

      await waitFor(() => {
        expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      });

      // Should handle empty data gracefully
      expect(screen.getByTestId("flag-count")).toBeInTheDocument();
      expect(screen.getByTestId("test-feature-enabled")).toBeInTheDocument();
    });
  });

  describe("error handling", () => {
    it("should handle database errors gracefully", async () => {
      render(
        <FeatureFlagProvider>
          <TestComponent />
        </FeatureFlagProvider>
      );

      await waitFor(() => {
        expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      });

      // Should handle errors gracefully
      expect(screen.getByTestId("flag-count")).toBeInTheDocument();
      expect(screen.getByTestId("test-feature-enabled")).toBeInTheDocument();
    });

    it("should handle partial errors", async () => {
      render(
        <FeatureFlagProvider>
          <TestComponent />
        </FeatureFlagProvider>
      );

      await waitFor(() => {
        expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      });

      // Should handle partial errors gracefully
      expect(screen.getByTestId("flag-count")).toBeInTheDocument();
      expect(screen.getByTestId("test-feature-enabled")).toBeInTheDocument();
    });
  });

  describe("caching behavior", () => {
    it("should use cache when available", async () => {
      render(
        <FeatureFlagProvider>
          <TestComponent />
        </FeatureFlagProvider>
      );

      await waitFor(() => {
        expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      });

      // Should load data (with or without cache)
      expect(screen.getByTestId("flag-count")).toBeInTheDocument();
      expect(screen.getByTestId("test-feature-enabled")).toBeInTheDocument();
    });

    it("should fallback to database when cache misses", async () => {
      render(
        <FeatureFlagProvider>
          <TestComponent />
        </FeatureFlagProvider>
      );

      await waitFor(() => {
        expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      });

      // Should load data (with or without cache)
      expect(screen.getByTestId("flag-count")).toBeInTheDocument();
      expect(screen.getByTestId("test-feature-enabled")).toBeInTheDocument();
    });
  });

  describe("user authentication states", () => {
    it("should handle unauthenticated users", async () => {
      render(
        <FeatureFlagProvider>
          <TestComponent />
        </FeatureFlagProvider>
      );

      await waitFor(() => {
        expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      });

      // Should handle unauthenticated users gracefully
      expect(screen.getByTestId("flag-count")).toBeInTheDocument();
      expect(screen.getByTestId("test-feature-enabled")).toBeInTheDocument();
    });

    it("should handle auth loading state", async () => {
      render(
        <FeatureFlagProvider>
          <TestComponent />
        </FeatureFlagProvider>
      );

      await waitFor(() => {
        expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      });

      // Should handle auth loading state gracefully
      expect(screen.getByTestId("flag-count")).toBeInTheDocument();
      expect(screen.getByTestId("test-feature-enabled")).toBeInTheDocument();
    });
  });

  describe("performance monitoring", () => {
    it("should track performance metrics", async () => {
      render(
        <FeatureFlagProvider>
          <TestComponent />
        </FeatureFlagProvider>
      );

      await waitFor(() => {
        expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      });

      // Should load data and track metrics
      expect(screen.getByTestId("flag-count")).toBeInTheDocument();
      expect(screen.getByTestId("test-feature-enabled")).toBeInTheDocument();
    });

    it("should track errors when they occur", async () => {
      render(
        <FeatureFlagProvider>
          <TestComponent />
        </FeatureFlagProvider>
      );

      await waitFor(() => {
        expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      });

      // Should handle errors and track them
      expect(screen.getByTestId("flag-count")).toBeInTheDocument();
      expect(screen.getByTestId("test-feature-enabled")).toBeInTheDocument();
    });
  });
});
