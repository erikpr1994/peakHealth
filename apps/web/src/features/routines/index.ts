// Main components
export { default as Routines } from './Routines';
export { default as RoutineCreation } from './RoutineCreation';
export { default as RoutineDetail } from './RoutineDetail';
export { default as TrailRunningWorkout } from './TrailRunningWorkout';

// Reusable components
export { default as RoutineCard } from './components/RoutineCard';
export { default as WorkoutCard } from './components/WorkoutCard';
export { default as RoutinesList } from './components/RoutinesList';
export { default as ActiveRoutineCard } from './components/ActiveRoutineCard';

// Workout creation components
export { default as WorkoutHeader } from './components/WorkoutHeader';
export { default as WorkoutDetails } from './components/WorkoutDetails';
export { default as WorkoutSection } from './components/WorkoutSection';
export { default as ExerciseManagement } from './components/ExerciseManagement';

// Types
export * from './types';

// Utilities
export * from './utils';
export * from './utils/workoutCalculations';

// Hooks
export * from './hooks/useRoutineOperations';
export { useWorkoutOperations } from './hooks/useWorkoutOperations';
