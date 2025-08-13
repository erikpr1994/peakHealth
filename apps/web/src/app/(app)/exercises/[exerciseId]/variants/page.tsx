'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useExercise } from '@/features/exercises/hooks/useExercises';

const ExerciseVariantsRedirectPage = (): React.ReactElement => {
  const { exerciseId } = useParams();
  const router = useRouter();
  const { exercise, isLoading, error } = useExercise(exerciseId as string);

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

  // Handle error state
  if (error) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Exercise Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            Sorry, we couldn't load the exercise you're looking for. It may have
            been removed or doesn't exist.
          </p>
          <button
            onClick={() => router.push('/exercises')}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Browse All Exercises
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Loading Exercise...
        </h1>
        <p className="text-gray-600">Redirecting to exercise details...</p>
      </div>
    </div>
  );
};

export default ExerciseVariantsRedirectPage;
