import { RoutineBuilderAction, RoutineBuilderState } from './types';
import { updateRoutineName } from './reducers/routineReducer';
import {
  addWorkout,
  removeWorkout,
  updateWorkout,
} from './reducers/workoutReducer';

export const routineBuilderReducer = (
  state: RoutineBuilderState,
  action: RoutineBuilderAction
): RoutineBuilderState => {
  switch (action.type) {
    case 'UPDATE_ROUTINE_NAME':
      return updateRoutineName(state, action.payload);
    case 'ADD_WORKOUT':
      return addWorkout(state, action.payload);
    case 'REMOVE_WORKOUT':
      return removeWorkout(state, action.payload);
    case 'UPDATE_WORKOUT':
      return updateWorkout(state, action.payload);
    default:
      return state;
  }
};
