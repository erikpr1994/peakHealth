import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useFeatureFlag } from "../useFeatureFlag";
import { FeatureFlagProvider } from "../../context/FeatureFlagContext";
import { useAuth } from "@/features/auth/context/AuthContext";

// Mock dependencies
vi.mock("@/features/auth/context/AuthContext");
vi.mock("@/lib/supabase/client"); // Prevent real client from being created

const mockedUseAuth = useAuth as Mock;

// Mock the fetch call to our API route
const mockFetch = vi.fn();
global.fetch = mockFetch;

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <FeatureFlagProvider>{children}</FeatureFlagProvider>
);

describe("useFeatureFlag Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseAuth.mockReturnValue({
      user: { id: "test-user-id" },
      isAuthenticated: true,
      isLoading: false,
    });
  });

  const setupHook = (
    apiResponse: { 
      flags: Array<{ name: string; is_enabled: boolean; rollout_percentage: number }>; 
      userTypes: Array<{ typeName: string; displayName: string }>; 
      userGroups: Array<{ groupName: string; displayName: string }> 
    },
    hookArg: string[]
  ) => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(apiResponse),
    });
    return renderHook(() => useFeatureFlag(hookArg), { wrapper });
  };

  it("should return isLoading as true initially, then false", async () => {
    const { result } = setupHook({ flags: [], userTypes: [], userGroups: [] }, [
      "any-feature",
    ]);
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("should return a map of flags with their correct statuses", async () => {
    const { result } = setupHook(
      {
        flags: [
          { name: "feature-a", is_enabled: true, rollout_percentage: 100 },
          { name: "feature-b", is_enabled: false, rollout_percentage: 0 },
        ],
        userTypes: [],
        userGroups: [],
      },
      ["feature-a", "feature-b", "feature-c"]
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.flags).toEqual({
        "feature-a": true,
        "feature-b": false,
        "feature-c": false,
      });
    });
  });

  it("should return an empty map if no flags are requested", async () => {
    const { result } = setupHook(
      {
        flags: [
          { name: "any-feature", is_enabled: true, rollout_percentage: 100 },
        ],
        userTypes: [],
        userGroups: [],
      },
      []
    );

    await waitFor(() => {
      expect(result.current.flags).toEqual({});
    });
  });

  describe("when unauthenticated", () => {
    beforeEach(() => {
      mockedUseAuth.mockReturnValue({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    });

    it("should not fetch flags and return a map of false values", async () => {
      const { result } = renderHook(
        () => useFeatureFlag(["a-feature", "b-feature"]),
        { wrapper }
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
        expect(mockFetch).not.toHaveBeenCalled();
        expect(result.current.flags).toEqual({
          "a-feature": false,
          "b-feature": false,
        });
      });
    });
  });
});
