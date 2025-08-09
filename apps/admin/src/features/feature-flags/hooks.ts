import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import {
  fetchFeatureFlags,
  fetchTargetingOptions,
  createFeatureFlagApi,
  updateFeatureFlagApi,
  deleteFeatureFlagApi,
} from './api';
import {
  FeatureFlag,
  FeatureFlagFormData,
  TargetingOptions,
  EnvironmentKey,
} from './types';

export const useFeatureFlagsData = () => {
  const [featureFlags, setFeatureFlags] = useState<FeatureFlag[]>([]);
  const [targetingOptions, setTargetingOptions] =
    useState<TargetingOptions | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadFeatureFlags = async () => {
    try {
      const flags = await fetchFeatureFlags();
      setFeatureFlags(flags);
    } catch {
      toast.error('Failed to load feature flags');
    } finally {
      setIsLoading(false);
    }
  };

  const loadTargetingOptions = async () => {
    try {
      const options = await fetchTargetingOptions();
      setTargetingOptions(options);
    } catch {
      toast.error('Failed to load targeting options');
    }
  };

  useEffect(() => {
    loadFeatureFlags();
    loadTargetingOptions();
  }, []);

  return {
    featureFlags,
    targetingOptions,
    isLoading,
    reload: loadFeatureFlags,
  };
};

export const useFeatureFlagCrud = (onSuccess?: () => void) => {
  const createFeatureFlag = async (payload: FeatureFlagFormData) => {
    try {
      await createFeatureFlagApi(payload);
      toast.success('Feature flag created successfully');
      onSuccess?.();
    } catch {
      toast.error('Failed to create feature flag');
    }
  };

  const updateFeatureFlag = async (
    id: string,
    payload: FeatureFlagFormData
  ) => {
    try {
      await updateFeatureFlagApi(id, payload);
      toast.success('Feature flag updated successfully');
      onSuccess?.();
    } catch {
      toast.error('Failed to update feature flag');
    }
  };

  const deleteFeatureFlag = async (id: string) => {
    try {
      await deleteFeatureFlagApi(id);
      toast.success('Feature flag deleted successfully');
      onSuccess?.();
    } catch {
      toast.error('Failed to delete feature flag');
    }
  };

  return { createFeatureFlag, updateFeatureFlag, deleteFeatureFlag };
};

export const emptyFormState: FeatureFlagFormData = {
  name: '',
  displayName: '',
  description: '',
  category: '',
  isPublic: false,
  isGlobal: false,
  environments: {
    development: { enabled: false, rolloutPercentage: 0 },
    staging: { enabled: false, rolloutPercentage: 0 },
    production: { enabled: false, rolloutPercentage: 0 },
  },
  userTypes: [],
  subscriptionTiers: [],
  users: [],
};

export const convertFlagToFormState = (
  flag: FeatureFlag
): FeatureFlagFormData => {
  const environments: Record<
    EnvironmentKey,
    { enabled: boolean; rolloutPercentage: number }
  > = {
    development: { enabled: false, rolloutPercentage: 0 },
    staging: { enabled: false, rolloutPercentage: 0 },
    production: { enabled: false, rolloutPercentage: 0 },
  };

  flag.feature_flag_environments.forEach(env => {
    environments[env.environment as EnvironmentKey] = {
      enabled: env.is_enabled,
      rolloutPercentage: env.rollout_percentage,
    };
  });

  return {
    name: flag.name,
    displayName: flag.display_name,
    description: flag.description,
    category: flag.category || '',
    isPublic: flag.is_public,
    isGlobal: flag.is_global,
    environments,
    userTypes: flag.feature_flag_user_types.map(ut => ut.user_type_name),
    subscriptionTiers: flag.feature_flag_subscription_tiers.map(
      st => st.subscription_tier_name
    ),
    users: flag.feature_flag_users.map(uu => uu.user_id),
  };
};
