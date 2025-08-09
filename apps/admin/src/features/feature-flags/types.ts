// Shared types for the Admin Feature Flags feature

export interface FeatureFlagEnvironment {
  id: string;
  feature_flag_id: string;
  environment: string;
  is_enabled: boolean;
  rollout_percentage: number;
  created_at: string;
  updated_at: string;
}

export interface FeatureFlagUserType {
  id: string;
  feature_flag_id: string;
  user_type_name: string;
  created_at: string;
  updated_at: string;
}

export interface FeatureFlagSubscriptionTier {
  id: string;
  feature_flag_id: string;
  subscription_tier_name: string;
  created_at: string;
  updated_at: string;
}

export interface FeatureFlagUser {
  id: string;
  feature_flag_id: string;
  user_id: string;
  created_at: string;
}

export interface FeatureFlag {
  id: string;
  name: string;
  display_name: string;
  description: string;
  category?: string;
  is_public: boolean;
  is_global: boolean;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  feature_flag_environments: FeatureFlagEnvironment[];
  feature_flag_user_types: FeatureFlagUserType[];
  feature_flag_subscription_tiers: FeatureFlagSubscriptionTier[];
  feature_flag_users: FeatureFlagUser[];
}

export interface TargetingOptions {
  userTypes: Array<{ name: string; display_name: string }>;
  subscriptionTiers: Array<{ name: string; display_name: string }>;
  users: Array<{ id: string; email: string; displayName: string }>;
}

export interface EnvironmentFormState {
  enabled: boolean;
  rolloutPercentage: number;
}

export interface FeatureFlagFormData {
  name: string;
  displayName: string;
  description: string;
  category: string;
  isPublic: boolean;
  isGlobal: boolean;
  environments: {
    development: EnvironmentFormState;
    staging: EnvironmentFormState;
    production: EnvironmentFormState;
  };
  userTypes: string[];
  subscriptionTiers: string[];
  users: string[];
}

export type EnvironmentKey = 'development' | 'staging' | 'production';
