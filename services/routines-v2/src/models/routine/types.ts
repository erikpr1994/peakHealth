import { Document, Types } from 'mongoose';
import {
  UserCreatedRoutine,
  TemplateRoutine,
} from '@peakhealth/routines-types';

/**
 * MongoDB document interface for routines
 * Extends the base types with Mongoose document properties
 */
export interface RoutineDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  goal:
    | 'strength'
    | 'hypertrophy'
    | 'endurance'
    | 'power'
    | 'weight_loss'
    | 'general_fitness'
    | 'mobility'
    | 'sport_specific';
  duration: number;
  objectives: string[];
  workouts: Types.ObjectId[];

  // Metadata
  schemaVersion: string;
  createdAt: Date;
  updatedAt: Date;

  // Discriminator fields
  routineType: 'user-created' | 'template';

  // User-created specific fields
  userId?: Types.ObjectId;
  createdBy?: Types.ObjectId;
  isActive?: boolean;
  isFavorite?: boolean;
  completedWorkouts?: number;
  totalWorkouts?: number;
  lastUsed?: Date;

  // Template specific fields
  templateType?: 'trainer' | 'company';
  allowCopy?: boolean;
  isPublic?: boolean;
  tags?: string[];
  targetAudience?: string[];
  parentRoutineId?: Types.ObjectId;
  version?: number;
  isLatest?: boolean;

  // Virtual properties
  workoutCount: number;
}

/**
 * Type guards for routine types
 */
export function isUserCreatedRoutine(
  routine: RoutineDocument
): routine is RoutineDocument & UserCreatedRoutine {
  return routine.routineType === 'user-created';
}

export function isTemplateRoutine(
  routine: RoutineDocument
): routine is RoutineDocument & TemplateRoutine {
  return routine.routineType === 'template';
}
