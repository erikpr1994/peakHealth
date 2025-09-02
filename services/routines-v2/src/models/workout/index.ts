import { Schema, model } from 'mongoose';
import { WorkoutDocument, StrengthWorkoutDocument } from './types';
import { baseWorkoutSchema } from './workout-schema';
import {
  baseSectionSchema,
  basicSectionSchema,
  warmupSectionSchema,
  cooldownSectionSchema,
  emomSectionSchema,
  tabataSectionSchema,
  circuitSectionSchema,
} from './section-schemas';

/**
 * Create section discriminators for different section types
 */

// Base workout model
export const WorkoutModel = model<WorkoutDocument>(
  'Workout',
  baseWorkoutSchema
);

// Get section discriminator from base schema
const SectionModel = baseWorkoutSchema.path('sections') as any;

// Create section discriminators
const BasicSection = SectionModel.discriminator(
  'BasicSection',
  basicSectionSchema
);
const WarmupSection = SectionModel.discriminator(
  'WarmupSection',
  warmupSectionSchema
);
const CooldownSection = SectionModel.discriminator(
  'CooldownSection',
  cooldownSectionSchema
);
const EmomSection = SectionModel.discriminator(
  'EmomSection',
  emomSectionSchema
);
const TabataSection = SectionModel.discriminator(
  'TabataSection',
  tabataSectionSchema
);
const CircuitSection = SectionModel.discriminator(
  'CircuitSection',
  circuitSectionSchema
);

/**
 * Strength Workout Model
 * Discriminator for strength workouts
 */
export const StrengthWorkoutModel =
  WorkoutModel.discriminator<StrengthWorkoutDocument>(
    'StrengthWorkout',
    new Schema({})
  );

// Re-export types and type guards
export type {
  WorkoutDocument,
  StrengthWorkoutDocument,
  BaseWorkoutDocument,
} from './types';

export { isStrengthWorkout } from './types';

/**
 * Export models for direct use
 */
export { WorkoutModel as Workout };
export { StrengthWorkoutModel as StrengthWorkout };
