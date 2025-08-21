// Re-export workout types from dedicated file
export type {
  WorkoutType,
  WorkoutSection,
  Exercise,
  ProgressionMethod,
  StrengthWorkout,
  RunningWorkout,
  IntervalType,
  TrailRunningInterval,
  TrailRunningWorkoutData,
  IntensityTarget,
  TrailRunningSection,
  WorkoutSet,
} from './workout';

// Re-export routine types from dedicated file
export type {
  Routine,
  RoutineData,
  WorkoutDay,
  ExerciseDetail,
} from './routine';
