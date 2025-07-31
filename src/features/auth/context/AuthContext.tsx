"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

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
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("Error logging in:", error);
      throw error;
    }
    setIsLoading(false);
  };

  const signUp = async (email?: string, password?: string, name?: string) => {
    if (!email || !password || !name) return;
    setIsLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: name,
        },
      },
    });
    if (error) {
      console.error("Error signing up:", error);
      throw error;
    }

    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setIsLoading(false);
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
