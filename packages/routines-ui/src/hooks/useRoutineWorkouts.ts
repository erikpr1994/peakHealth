import { useContext, useMemo } from 'react';
import { RoutineBuilderContext } from '../context/routineBuilder/RoutineBuilderContext';
import { getWorkoutIds } from '../utils/routine-selectors';
import { Workout } from '@peakhealth/routines-types';

/**
 * Hook to access all workouts in the routine
 * Returns workout IDs and workout data, plus actions for managing workouts
 */
export function useRoutineWorkouts() {
  const context = useContext(RoutineBuilderContext);
  
  if (!context) {
    throw new Error('useRoutineWorkouts must be used within a RoutineBuilderProvider');
  }

  const { state, dispatch } = context;

  // Memoize workout IDs to prevent unnecessary re-renders
  const workoutIds = useMemo(() => getWorkoutIds(state), [state]);

  // Memoize workout data to prevent unnecessary re-renders
  const workouts = useMemo(() => state.workouts, [state.workouts]);

  // Pre-configured dispatchers for workout management
  const addWorkout = (workout: Workout) => {
    dispatch({
      type: 'ADD_WORKOUT',
      payload: { workout },
    });
  };

  const removeWorkout = (workoutId: string) => {
    dispatch({
      type: 'REMOVE_WORKOUT',
      payload: { workoutId },
    });
  };

  const updateWorkout = (workoutId: string, updates: Partial<Workout>) => {
    dispatch({
      type: 'UPDATE_WORKOUT',
      payload: { workoutId, updates },
    });
  };

  return {
    workoutIds,
    workouts,
    addWorkout,
    removeWorkout,
    updateWorkout,
  };
}
