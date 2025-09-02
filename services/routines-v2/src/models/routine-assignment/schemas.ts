import { Schema } from 'mongoose';
import { RoutineAssignmentDocument } from './types';

/**
 * Progress subdocument schema
 */
export const progressSchema = new Schema(
  {
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
    lastWorkoutDate: {
      type: Date,
    },
    feedback: {
      type: String,
      trim: true,
      maxLength: [1000, 'Feedback cannot exceed 1000 characters'],
    },
  },
  { _id: false } // Don't create separate _id for subdocuments
);

/**
 * Routine Assignment Schema
 */
export const routineAssignmentSchema = new Schema<RoutineAssignmentDocument>(
  {
    routineVersionId: {
      type: Schema.Types.ObjectId,
      ref: 'Routine',
      required: [true, 'Routine version ID is required'],
      index: true,
    },
    parentRoutineId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Parent routine ID is required'],
      index: true,
    },
    trainerId: {
      type: Schema.Types.ObjectId,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, 'User ID is required'],
      index: true,
    },
    assignedAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
    startDate: {
      type: Date,
      validate: {
        validator: function (startDate: Date) {
          // Start date should not be in the past (with some tolerance)
          if (!startDate) return true;
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return startDate >= today;
        },
        message: 'Start date cannot be in the past',
      },
    },
    endDate: {
      type: Date,
      validate: {
        validator: function (endDate: Date) {
          // End date should be after start date
          if (!endDate || !this.startDate) return true;
          return endDate > this.startDate;
        },
        message: 'End date must be after start date',
      },
    },
    status: {
      type: String,
      enum: {
        values: ['active', 'completed', 'paused', 'cancelled'],
        message: 'Status must be active, completed, paused, or cancelled',
      },
      default: 'active',
      required: true,
      index: true,
    },
    notesForUser: {
      type: String,
      trim: true,
      maxLength: [2000, 'Notes cannot exceed 2000 characters'],
    },
    progress: {
      type: progressSchema,
      default: () => ({
        completedWorkouts: 0,
        totalWorkouts: 0,
      }),
    },
  },
  {
    timestamps: true,
    collection: 'routine_assignments',
  }
);

// Compound indexes for efficient queries
routineAssignmentSchema.index({ userId: 1, status: 1 });
routineAssignmentSchema.index({ trainerId: 1, status: 1 });
routineAssignmentSchema.index({ parentRoutineId: 1, status: 1 });
routineAssignmentSchema.index({ userId: 1, assignedAt: -1 });
routineAssignmentSchema.index({ 'progress.lastWorkoutDate': -1 });

// Index for finding active assignments
routineAssignmentSchema.index({
  userId: 1,
  status: 1,
  startDate: 1,
  endDate: 1,
});
