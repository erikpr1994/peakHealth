'use client';

import { RunningWorkout } from '../types';
import { useRunningWorkoutState } from './useRunningWorkoutState';
import { useRunningSectionOperations } from './useRunningSectionOperations';
import { useRunningExerciseOperations } from './useRunningExerciseOperations';

interface UseRunningWorkoutOperationsProps {
  initialRunningWorkouts?: RunningWorkout[];
}

export const useRunningWorkoutOperations = ({
  initialRunningWorkouts = [],
}: UseRunningWorkoutOperationsProps = {}) => {
  const {
    runningWorkouts,
    setRunningWorkouts,
    addRunningWorkout,
    removeRunningWorkout,
    moveRunningWorkout,
    updateRunningWorkoutName,
    updateRunningWorkoutObjective,
    updateRunningWorkoutSchedule,
  } = useRunningWorkoutState({ initialRunningWorkouts });

  const {
    addRunningSection,
    removeRunningSection,
    updateRunningSectionName,
    updateRunningSectionType,
    updateRunningSectionRestAfter,
    updateRunningSectionEmomDuration,
  } = useRunningSectionOperations(setRunningWorkouts);

  const {
    addRunningExercise,
    removeRunningExercise,
    updateRunningExerciseName,
    updateRunningExerciseSets,
    updateRunningRestTimer,
    updateRunningExerciseRestAfter,
    updateRunningExerciseEmomReps,
  } = useRunningExerciseOperations(setRunningWorkouts);

  return {
    // State
    runningWorkouts,
    setRunningWorkouts,

    // Running Workout Operations
    addRunningWorkout,
    removeRunningWorkout,
    moveRunningWorkout,
    updateRunningWorkoutName,
    updateRunningWorkoutObjective,
    updateRunningWorkoutSchedule,

    // Running Section Operations
    addRunningSection,
    removeRunningSection,
    updateRunningSectionName,
    updateRunningSectionType,
    updateRunningSectionRestAfter,
    updateRunningSectionEmomDuration,

    // Running Exercise Operations
    addRunningExercise,
    removeRunningExercise,
    updateRunningExerciseName,
    updateRunningExerciseSets,
    updateRunningRestTimer,
    updateRunningExerciseRestAfter,
    updateRunningExerciseEmomReps,
  };
};
