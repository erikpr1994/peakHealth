import { Document, Types, Model } from 'mongoose';

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

  // Virtual properties
  completionPercentage: number;
  daysSinceAssignment: number;
  isOverdue: boolean;

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
