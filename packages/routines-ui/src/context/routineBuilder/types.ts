import { UserCreatedRoutine } from '@peakhealth/routines-types';

export type RoutineBuilderState = UserCreatedRoutine;

export type UpdateRoutineNameAction = {
  type: 'UPDATE_ROUTINE_NAME';
  payload: {
    name: string;
  };
};

// Action types will be added here as we build the mutation utilities
export type RoutineBuilderAction = UpdateRoutineNameAction;
