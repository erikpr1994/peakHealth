// Feature Flag System Types

export interface UserType {
  id: string;
  name: string;
  displayName: string;
  description?: string;
  permissions: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface UserGroup {
  id: string;
  name: string;
  displayName: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserTypeAssignment {
  id: string;
  userId: string;
  userTypeId: string;
  assignedAt: string;
  assignedBy?: string;
}

export interface UserGroupAssignment {
  id: string;
  userId: string;
  groupId: string;
  assignedAt: string;
  assignedBy?: string;
}

export interface FeatureFlag {
  id: string;
  name: string;
  displayName: string;
  description?: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FeatureFlagEnvironment {
  id: string;
  featureFlagId: string;
  environment: string;
  isEnabled: boolean;
  rolloutPercentage: number;
  createdAt: string;
  updatedAt: string;
}

export interface FeatureFlagUserType {
  id: string;
  featureFlagId: string;
  environment: string;
  userTypeId: string;
  isEnabled: boolean;
  createdAt: string;
}

export interface FeatureFlagUserGroup {
  id: string;
  featureFlagId: string;
  environment: string;
  groupId: string;
  isEnabled: boolean;
  createdAt: string;
}

export interface FeatureFlagAuditLog {
  id: string;
  featureFlagId: string;
  action: "created" | "updated" | "deleted" | "enabled" | "disabled";
  oldValues?: Record<string, unknown>;
  newValues?: Record<string, unknown>;
  changedBy?: string;
  changedAt: string;
  environment?: string;
  reason?: string;
}

// API Response Types
export interface UserFeatureFlag {
  name: string;
  isEnabled: boolean;
  rolloutPercentage: number;
}

export interface UserTypeInfo {
  typeName: string;
  displayName: string;
  description?: string;
}

export interface UserGroupInfo {
  groupName: string;
  displayName: string;
  description?: string;
}

// Context Types
export interface FeatureFlagContextType {
  flags: Record<string, UserFeatureFlag>;
  userTypes: UserTypeInfo[];
  userGroups: UserGroupInfo[];
  isLoading: boolean;
  isEnabled: (featureName: string) => boolean;
  hasUserType: (typeName: string) => boolean;
  isInGroup: (groupName: string) => boolean;
  refreshFlags: () => Promise<void>;
}

// Configuration Types
export interface FeatureFlagConfig {
  monitoring: {
    enabled: boolean;
    endpoint?: string;
    apiKey?: string;
  };
  caching: {
    enabled: boolean;
    ttl: number; // in milliseconds
  };
  analytics: {
    enabled: boolean;
    trackUsage: boolean;
    trackPerformance: boolean;
  };
}

// Environment Types
export type Environment = "development" | "staging" | "production";

// Hook Return Types
export interface UseFeatureFlagReturn {
  flags: Record<string, boolean>;
  isLoading: boolean;
}

export interface UseFeatureFlagsReturn {
  flags: Record<string, UserFeatureFlag>;
  userTypes: UserTypeInfo[];
  userGroups: UserGroupInfo[];
  isLoading: boolean;
  isEnabled: (featureName: string) => boolean;
  hasUserType: (typeName: string) => boolean;
  isInGroup: (groupName: string) => boolean;
  refreshFlags: () => Promise<void>;
}

// Component Props Types
export interface FeatureFlagProps {
  name: string;
  environment?: Environment;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  loadingComponent?: React.ReactNode;
  trackAnalytics?: boolean;
}

// Database Function Types
export interface DatabaseFunctions {
  get_user_feature_flags: {
    Args: {
      user_id: string;
      environment_param: string;
    };
    Returns: UserFeatureFlag[];
  };
  get_user_types: {
    Args: {
      user_id: string;
    };
    Returns: UserTypeInfo[];
  };
  get_user_groups: {
    Args: {
      user_id: string;
    };
    Returns: UserGroupInfo[];
  };
  user_has_type: {
    Args: {
      user_id: string;
      type_name: string;
    };
    Returns: boolean;
  };
  user_in_group: {
    Args: {
      user_id: string;
      group_name: string;
    };
    Returns: boolean;
  };
}
