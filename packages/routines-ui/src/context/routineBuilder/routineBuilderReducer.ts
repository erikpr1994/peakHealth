import { RoutineBuilderAction, RoutineBuilderState } from './types';
import { updateRoutineName } from './reducers/routineReducer';
import {
  addWorkout,
  removeWorkout,
  updateWorkout,
} from './reducers/workoutReducer';
import {
  addSection,
  removeSection,
  updateSection,
  reorderSections,
} from './reducers/sectionReducer';
import {
  addSet,
  removeSet,
  updateSet,
  reorderSets,
} from './reducers/setReducer';
import {
  addExercise,
  removeExercise,
  updateExercise,
  reorderExercises,
} from './reducers/exerciseReducer';

export const routineBuilderReducer = (
  state: RoutineBuilderState,
  action: RoutineBuilderAction
): RoutineBuilderState => {
  switch (action.type) {
    // Routine-level actions
    case 'UPDATE_ROUTINE_NAME':
      return updateRoutineName(state, action.payload);

    // Workout-level actions
    case 'ADD_WORKOUT':
      return addWorkout(state, action.payload);
    case 'REMOVE_WORKOUT':
      return removeWorkout(state, action.payload);
    case 'UPDATE_WORKOUT':
      return updateWorkout(state, action.payload);

    // Section-level actions
    case 'ADD_SECTION':
      return addSection(state, action.payload);
    case 'REMOVE_SECTION':
      return removeSection(state, action.payload);
    case 'UPDATE_SECTION':
      return updateSection(state, action.payload);
    case 'REORDER_SECTIONS':
      return reorderSections(state, action.payload);

    // Set-level actions
    case 'ADD_SET':
      return addSet(state, action.payload);
    case 'REMOVE_SET':
      return removeSet(state, action.payload);
    case 'UPDATE_SET':
      return updateSet(state, action.payload);
    case 'REORDER_SETS':
      return reorderSets(state, action.payload);

    // Exercise-level actions
    case 'ADD_EXERCISE':
      return addExercise(state, action.payload);
    case 'REMOVE_EXERCISE':
      return removeExercise(state, action.payload);
    case 'UPDATE_EXERCISE':
      return updateExercise(state, action.payload);
    case 'REORDER_EXERCISES':
      return reorderExercises(state, action.payload);

    default:
      return state;
  }
};
