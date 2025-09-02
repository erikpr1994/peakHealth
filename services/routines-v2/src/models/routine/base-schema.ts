import { Schema } from 'mongoose';
import { RoutineDocument } from './types';

/**
 * Base Routine Schema
 * Contains common fields for all routine types
 */
export const baseRoutineSchema = new Schema<RoutineDocument>(
  {
    name: {
      type: String,
      required: [true, 'Routine name is required'],
      trim: true,
      minLength: [1, 'Routine name cannot be empty'],
      maxLength: [200, 'Routine name cannot exceed 200 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxLength: [2000, 'Description cannot exceed 2000 characters'],
    },
    difficulty: {
      type: String,
      enum: {
        values: ['beginner', 'intermediate', 'advanced'],
        message: 'Difficulty must be beginner, intermediate, or advanced',
      },
      required: [true, 'Difficulty is required'],
    },
    goal: {
      type: String,
      enum: {
        values: [
          'strength',
          'hypertrophy',
          'endurance',
          'power',
          'weight_loss',
          'general_fitness',
          'mobility',
          'sport_specific',
        ],
        message: 'Invalid goal specified',
      },
      required: [true, 'Goal is required'],
    },
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
      min: [1, 'Duration must be at least 1 week'],
      max: [52, 'Duration cannot exceed 52 weeks'],
    },
    objectives: {
      type: [String],
      default: [],
      validate: {
        validator: function (objectives: string[]) {
          return objectives.length <= 10;
        },
        message: 'Cannot have more than 10 objectives',
      },
    },
    workouts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Workout',
      },
    ],

    // Metadata
    schemaVersion: {
      type: String,
      default: '1.0.0',
    },

    // Discriminator field
    routineType: {
      type: String,
      enum: ['user-created', 'template'],
      required: true,
    },
  },
  {
    timestamps: true,
    discriminatorKey: 'routineType',
    collection: 'routines',
  }
);

// Indexes
baseRoutineSchema.index({ name: 1 });
baseRoutineSchema.index({ difficulty: 1, goal: 1 });
baseRoutineSchema.index({ createdAt: -1 });
baseRoutineSchema.index({ routineType: 1 });

// Virtual for total workouts count
baseRoutineSchema.virtual('workoutCount').get(function () {
  return this.workouts ? this.workouts.length : 0;
});

// Transform function for JSON serialization
baseRoutineSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret: any) {
    ret._id = ret._id.toString();
    ret.createdAt = ret.createdAt.toISOString();
    ret.updatedAt = ret.updatedAt.toISOString();
    if (ret.lastUsed) ret.lastUsed = ret.lastUsed.toISOString();
    return ret;
  },
});
