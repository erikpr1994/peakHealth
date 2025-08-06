'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  useMemo,
} from 'react';

import { featureFlagCache } from '../lib/cache';
import { featureFlagMonitor } from '../lib/monitoring';
import { FeatureFlagContextType, UserFeatureFlag } from '../types';

import { useAuth } from '@/features/auth/context/AuthContext';

const FeatureFlagContext = createContext<FeatureFlagContextType | undefined>(
  undefined
);

export const FeatureFlagProvider = ({ children }: { children: ReactNode }) => {
  const { user, userRoles, userGroups } = useAuth();
  const [publicFlags, setPublicFlags] = useState<
    Record<string, UserFeatureFlag>
  >({});
  const [userFlags, setUserFlags] = useState<Record<string, UserFeatureFlag>>(
    {}
  );
  const [isLoading, setIsLoading] = useState(true);

  // Load public flags once on mount
  useEffect(() => {
    const loadPublicFlags = async () => {
      try {
        const response = await fetch('/api/feature-flags/public');
        if (response.ok) {
          const { featureFlags } = await response.json();

          // Ensure featureFlags is an array before processing
          if (!Array.isArray(featureFlags)) {
            console.warn(
              'Expected featureFlags to be an array, got:',
              featureFlags
            );
            setPublicFlags({});
            return;
          }

          const flagsMap = featureFlags.reduce(
            (
              acc: Record<string, UserFeatureFlag>,
              flag: {
                name: string;
                is_enabled: boolean;
                rollout_percentage: number;
              }
            ) => {
              acc[flag.name] = {
                name: flag.name,
                isEnabled: flag.is_enabled,
                rolloutPercentage: flag.rollout_percentage,
              };
              return acc;
            },
            {}
          );
          setPublicFlags(flagsMap);
        }
      } catch {
        // Errors are handled by not setting flags, no need to log
      }
    };

    loadPublicFlags();
  }, []);

  // Load user-specific flags when user authentication state changes
  const loadUserData = useCallback(async () => {
    if (!user || !user.id) {
      // Clear user-specific data on logout
      setUserFlags({});
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const startTime = Date.now();
    try {
      const response = await fetch('/api/feature-flags');
      if (!response.ok) {
        const errorData = await response.json();

        // If user not found, clear flags and return early
        if (errorData.code === 'USER_NOT_FOUND') {
          setUserFlags({});
          setIsLoading(false);
          return;
        }

        throw new Error('Failed to fetch user feature flags');
      }
      const { featureFlags: fetchedUserFlags } = await response.json();

      // Ensure fetchedUserFlags is an array before processing
      if (!Array.isArray(fetchedUserFlags)) {
        console.warn(
          'Expected featureFlags to be an array, got:',
          fetchedUserFlags
        );
        setUserFlags({});
        return;
      }

      const userFlagsMap = fetchedUserFlags.reduce(
        (
          acc: Record<string, UserFeatureFlag>,
          flag: {
            name: string;
            is_enabled: boolean;
            rollout_percentage: number;
          }
        ) => {
          acc[flag.name] = {
            name: flag.name,
            isEnabled: flag.is_enabled,
            rolloutPercentage: flag.rollout_percentage,
          };
          return acc;
        },
        {}
      );
      setUserFlags(userFlagsMap);

      const loadTime = Date.now() - startTime;
      featureFlagMonitor.trackFeatureFlagPerformance(
        'feature_flags_load',
        loadTime,
        user.id
      );
    } catch (error) {
      featureFlagMonitor.trackFeatureFlagError(
        'feature_flags_load',
        error as Error,
        user.id
      );
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const flags = useMemo(
    () => ({ ...publicFlags, ...userFlags }),
    [publicFlags, userFlags]
  );

  const isEnabled = useCallback(
    (featureName: string): boolean => {
      const flag = flags[featureName];
      const enabled = flag ? flag.isEnabled : false;

      if (user) {
        featureFlagMonitor.trackFeatureFlagUsage(featureName, enabled, user.id);
      }

      return enabled;
    },
    [flags, user]
  );

  const hasUserType = useCallback(
    (typeName: string): boolean => {
      return userRoles.includes(typeName);
    },
    [userRoles]
  );

  const isInGroup = useCallback(
    (groupName: string): boolean => {
      return userGroups.includes(groupName);
    },
    [userGroups]
  );

  const refreshFlags = useCallback(async (): Promise<void> => {
    if (user) {
      featureFlagCache.invalidateUser(user.id);
      await loadUserData();
    }
  }, [user, loadUserData]);

  const value: FeatureFlagContextType = {
    flags,
    isLoading,
    isEnabled,
    hasUserType,
    isInGroup,
    refreshFlags,
  };

  return (
    <FeatureFlagContext.Provider value={value}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

export const useFeatureFlags = (): FeatureFlagContextType => {
  const context = useContext(FeatureFlagContext);
  if (!context) {
    throw new Error('useFeatureFlags must be used within FeatureFlagProvider');
  }
  return context;
};
