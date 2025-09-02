import { Schema, model, Document, Types } from 'mongoose';
import {
  UserCreatedRoutine,
  TemplateRoutine,
  Routine as RoutineType,
  Difficulty,
  Goal,
} from '@peakhealth/routines-types';

/**
 * MongoDB document interface for routines
 * Extends the base types with Mongoose document properties
 */
export interface RoutineDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  difficulty: Difficulty;
  goal: Goal;
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
 * Base Routine Schema
 * Contains common fields for all routine types
 */
const baseRoutineSchema = new Schema<RoutineDocument>(
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

/**
 * User Created Routine Schema
 * For routines created by users
 */
const userCreatedRoutineSchema = new Schema<RoutineDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, 'User ID is required for user-created routines'],
    index: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: [true, 'Creator ID is required'],
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  completedWorkouts: {
    type: Number,
    default: 0,
    min: [0, 'Completed workouts cannot be negative'],
  },
  totalWorkouts: {
    type: Number,
    default: 0,
    min: [0, 'Total workouts cannot be negative'],
  },
  lastUsed: {
    type: Date,
  },
});

// Additional indexes for user-created routines
userCreatedRoutineSchema.index({ userId: 1, isActive: 1 });
userCreatedRoutineSchema.index({ userId: 1, isFavorite: 1 });
userCreatedRoutineSchema.index({ userId: 1, lastUsed: -1 });

/**
 * Template Routine Schema
 * For routines created by trainers or the company
 */
const templateRoutineSchema = new Schema<RoutineDocument>({
  templateType: {
    type: String,
    enum: {
      values: ['trainer', 'company'],
      message: 'Template type must be trainer or company',
    },
    required: [true, 'Template type is required for template routines'],
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: [true, 'Creator ID is required'],
    index: true,
  },
  allowCopy: {
    type: Boolean,
    default: true,
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
  targetAudience: {
    type: [String],
    default: [],
  },
  parentRoutineId: {
    type: Schema.Types.ObjectId,
    required: [true, 'Parent routine ID is required for template routines'],
    index: true,
  },
  version: {
    type: Number,
    required: [true, 'Version is required for template routines'],
    min: [1, 'Version must be at least 1'],
  },
  isLatest: {
    type: Boolean,
    default: false,
    index: true,
  },
});

// Additional indexes for template routines
templateRoutineSchema.index(
  { parentRoutineId: 1, version: 1 },
  { unique: true }
);
templateRoutineSchema.index({ parentRoutineId: 1, isLatest: 1 });
templateRoutineSchema.index({ templateType: 1, isPublic: 1 });
templateRoutineSchema.index({ tags: 1 });

// Pre-save middleware to ensure only one latest version per parent routine
templateRoutineSchema.pre('save', async function (next) {
  if (this.isLatest && this.isModified('isLatest')) {
    // Update other versions to not be latest
    await (this.constructor as any).updateMany(
      {
        parentRoutineId: this.parentRoutineId,
        _id: { $ne: this._id },
      },
      { isLatest: false }
    );
  }
  next();
});

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

/**
 * Export discriminated models for direct use
 */
export { RoutineModel as Routine };
export { UserCreatedRoutineModel as UserCreatedRoutine };
export { TemplateRoutineModel as TemplateRoutine };
