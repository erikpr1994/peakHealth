import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useFeatureFlag } from "../useFeatureFlag";
import { FeatureFlagProvider } from "../../context/FeatureFlagContext";
import { useAuth } from "@/features/auth/context/AuthContext";

// Mock dependencies
const mockRpc = vi.fn();
vi.mock("@/lib/supabase/client", () => ({
  createClient: vi.fn(() => ({
    rpc: mockRpc,
  })),
}));

vi.mock("@/features/auth/context/AuthContext");

vi.mock("../../lib/cache", () => ({
  featureFlagCache: {
    get: vi.fn((_, fetcher) => fetcher()),
    set: vi.fn(),
    clear: vi.fn(),
    invalidateUser: vi.fn(),
  },
}));

vi.mock("../../lib/monitoring");

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <FeatureFlagProvider>{children}</FeatureFlagProvider>
);

describe("useFeatureFlag Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as vi.Mock).mockReturnValue({
      user: { id: "test-user-id" },
      isAuthenticated: true,
      isLoading: false,
    });
  });

  const setupHook = (
    flags: { name: string; is_enabled: boolean; rollout_percentage: number }[],
    hookArg: string[]
  ) => {
    mockRpc.mockResolvedValue({ data: flags, error: null });
    return renderHook(() => useFeatureFlag(hookArg), { wrapper });
  };

  it("should return isLoading as true initially, then false", async () => {
    const { result } = setupHook([], ["any-feature"]);
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("should return a map of flags with their correct statuses", async () => {
    const { result } = setupHook(
      [
        { name: "feature-a", is_enabled: true, rollout_percentage: 100 },
        { name: "feature-b", is_enabled: false, rollout_percentage: 0 },
      ],
      ["feature-a", "feature-b", "feature-c"]
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.flags).toEqual({
        "feature-a": true,
        "feature-b": false,
        "feature-c": false, // Not returned from RPC, so it's false
      });
    });
  });

  it("should return an empty map if no flags are requested", async () => {
    const { result } = setupHook(
      [{ name: "any-feature", is_enabled: true, rollout_percentage: 100 }],
      []
    );

    await waitFor(() => {
      expect(result.current.flags).toEqual({});
    });
  });

  describe("when unauthenticated", () => {
    beforeEach(() => {
      (useAuth as vi.Mock).mockReturnValue({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    });

    it("should not fetch flags and return a map of false values", async () => {
      const { result } = setupHook([], ["a-feature", "b-feature"]);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
        expect(mockRpc).not.toHaveBeenCalled();
        expect(result.current.flags).toEqual({
          "a-feature": false,
          "b-feature": false,
        });
      });
    });
  });
});
