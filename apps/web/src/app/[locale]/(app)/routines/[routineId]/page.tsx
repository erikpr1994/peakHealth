'use client';

import { useParams } from 'next/navigation';

import RoutineDetail from '@/features/routines-old/features/routine-detail/RoutineDetail';

const RoutineDetailPage = (): React.ReactElement => {
  const { routineId } = useParams();
  return <RoutineDetail routineId={routineId as string} />;
};

export default RoutineDetailPage;
