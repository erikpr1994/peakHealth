import { useState } from 'react';

import { userProfileService } from '../services/userProfileService';
import { ProfileUpdateData, ProfileUpdateResponse } from '../types/profile';

export function useProfileUpdate() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = async (
    data: ProfileUpdateData
  ): Promise<ProfileUpdateResponse | null> => {
    setIsUpdating(true);
    setError(null);

    try {
      const response = await userProfileService.updateUserProfile(data);
      return response;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to update profile';
      setError(errorMessage);
      return null;
    } finally {
      setIsUpdating(false);
    }
  };

  const updateUserMetadata = async (
    metadata: Record<string, unknown>
  ): Promise<boolean> => {
    setIsUpdating(true);
    setError(null);

    try {
      await userProfileService.updateUserMetadata(metadata);
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to update user metadata';
      setError(errorMessage);
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    updateProfile,
    updateUserMetadata,
    isUpdating,
    error,
    clearError: () => setError(null),
  };
}
