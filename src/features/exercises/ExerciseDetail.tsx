'use client';

import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { ExerciseHeader } from './components/ExerciseDetail/ExerciseHeader';
import { ExerciseInfo } from './components/ExerciseDetail/ExerciseInfo';
import { ExerciseSteps } from './components/ExerciseDetail/ExerciseSteps';
import { ExerciseTips } from './components/ExerciseDetail/ExerciseTips';
import { ExerciseVariants } from './components/ExerciseDetail/ExerciseVariants';
import { ExerciseVideo } from './components/ExerciseDetail/ExerciseVideo';
import { useExercise } from './hooks/useExercises';

import { Card } from '@/components/ui/card';

interface ExerciseDetailProps {
  exerciseId: string;
  variantId: string; // Required - all exercises are variants
  userId?: string; // Add userId prop for favorite management
}

const ExerciseDetail = ({
  exerciseId,
  variantId,
  userId,
}: ExerciseDetailProps) => {
  const router = useRouter();
  const { exercise, isLoading, error } = useExercise(exerciseId);

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

  if (error || !exercise) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Exercise Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The exercise you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => router.push('/exercises')}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Back to Exercises
          </button>
        </div>
      </div>
    );
  }

  // Find the specified variant
  const selectedVariant = exercise.variants.find(v => v.id === variantId);

  if (!selectedVariant) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Exercise Variant Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The variant "{variantId}" for this exercise is not available.
          </p>
          <button
            onClick={() => router.push('/exercises')}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Back to Exercises
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <button
          onClick={() => router.push('/exercises')}
          className="hover:text-gray-700"
        >
          Exercises
        </button>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-indigo-600 flex items-center">
          {exercise.name === selectedVariant.name ? (
            exercise.name
          ) : (
            <>
              {exercise.name}
              <ChevronRight className="w-4 h-4 mx-2" />
              {selectedVariant.name}
            </>
          )}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <ExerciseHeader
              exercise={exercise}
              variant={selectedVariant}
              userId={userId}
            />
            <ExerciseInfo exercise={exercise} variant={selectedVariant} />
          </Card>
        </div>

        {/* Video Demo */}
        <div className="lg:col-span-1">
          <ExerciseVideo exercise={exercise} variant={selectedVariant} />
        </div>
      </div>

      {/* Step-by-Step Instructions */}
      <ExerciseSteps exercise={exercise} variant={selectedVariant} />

      {/* Variants */}
      <ExerciseVariants
        exercise={exercise}
        currentVariantId={variantId}
        userId={userId}
      />

      {/* Pro Tips and Common Mistakes */}
      <ExerciseTips exercise={exercise} variant={selectedVariant} />
    </div>
  );
};

export default ExerciseDetail;
