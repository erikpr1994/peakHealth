import { Suspense } from 'react';

import ExercisesList from '@/features/exercises/ExercisesList';
import { exerciseService } from '@/features/exercises/services/exerciseService';

async function getExercises() {
  try {
    const exercises = await exerciseService.getAllExercises();
    return { exercises: exercises || [], error: null };
  } catch (error) {
    console.error('Exercises fetch error:', error);
    return { exercises: [], error: 'Failed to fetch exercises' };
  }
}

const ExercisesPage = async () => {
  const { exercises, error } = await getExercises();

  return (
    <Suspense
      fallback={
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <ExercisesList initialExercises={exercises} initialError={error} />
    </Suspense>
  );
};

export default ExercisesPage;
