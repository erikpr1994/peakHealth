/**
 * Database Models Export
 *
 * Centralized export for all Mongoose models used in the routines service.
 * This provides a clean interface for importing models throughout the application.
 */

// Routine Models
export {
  RoutineModel,
  UserCreatedRoutineModel,
  TemplateRoutineModel,
  isUserCreatedRoutine,
  isTemplateRoutine,
  // Aliases for easier imports
  RoutineModel as Routine,
  UserCreatedRoutineModel as UserCreatedRoutine,
  TemplateRoutineModel as TemplateRoutine,
} from './routine';

export type { RoutineDocument } from './routine';

// Routine Assignment Models
export {
  RoutineAssignmentModel,
  // Alias for easier imports
  RoutineAssignmentModel as RoutineAssignment,
} from './routine-assignment';

export type { RoutineAssignmentDocument } from './routine-assignment';

// Workout Models
export {
  WorkoutModel,
  StrengthWorkoutModel,
  isStrengthWorkout,
  // Aliases for easier imports
  WorkoutModel as Workout,
  StrengthWorkoutModel as StrengthWorkout,
} from './workout';

export type { WorkoutDocument } from './workout';

// Database connection utilities
export {
  Database,
  db,
  connectToDatabase,
  ConnectionStates,
  type ConnectionState,
} from '../utils/database';
