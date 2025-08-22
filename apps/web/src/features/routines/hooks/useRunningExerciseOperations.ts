'use client';

import { RunningWorkout } from '../types';
import { useExerciseOperations } from './useExerciseOperations';

export const useRunningExerciseOperations = (
  setRunningWorkouts: React.Dispatch<React.SetStateAction<RunningWorkout[]>>
) => {
  const operations = useExerciseOperations({
    setWorkouts: setRunningWorkouts,
    workoutType: 'running',
  });

  // Return operations with running-specific naming for backward compatibility
  return {
    addRunningExercise: operations.addExercise,
    removeRunningExercise: operations.removeExercise,
    updateRunningExerciseName: operations.updateExerciseName,
    updateRunningExerciseSets: operations.updateExerciseSets,
    updateRunningRestTimer: operations.updateRestTimer,
    updateRunningExerciseRestAfter: operations.updateExerciseRestAfter,
    updateRunningExerciseEmomReps: operations.updateExerciseEmomReps,
  };
};
