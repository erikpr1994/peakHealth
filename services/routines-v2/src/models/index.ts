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
} from './Routine';

export type { RoutineDocument } from './Routine';

// Routine Assignment Models
export {
  RoutineAssignmentModel,
  // Alias for easier imports
  RoutineAssignmentModel as RoutineAssignment,
} from './RoutineAssignment';

export type { RoutineAssignmentDocument } from './RoutineAssignment';

// Database connection utilities
export {
  Database,
  db,
  connectToDatabase,
  ConnectionStates,
  type ConnectionState,
} from '../utils/database';
