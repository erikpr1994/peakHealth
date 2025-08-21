'use client';

import { StrengthWorkout } from '../types';
import { useStrengthWorkoutState } from './useStrengthWorkoutState';
import { useStrengthSectionOperations } from './useStrengthSectionOperations';
import { useStrengthExerciseOperations } from './useStrengthExerciseOperations';

interface UseStrengthWorkoutOperationsProps {
  initialStrengthWorkouts?: StrengthWorkout[];
}

export const useStrengthWorkoutOperations = ({
  initialStrengthWorkouts = [],
}: UseStrengthWorkoutOperationsProps = {}) => {
  const {
    strengthWorkouts,
    setStrengthWorkouts,
    addStrengthWorkout,
    removeStrengthWorkout,
    moveStrengthWorkout,
    updateStrengthWorkoutName,
    updateStrengthWorkoutObjective,
    updateStrengthWorkoutSchedule,
  } = useStrengthWorkoutState({ initialStrengthWorkouts });

  const {
    addStrengthSection,
    removeStrengthSection,
    updateStrengthSectionName,
    updateStrengthSectionType,
    updateStrengthSectionRestAfter,
    updateStrengthSectionEmomDuration,
  } = useStrengthSectionOperations(setStrengthWorkouts);

  const {
    addStrengthExercise,
    removeStrengthExercise,
    updateStrengthExerciseName,
    updateStrengthExerciseSets,
    updateStrengthRestTimer,
    updateStrengthExerciseRestAfter,
    updateStrengthExerciseEmomReps,
    updateStrengthExerciseProgressionMethod,
  } = useStrengthExerciseOperations(setStrengthWorkouts);

  return {
    // State
    strengthWorkouts,
    setStrengthWorkouts,

    // Strength Workout Operations
    addStrengthWorkout,
    removeStrengthWorkout,
    moveStrengthWorkout,
    updateStrengthWorkoutName,
    updateStrengthWorkoutObjective,
    updateStrengthWorkoutSchedule,

    // Strength Section Operations
    addStrengthSection,
    removeStrengthSection,
    updateStrengthSectionName,
    updateStrengthSectionType,
    updateStrengthSectionRestAfter,
    updateStrengthSectionEmomDuration,

    // Strength Exercise Operations
    addStrengthExercise,
    removeStrengthExercise,
    updateStrengthExerciseName,
    updateStrengthExerciseSets,
    updateStrengthRestTimer,
    updateStrengthExerciseRestAfter,
    updateStrengthExerciseEmomReps,
    updateStrengthExerciseProgressionMethod,
  };
};
