import { Schema } from 'mongoose';
import { exerciseSchema } from './exercise-schema';

/**
 * Base Section Schema
 * Contains common fields for all section types
 */
export const baseSectionSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Section name is required'],
      trim: true,
      maxLength: [200, 'Section name cannot exceed 200 characters'],
    },
    type: {
      type: String,
      enum: {
        values: ['basic', 'emom', 'tabata', 'circuit', 'warmup', 'cooldown'],
        message: 'Invalid section type for strength workout',
      },
      required: [true, 'Section type is required'],
    },
    orderIndex: {
      type: Number,
      required: [true, 'Section order index is required'],
      min: [0, 'Order index cannot be negative'],
    },
    restAfter: {
      type: String,
      validate: {
        validator: function (v: string) {
          return !v || /^(\d+(\.\d+)?)[smh]$/.test(v);
        },
        message: 'Rest after must be a valid duration string',
      },
    },
    notes: {
      type: String,
      trim: true,
      maxLength: [1000, 'Section notes cannot exceed 1000 characters'],
    },
    exercises: {
      type: [exerciseSchema],
      default: [],
    },
  },
  {
    _id: true,
    discriminatorKey: 'type',
  }
);

/**
 * Warmup Section Schema
 */
export const warmupSectionSchema = new Schema({
  targetMuscleGroups: {
    type: [String],
    default: [],
  },
  duration: {
    type: Number,
    required: [true, 'Warmup duration is required'],
    min: [1, 'Duration must be at least 1 minute'],
  },
  intensity: {
    type: String,
    enum: {
      values: ['light', 'moderate'],
      message: 'Warmup intensity must be light or moderate',
    },
    required: [true, 'Warmup intensity is required'],
  },
});

/**
 * Cooldown Section Schema
 */
export const cooldownSectionSchema = new Schema({
  duration: {
    type: Number,
    required: [true, 'Cooldown duration is required'],
    min: [1, 'Duration must be at least 1 minute'],
  },
  stretchingFocus: {
    type: [String],
    default: [],
  },
});

/**
 * Basic Section Schema
 */
export const basicSectionSchema = new Schema({
  // Basic sections have no additional properties beyond the base
});

/**
 * EMOM Section Schema
 */
export const emomSectionSchema = new Schema({
  emomDuration: {
    type: Number,
    required: [true, 'EMOM duration is required'],
    min: [1, 'EMOM duration must be at least 1 minute'],
  },
  rounds: {
    type: Number,
    required: [true, 'Number of rounds is required'],
    min: [1, 'Must have at least 1 round'],
  },
  restBetweenRounds: {
    type: String,
    validate: {
      validator: function (v: string) {
        return !v || /^(\d+(\.\d+)?)[smh]$/.test(v);
      },
      message: 'Rest between rounds must be a valid duration string',
    },
  },
});

/**
 * Tabata Section Schema
 */
export const tabataSectionSchema = new Schema({
  workInterval: {
    type: String,
    required: [true, 'Work interval is required'],
    validate: {
      validator: function (v: string) {
        return /^(\d+(\.\d+)?)[smh]$/.test(v);
      },
      message: 'Work interval must be a valid duration string',
    },
  },
  restInterval: {
    type: String,
    required: [true, 'Rest interval is required'],
    validate: {
      validator: function (v: string) {
        return /^(\d+(\.\d+)?)[smh]$/.test(v);
      },
      message: 'Rest interval must be a valid duration string',
    },
  },
  rounds: {
    type: Number,
    required: [true, 'Number of rounds is required'],
    min: [1, 'Must have at least 1 round'],
    default: 8,
  },
});

/**
 * Circuit Section Schema
 */
export const circuitSectionSchema = new Schema({
  rounds: {
    type: Number,
    required: [true, 'Number of rounds is required'],
    min: [1, 'Must have at least 1 round'],
  },
  restBetweenRounds: {
    type: String,
    required: [true, 'Rest between rounds is required'],
    validate: {
      validator: function (v: string) {
        return /^(\d+(\.\d+)?)[smh]$/.test(v);
      },
      message: 'Rest between rounds must be a valid duration string',
    },
  },
  restBetweenExercises: {
    type: String,
    validate: {
      validator: function (v: string) {
        return !v || /^(\d+(\.\d+)?)[smh]$/.test(v);
      },
      message: 'Rest between exercises must be a valid duration string',
    },
  },
});
