'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useExercise } from '@/features/exercises/hooks/useExercises';

const ExerciseRedirectPage = () => {
  const { exerciseId } = useParams();
  const router = useRouter();
  const { exercise, isLoading } = useExercise(exerciseId as string);

  useEffect(() => {
    if (exercise && exercise.mainVariantId) {
      router.replace(
        `/exercises/${exerciseId}/variants/${exercise.mainVariantId}`
      );
    }
  }, [exercise, exerciseId, router]);

  if (isLoading) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
            <div className="lg:col-span-1">
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ExerciseRedirectPage;
