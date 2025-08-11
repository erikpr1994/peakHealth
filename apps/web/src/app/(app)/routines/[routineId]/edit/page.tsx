'use client';

import { useParams } from 'next/navigation';

import RoutineCreation from '@/features/routines/features/routine-creation/RoutineCreation';

const EditRoutinePage = (): React.ReactElement => {
  const { routineId } = useParams();

  return <RoutineCreation editRoutineId={routineId as string} mode="edit" />;
};

export default EditRoutinePage;
