import mongoose, { Schema, Document } from 'mongoose';
import { RoutineAssignment as IRoutineAssignment } from 'routines-types/src/routine';

/**
 * Mongoose schema for routine assignments
 * Links a user to a specific, immutable version of a TemplateRoutine or UserCreatedRoutine
 */
const routineAssignmentSchema = new Schema({
  routineVersionId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Routine',
  },
  parentRoutineId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Routine',
  },
  trainerId: {
    type: Schema.Types.ObjectId,
    required: false,
  },
  userId: {
    type: String,
    required: true,
  },
  assignedAt: {
    type: Date,
    default: Date.now,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'paused', 'cancelled'],
    default: 'active',
  },
  notesForUser: {
    type: String,
  },
  progress: {
    completedWorkouts: {
      type: Number,
      default: 0,
    },
    totalWorkouts: {
      type: Number,
      default: 0,
    },
    lastWorkoutDate: {
      type: Date,
    },
    feedback: {
      type: String,
    },
  },
});

// Create indexes for efficient querying
routineAssignmentSchema.index({ userId: 1, status: 1 });
routineAssignmentSchema.index({ trainerId: 1 });
routineAssignmentSchema.index({ routineVersionId: 1, userId: 1 });

// Export the model and return your type interface
export type RoutineAssignmentDocument = Document & IRoutineAssignment;

const RoutineAssignmentModel = mongoose.model<RoutineAssignmentDocument>(
  'RoutineAssignment',
  routineAssignmentSchema
);

export default RoutineAssignmentModel;
