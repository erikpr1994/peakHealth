import { useState } from 'react';
import { useSWRConfig } from 'swr';

import { userProfileService } from '../services/userProfileService';
import { ProfileUpdateData, ProfileUpdateResponse } from '../types/profile';

export function useProfileUpdate() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { mutate } = useSWRConfig();

  const updateProfile = async (
    data: ProfileUpdateData
  ): Promise<ProfileUpdateResponse | null> => {
    setIsUpdating(true);
    setError(null);

    try {
      const response = await userProfileService.updateUserProfile(data);
      // Invalidate profile cache after successful update
      await mutate('/api/profile');
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
      // Invalidate profile cache after successful metadata update
      await mutate('/api/profile');
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
