export interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  isPremium?: boolean;
  isAdmin?: boolean;
}

export const AVAILABLE_PERMISSIONS: Permission[] = [
  // Workout Permissions
  {
    id: 'basic_workouts',
    name: 'Basic Workouts',
    description: 'Access to basic workout routines',
    category: 'Workouts',
  },
  {
    id: 'advanced_workouts',
    name: 'Advanced Workouts',
    description: 'Access to advanced workout routines',
    category: 'Workouts',
    isPremium: true,
  },
  {
    id: 'custom_routines',
    name: 'Custom Routines',
    description: 'Create and save custom workout routines',
    category: 'Workouts',
    isPremium: true,
  },
  {
    id: 'workout_history',
    name: 'Workout History',
    description: 'View detailed workout history and progress',
    category: 'Workouts',
  },

  // Analytics Permissions
  {
    id: 'limited_analytics',
    name: 'Limited Analytics',
    description: 'Basic progress tracking',
    category: 'Analytics',
  },
  {
    id: 'full_analytics',
    name: 'Full Analytics',
    description: 'Comprehensive progress tracking and insights',
    category: 'Analytics',
    isPremium: true,
  },
  {
    id: 'advanced_metrics',
    name: 'Advanced Metrics',
    description: 'Advanced performance metrics and trends',
    category: 'Analytics',
    isPremium: true,
  },

  // Business Permissions
  {
    id: 'client_management',
    name: 'Client Management',
    description: 'Manage client relationships and progress',
    category: 'Business',
    isPremium: true,
  },
  {
    id: 'white_label',
    name: 'White Label',
    description: 'White label branding options',
    category: 'Business',
    isPremium: true,
  },
  {
    id: 'api_access',
    name: 'API Access',
    description: 'Access to platform APIs',
    category: 'Business',
    isPremium: true,
  },

  // Support Permissions
  {
    id: 'basic_support',
    name: 'Basic Support',
    description: 'Standard customer support access',
    category: 'Support',
  },
  {
    id: 'priority_support',
    name: 'Priority Support',
    description: 'Priority customer support access',
    category: 'Support',
    isPremium: true,
  },
  {
    id: 'personal_trainer',
    name: 'Personal Trainer',
    description: 'Access to personal trainer consultations',
    category: 'Support',
    isPremium: true,
  },

  // Administration Permissions
  {
    id: 'admin_panel',
    name: 'Admin Panel',
    description: 'Access to administrative functions',
    category: 'Administration',
    isAdmin: true,
  },
  {
    id: 'user_management',
    name: 'User Management',
    description: 'Manage other users in the system',
    category: 'Administration',
    isAdmin: true,
  },
  {
    id: 'system_settings',
    name: 'System Settings',
    description: 'Configure system-wide settings',
    category: 'Administration',
    isAdmin: true,
  },
  {
    id: 'content_management',
    name: 'Content Management',
    description: 'Manage platform content and features',
    category: 'Administration',
    isAdmin: true,
  },

  // Feature Permissions
  {
    id: 'feature_flags',
    name: 'Feature Flags',
    description: 'Access to experimental features',
    category: 'Features',
  },
  {
    id: 'beta_features',
    name: 'Beta Features',
    description: 'Access to beta features and early releases',
    category: 'Features',
    isPremium: true,
  },
  {
    id: 'advanced_features',
    name: 'Advanced Features',
    description: 'Access to advanced platform features',
    category: 'Features',
    isPremium: true,
  },
];

export const getPermissionsByCategory = () => {
  const categories = AVAILABLE_PERMISSIONS.reduce(
    (acc, permission) => {
      if (!acc[permission.category]) {
        acc[permission.category] = [];
      }
      acc[permission.category].push(permission);
      return acc;
    },
    {} as Record<string, Permission[]>
  );

  return categories;
};

export const getPermissionsByType = (type: 'basic' | 'premium' | 'admin') => {
  switch (type) {
    case 'basic':
      return AVAILABLE_PERMISSIONS.filter(p => !p.isPremium && !p.isAdmin);
    case 'premium':
      return AVAILABLE_PERMISSIONS.filter(p => p.isPremium);
    case 'admin':
      return AVAILABLE_PERMISSIONS.filter(p => p.isAdmin);
    default:
      return AVAILABLE_PERMISSIONS;
  }
};

export const getPermissionById = (id: string): Permission | undefined => {
  return AVAILABLE_PERMISSIONS.find(p => p.id === id);
};

export const getPermissionsByIds = (ids: string[]): Permission[] => {
  return AVAILABLE_PERMISSIONS.filter(p => ids.includes(p.id));
};
