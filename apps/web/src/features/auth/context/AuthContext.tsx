'use client';

import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import React, {
  createContext,
  useContext,
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

  // New properties from JWT claims
  userTypes: string[];
  primaryUserType: string;
  subscriptionTier: string;
  permissions: Record<string, boolean>;
  features: string[];
  dataAccessRules: Record<string, string>;

  // New utility functions
  hasPermission: (permission: string) => boolean;
  hasFeature: (feature: string) => boolean;
  hasUserType: (userType: string) => boolean;
  hasAnyUserType: (userTypes: string[]) => boolean;
  hasSubscriptionTier: (tier: string) => boolean;
  canAccessData: (dataType: string, accessLevel: string) => boolean;
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
  } catch {
    // swallow error
  }

  try {
    // Clear any stored auth data
    localStorage.removeItem('supabase.auth.token');
    sessionStorage.removeItem('supabase.auth.token');
  } catch (error) {
    // Log error but continue with redirect
    console.error('Error clearing storage:', error);
  }

  // Redirect to external landing app
  const landingUrl =
    process.env.NEXT_PUBLIC_WEB_APP_URL || 'http://http://localhost:3024';
  window.location.href = landingUrl;
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

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  const supabase = createClient();
  const router = useRouter();
  const [isAuthOperationLoading, setIsAuthOperationLoading] = useState(false);

  // Use SWR for user data fetching with proper error handling
  const { data: user, mutate: mutateUser } = useSWR<ExtendedUser | null>(
    '/api/auth/user',
    userFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      errorRetryCount: 3,
      onError: (error: unknown) => {
        if (error instanceof Error) {
          // Handle USER_NOT_FOUND specifically
          if (
            'info' in error &&
            (error.info as { code?: string })?.code === 'USER_NOT_FOUND'
          ) {
            handleUserNotFoundCleanup();
          }
        }
      },
    }
  );

  // Handle auth state changes
  useEffect(() => {
    if (!supabase) return;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // Revalidate user data when signed in
        await mutateUser();
        router.push('/dashboard');
      } else if (event === 'SIGNED_OUT') {
        // Clear user data when signed out
        await mutateUser(null);
        const landingUrl =
          process.env.NEXT_PUBLIC_WEB_APP_URL || 'http://http://localhost:3024';
        // Use full redirect to landing app
        if (typeof window !== 'undefined') {
          window.location.href = landingUrl;
        } else {
          router.push(landingUrl);
        }
      }
    });

    return (): void => subscription.unsubscribe();
  }, [mutateUser, router, supabase]);

  const login = async (email?: string, password?: string): Promise<void> => {
    // Input validation
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    setIsAuthOperationLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }

      // Revalidate user data after successful login
      await mutateUser();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsAuthOperationLoading(false);
    }
  };

  const signUp = async (
    email?: string,
    password?: string,
    name?: string
  ): Promise<void> => {
    // Input validation
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    setIsAuthOperationLoading(true);
    try {
      // Generate a fallback name that handles malformed emails
      const generateFallbackName = (email: string): string => {
        const nameFromEmail = email.split('@')[0];
        // If email starts with '@' or produces empty string, use a default name
        if (!nameFromEmail || nameFromEmail === '') {
          return 'User';
        }
        return nameFromEmail;
      };

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          user_metadata: {
            name: name || generateFallbackName(email),
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Signup failed');
      }

      // Get the new user data from the response and pass it to mutateUser
      const responseData = await response.json();
      await mutateUser(responseData.user);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsAuthOperationLoading(false);
    }
  };

  const logout = useCallback(async () => {
    if (!supabase) return;

    setIsAuthOperationLoading(true);
    try {
      // Sign out from Supabase client-side
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }

      // Call API to clear auth cookies (including chunked cookies)
      try {
        await fetch('/api/auth/logout', { method: 'POST' });
      } catch {
        // swallow API errors and continue client-side cleanup
      }

      // Clear any app-local storage
      try {
        if (typeof window !== 'undefined') {
          // Remove known keys first
          localStorage.removeItem('supabase.auth.token');
          sessionStorage.removeItem('supabase.auth.token');
          localStorage.removeItem('peak-health-notifications');
          localStorage.removeItem('peak-health-onboarding-complete');
          localStorage.removeItem('peak-health-onboarding-data');
          // Best-effort full clear to catch stragglers
          localStorage.clear();
          sessionStorage.clear();
        }
      } catch {
        // ignore storage clearing errors
      }

      // Ensure user state is reset
      await mutateUser(null);

      // Redirect to external landing app
      const landingUrl =
        process.env.NEXT_PUBLIC_WEB_APP_URL || 'http://http://localhost:3024';
      if (typeof window !== 'undefined') {
        window.location.href = landingUrl;
      }
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setIsAuthOperationLoading(false);
    }
  }, [mutateUser, supabase]);

  // Extract claims from JWT
  const userTypes = user?.app_metadata?.user_types || ['regular'];
  const primaryUserType = user?.app_metadata?.primary_user_type || 'regular';
  const subscriptionTier = user?.app_metadata?.subscription_tier || 'free';
  const userGroups = user?.app_metadata?.groups || [];
  const permissions = user?.app_metadata?.permissions || {};
  const features = user?.app_metadata?.features || [];
  const dataAccessRules = user?.app_metadata?.data_access_rules || {};

  // Legacy support (for backward compatibility during transition)
  const userRoles = user?.app_metadata?.roles || [primaryUserType];

  const hasPermission = (permission: string): boolean =>
    permissions[permission] === true;

  const hasFeature = (feature: string): boolean => features.includes(feature);

  const hasUserType = (userType: string): boolean =>
    userTypes.includes(userType);

  const hasAnyUserType = (typesToCheck: string[]): boolean =>
    typesToCheck.some(type => userTypes.includes(type));

  const hasSubscriptionTier = (tier: string): boolean =>
    subscriptionTier === tier;

  const hasGroup = (group: string): boolean => userGroups.includes(group);

  const hasAnyGroup = (groups: string[]): boolean =>
    groups.some(group => userGroups.includes(group));

  const canAccessData = (dataType: string, accessLevel: string): boolean => {
    const rule = dataAccessRules[dataType];
    if (!rule) return false;

    const accessLevels = {
      none: 0,
      read_only: 1,
      training_only: 2,
      medical_training: 3,
      full: 4,
    };

    return (
      (accessLevels[rule as keyof typeof accessLevels] || 0) >=
      (accessLevels[accessLevel as keyof typeof accessLevels] || 0)
    );
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
        userRoles,
        userGroups,
        // Add utility functions
        hasRole: role => user?.app_metadata?.roles?.includes(role) || false,
        hasGroup,
        hasAnyRole: roles =>
          roles?.some(role => user?.app_metadata?.roles?.includes(role)) ||
          false,
        hasAnyGroup,
        // Add mutate function for refreshing user data
        mutateUser,

        // New properties from JWT claims
        userTypes,
        primaryUserType,
        subscriptionTier,
        permissions,
        features,
        dataAccessRules,

        // New utility functions
        hasPermission,
        hasFeature,
        hasUserType,
        hasAnyUserType,
        hasSubscriptionTier,
        canAccessData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
