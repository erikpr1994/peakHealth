'use client';

import { useParams } from 'next/navigation';

import { useAuth } from '@/features/auth/context/AuthContext';
import ExerciseDetail from '@/features/exercises/ExerciseDetail';

const ExerciseVariantPage = () => {
  const { exerciseId, variantId } = useParams();
  const { user } = useAuth();
  return (
    <ExerciseDetail
      exerciseId={exerciseId as string}
      variantId={variantId as string}
      userId={user?.id}
    />
  );
};

export default ExerciseVariantPage;
