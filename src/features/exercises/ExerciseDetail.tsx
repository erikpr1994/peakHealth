'use client';

import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { ExerciseHeader } from './components/ExerciseDetail/ExerciseHeader';
import { ExerciseInfo } from './components/ExerciseDetail/ExerciseInfo';
import { ExerciseSteps } from './components/ExerciseDetail/ExerciseSteps';
import { ExerciseTips } from './components/ExerciseDetail/ExerciseTips';
import { ExerciseVariants } from './components/ExerciseDetail/ExerciseVariants';
import { ExerciseVideo } from './components/ExerciseDetail/ExerciseVideo';
import { mockExercises } from './types';

import { Card } from '@/components/ui/card';

interface ExerciseDetailProps {
  exerciseId: string;
}

const ExerciseDetail = ({ exerciseId: _exerciseId }: ExerciseDetailProps) => {
  const router = useRouter();

  // Mock exercise data - in a real app, this would come from an API
  const exercise = mockExercises[0]; // Get the first exercise for demo
  const mainVariant = exercise.variants.find(
    v => v.id === exercise.mainVariantId
  );

  if (!mainVariant) {
    return <div>Exercise variant not found</div>;
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        <span>Exercise Details</span>
        <ChevronRight className="w-4 h-4 mx-2" />
        <button
          onClick={() => router.push('/exercises')}
          className="hover:text-gray-700"
        >
          Exercises
        </button>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-indigo-600">{exercise.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <ExerciseHeader exercise={exercise} variant={mainVariant} />
            <ExerciseInfo exercise={exercise} variant={mainVariant} />
          </Card>
        </div>

        {/* Video Demo */}
        <div className="lg:col-span-1">
          <ExerciseVideo exercise={exercise} variant={mainVariant} />
        </div>
      </div>

      {/* Step-by-Step Instructions */}
      <ExerciseSteps exercise={exercise} variant={mainVariant} />

      {/* Variants */}
      <ExerciseVariants exercise={exercise} />

      {/* Pro Tips and Common Mistakes */}
      <ExerciseTips exercise={exercise} variant={mainVariant} />
    </div>
  );
};

export default ExerciseDetail;
