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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
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
      onError: (error: any) => {
        // Handle USER_NOT_FOUND specifically
        if (error?.info?.code === 'USER_NOT_FOUND') {
          handleUserNotFoundCleanup();
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
        router.push('/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [mutateUser, router, supabase]);

  const login = async (email?: string, password?: string) => {
    if (!supabase) return;

    setIsAuthOperationLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email || '',
        password: password || '',
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsAuthOperationLoading(false);
    }
  };

  const signUp = async (email?: string, password?: string, name?: string) => {
    if (!supabase) return;

    setIsAuthOperationLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: email || '',
        password: password || '',
        options: {
          data: {
            name: name || email?.split('@')[0] || '',
          },
        },
      });

      if (error) {
        throw error;
      }
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
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setIsAuthOperationLoading(false);
    }
  }, [supabase]);

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

  const hasPermission = (permission: string) =>
    permissions[permission] === true;

  const hasFeature = (feature: string) => features.includes(feature);

  const hasUserType = (userType: string) => userTypes.includes(userType);

  const hasAnyUserType = (typesToCheck: string[]) =>
    typesToCheck.some(type => userTypes.includes(type));

  const hasSubscriptionTier = (tier: string) => subscriptionTier === tier;

  const hasGroup = (group: string) => userGroups.includes(group);

  const hasAnyGroup = (groups: string[]) =>
    groups.some(group => userGroups.includes(group));

  const canAccessData = (dataType: string, accessLevel: string) => {
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
