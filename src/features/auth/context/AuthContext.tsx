"use client";

import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, ReactNode } from "react";
import useSWR, { mutate } from "swr";

import { createClient } from "@/lib/supabase/client";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email?: string, password?: string) => Promise<void>;
  logout: () => void;
  signUp: (email?: string, password?: string, name?: string) => Promise<void>;
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const supabase = createClient();
  const router = useRouter();

  // Use SWR to manage user state
  const { data: user, error, isLoading, mutate: mutateUser } = useSWR<User>(
    "/api/auth/user",
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      onError: (error) => {
        console.error("Error fetching user:", error);
      },
    }
  );

  const login = async (email?: string, password?: string) => {
    if (!email || !password) return;

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Update SWR cache with new user data
      await mutateUser(data.user);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  const signUp = async (email?: string, password?: string, name?: string) => {
    if (!email || !password || !name) return;

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Sign up failed");
      }

      // Check if user is immediately confirmed (no email confirmation required)
      if (data.user && !data.user.email_confirmed_at) {
        // Email confirmation required
        await mutateUser(undefined);
      } else if (data.user) {
        // User is immediately signed in
        await mutateUser(data.user);
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Logout failed");
      }

      // Clear user from SWR cache
      await mutateUser(undefined);
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        signUp,
        user: user || null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
