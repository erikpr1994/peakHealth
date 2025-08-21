// Exercise-related type definitions
// Extracted from various files to improve organization and maintainability

// Import and re-export WorkoutSet from workout module to ensure consistency
import type { WorkoutSet } from '../components/SetManagement';
export type { WorkoutSet };

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

// Database exercise types
export interface DatabaseSet {
  id: string;
  setNumber: number;
  setType: string;
  repType?: string;
  reps: number | null;
  weight: number | null;
  rpe: number | null;
  notes: string;
  rest_time?: string;
  duration?: number;
}

export interface DatabaseExercise {
  id: string;
  name: string;
  category?: string | null;
  muscle_groups?: string[];
  notes?: string;
  sets?: DatabaseSet[];
  exerciseLibraryId?: string; // Link to exercise library (exercise or variant ID)
  rest_timer?: string;
  rest_after?: string;
  progression_method?: string;
  has_approach_sets?: boolean;
  emom_reps?: number;
}

// Exercise selection and modal types
export interface ExerciseSelectionData {
  id: string;
  name: string;
  category?: string;
  muscleGroups?: string[];
}

export interface ExerciseVariantData {
  id: string;
  name: string;
  muscleGroups: string[];
  difficulty: string;
  equipment: string[];
  instructions: string[];
}
