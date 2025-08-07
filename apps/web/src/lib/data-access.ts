import { useAuth } from '@/features/auth/context/AuthContext';

/**
 * Data access levels in order of increasing permissions
 */
export const DATA_ACCESS_LEVELS = {
  NONE: 'none',
  READ_ONLY: 'read_only',
  TRAINING_ONLY: 'training_only',
  MEDICAL_TRAINING: 'medical_training',
  FULL: 'full',
} as const;

export type DataAccessLevel = typeof DATA_ACCESS_LEVELS[keyof typeof DATA_ACCESS_LEVELS];

/**
 * Data types that can be accessed
 */
export const DATA_TYPES = {
  OWN_PROFILE: 'own_profile',
  OWN_PROGRESS: 'own_progress',
  OWN_WORKOUTS: 'own_workouts',
  CLIENT_PROFILES: 'client_profiles',
  CLIENT_PROGRESS: 'client_progress',
  CLIENT_WORKOUTS: 'client_workouts',
  MEDICAL_DATA: 'medical_data',
  TRAINING_DATA: 'training_data',
  ADMIN_DATA: 'admin_data',
} as const;

export type DataType = typeof DATA_TYPES[keyof typeof DATA_TYPES];

/**
 * Check if a user can access a specific type of data at a given access level
 */
export function canAccessData(
  dataType: DataType,
  requiredLevel: DataAccessLevel,
  userDataAccessRules: Record<string, string>
): boolean {
  const userLevel = userDataAccessRules[dataType];
  
  if (!userLevel) {
    return false;
  }

  const accessLevels = {
    [DATA_ACCESS_LEVELS.NONE]: 0,
    [DATA_ACCESS_LEVELS.READ_ONLY]: 1,
    [DATA_ACCESS_LEVELS.TRAINING_ONLY]: 2,
    [DATA_ACCESS_LEVELS.MEDICAL_TRAINING]: 3,
    [DATA_ACCESS_LEVELS.FULL]: 4,
  };

  const userLevelValue = accessLevels[userLevel as keyof typeof accessLevels] || 0;
  const requiredLevelValue = accessLevels[requiredLevel] || 0;

  return userLevelValue >= requiredLevelValue;
}

/**
 * Get the highest access level a user has for a specific data type
 */
export function getDataAccessLevel(
  dataType: DataType,
  userDataAccessRules: Record<string, string>
): DataAccessLevel {
  const userLevel = userDataAccessRules[dataType];
  
  if (!userLevel) {
    return DATA_ACCESS_LEVELS.NONE;
  }

  // Validate that the user level is a valid access level
  const validLevels = Object.values(DATA_ACCESS_LEVELS);
  if (!validLevels.includes(userLevel as DataAccessLevel)) {
    return DATA_ACCESS_LEVELS.NONE;
  }

  return userLevel as DataAccessLevel;
}

/**
 * Check if a user can access their own profile data
 */
export function canAccessOwnProfile(
  requiredLevel: DataAccessLevel = DATA_ACCESS_LEVELS.READ_ONLY,
  userDataAccessRules: Record<string, string>
): boolean {
  return canAccessData(DATA_TYPES.OWN_PROFILE, requiredLevel, userDataAccessRules);
}

/**
 * Check if a user can access their own progress data
 */
export function canAccessOwnProgress(
  requiredLevel: DataAccessLevel = DATA_ACCESS_LEVELS.READ_ONLY,
  userDataAccessRules: Record<string, string>
): boolean {
  return canAccessData(DATA_TYPES.OWN_PROGRESS, requiredLevel, userDataAccessRules);
}

/**
 * Check if a user can access their own workout data
 */
export function canAccessOwnWorkouts(
  requiredLevel: DataAccessLevel = DATA_ACCESS_LEVELS.READ_ONLY,
  userDataAccessRules: Record<string, string>
): boolean {
  return canAccessData(DATA_TYPES.OWN_WORKOUTS, requiredLevel, userDataAccessRules);
}

/**
 * Check if a user can access client profile data
 */
export function canAccessClientProfiles(
  requiredLevel: DataAccessLevel = DATA_ACCESS_LEVELS.READ_ONLY,
  userDataAccessRules: Record<string, string>
): boolean {
  return canAccessData(DATA_TYPES.CLIENT_PROFILES, requiredLevel, userDataAccessRules);
}

