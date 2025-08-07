import { useAuth } from '@/features/auth/context/AuthContext';
import {
  canAccessData,
  getDataAccessLevel,
  canAccessOwnProfile,
  canAccessOwnProgress,
  canAccessOwnWorkouts,
  canAccessClientProfiles,
  canAccessClientProgress,
  canAccessClientWorkouts,
  canAccessMedicalData,
  canAccessTrainingData,
  canAccessAdminData,
  DATA_ACCESS_LEVELS,
  type DataType,
  type DataAccessLevel,
} from '@/lib/data-access';

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
    canAccessOwnProfile: (
      requiredLevel: DataAccessLevel = DATA_ACCESS_LEVELS.READ_ONLY
    ) => canAccessOwnProfile(requiredLevel, dataAccessRules),
    canAccessOwnProgress: (
      requiredLevel: DataAccessLevel = DATA_ACCESS_LEVELS.READ_ONLY
    ) => canAccessOwnProgress(requiredLevel, dataAccessRules),
    canAccessOwnWorkouts: (
      requiredLevel: DataAccessLevel = DATA_ACCESS_LEVELS.READ_ONLY
    ) => canAccessOwnWorkouts(requiredLevel, dataAccessRules),
    canAccessClientProfiles: (
      requiredLevel: DataAccessLevel = DATA_ACCESS_LEVELS.READ_ONLY
    ) => canAccessClientProfiles(requiredLevel, dataAccessRules),
    canAccessClientProgress: (
      requiredLevel: DataAccessLevel = DATA_ACCESS_LEVELS.READ_ONLY
    ) => canAccessClientProgress(requiredLevel, dataAccessRules),
    canAccessClientWorkouts: (
      requiredLevel: DataAccessLevel = DATA_ACCESS_LEVELS.READ_ONLY
    ) => canAccessClientWorkouts(requiredLevel, dataAccessRules),
    canAccessMedicalData: (
      requiredLevel: DataAccessLevel = DATA_ACCESS_LEVELS.READ_ONLY
    ) => canAccessMedicalData(requiredLevel, dataAccessRules),
    canAccessTrainingData: (
      requiredLevel: DataAccessLevel = DATA_ACCESS_LEVELS.READ_ONLY
    ) => canAccessTrainingData(requiredLevel, dataAccessRules),
    canAccessAdminData: (
      requiredLevel: DataAccessLevel = DATA_ACCESS_LEVELS.FULL
    ) => canAccessAdminData(requiredLevel, dataAccessRules),
    dataAccessRules,
  };
}
