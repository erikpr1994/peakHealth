import { model } from 'mongoose';
import type {
  RoutineAssignmentDocument,
  RoutineAssignmentModel as RoutineAssignmentModelType,
} from './types';
import { routineAssignmentSchema } from './schemas';
import './virtuals-methods'; // Import side effects (virtuals, methods, middleware)

/**
 * Routine Assignment Model
 */
export const RoutineAssignmentModel = model<RoutineAssignmentDocument>(
  'RoutineAssignment',
  routineAssignmentSchema
) as RoutineAssignmentModelType;

// Re-export types
export type { RoutineAssignmentDocument } from './types';

/**
 * Export for easier imports
 */
export { RoutineAssignmentModel as RoutineAssignment };
