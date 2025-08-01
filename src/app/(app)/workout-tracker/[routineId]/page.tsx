'use client';

import { useParams, useRouter } from 'next/navigation';

import WorkoutTracker from '@/features/workout/WorkoutTracker';

const WorkoutTrackerPage = () => {
  const { routineId } = useParams();
  const router = useRouter();

  if (typeof routineId !== 'string') {
    // Or a loading spinner
    return <div>Invalid routine</div>;
  }

  return <WorkoutTracker onNavigate={router.push} routineId={routineId} />;
};

export default WorkoutTrackerPage;
