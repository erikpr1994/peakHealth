'use client';

import React, {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useCallback,
} from 'react';
import useSWR from 'swr';

import { AuthService } from '../services/authService';
import { AuthUser, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom fetcher for user endpoint that extracts user from response
const createUserFetcher =
  (baseUrl: string) =>
  async (url: string): Promise<AuthUser | null> => {
    const response = await fetch(`${baseUrl}${url}`);

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

interface AuthProviderProps {
  children: ReactNode;
  baseUrl?: string;
  redirectPath?: string;
  onAuthChange?: (user: AuthUser | null) => void;
}

export const AuthProvider = ({
  children,
  baseUrl = '',
  redirectPath = '/profile',
  onAuthChange,
}: AuthProviderProps) => {
  const [isAuthOperationLoading, setIsAuthOperationLoading] = useState(false);
  const authService = new AuthService(baseUrl);

  // Use SWR to manage user state with custom fetcher
  const { data: user, mutate: mutateUser } = useSWR<AuthUser | null>(
    '/api/auth/user',
    createUserFetcher(baseUrl),
    {
      revalidateOnFocus: true,
      shouldRetryOnError: false,
      suspense: true,
      fallbackData: null,
    }
  );

  const handleAuthChange = useCallback(
    async (newUser: AuthUser | null) => {
      if (onAuthChange) {
        onAuthChange(newUser);
      }
    },
    [onAuthChange]
  );

  // Handle auth state changes
  useEffect(() => {
    handleAuthChange(user || null);
  }, [user, handleAuthChange]);

  const login = async (email?: string, password?: string) => {
    if (!email || !password) return;

    setIsAuthOperationLoading(true);
    try {
      const loggedInUser = await authService.login(email, password);
      // Optimistically update the user
      await mutateUser(loggedInUser, false); // `false` to prevent re-fetching
    } finally {
      setIsAuthOperationLoading(false);
    }
  };

  const signUp = async (email?: string, password?: string, name?: string) => {
    if (!email || !password || !name) return;

    setIsAuthOperationLoading(true);
    try {
      const newUser = await authService.signUp(email, password, name);
      // Optimistically update the user
      await mutateUser(newUser, false); // `false` to prevent re-fetching
    } finally {
      setIsAuthOperationLoading(false);
    }
  };

  const logout = async () => {
    setIsAuthOperationLoading(true);
    try {
      await authService.logout();
      // Clear user from SWR cache
      await mutateUser(null, false);
    } finally {
      setIsAuthOperationLoading(false);
    }
  };

  // Extract user roles and groups from JWT claims or user metadata
  const getUserRoles = (): string[] => {
    if (!user) return [];

    // Try to get from JWT claims first (app_metadata)
    if (user.app_metadata?.roles) {
      return user.app_metadata.roles;
    }

    // Fallback to user_metadata (legacy)
    if (user.user_metadata?.roles) {
      return user.user_metadata.roles;
    }

    // Fallback to userRoles property (from API response)
    if (user.userRoles) {
      return user.userRoles;
    }

    return ['basic'];
  };

  const getUserGroups = (): string[] => {
    if (!user) return [];

    // Try to get from JWT claims first (app_metadata)
    if (user.app_metadata?.groups) {
      return user.app_metadata.groups;
    }

    // Fallback to user_metadata (legacy)
    if (user.user_metadata?.groups) {
      return user.user_metadata.groups;
    }

    // Fallback to userGroups property (from API response)
    if (user.userGroups) {
      return user.userGroups;
    }

    return ['free'];
  };

  const userRoles = getUserRoles();
  const userGroups = getUserGroups();

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
        hasRole: role => userRoles.includes(role),
        hasGroup: group => userGroups.includes(group),
        hasAnyRole: roles =>
          roles?.some(role => userRoles.includes(role)) || false,
        hasAnyGroup: groups =>
          groups?.some(group => userGroups.includes(group)) || false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
