export type CompletedSet = {
  setNumber: number;
  weight: string;
  reps: number;
  rpe: number;
};

export type LastWorkoutData = {
  date: string;
  sets: CompletedSet[];
};

export type DetailedInstructions = {
  stepByStep: {
    title: string;
    description: string;
  }[];
  proTips: string[];
  commonMistakes: string[];
};

export type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight: string;
  rpe: number;
  restTime: number;
  progressionMethod: 'linear' | 'double-progression' | 'rpe' | 'percentage' | 'dual' | 'amrap' | 'emom';
  setTypes: ('warm-up' | 'working' | 'back-off' | 'drop')[];
  muscleGroups: string[];
  instructions: string;
  isUnilateral?: boolean;
  unilateralMode?: 'sequential' | 'alternating' | 'rest-between';
  equipmentType: 'barbell' | 'dumbbell' | 'machine' | 'cable' | 'bodyweight' | 'band' | 'kettlebell';
  bandType?: 'light' | 'medium' | 'heavy';
  lastWorkoutData?: LastWorkoutData;
  detailedInstructions?: DetailedInstructions;
};

export type SectionType = 'warm-up' | 'basic' | 'superset' | 'circuit' | 'emom' | 'amrap';

export type WorkoutSection = {
  id: string;
  name: string;
  type: SectionType;
  exercises: Exercise[];
  intervalTime?: number; // For EMOM
  duration?: number; // For AMRAP
  amrapRestTime?: number; // Rest time between AMRAP rounds
};

export type WorkoutRoutine = {
  id: string;
  name: string;
  estimatedTime: number;
  totalExercises: number;
  sections: WorkoutSection[];
  exercises: Exercise[]; // Flattened list of all exercises
};

