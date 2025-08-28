import { ISODateString, ObjectId } from './common';
import { Workout } from './workout';

/**
 * Workout Session
 * Represents a single, scheduled instance of a workout from a routine.
 * It holds an immutable snapshot of the planned workout, ensuring historical data is preserved
 * even if the original template changes.
 */
export interface WorkoutSession {
  _id: ObjectId;
  userId: ObjectId;
  routineId: ObjectId; // Reference to the routine this workout is part of
  routineAssignmentId?: ObjectId; // If this workout is part of an assigned routine

  // Scheduling
  scheduledDate: ISODateString;
  completedDate?: ISODateString;
  status: 'scheduled' | 'completed' | 'skipped' | 'in_progress';

  // The immutable snapshot of the workout at the time it was scheduled
  workoutSnapshot: Workout;

  // Metadata
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
