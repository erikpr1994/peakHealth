import { Types } from 'mongoose';
import { routineAssignmentSchema } from './schemas';

/**
 * Virtual Properties
 */

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

/**
 * Transform function for JSON serialization
 */
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

/**
 * Middleware
 */

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

/**
 * Static Methods
 */
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

/**
 * Instance Methods
 */
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
