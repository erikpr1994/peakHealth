import { useContext, useMemo } from 'react';
import { RoutineBuilderContext } from '../context/routineBuilder/RoutineBuilderContext';
import { findSectionById, getExerciseIds } from '../utils/routine-selectors';
import { StrengthWorkoutSection, RunningWorkoutSection, Exercise } from '@peakhealth/routines-types';

/**
 * Hook to access a specific section within a workout
 * Returns section data, exercise IDs, and actions for managing the section
 */
export function useSection(workoutId: string, sectionId: string) {
  const context = useContext(RoutineBuilderContext);
  
  if (!context) {
    throw new Error('useSection must be used within a RoutineBuilderProvider');
  }

  const { state, dispatch } = context;

  // Memoize section data to prevent unnecessary re-renders
  const section = useMemo(
    () => findSectionById(state, workoutId, sectionId),
    [state, workoutId, sectionId]
  );

  // Memoize exercise IDs to prevent unnecessary re-renders
  const exerciseIds = useMemo(
    () => getExerciseIds(state, workoutId, sectionId),
    [state, workoutId, sectionId]
  );

  // Pre-configured dispatchers for section management
  const updateSection = (updates: Partial<StrengthWorkoutSection | RunningWorkoutSection>) => {
    dispatch({
      type: 'UPDATE_SECTION',
      payload: { workoutId, sectionId, updates },
    });
  };

  const removeSection = () => {
    dispatch({
      type: 'REMOVE_SECTION',
      payload: { workoutId, sectionId },
    });
  };

  // Pre-configured dispatchers for exercise management
  const addExercise = (exercise: Exercise) => {
    dispatch({
      type: 'ADD_EXERCISE',
      payload: { workoutId, sectionId, exercise },
    });
  };

  const removeExercise = (exerciseId: string) => {
    dispatch({
      type: 'REMOVE_EXERCISE',
      payload: { workoutId, sectionId, exerciseId },
    });
  };

  const updateExercise = (exerciseId: string, updates: Partial<Exercise>) => {
    dispatch({
      type: 'UPDATE_EXERCISE',
      payload: { workoutId, sectionId, exerciseId, updates },
    });
  };

  const reorderExercises = (exerciseIds: string[]) => {
    dispatch({
      type: 'REORDER_EXERCISES',
      payload: { workoutId, sectionId, exerciseIds },
    });
  };

  return {
    section,
    exerciseIds,
    updateSection,
    removeSection,
    addExercise,
    removeExercise,
    updateExercise,
    reorderExercises,
  };
}
