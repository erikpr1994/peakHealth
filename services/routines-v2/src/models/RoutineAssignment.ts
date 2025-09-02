import { Schema, model, Document, Types, Model } from 'mongoose';
import { RoutineAssignment as RoutineAssignmentType } from '@peakhealth/routines-types';

/**
 * MongoDB document interface for routine assignments
 */
export interface RoutineAssignmentDocument extends Document {
  _id: Types.ObjectId;
  routineVersionId: Types.ObjectId; // Reference to specific template routine version
  parentRoutineId: Types.ObjectId; // The parent routine ID
  trainerId?: Types.ObjectId; // The trainer who assigned it
  userId: Types.ObjectId; // The user it's assigned to

  assignedAt: Date;
  startDate?: Date;
  endDate?: Date;
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  notesForUser?: string;

  // Progress tracking
  progress: {
    completedWorkouts: number;
    totalWorkouts: number;
    lastWorkoutDate?: Date;
    feedback?: string;
  };

  // Timestamps
  createdAt: Date;
  updatedAt: Date;

  // Instance methods
  updateProgress(
    completedWorkouts: number,
    totalWorkouts?: number,
    feedback?: string
  ): Promise<RoutineAssignmentDocument>;
  markComplete(feedback?: string): Promise<RoutineAssignmentDocument>;
  pause(): Promise<RoutineAssignmentDocument>;
  resume(): Promise<RoutineAssignmentDocument>;
}

/**
 * Interface for model with static methods
 */
export interface RoutineAssignmentModel
  extends Model<RoutineAssignmentDocument> {
  findActiveByUser(userId: string | Types.ObjectId): any;
  findByTrainer(trainerId: string | Types.ObjectId, status?: string): any;
  findOverdue(): any;
}

/**
 * Progress subdocument schema
 */
const progressSchema = new Schema(
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
const routineAssignmentSchema = new Schema<RoutineAssignmentDocument>(
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

// Virtual for completion percentage
routineAssignmentSchema.virtual('completionPercentage').get(function () {
  if (!this.progress.totalWorkouts || this.progress.totalWorkouts === 0) {
    return 0;
  }
  return Math.round(
    (this.progress.completedWorkouts / this.progress.totalWorkouts) * 100
  );
});

// Virtual for days since assignment
routineAssignmentSchema.virtual('daysSinceAssignment').get(function () {
  const now = new Date();
  const assigned = this.assignedAt;
  const diffTime = Math.abs(now.getTime() - assigned.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Virtual for is overdue (if end date is passed and not completed)
routineAssignmentSchema.virtual('isOverdue').get(function () {
  if (!this.endDate || this.status === 'completed') {
    return false;
  }
  return new Date() > this.endDate;
});

// Transform function for JSON serialization
routineAssignmentSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret: any) {
    ret._id = ret._id.toString();
    ret.routineVersionId = ret.routineVersionId.toString();
    ret.parentRoutineId = ret.parentRoutineId.toString();
    ret.userId = ret.userId.toString();
    if (ret.trainerId) ret.trainerId = ret.trainerId.toString();

    ret.assignedAt = ret.assignedAt.toISOString();
    ret.createdAt = ret.createdAt.toISOString();
    ret.updatedAt = ret.updatedAt.toISOString();

    if (ret.startDate) ret.startDate = ret.startDate.toISOString();
    if (ret.endDate) ret.endDate = ret.endDate.toISOString();
    if (ret.progress?.lastWorkoutDate) {
      ret.progress.lastWorkoutDate = ret.progress.lastWorkoutDate.toISOString();
    }

    return ret;
  },
});

// Pre-save middleware for validation
routineAssignmentSchema.pre('save', function (next) {
  // Validate progress consistency
  if (this.progress.completedWorkouts > this.progress.totalWorkouts) {
    const error = new Error('Completed workouts cannot exceed total workouts');
    return next(error);
  }

  // Auto-complete if all workouts are done
  if (
    this.progress.totalWorkouts > 0 &&
    this.progress.completedWorkouts >= this.progress.totalWorkouts &&
    this.status === 'active'
  ) {
    this.status = 'completed';
  }

  next();
});

// Post-save middleware for logging
routineAssignmentSchema.post('save', function (doc) {
  if (doc.isNew) {
    console.log(
      `New routine assignment created: ${doc._id} for user ${doc.userId}`
    );
  }
});

// Static methods
routineAssignmentSchema.statics.findActiveByUser = function (
  userId: string | Types.ObjectId
) {
  return this.find({
    userId,
    status: 'active',
    $and: [
      {
        $or: [
          { startDate: { $lte: new Date() } },
          { startDate: { $exists: false } },
        ],
      },
      {
        $or: [
          { endDate: { $gte: new Date() } },
          { endDate: { $exists: false } },
        ],
      },
    ],
  });
};

routineAssignmentSchema.statics.findByTrainer = function (
  trainerId: string | Types.ObjectId,
  status?: string
) {
  const query: any = { trainerId };
  if (status) {
    query.status = status;
  }
  return this.find(query).sort({ assignedAt: -1 });
};

routineAssignmentSchema.statics.findOverdue = function () {
  return this.find({
    status: { $in: ['active', 'paused'] },
    endDate: { $lt: new Date() },
  });
};

// Instance methods
routineAssignmentSchema.methods.updateProgress = function (
  completedWorkouts: number,
  totalWorkouts?: number,
  feedback?: string
) {
  this.progress.completedWorkouts = completedWorkouts;
  if (totalWorkouts !== undefined) {
    this.progress.totalWorkouts = totalWorkouts;
  }
  if (feedback !== undefined) {
    this.progress.feedback = feedback;
  }
  this.progress.lastWorkoutDate = new Date();

  return this.save();
};

routineAssignmentSchema.methods.markComplete = function (feedback?: string) {
  this.status = 'completed';
  if (feedback) {
    this.progress.feedback = feedback;
  }
  return this.save();
};

routineAssignmentSchema.methods.pause = function () {
  if (this.status === 'active') {
    this.status = 'paused';
    return this.save();
  }
  throw new Error('Can only pause active assignments');
};

routineAssignmentSchema.methods.resume = function () {
  if (this.status === 'paused') {
    this.status = 'active';
    return this.save();
  }
  throw new Error('Can only resume paused assignments');
};

/**
 * Routine Assignment Model
 */
export const RoutineAssignmentModel = model<RoutineAssignmentDocument>(
  'RoutineAssignment',
  routineAssignmentSchema
) as RoutineAssignmentModel;

/**
 * Export for easier imports
 */
export { RoutineAssignmentModel as RoutineAssignment };
