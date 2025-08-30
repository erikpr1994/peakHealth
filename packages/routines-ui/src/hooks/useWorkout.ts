import { useContext, useMemo } from 'react';
import { RoutineBuilderContext } from '../context/routineBuilder/RoutineBuilderContext';
import { findWorkoutById, getSectionIds } from '../utils/routine-selectors';
import {
  Workout,
  StrengthWorkoutSection,
  RunningWorkoutSection,
} from '@peakhealth/routines-types';

/**
 * Hook to access a specific workout by ID
 * Returns workout data, section IDs, and actions for managing the workout
 */
export function useWorkout(workoutId: string) {
  const context = useContext(RoutineBuilderContext);

  if (!context) {
    throw new Error('useWorkout must be used within a RoutineBuilderProvider');
  }

  const { state, dispatch } = context;

  // Memoize workout data to prevent unnecessary re-renders
  const workout = useMemo(
    () => findWorkoutById(state, workoutId),
    [state, workoutId]
  );

  // Memoize section IDs to prevent unnecessary re-renders
  const sectionIds = useMemo(
    () => getSectionIds(state, workoutId),
    [state, workoutId]
  );

  // Pre-configured dispatchers for workout management
  const updateWorkout = (updates: Partial<Workout>) => {
    dispatch({
      type: 'UPDATE_WORKOUT',
      payload: { workoutId, updates },
    });
  };

  const removeWorkout = () => {
    dispatch({
      type: 'REMOVE_WORKOUT',
      payload: { workoutId },
    });
  };

  // Pre-configured dispatchers for section management
  const addSection = (
    section: StrengthWorkoutSection | RunningWorkoutSection
  ) => {
    dispatch({
      type: 'ADD_SECTION',
      payload: { workoutId, section },
    });
  };

  const removeSection = (sectionId: string) => {
    dispatch({
      type: 'REMOVE_SECTION',
      payload: { workoutId, sectionId },
    });
  };

  const updateSection = (
    sectionId: string,
    updates: Partial<StrengthWorkoutSection | RunningWorkoutSection>
  ) => {
    dispatch({
      type: 'UPDATE_SECTION',
      payload: { workoutId, sectionId, updates },
    });
  };

  const reorderSections = (sectionIds: string[]) => {
    dispatch({
      type: 'REORDER_SECTIONS',
      payload: { workoutId, sectionIds },
    });
  };

  return {
    workout,
    sectionIds,
    updateWorkout,
    removeWorkout,
    addSection,
    removeSection,
    updateSection,
    reorderSections,
  };
}
