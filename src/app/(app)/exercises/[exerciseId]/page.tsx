'use client';

import { useParams } from 'next/navigation';

import ExerciseDetail from '@/features/exercises/ExerciseDetail';

const ExerciseDetailPage = () => {
  const { exerciseId } = useParams();
  return <ExerciseDetail exerciseId={exerciseId as string} />;
};

export default ExerciseDetailPage;
