'use client';

import { useParams } from 'next/navigation';

import RoutineDetail from '@/features/routines/RoutineDetail';

const RoutineDetailPage = () => {
  const { routineId } = useParams();
  return <RoutineDetail routineId={routineId as string} />;
};

export default RoutineDetailPage;
