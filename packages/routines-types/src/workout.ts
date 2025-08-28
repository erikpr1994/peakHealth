import { ObjectId } from './common';
import { Exercise } from './exercise';
import { StrengthWorkoutSection, RunningWorkoutSection } from './section';

/**
 * Base Workout Interface
 * All workout types extend this interface
 */
export interface BaseWorkout {
  _id: ObjectId;
  name: string;
  orderIndex: number;
  objective?: string;
  notes?: string;
  sections: (StrengthWorkoutSection | RunningWorkoutSection)[];
}

/**
 * Strength Workout
 * For resistance training, bodyweight exercises, etc.
 */
export interface StrengthWorkout extends BaseWorkout {
  type: 'strength';
  sections: StrengthWorkoutSection[];
}

/**
 * Running Workout
 * For road running, treadmill, etc.
 */
export interface RunningWorkout extends BaseWorkout {
  type: 'running';
  sections: RunningWorkoutSection[];
}

/**
 * Trail Running Workout
 * For off-road running
 */
export interface TrailRunningWorkout extends BaseWorkout {
  type: 'trail-running';
  sections: RunningWorkoutSection[]; // Uses the same sections as Running
}

/**
 * Union type for all workout types
 */
export type Workout = StrengthWorkout | RunningWorkout | TrailRunningWorkout;
