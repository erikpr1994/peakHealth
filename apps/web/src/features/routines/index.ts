// Sub-features - explicit exports to avoid naming conflicts
export {
  RoutineCreation,
  RoutineHeader,
  RoutineDetailsForm,
  RoutineModals,
  StrengthWorkoutsSection,
  RunningWorkoutsSection,
} from './features/routine-creation';

export {
  RoutineDetail,
  RoutineDetailHeader,
  RoutineInfo,
  RoutineOverviewCards,
  RoutineProgress,
  WeeklySchedule,
  WorkoutDaysList,
} from './features/routine-detail';

export {
  TrailRunningWorkout,
  TrailRunningHeader,
  WorkoutStats,
  WorkoutOverview,
  IntensityTargetConfiguration,
  SectionTypeSelector,
  RepeatIntervalsForm,
  SectionsList,
  SectionForm,
  SectionFormCard,
} from './features/trail-running';

export {
  WorkoutHeader,
  WorkoutDetails,
  WorkoutSection as WorkoutSectionComponent,
  ExerciseManagement,
} from './features/workout-management';

export {
  Routines,
  RoutineCard,
  RoutinesList,
  ActiveRoutineCard,
  WorkoutCard,
} from './features/routine-list';

// Types
export * from './types';

// Utilities
export * from './utils';
export * from './utils/workoutCalculations';
export * from './utils/trailRunningUtils';
export * from './utils/smartDefaults';

// Hooks
export * from './hooks/useRoutineOperations';
export { useWorkoutOperations } from './hooks/useWorkoutOperations';
export { useTrailRunningWorkout } from './hooks/useTrailRunningWorkout';
