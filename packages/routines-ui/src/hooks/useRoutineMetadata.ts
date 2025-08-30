import { useContext, useMemo } from 'react';
import { RoutineBuilderContext } from '../context/routineBuilder/RoutineBuilderContext';

/**
 * Hook to access routine-level metadata
 * Returns routine name, description, difficulty, goal, duration, and objectives
 */
export function useRoutineMetadata() {
  const context = useContext(RoutineBuilderContext);

  if (!context) {
    throw new Error(
      'useRoutineMetadata must be used within a RoutineBuilderProvider'
    );
  }

  const { state, dispatch } = context;

  // Memoize routine metadata to prevent unnecessary re-renders
  const metadata = useMemo(
    () => ({
      name: state.name,
      description: state.description,
      difficulty: state.difficulty,
      goal: state.goal,
      duration: state.duration,
      objectives: state.objectives,
      isActive: state.isActive,
      isFavorite: state.isFavorite,
      completedWorkouts: state.completedWorkouts,
      totalWorkouts: state.totalWorkouts,
      lastUsed: state.lastUsed,
    }),
    [
      state.name,
      state.description,
      state.difficulty,
      state.goal,
      state.duration,
      state.objectives,
      state.isActive,
      state.isFavorite,
      state.completedWorkouts,
      state.totalWorkouts,
      state.lastUsed,
    ]
  );

  // Pre-configured dispatcher for updating routine name
  const updateRoutineName = (name: string) => {
    dispatch({
      type: 'UPDATE_ROUTINE_NAME',
      payload: { name },
    });
  };

  return {
    ...metadata,
    updateRoutineName,
  };
}
