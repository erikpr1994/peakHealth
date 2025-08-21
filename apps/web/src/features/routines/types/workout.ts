// Workout-related type definitions
// Extracted from types/index.ts to improve organization and maintainability

export type WorkoutType =
  | 'strength'
  | 'running'
  | 'trail-running'
  | 'swimming'
  | 'cycling';

// Import and re-export WorkoutSet from workout module to ensure consistency
import type { WorkoutSet } from '../components/SetManagement';
export type { WorkoutSet };

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

export interface Exercise {
  id: string;
  name: string;
  category?: string;
  muscleGroups?: string[];
  equipment?: string[]; // Equipment required for this exercise
  // Exercise and variant IDs for proper data tracking
  exerciseId?: string; // ID of the base exercise
  variantId?: string; // ID of the selected variant
  sets: WorkoutSet[];
  restTimer: string; // rest between sets
  restAfter: string; // rest after this exercise
  notes: string;
  progressionMethod?: ProgressionMethod; // progression method for strength exercises
  hasApproachSets?: boolean; // track if approach sets have been added
  // EMOM specific properties
  emomReps?: number; // target reps per minute
  // TABATA specific properties (uses time intervals instead of sets)
}

export type ProgressionMethod =
  | 'linear'
  | 'dual'
  | 'inverse-pyramid'
  | 'myo-reps'
  | 'widowmaker'
  | 'amrap';

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

// Trail Running Types
export type IntervalType =
  | 'run'
  | 'uphill'
  | 'downhill'
  | 'sprint'
  | 'recovery'
  | 'rest'
  | 'walk';

export interface TrailRunningInterval {
  id: string;
  name: string;
  type: IntervalType;
  distance?: number;
  duration?: number;
  intensityTarget?: IntensityTarget;
  elevationChange?: number;
}

export interface TrailRunningWorkoutData {
  id: string;
  name: string;
  description: string;
  type: 'trail-running';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  estimatedDuration: number; // calculated from sections
  targetDistance: number; // calculated from sections
  elevationGain: number; // calculated from sections
  sections: TrailRunningSection[];
}

export interface IntensityTarget {
  type: 'heart-rate' | 'speed' | 'power' | 'cadence' | 'rpe';
  value?: number; // For fixed values (cadence)
  minValue?: number | string; // For ranges (heart rate, power zones) or pace strings (speed)
  maxValue?: number | string; // For ranges (heart rate, power zones) or pace strings (speed)
  zone?: string; // For power zones (Z1, Z2, etc.)
  unit?: string; // Display unit (bpm, min/km, rpm, etc.)
}

export interface TrailRunningSection {
  id: string;
  name: string;
  type:
    | 'warm-up'
    | 'cool-down'
    | 'run'
    | 'walk'
    | 'uphill-repeat'
    | 'downhill-repeat'
    | 'recovery'
    | 'rest'
    | 'caco'
    | 'fartlek'
    | 'series'
    | 'w-series';
  distance?: number; // in km
  duration?: number; // in minutes
  intensityTarget?: IntensityTarget; // Flexible intensity target configuration
  elevationChange?: number; // in meters (positive for uphill)
  isRepeated?: boolean;
  repeatCount?: number;
  repeatSections?: TrailRunningInterval[];
}
