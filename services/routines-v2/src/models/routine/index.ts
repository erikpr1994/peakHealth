import { model } from 'mongoose';
import { RoutineDocument } from './types';
import { baseRoutineSchema } from './base-schema';
import { userCreatedRoutineSchema } from './user-schema';
import { templateRoutineSchema } from './template-schema';

/**
 * Base Routine Model
 */
export const RoutineModel = model<RoutineDocument>(
  'Routine',
  baseRoutineSchema
);

/**
 * User Created Routine Model
 */
export const UserCreatedRoutineModel =
  RoutineModel.discriminator<RoutineDocument>(
    'UserCreatedRoutine',
    userCreatedRoutineSchema
  );

/**
 * Template Routine Model
 */
export const TemplateRoutineModel = RoutineModel.discriminator<RoutineDocument>(
  'TemplateRoutine',
  templateRoutineSchema
);

// Re-export types and type guards
export type { RoutineDocument } from './types';
export { isUserCreatedRoutine, isTemplateRoutine } from './types';

/**
 * Export discriminated models for direct use
 */
export { RoutineModel as Routine };
export { UserCreatedRoutineModel as UserCreatedRoutine };
export { TemplateRoutineModel as TemplateRoutine };
