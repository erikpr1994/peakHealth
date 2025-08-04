'use client';

import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
  useCallback,
} from 'react';
import useSWR from 'swr';

import { createClient } from '@/lib/supabase/client';

// Extended user type with our custom properties
export interface ExtendedUser extends User {
  userRoles?: string[];
  userGroups?: string[];
}

export interface AuthContextType {
  isAuthenticated: boolean;
  isAuthOperationLoading: boolean;
  login: (email?: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
  signUp: (email?: string, password?: string, name?: string) => Promise<void>;
  user: ExtendedUser | null;
  // Add convenience properties
  userId: string | null;
  userRoles: string[];
  userGroups: string[];
  // Add utility functions
  hasRole: (role: string) => boolean;
  hasGroup: (group: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
  hasAnyGroup: (groups: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom fetcher for user endpoint that extracts user from response
const userFetcher = async (url: string): Promise<ExtendedUser | null> => {
  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 401) {
      // Not authenticated, return null
      return null;
    }
    const error = new Error('An error occurred while fetching the user.');
    (error as unknown as { info: unknown }).info = await response.json();
    (error as unknown as { status: number }).status = response.status;
    throw error;
  }

  const data = await response.json();
  return data.user || null;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const supabase = createClient();
  const router = useRouter();
  const [isAuthOperationLoading, setIsAuthOperationLoading] = useState(false);

  // Use SWR to manage user state with custom fetcher
  const { data: user, mutate: mutateUser } = useSWR<ExtendedUser | null>(
    '/api/auth/user',
    userFetcher,
    {
      revalidateOnFocus: true,
      shouldRetryOnError: false,
      suspense: true,
      fallbackData: null,
    }
  );

  const handleAuthChange = useCallback(
    async (event: string, session: { user: ExtendedUser } | null) => {
      if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        await mutateUser();
      } else if (event === 'SIGNED_OUT') {
        await mutateUser(null, false);
      }
    },
    [mutateUser]
  );

  // Set up real-time auth state synchronization
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      handleAuthChange(event, session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, handleAuthChange]);

  const getAuthRedirectPath = () => {
    // Default to profile as a safe fallback that doesn't depend on feature flags
    // In a real app, you might want to check feature flags here
    return '/profile';
  };

  const login = async (email?: string, password?: string) => {
    if (!email || !password) return;

    setIsAuthOperationLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Optimistically update the user and redirect
      await mutateUser(data.user, false); // `false` to prevent re-fetching
      router.push(getAuthRedirectPath());
    } finally {
      setIsAuthOperationLoading(false);
    }
  };

  const signUp = async (email?: string, password?: string, name?: string) => {
    if (!email || !password || !name) return;

    setIsAuthOperationLoading(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Sign up failed');
      }

      // Optimistically update the user and redirect
      await mutateUser(data.user, false); // `false` to prevent re-fetching
      router.push(getAuthRedirectPath());
    } finally {
      setIsAuthOperationLoading(false);
    }
  };

  const logout = async () => {
    setIsAuthOperationLoading(true);
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Logout failed');
      }

      // Clear user from SWR cache and redirect immediately
      await mutateUser(null, false);
      router.push('/');
    } finally {
      setIsAuthOperationLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        isAuthOperationLoading,
        login,
        logout,
        signUp,
        user: user || null,
        // Add convenience properties
        userId: user?.id || null,
        userRoles: user?.userRoles || [],
        userGroups: user?.userGroups || [],
        // Add utility functions
        hasRole: role => user?.userRoles?.includes(role) || false,
        hasGroup: group => user?.userGroups?.includes(group) || false,
        hasAnyRole: roles =>
          roles?.some(role => user?.userRoles?.includes(role)) || false,
        hasAnyGroup: groups =>
          groups?.some(group => user?.userGroups?.includes(group)) || false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
