"use client";

import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

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
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
      if (event === "SIGNED_IN") {
        router.push("/dashboard");
      } else if (event === "SIGNED_OUT") {
        router.push("/");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  const login = async (email?: string, password?: string) => {
    if (!email || !password) return;
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message || "Login failed");
      }

      // User will be set by the onAuthStateChange listener
      // isLoading will also be set to false by the listener
    } catch (error) {
      console.error("Error logging in:", error);
      setIsLoading(false); // Only set loading to false on error
      throw error;
    }
  };

  const signUp = async (email?: string, password?: string, name?: string) => {
    if (!email || !password || !name) return;
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) {
        throw new Error(error.message || "Sign up failed");
      }

      // User will be set by the onAuthStateChange listener
      // isLoading will also be set to false by the listener
    } catch (error) {
      console.error("Error signing up:", error);
      setIsLoading(false); // Only set loading to false on error
      throw error;
    }
  };

  const logout = async () => {
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw new Error(error.message || "Logout failed");
      }

      // User will be cleared by the onAuthStateChange listener
      // isLoading will also be set to false by the listener
    } catch (error) {
      console.error("Error logging out:", error);
      setIsLoading(false); // Only set loading to false on error
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
        user,
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
