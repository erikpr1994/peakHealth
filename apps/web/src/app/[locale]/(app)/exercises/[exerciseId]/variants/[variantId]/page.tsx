'use client';

import { useParams } from 'next/navigation';

import ExerciseDetail from '@/features/exercises/ExerciseDetail';

const ExerciseVariantPage = () => {
  const { exerciseId, variantId } = useParams();

  return (
    <ExerciseDetail
      exerciseId={exerciseId as string}
      variantId={variantId as string}
    />
  );
};

export default ExerciseVariantPage;
