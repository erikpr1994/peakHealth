import { Document, Types } from 'mongoose';
import {
  StrengthWorkout,
  StrengthWorkoutSection,
} from '@peakhealth/routines-types';

/**
 * Base Workout Document interface
 * Contains common properties for all workout types
 */
export interface BaseWorkoutDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  orderIndex: number;
  objective?: string;
  notes?: string;

  // Metadata
  schemaVersion: string;
  createdAt: Date;
  updatedAt: Date;

  // Creator and Discovery (for reusable workout templates)
  createdBy?: Types.ObjectId;
  isPublic?: boolean;
  tags?: string[];

  // Versioning Fields (for reusable workout templates)
  parentWorkoutId?: Types.ObjectId;
  version?: number;
  isLatest?: boolean;

  // Lifecycle Fields
  isArchived?: boolean;
  purgeAt?: Date;

  // Virtual properties
  sectionCount: number;
}

/**
 * Strength Workout Document interface
 * For strength training workouts
 */
export interface StrengthWorkoutDocument extends BaseWorkoutDocument {
  type: 'strength';
  sections: StrengthWorkoutSection[];
}

/**
 * Union type for all workout documents
 * Currently focusing on strength workouts only
 */
export type WorkoutDocument = StrengthWorkoutDocument;

/**
 * Type guards for workout types
 */
export function isStrengthWorkout(
  workout: WorkoutDocument
): workout is StrengthWorkoutDocument {
  return workout.type === 'strength';
}