/**
 * Check if a user can access client progress data
 */
export function canAccessClientProgress(
  requiredLevel: DataAccessLevel = DATA_ACCESS_LEVELS.READ_ONLY,
  userDataAccessRules: Record<string, string>
): boolean {
  return canAccessData(DATA_TYPES.CLIENT_PROGRESS, requiredLevel, userDataAccessRules);
}

/**
 * Check if a user can access client workout data
 */
export function canAccessClientWorkouts(
  requiredLevel: DataAccessLevel = DATA_ACCESS_LEVELS.READ_ONLY,
  userDataAccessRules: Record<string, string>
): boolean {
  return canAccessData(DATA_TYPES.CLIENT_WORKOUTS, requiredLevel, userDataAccessRules);
}

/**
 * Check if a user can access medical data
 */
export function canAccessMedicalData(
  requiredLevel: DataAccessLevel = DATA_ACCESS_LEVELS.READ_ONLY,
  userDataAccessRules: Record<string, string>
): boolean {
  return canAccessData(DATA_TYPES.MEDICAL_DATA, requiredLevel, userDataAccessRules);
}

/**
 * Check if a user can access training data
 */
export function canAccessTrainingData(
  requiredLevel: DataAccessLevel = DATA_ACCESS_LEVELS.READ_ONLY,
  userDataAccessRules: Record<string, string>
): boolean {
  return canAccessData(DATA_TYPES.TRAINING_DATA, requiredLevel, userDataAccessRules);
}

/**
 * Check if a user can access admin data
 */
export function canAccessAdminData(
  requiredLevel: DataAccessLevel = DATA_ACCESS_LEVELS.FULL,
  userDataAccessRules: Record<string, string>
): boolean {
  return canAccessData(DATA_TYPES.ADMIN_DATA, requiredLevel, userDataAccessRules);
}

/**
 * React hook to check data access using the current user's data access rules
 */
export function useDataAccess() {
  const { dataAccessRules } = useAuth();

  return {
    canAccessData: (dataType: DataType, requiredLevel: DataAccessLevel) =>
      canAccessData(dataType, requiredLevel, dataAccessRules),
    getDataAccessLevel: (dataType: DataType) =>
      getDataAccessLevel(dataType, dataAccessRules),
    canAccessOwnProfile: (requiredLevel: DataAccessLevel = DATA_ACCESS_LEVELS.READ_ONLY) =>
      canAccessOwnProfile(requiredLevel, dataAccessRules),
    canAccessOwnProgress: (requiredLevel: DataAccessLevel = DATA_ACCESS_LEVELS.READ_ONLY) =>
      canAccessOwnProgress(requiredLevel, dataAccessRules),
    canAccessOwnWorkouts: (requiredLevel: DataAccessLevel = DATA_ACCESS_LEVELS.READ_ONLY) =>
      canAccessOwnWorkouts(requiredLevel, dataAccessRules),
    canAccessClientProfiles: (requiredLevel: DataAccessLevel = DATA_ACCESS_LEVELS.READ_ONLY) =>
      canAccessClientProfiles(requiredLevel, dataAccessRules),
    canAccessClientProgress: (requiredLevel: DataAccessLevel = DATA_ACCESS_LEVELS.READ_ONLY) =>
      canAccessClientProgress(requiredLevel, dataAccessRules),
    canAccessClientWorkouts: (requiredLevel: DataAccessLevel = DATA_ACCESS_LEVELS.READ_ONLY) =>
      canAccessClientWorkouts(requiredLevel, dataAccessRules),
    canAccessMedicalData: (requiredLevel: DataAccessLevel = DATA_ACCESS_LEVELS.READ_ONLY) =>
      canAccessMedicalData(requiredLevel, dataAccessRules),
    canAccessTrainingData: (requiredLevel: DataAccessLevel = DATA_ACCESS_LEVELS.READ_ONLY) =>
      canAccessTrainingData(requiredLevel, dataAccessRules),
    canAccessAdminData: (requiredLevel: DataAccessLevel = DATA_ACCESS_LEVELS.FULL) =>
      canAccessAdminData(requiredLevel, dataAccessRules),
    dataAccessRules,
  };
} 