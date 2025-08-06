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
export type ExtendedUser = User;

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
  // Add mutate function for refreshing user data
  mutateUser: () => Promise<ExtendedUser | null | undefined>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Separate cleanup function to handle USER_NOT_FOUND scenario
const handleUserNotFoundCleanup = async (): Promise<void> => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    // Clear Supabase session properly
    const supabase = createClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
  } catch (error) {
    // Log error but continue with cleanup even if signOut fails
    console.error('Error during signOut cleanup:', error);
  }

  try {
    // Clear any stored auth data
    localStorage.removeItem('supabase.auth.token');
    sessionStorage.removeItem('supabase.auth.token');
  } catch (error) {
    // Log error but continue with redirect
    console.error('Error clearing storage:', error);
  }

  // Redirect to login page
  window.location.href = '/login';
};

// Pure fetcher function - throws errors for proper SWR error handling
const userFetcher = async (url: string): Promise<ExtendedUser | null> => {
  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json();

    // Create error with response data for proper handling
    const error = new Error('An error occurred while fetching the user.');
    (error as unknown as { info: unknown }).info = errorData;
    (error as unknown as { status: number }).status = response.status;

    // Always throw errors so SWR onError can handle them properly
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
      onError: async error => {
        // Handle all 401 errors to prevent stale user data
        if (error?.status === 401) {
          try {
            const errorData = error.info as {
              code?: string;
              shouldRedirect?: boolean;
            };

            // For USER_NOT_FOUND, do full cleanup with redirect
            if (
              errorData.code === 'USER_NOT_FOUND' &&
              errorData.shouldRedirect
            ) {
              await handleUserNotFoundCleanup();
            } else {
              // For other 401s (expired tokens, etc.), clear user state
              // but don't redirect to avoid aggressive behavior
              await mutateUser(null, false);

              // Clear auth tokens for expired sessions
              try {
                const supabase = createClient();
                if (supabase) {
                  await supabase.auth.signOut();
                }
              } catch (signOutError) {
                console.error(
                  'Error signing out expired session:',
                  signOutError
                );
              }
            }
          } catch (cleanupError) {
            console.error('Error during cleanup:', cleanupError);
          }
        }
      },
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
    if (!supabase) {
      return;
    }

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
        body: JSON.stringify({
          email,
          password,
          user_metadata: { name },
        }),
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
        userRoles: user?.app_metadata?.roles || ['basic'],
        userGroups: user?.app_metadata?.groups || ['free'],
        // Add utility functions
        hasRole: role => user?.app_metadata?.roles?.includes(role) || false,
        hasGroup: group => user?.app_metadata?.groups?.includes(group) || false,
        hasAnyRole: roles =>
          roles?.some(role => user?.app_metadata?.roles?.includes(role)) ||
          false,
        hasAnyGroup: groups =>
          groups?.some(group => user?.app_metadata?.groups?.includes(group)) ||
          false,
        // Add mutate function for refreshing user data
        mutateUser,
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
