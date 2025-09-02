import { Schema } from 'mongoose';
import { WorkoutDocument } from './types';
import { baseSectionSchema } from './section-schemas';

/**
 * Base Workout Schema
 * Contains fields common to all workout types
 */
export const baseWorkoutSchema = new Schema<WorkoutDocument>(
  {
    name: {
      type: String,
      required: [true, 'Workout name is required'],
      trim: true,
      minLength: [1, 'Workout name cannot be empty'],
      maxLength: [200, 'Workout name cannot exceed 200 characters'],
    },
    type: {
      type: String,
      enum: {
        values: ['strength'],
        message: 'Currently only strength workouts are supported',
      },
      required: [true, 'Workout type is required'],
    },
    orderIndex: {
      type: Number,
      required: [true, 'Order index is required'],
      min: [0, 'Order index cannot be negative'],
    },
    objective: {
      type: String,
      trim: true,
      maxLength: [500, 'Objective cannot exceed 500 characters'],
    },
    notes: {
      type: String,
      trim: true,
      maxLength: [2000, 'Notes cannot exceed 2000 characters'],
    },
    sections: {
      type: [baseSectionSchema],
      default: [],
      validate: {
        validator: function (sections: any[]) {
          return sections.length > 0;
        },
        message: 'Workout must have at least one section',
      },
    },

    // Metadata
    schemaVersion: {
      type: String,
      default: '1.0.0',
    },

    // Creator and Discovery (for reusable workout templates)
    createdBy: {
      type: Schema.Types.ObjectId,
      index: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
      index: true,
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: function (tags: string[]) {
          return tags.length <= 20;
        },
        message: 'Cannot have more than 20 tags',
      },
    },

    // Versioning Fields (for reusable workout templates)
    parentWorkoutId: {
      type: Schema.Types.ObjectId,
      index: true,
    },
    version: {
      type: Number,
      min: [1, 'Version must be at least 1'],
    },
    isLatest: {
      type: Boolean,
      default: false,
      index: true,
    },

    // Lifecycle Fields
    isArchived: {
      type: Boolean,
      default: false,
    },
    purgeAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    collection: 'workouts',
    discriminatorKey: 'type',
  }
);

// Indexes
baseWorkoutSchema.index({ name: 1 });
baseWorkoutSchema.index({ type: 1 });
baseWorkoutSchema.index({ createdAt: -1 });
baseWorkoutSchema.index({ isPublic: 1, type: 1, tags: 1 });
baseWorkoutSchema.index(
  { parentWorkoutId: 1, version: 1 },
  { unique: true, sparse: true }
);
baseWorkoutSchema.index({ parentWorkoutId: 1, isLatest: 1 });

// Virtual for total sections count
baseWorkoutSchema.virtual('sectionCount').get(function () {
  return this.sections ? this.sections.length : 0;
});

// Transform function for JSON serialization
baseWorkoutSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret: any) {
    ret._id = ret._id.toString();
    ret.createdAt = ret.createdAt.toISOString();
    ret.updatedAt = ret.updatedAt.toISOString();
    if (ret.purgeAt) ret.purgeAt = ret.purgeAt.toISOString();
    return ret;
  },
});

// Pre-save middleware to ensure only one latest version per parent workout
baseWorkoutSchema.pre('save', async function (next) {
  if (this.isLatest && this.parentWorkoutId && this.isModified('isLatest')) {
    await (this.constructor as any).updateMany(
      {
        parentWorkoutId: this.parentWorkoutId,
        _id: { $ne: this._id },
      },
      { isLatest: false }
    );
  }
  next();
});
