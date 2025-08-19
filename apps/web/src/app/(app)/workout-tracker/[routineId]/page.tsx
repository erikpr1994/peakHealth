'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';

import { WorkoutTrackerContainer } from '@/features/workout';

const WorkoutTrackerPage = (): React.JSX.Element => {
  const { routineId } = useParams();
  const router = useRouter();

  if (typeof routineId !== 'string') {
    // Or a loading spinner
    return <div>Invalid routine</div>;
  }

  return (
    <WorkoutTrackerContainer onNavigate={router.push} routineId={routineId} />
  );
};

export default WorkoutTrackerPage;
