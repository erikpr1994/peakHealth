import { RoutineBuilderAction, RoutineBuilderState } from '../types';
import { updateRoutineName } from './reducers/routineReducer';

export const routineBuilderReducer = (
  state: RoutineBuilderState,
  action: RoutineBuilderAction
): RoutineBuilderState => {
  switch (action.type) {
    case 'UPDATE_ROUTINE_NAME':
      return updateRoutineName(state, action.payload);
    default:
      return state;
  }
};
