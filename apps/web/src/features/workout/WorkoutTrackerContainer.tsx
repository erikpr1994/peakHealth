import React, { useState } from 'react';

import WorkoutPreparation from './WorkoutPreparation';
import WorkoutTracker from './WorkoutTracker';
import WorkoutCompletion from './WorkoutCompletion';
import { WorkoutTrackerContainerProps, WorkoutFlowState } from './types';
import { useWorkoutNavigation } from './hooks/useWorkoutNavigation';

const WorkoutTrackerContainer = ({
  routineId,
}: WorkoutTrackerContainerProps): React.JSX.Element | null => {
  const [workoutState, setWorkoutState] =
    useState<WorkoutFlowState>('preparation');
  const [workoutSessionId, setWorkoutSessionId] = useState<string | null>(null);
  const { goToDashboard, goToRoutines } = useWorkoutNavigation();

  const handleStartWorkout = (): void => {
    // In real app, create workout session in database here
    const sessionId = `session-${Date.now()}`;
    setWorkoutSessionId(sessionId);
    setWorkoutState('active');
  };

  const handleWorkoutComplete = (): void => {
    setWorkoutState('completed');
    // In real app, update workout session as completed
    setTimeout(() => {
      goToDashboard();
    }, 3000);
  };

  const handleExitWorkout = (): void => {
    // In real app, handle workout exit logic
    goToRoutines();
  };

  if (workoutState === 'preparation') {
    return (
      <WorkoutPreparation
        routineId={routineId}
        onStartWorkout={handleStartWorkout}
      />
    );
  }

  if (workoutState === 'active') {
    return (
      <WorkoutTracker
        routineId={routineId}
        sessionId={workoutSessionId}
        onComplete={handleWorkoutComplete}
        onExit={handleExitWorkout}
      />
    );
  }

  if (workoutState === 'completed') {
    return <WorkoutCompletion />;
  }

  return null;
};

export default WorkoutTrackerContainer;
