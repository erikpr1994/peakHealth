"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/features/auth/context/AuthContext";
import { featureFlagCache } from "../lib/cache";
import { featureFlagMonitor } from "../lib/monitoring";
import { getCurrentEnvironment } from "../lib/config";
import {
  FeatureFlagContextType,
  UserFeatureFlag,
  UserTypeInfo,
  UserGroupInfo,
} from "../types";

const FeatureFlagContext = createContext<FeatureFlagContextType | undefined>(
  undefined
);

export function FeatureFlagProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [flags, setFlags] = useState<Record<string, UserFeatureFlag>>({});
  const [userTypes, setUserTypes] = useState<UserTypeInfo[]>([]);
  const [userGroups, setUserGroups] = useState<UserGroupInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  const loadUserData = async () => {
    if (!user) {
      setFlags({});
      setUserTypes([]);
      setUserGroups([]);
      setIsLoading(false);
      return;
    }

    const startTime = Date.now();
    const environment = getCurrentEnvironment();

    try {
      // Load feature flags with caching
      const flagsData = await featureFlagCache.get(
        `user_${user.id}_flags_${environment}`,
        async () => {
          const { data, error } = await supabase.rpc("get_user_feature_flags", {
            user_id: user.id,
            environment_param: environment,
          });

          if (error) throw error;
          return data || [];
        }
      );

      const flagsMap = flagsData.reduce(
        (acc: Record<string, UserFeatureFlag>, flag: any) => {
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

      // Load user types with caching
      const typesData = await featureFlagCache.get(
        `user_${user.id}_types`,
        async () => {
          const { data, error } = await supabase.rpc("get_user_types", {
            user_id: user.id,
          });

          if (error) throw error;
          return data || [];
        }
      );

      const types = typesData.map((type: any) => ({
        typeName: type.type_name,
        displayName: type.display_name,
        description: type.description,
      }));

      setUserTypes(types);

      // Load user groups with caching
      const groupsData = await featureFlagCache.get(
        `user_${user.id}_groups`,
        async () => {
          const { data, error } = await supabase.rpc("get_user_groups", {
            user_id: user.id,
          });

          if (error) throw error;
          return data || [];
        }
      );

      const groups = groupsData.map((group: any) => ({
        groupName: group.group_name,
        displayName: group.display_name,
        description: group.description,
      }));

      setUserGroups(groups);

      // Track performance metric
      const loadTime = Date.now() - startTime;
      await featureFlagMonitor.trackPerformance("feature_flags_load", loadTime);
    } catch (error) {
      console.error("Error loading feature flag data:", error);
      await featureFlagMonitor.trackError("feature_flags_load", error as Error);

      setFlags({});
      setUserTypes([]);
      setUserGroups([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, [user]);

  const isEnabled = (featureName: string): boolean => {
    const flag = flags[featureName];
    if (!flag) return false;

    const enabled = flag.isEnabled;

    // Track usage metric
    if (user) {
      featureFlagMonitor.trackUsage(featureName, user.id, enabled);
    }

    return enabled;
  };

  const hasUserType = (typeName: string): boolean => {
    return userTypes.some((type) => type.typeName === typeName);
  };

  const isInGroup = (groupName: string): boolean => {
    return userGroups.some((group) => group.groupName === groupName);
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
}

export const useFeatureFlags = (): FeatureFlagContextType => {
  const context = useContext(FeatureFlagContext);
  if (!context) {
    throw new Error("useFeatureFlags must be used within FeatureFlagProvider");
  }
  return context;
};
