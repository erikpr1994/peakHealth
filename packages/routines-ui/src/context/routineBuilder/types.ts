import { UserCreatedRoutine, Workout } from '@peakhealth/routines-types';

export type RoutineBuilderState = UserCreatedRoutine;

export type UpdateRoutineNameAction = {
  type: 'UPDATE_ROUTINE_NAME';
  payload: {
    name: string;
  };
};

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

// Action types will be added here as we build the mutation utilities
export type RoutineBuilderAction = 
  | UpdateRoutineNameAction 
  | AddWorkoutAction 
  | RemoveWorkoutAction 
  | UpdateWorkoutAction;
