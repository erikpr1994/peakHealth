'use client';

import React from 'react';
import { useParams } from 'next/navigation';

import { WorkoutTrackerContainer } from '@/features/workout';

const WorkoutTrackerPage = (): React.JSX.Element => {
  const { routineId } = useParams();

  if (typeof routineId !== 'string') {
    // Or a loading spinner
    return <div>Invalid routine</div>;
  }

  return <WorkoutTrackerContainer routineId={routineId} />;
};

export default WorkoutTrackerPage;
