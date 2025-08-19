import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { Page } from '@/types/app';

export const useWorkoutNavigation = (): {
  navigate: (page: Page) => void;
  goToRoutines: () => void;
  goToDashboard: () => void;
  goBack: () => void;
} => {
  const router = useRouter();

  const navigate = useCallback(
    (page: Page) => {
      router.push(`/${page}`);
    },
    [router]
  );

  const goToRoutines = useCallback(() => {
    navigate('routines');
  }, [navigate]);

  const goToDashboard = useCallback(() => {
    navigate('dashboard');
  }, [navigate]);

  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  return {
    navigate,
    goToRoutines,
    goToDashboard,
    goBack,
  };
};
