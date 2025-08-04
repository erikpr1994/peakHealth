import useSWR from 'swr';

import { userProfileService } from '../services/userProfileService';
import { ProfileApiResponse } from '../types/profile';

export function useUserProfile() {
  const { data, error, mutate, isLoading } = useSWR<ProfileApiResponse>(
    '/api/profile',
    () => userProfileService.getUserProfile(),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      errorRetryCount: 3,
    }
  );

  return {
    profile: data?.profile,
    stats: data?.stats,
    achievements: data?.achievements,
    isLoading,
    error,
    mutate,
  };
}
