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

// Routine detail components
export { default as RoutineDetailHeader } from './components/RoutineDetailHeader';
export { default as RoutineOverviewCards } from './components/RoutineOverviewCards';
export { default as RoutineProgress } from './components/RoutineProgress';
export { default as WeeklySchedule } from './components/WeeklySchedule';
export { default as RoutineInfo } from './components/RoutineInfo';
export { default as WorkoutDaysList } from './components/WorkoutDaysList';
export { default as ExerciseList } from './components/ExerciseList';

// Routine creation components
export { default as RoutineHeader } from './components/RoutineHeader';
export { default as RoutineDetailsForm } from './components/RoutineDetailsForm';
export { default as StrengthWorkoutsSection } from './components/StrengthWorkoutsSection';
export { default as RunningWorkoutsSection } from './components/RunningWorkoutsSection';
export { default as RoutineModals } from './components/RoutineModals';

// Trail running components
export { default as TrailRunningHeader } from './components/TrailRunningHeader';
export { default as WorkoutStats } from './components/WorkoutStats';
export { default as WorkoutOverview } from './components/WorkoutOverview';
export { default as IntensityTargetConfiguration } from './components/IntensityTargetConfiguration';
export { default as SectionTypeSelector } from './components/SectionTypeSelector';
export { default as RepeatIntervalsForm } from './components/RepeatIntervalsForm';
export { default as SectionsList } from './components/SectionsList';
export { default as SectionForm } from './components/SectionForm';
export { default as SectionFormCard } from './components/SectionFormCard';

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
export * from './utils/trailRunningUtils';
export * from './utils/smartDefaults';

// Hooks
export * from './hooks/useRoutineOperations';
export { useWorkoutOperations } from './hooks/useWorkoutOperations';
export { useTrailRunningWorkout } from './hooks/useTrailRunningWorkout';
