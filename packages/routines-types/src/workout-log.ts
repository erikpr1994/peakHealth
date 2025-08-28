import { ISODateString, ObjectId } from './common';
import { Exercise, WorkoutSet } from './exercise';

/**
 * Workout Log
 * A detailed record of the user's actual performance for a WorkoutSession.
 * It mirrors the structure of the snapshot, allowing for a direct comparison
 * between the planned work and the actual work performed for each set.
 */
export interface WorkoutLog {
  _id: ObjectId;
  userId: ObjectId;
  workoutSessionId: ObjectId; // Reference to the workout session this log is for

  // Timing
  startTime: ISODateString;
  endTime?: ISODateString;
  duration?: number; // in seconds

  // Performance data
  exerciseLogs: ExerciseLog[];

  // User feedback
  rating?: number; // 1-5 stars
  perceivedEffort?: number; // 1-10 scale
  notes?: string;

  // Metadata
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

/**
 * Exercise Log
 * Records the actual performance for a specific exercise
 */
export interface ExerciseLog {
  exerciseId: string; // Reference to the exercise in the snapshot
  exerciseVariantId: string; // Reference to the specific variant used
  setLogs: SetLog[];
  notes?: string;
  skipped: boolean;
  skipReason?: string;
}

/**
 * Set Log
 * Records the actual performance for a specific set
 */
export interface SetLog {
  setId: ObjectId; // Reference to the set in the snapshot
  completed: boolean;

  // Actual performance data (may differ from prescribed)
  actualReps?: number;
  actualWeight?: number;
  actualDuration?: number; // in seconds
  actualRPE?: number; // Rate of Perceived Exertion 1-10

  // Feedback
  notes?: string;
}
