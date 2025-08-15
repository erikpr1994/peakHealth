'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { ProgressionMethod, WorkoutSet } from '../../../types';

interface StrengthWorkoutOperations {
  // Workout operations
  onAddStrengthWorkout: () => void;
  onToggleCollapse: (workoutId: string) => void;
  onMoveUp: (workoutId: string) => void;
  onMoveDown: (workoutId: string) => void;
  onRemove: (workoutId: string) => void;
  onUpdateName: (workoutId: string, name: string) => void;
  onUpdateObjective: (workoutId: string, objective: string) => void;
  onUpdateSchedule: (
    workoutId: string,
    field: 'repeatPattern' | 'repeatValue' | 'selectedDays' | 'time',
    value: string | string[]
  ) => void;

  // Section operations
  onAddSection: (workoutId: string) => void;
  onUpdateSectionName: (
    workoutId: string,
    sectionId: string,
    name: string
  ) => void;
  onUpdateSectionType: (
    workoutId: string,
    sectionId: string,
    type: 'warmup' | 'basic' | 'cooldown' | 'emom' | 'tabata' | 'amrap'
  ) => void;
  onUpdateSectionRestAfter: (
    workoutId: string,
    sectionId: string,
    restAfter: string
  ) => void;
  onUpdateSectionEmomDuration: (
    workoutId: string,
    sectionId: string,
    duration: number
  ) => void;
  onRemoveSection: (workoutId: string, sectionId: string) => void;

  // Exercise operations
  onAddExercise: (workoutId: string, sectionId: string) => void;
  onUpdateExerciseEmomReps: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    reps: number
  ) => void;
  onUpdateExerciseSets: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    sets: WorkoutSet[]
  ) => void;
  onUpdateExerciseName: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    name: string
  ) => void;
  onUpdateRestTimer: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    restTimer: string
  ) => void;
  onUpdateExerciseRestAfter: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    restAfter: string
  ) => void;
  onRemoveExercise: (
    workoutId: string,
    sectionId: string,
    exerciseId: string
  ) => void;
  onAddApproachSets: (
    workoutId: string,
    sectionId: string,
    exerciseId: string
  ) => void;
  onUpdateProgressionMethod: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    method: ProgressionMethod
  ) => void;
  onNotesClick: (
    type: 'exercise' | 'set',
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    setId?: string
  ) => void;
}

interface StrengthWorkoutContextType {
  operations: StrengthWorkoutOperations;
}

const StrengthWorkoutContext = createContext<
  StrengthWorkoutContextType | undefined
>(undefined);

interface StrengthWorkoutProviderProps {
  children: ReactNode;
  operations: StrengthWorkoutOperations;
}

export const StrengthWorkoutProvider = ({
  children,
  operations,
}: StrengthWorkoutProviderProps): React.ReactElement => {
  const value: StrengthWorkoutContextType = {
    operations,
  };

  return (
    <StrengthWorkoutContext.Provider value={value}>
      {children}
    </StrengthWorkoutContext.Provider>
  );
};

export const useStrengthWorkoutContext = (): StrengthWorkoutContextType => {
  const context = useContext(StrengthWorkoutContext);
  if (context === undefined) {
    throw new Error(
      'useStrengthWorkoutContext must be used within a StrengthWorkoutProvider'
    );
  }
  return context;
};
