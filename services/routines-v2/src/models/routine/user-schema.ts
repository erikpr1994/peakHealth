import { Schema } from 'mongoose';
import { RoutineDocument } from './types';

/**
 * User Created Routine Schema
 * For routines created by users
 */
export const userCreatedRoutineSchema = new Schema<RoutineDocument>({
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
