import {
  UserCreatedRoutine,
  Workout,
  StrengthWorkoutSection,
  RunningWorkoutSection,
} from '@peakhealth/routines-types';
import { Exercise, WorkoutSet } from '@peakhealth/routines-types';

export type RoutineBuilderState = UserCreatedRoutine;

// Routine-level actions
export type UpdateRoutineNameAction = {
  type: 'UPDATE_ROUTINE_NAME';
  payload: {
    name: string;
  };
};

// Workout-level actions
export type AddWorkoutAction = {
  type: 'ADD_WORKOUT';
  payload: {
    workout: Workout;
  };
};

export type RemoveWorkoutAction = {
  type: 'REMOVE_WORKOUT';
  payload: {
    workoutId: string;
  };
};

export type UpdateWorkoutAction = {
  type: 'UPDATE_WORKOUT';
  payload: {
    workoutId: string;
    updates: Partial<Omit<Workout, '_id' | 'orderIndex'>>;
  };
};

// Section-level actions
export type AddSectionAction = {
  type: 'ADD_SECTION';
  payload: {
    workoutId: string;
    section: StrengthWorkoutSection | RunningWorkoutSection;
  };
};

export type RemoveSectionAction = {
  type: 'REMOVE_SECTION';
  payload: {
    workoutId: string;
    sectionId: string;
  };
};

export type UpdateSectionAction = {
  type: 'UPDATE_SECTION';
  payload: {
    workoutId: string;
    sectionId: string;
    updates: Partial<
      Omit<StrengthWorkoutSection | RunningWorkoutSection, '_id' | 'orderIndex'>
    >;
  };
};

export type ReorderSectionsAction = {
  type: 'REORDER_SECTIONS';
  payload: {
    workoutId: string;
    sectionIds: string[]; // New order of section IDs
  };
};

// Set-level actions
export type AddSetAction = {
  type: 'ADD_SET';
  payload: {
    workoutId: string;
    sectionId: string;
    exerciseId: string;
    set: WorkoutSet;
  };
};

export type RemoveSetAction = {
  type: 'REMOVE_SET';
  payload: {
    workoutId: string;
    sectionId: string;
    exerciseId: string;
    setId: string;
  };
};

export type UpdateSetAction = {
  type: 'UPDATE_SET';
  payload: {
    workoutId: string;
    sectionId: string;
    exerciseId: string;
    setId: string;
    updates: Partial<Omit<WorkoutSet, '_id' | 'setNumber'>>;
  };
};

export type ReorderSetsAction = {
  type: 'REORDER_SETS';
  payload: {
    workoutId: string;
    sectionId: string;
    exerciseId: string;
    setIds: string[]; // New order of set IDs
  };
};

// Exercise-level actions
export type AddExerciseAction = {
  type: 'ADD_EXERCISE';
  payload: {
    workoutId: string;
    sectionId: string;
    exercise: Exercise;
  };
};

export type RemoveExerciseAction = {
  type: 'REMOVE_EXERCISE';
  payload: {
    workoutId: string;
    sectionId: string;
    exerciseId: string;
  };
};

export type UpdateExerciseAction = {
  type: 'UPDATE_EXERCISE';
  payload: {
    workoutId: string;
    sectionId: string;
    exerciseId: string;
    updates: Partial<Omit<Exercise, '_id' | 'orderIndex'>>;
  };
};

export type ReorderExercisesAction = {
  type: 'REORDER_EXERCISES';
  payload: {
    workoutId: string;
    sectionId: string;
    exerciseIds: string[]; // New order of exercise IDs
  };
};

// All action types
export type RoutineBuilderAction =
  | UpdateRoutineNameAction
  | AddWorkoutAction
  | RemoveWorkoutAction
  | UpdateWorkoutAction
  | AddSectionAction
  | RemoveSectionAction
  | UpdateSectionAction
  | ReorderSectionsAction
  | AddSetAction
  | RemoveSetAction
  | UpdateSetAction
  | ReorderSetsAction
  | AddExerciseAction
  | RemoveExerciseAction
  | UpdateExerciseAction
  | ReorderExercisesAction;
