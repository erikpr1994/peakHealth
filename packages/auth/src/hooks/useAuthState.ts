import { useState, useEffect, useCallback, useMemo } from 'react';

import { AuthService } from '../services/authService';
import { AuthUser } from '../types';

export function useAuthState(baseUrl: string = '') {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const authService = useMemo(() => new AuthService(baseUrl), [baseUrl]);

  const loadUser = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load user');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [authService]);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        setIsLoading(true);
        setError(null);
        const loggedInUser = await authService.login(email, password);
        setUser(loggedInUser);
        return loggedInUser;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Login failed';
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [authService]
  );

  const signUp = useCallback(
    async (email: string, password: string, name: string) => {
      try {
        setIsLoading(true);
        setError(null);
        const newUser = await authService.signUp(email, password, name);
        setUser(newUser);
        return newUser;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Sign up failed';
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [authService]
  );

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      await authService.logout();
      setUser(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Logout failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [authService]);

  const refreshUser = useCallback(async () => {
    await loadUser();
  }, [loadUser]);

  // Load user on mount
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return {
    user,
    isLoading,
    error,
    login,
    signUp,
    logout,
    refreshUser,
    isAuthenticated: !!user,
  };
}
