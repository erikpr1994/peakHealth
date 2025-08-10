export type WorkoutType =
  | 'strength'
  | 'running'
  | 'trail-running'
  | 'swimming'
  | 'cycling';

export type ProgressionMethod =
  | 'linear'
  | 'dual'
  | 'inverse-pyramid'
  | 'myo-reps'
  | 'widowmaker'
  | 'amrap';

export interface WorkoutSet {
  id: string;
  setNumber: number;
  setType: 'normal' | 'warmup' | 'failure';
  repType: 'fixed' | 'range';
  reps?: number | null;
  repsMin?: number;
  repsMax?: number;
  weight?: number | null;
  rpe?: number | null;
  notes: string;
}

export interface Exercise {
  id: string;
  name: string;
  category?: string;
  muscleGroups?: string[];
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

export interface WorkoutSection {
  id: string;
  name: string;
  type: 'warmup' | 'basic' | 'cooldown' | 'emom' | 'tabata';
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
    weeks: string;
    day: string;
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
    weeks: string;
    day: string;
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

// Routine List Types
export interface Routine {
  id: string;
  name: string;
  description: string;
  daysPerWeek: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  goal: 'Strength' | 'Hypertrophy' | 'Endurance' | 'Weight Loss';
  isActive: boolean;
  isFavorite: boolean;
  schedule: boolean[]; // [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
  progress: {
    current: number;
    total: number;
  };
  lastUsed?: string;
  objectives?: string[];
  totalWorkouts?: number;
  completedWorkouts?: number;
  estimatedDuration?: string;
}

// Routine Detail Types
export interface ExerciseDetail {
  id: string;
  name: string;
  sets: Array<{
    reps?: string;
    weight?: string;
    duration?: string;
    restTime: string;
  }>;
  notes?: string;
  muscleGroups: string[];
}

export interface WorkoutDay {
  id: string;
  name: string;
  exercises: ExerciseDetail[];
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface RoutineData {
  id: string;
  name: string;
  description: string;
  duration: number; // weeks
  daysPerWeek: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  goal: 'Strength' | 'Hypertrophy' | 'Endurance' | 'Weight Loss';
  isActive: boolean;
  isFavorite: boolean;
  progress: {
    currentWeek: number;
    totalWeeks: number;
    completedWorkouts: number;
    totalWorkouts: number;
  };
  schedule: boolean[]; // [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
  workoutDays: WorkoutDay[];
  createdDate: string;
  lastModified: string;
}
