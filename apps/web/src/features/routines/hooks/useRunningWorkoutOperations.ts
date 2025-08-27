'use client';

import { RunningWorkout, Exercise, WorkoutSet } from '../types';
import { useRunningWorkoutState } from './useRunningWorkoutState';
import { useRunningSectionOperations } from './useRunningSectionOperations';
import { useRunningExerciseOperations } from './useRunningExerciseOperations';

interface UseRunningWorkoutOperationsProps {
  initialRunningWorkouts?: RunningWorkout[];
}

export const useRunningWorkoutOperations = ({
  initialRunningWorkouts = [],
}: UseRunningWorkoutOperationsProps = {}): {
  runningWorkouts: RunningWorkout[];
  setRunningWorkouts: React.Dispatch<React.SetStateAction<RunningWorkout[]>>;
  addRunningWorkout: () => void;
  removeRunningWorkout: (workoutId: string) => void;
  moveRunningWorkout: (workoutId: string, direction: 'up' | 'down') => void;
  updateRunningWorkoutName: (workoutId: string, name: string) => void;
  updateRunningWorkoutObjective: (workoutId: string, objective: string) => void;
  updateRunningWorkoutSchedule: (
    workoutId: string,
    field: keyof RunningWorkout['schedule'],
    value: string | string[]
  ) => void;
  addRunningSection: (workoutId: string) => void;
  removeRunningSection: (workoutId: string, sectionId: string) => void;
  updateRunningSectionName: (
    workoutId: string,
    sectionId: string,
    name: string
  ) => void;
  updateRunningSectionType: (
    workoutId: string,
    sectionId: string,
    type: RunningWorkout['sections'][0]['type']
  ) => void;
  updateRunningSectionRestAfter: (
    workoutId: string,
    sectionId: string,
    restAfter: string
  ) => void;
  addRunningExercise: (
    workoutId: string,
    sectionId: string,
    exerciseData: Partial<Exercise>
  ) => void;
  removeRunningExercise: (
    workoutId: string,
    sectionId: string,
    exerciseId: string
  ) => void;
  updateRunningExerciseName: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    name: string
  ) => void;
  updateRunningExerciseSets: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    sets: WorkoutSet[]
  ) => void;
  updateRunningRestTimer: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    restTimer: string
  ) => void;
  updateRunningExerciseRestAfter: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    restAfter: string
  ) => void;
  updateRunningExerciseEmomReps: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    reps: number
  ) => void;
} => {
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
