import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useFeatureFlag } from "../hooks/useFeatureFlag";
import { FeatureFlagProvider } from "../context/FeatureFlagContext";
import { AuthProvider, useAuth } from "@/features/auth/context/AuthContext";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";
import React from "react";

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    <FeatureFlagProvider>{children}</FeatureFlagProvider>
  </AuthProvider>
);

// A helper hook to wait for auth to be ready
const useWaitForAuth = () => {
  const { isLoading } = useAuth();
  return { isAuthLoading: isLoading };
};

describe("Supabase Feature Flag Integration", () => {
  let testUser: any;

  beforeAll(async () => {
    const { data, error } = await supabase.auth.signUp({
      email: `test-user-${Date.now()}@example.com`,
      password: "password123",
    });
    if (error) throw error;
    testUser = data.user;
  });

  afterAll(async () => {
    if (testUser) {
      const { error } = await supabase.auth.admin.deleteUser(testUser.id);
      if (error) {
        console.error("Error cleaning up test user:", error);
      }
    }
  });

  it("should fetch feature flags from Supabase and report a disabled flag correctly", async () => {
    const { result: authResult } = renderHook(() => useWaitForAuth(), {
      wrapper: TestWrapper,
    });

    // Wait for the AuthProvider to finish loading
    await waitFor(() => {
      expect(authResult.current.isAuthLoading).toBe(false);
    });

    const { result } = renderHook(
      () => useFeatureFlag(["NOTIFICATION_SYSTEM_FEATURE"]),
      {
        wrapper: TestWrapper,
      }
    );

    // Now, check the feature flag loading state
    expect(result.current.isLoading).toBe(true);

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 5000 }
    );

    expect(result.current.flags["NOTIFICATION_SYSTEM_FEATURE"]).toBe(false);
  });
});
