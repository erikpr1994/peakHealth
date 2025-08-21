// Re-export workout types from dedicated file
export type {
  WorkoutType,
  WorkoutSection,
  StrengthWorkout,
  RunningWorkout,
} from './workout';

// Re-export exercise types from dedicated file
export type {
  Exercise,
  ProgressionMethod,
  WorkoutSet,
  DatabaseSet,
  DatabaseExercise,
  ExerciseSelectionData,
  ExerciseVariantData,
} from './exercise';

// Re-export routine types from dedicated file
export type {
  Routine,
  RoutineData,
  WorkoutDay,
  ExerciseDetail,
} from './routine';

// Re-export trail running types from dedicated file
export type {
  IntervalType,
  TrailRunningInterval,
  TrailRunningWorkoutData,
  IntensityTarget,
  TrailRunningSection,
} from './trailRunning';
