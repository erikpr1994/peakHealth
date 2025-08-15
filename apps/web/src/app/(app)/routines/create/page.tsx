'use client';

import dynamic from 'next/dynamic';

const RoutineCreation = dynamic(
  () => import('@/features/routines/features/routine-creation/RoutineCreation'),
  { ssr: false }
);

const CreateRoutinePage = (): React.ReactElement => {
  return <RoutineCreation />;
};

export default CreateRoutinePage;
