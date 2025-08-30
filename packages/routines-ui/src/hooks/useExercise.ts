import { useContext, useMemo } from 'react';
import { RoutineBuilderContext } from '../context/routineBuilder/RoutineBuilderContext';
import { findExerciseById, getSetIds } from '../utils/routine-selectors';
import { Exercise, WorkoutSet } from '@peakhealth/routines-types';

/**
 * Hook to access a specific exercise within a section
 * Returns exercise data, set IDs, and actions for managing the exercise
 */
export function useExercise(
  workoutId: string,
  sectionId: string,
  exerciseId: string
) {
  const context = useContext(RoutineBuilderContext);
  
  if (!context) {
    throw new Error('useExercise must be used within a RoutineBuilderProvider');
  }

  const { state, dispatch } = context;

  // Memoize exercise data to prevent unnecessary re-renders
  const exercise = useMemo(
    () => findExerciseById(state, workoutId, sectionId, exerciseId),
    [state, workoutId, sectionId, exerciseId]
  );

  // Memoize set IDs to prevent unnecessary re-renders (only for exercises that have sets)
  const setIds = useMemo(
    () => getSetIds(state, workoutId, sectionId, exerciseId),
    [state, workoutId, sectionId, exerciseId]
  );

  // Pre-configured dispatchers for exercise management
  const updateExercise = (updates: Partial<Exercise>) => {
    dispatch({
      type: 'UPDATE_EXERCISE',
      payload: { workoutId, sectionId, exerciseId, updates },
    });
  };

  const removeExercise = () => {
    dispatch({
      type: 'REMOVE_EXERCISE',
      payload: { workoutId, sectionId, exerciseId },
    });
  };

  // Pre-configured dispatchers for set management (only for exercises that have sets)
  const addSet = (set: WorkoutSet) => {
    dispatch({
      type: 'ADD_SET',
      payload: { workoutId, sectionId, exerciseId, set },
    });
  };

  const removeSet = (setId: string) => {
    dispatch({
      type: 'REMOVE_SET',
      payload: { workoutId, sectionId, exerciseId, setId },
    });
  };

  const updateSet = (setId: string, updates: Partial<WorkoutSet>) => {
    dispatch({
      type: 'UPDATE_SET',
      payload: { workoutId, sectionId, exerciseId, setId, updates },
    });
  };

  const reorderSets = (setIds: string[]) => {
    dispatch({
      type: 'REORDER_SETS',
      payload: { workoutId, sectionId, exerciseId, setIds },
    });
  };

  return {
    exercise,
    setIds,
    updateExercise,
    removeExercise,
    addSet,
    removeSet,
    updateSet,
    reorderSets,
  };
}
