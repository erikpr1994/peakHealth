import type {
  Workout,
  StrengthWorkout,
  RunningWorkout,
  TrailRunningWorkout,
} from '@peakhealth/routines-types';
import { generateId } from './idGenerator';

export type WorkoutType = 'strength' | 'running' | 'trail-running';

export interface CreateWorkoutOptions {
  name: string;
  type: WorkoutType;
  objective?: string;
  notes?: string;
  orderIndex?: number;
}

/**
 * Creates a new workout with default values based on the specified type
 */
export function createWorkout(options: CreateWorkoutOptions): Workout {
  const { name, type, objective, notes, orderIndex = 0 } = options;

  const baseWorkout = {
    _id: generateId(),
    name,
    orderIndex,
    objective,
    notes,
    sections: [],
  };

  switch (type) {
    case 'strength':
      return {
        ...baseWorkout,
        type: 'strength',
      } as StrengthWorkout;

    case 'running':
      return {
        ...baseWorkout,
        type: 'running',
      } as RunningWorkout;

    case 'trail-running':
      return {
        ...baseWorkout,
        type: 'trail-running',
      } as TrailRunningWorkout;

    default:
      throw new Error(`Invalid workout type: ${type}`);
  }
}

/**
 * Creates a default strength workout
 */
export function createDefaultStrengthWorkout(
  name: string,
  orderIndex?: number
): StrengthWorkout {
  return createWorkout({
    name,
    type: 'strength',
    objective: 'Build strength and muscle',
    orderIndex,
  }) as StrengthWorkout;
}

/**
 * Creates a default running workout
 */
export function createDefaultRunningWorkout(
  name: string,
  orderIndex?: number
): RunningWorkout {
  return createWorkout({
    name,
    type: 'running',
    objective: 'Improve cardiovascular fitness',
    orderIndex,
  }) as RunningWorkout;
}

/**
 * Creates a default trail running workout
 */
export function createDefaultTrailRunningWorkout(
  name: string,
  orderIndex?: number
): TrailRunningWorkout {
  return createWorkout({
    name,
    type: 'trail-running',
    objective: 'Build trail running endurance and skills',
    orderIndex,
  }) as TrailRunningWorkout;
}
