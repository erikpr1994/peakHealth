'use client';

import { StrengthWorkout } from '../types';
import { useExerciseOperations } from './useExerciseOperations';

export const useStrengthExerciseOperations = (
  setStrengthWorkouts: React.Dispatch<React.SetStateAction<StrengthWorkout[]>>
) => {
  const operations = useExerciseOperations({
    setWorkouts: setStrengthWorkouts,
    workoutType: 'strength',
  }) as ReturnType<typeof useExerciseOperations<StrengthWorkout>> & {
    updateExerciseProgressionMethod: (
      workoutId: string,
      sectionId: string,
      exerciseId: string,
      progressionMethod: any
    ) => void;
  };

  // Return operations with strength-specific naming for backward compatibility
  return {
    addStrengthExercise: operations.addExercise,
    removeStrengthExercise: operations.removeExercise,
    updateStrengthExerciseName: operations.updateExerciseName,
    updateStrengthExerciseSets: operations.updateExerciseSets,
    updateStrengthRestTimer: operations.updateRestTimer,
    updateStrengthExerciseRestAfter: operations.updateExerciseRestAfter,
    updateStrengthExerciseEmomReps: operations.updateExerciseEmomReps,
    updateStrengthExerciseProgressionMethod:
      operations.updateExerciseProgressionMethod,
  };
};
