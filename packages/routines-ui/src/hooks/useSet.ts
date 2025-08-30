import { useContext, useMemo } from 'react';
import { RoutineBuilderContext } from '../context/routineBuilder/RoutineBuilderContext';
import { findSetById } from '../utils/routine-selectors';
import { WorkoutSet } from '@peakhealth/routines-types';

/**
 * Hook to access a specific set within an exercise
 * Returns set data and actions for managing the set
 */
export function useSet(workoutId: string, sectionId: string, exerciseId: string, setId: string) {
  const context = useContext(RoutineBuilderContext);
  
  if (!context) {
    throw new Error('useSet must be used within a RoutineBuilderProvider');
  }

  const { state, dispatch } = context;

  // Memoize set data to prevent unnecessary re-renders
  const set = useMemo(() => findSetById(state, workoutId, sectionId, exerciseId, setId), [state, workoutId, sectionId, exerciseId, setId]);

  // Pre-configured dispatchers for set management
  const updateSet = (updates: Partial<WorkoutSet>) => {
    dispatch({
      type: 'UPDATE_SET',
      payload: { workoutId, sectionId, exerciseId, setId, updates },
    });
  };

  const removeSet = () => {
    dispatch({
      type: 'REMOVE_SET',
      payload: { workoutId, sectionId, exerciseId, setId },
    });
  };

  return {
    set,
    updateSet,
    removeSet,
  };
}
