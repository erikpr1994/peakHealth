'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';

import { featureFlagCache } from '../lib/cache';
import { featureFlagMonitor } from '../lib/monitoring';
import {
  FeatureFlagContextType,
  UserFeatureFlag,
  UserTypeInfo,
  UserGroupInfo,
} from '../types';

import { useAuth } from '@/features/auth/context/AuthContext';

const FeatureFlagContext = createContext<FeatureFlagContextType | undefined>(
  undefined
);

export const FeatureFlagProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [flags, setFlags] = useState<Record<string, UserFeatureFlag>>({});
  const [userTypes, setUserTypes] = useState<UserTypeInfo[]>([]);
  const [userGroups, setUserGroups] = useState<UserGroupInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadUserData = useCallback(async () => {
    if (!user || !user.id) {
      setFlags({});
      setUserTypes([]);
      setUserGroups([]);
      setIsLoading(false);
      return;
    }

    const startTime = Date.now();
    try {
      const response = await fetch('/api/feature-flags');
      if (!response.ok) {
        throw new Error('Failed to fetch feature flags');
      }
      const { flags, userTypes, userGroups } = await response.json();

      const flagsMap = flags.reduce(
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

      setFlags(flagsMap);
      setUserTypes(userTypes || []);
      setUserGroups(userGroups || []);

      const loadTime = Date.now() - startTime;
      featureFlagMonitor.trackFeatureFlagPerformance(
        'feature_flags_load',
        loadTime,
        user.id
      );
    } catch (error) {
      console.error('Error loading feature flag data:', error);
      featureFlagMonitor.trackFeatureFlagError(
        'feature_flags_load',
        error as Error,
        user.id
      );
      setFlags({});
      setUserTypes([]);
      setUserGroups([]);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadUserData();
  }, [user]);

  const isEnabled = (featureName: string): boolean => {
    const flag = flags[featureName];
    if (!flag) return false;

    const enabled = flag.isEnabled;

    // Track usage metric
    if (user) {
      featureFlagMonitor.trackFeatureFlagUsage(featureName, enabled, user.id);
    }

    return enabled;
  };

  const hasUserType = (typeName: string): boolean => {
    return userTypes.some(type => type.typeName === typeName);
  };

  const isInGroup = (groupName: string): boolean => {
    return userGroups.some(group => group.groupName === groupName);
  };

  const refreshFlags = async (): Promise<void> => {
    if (user) {
      // Invalidate user cache
      featureFlagCache.invalidateUser(user.id);
    }
    await loadUserData();
  };

  const value: FeatureFlagContextType = {
    flags,
    userTypes,
    userGroups,
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
