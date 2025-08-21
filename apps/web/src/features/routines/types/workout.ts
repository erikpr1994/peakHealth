// Workout-related type definitions
// Extracted from types/index.ts to improve organization and maintainability

export type WorkoutType =
  | 'strength'
  | 'running'
  | 'trail-running'
  | 'swimming'
  | 'cycling';

// Import exercise types from dedicated file
import type { Exercise, WorkoutSet } from './exercise';
export type { Exercise, WorkoutSet };

// Import trail running types from dedicated file
import type { TrailRunningWorkoutData } from './trailRunning';
export type { TrailRunningWorkoutData };

export interface WorkoutSection {
  id: string;
  name: string;
  type: 'warmup' | 'basic' | 'cooldown' | 'emom' | 'tabata' | 'amrap';
  exercises: Exercise[];
  restAfter: string; // rest after this section
  // EMOM specific properties
  emomDuration?: number; // duration in minutes
  // TABATA specific properties (always 4 minutes, 8 rounds)
}

export interface StrengthWorkout {
  id: string;
  name: string;
  type: 'strength';
  objective: string;
  schedule: {
    repeatPattern: string;
    repeatValue: string;
    selectedDays: string[];
    time: string;
  };
  sections: WorkoutSection[];
}

export interface RunningWorkout {
  id: string;
  name: string;
  type: 'running' | 'trail-running' | 'swimming' | 'cycling';
  objective: string;
  schedule: {
    repeatPattern: string;
    repeatValue: string;
    selectedDays: string[];
    time: string;
  };
  sections: WorkoutSection[];
  trailRunningData?: TrailRunningWorkoutData; // For trail running specific data
}
