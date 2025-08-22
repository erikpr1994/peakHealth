export type SectionType =
  | 'warm-up'
  | 'basic'
  | 'cooldown'
  | 'emom'
  | 'tabata'
  | 'amrap';

export type ProgressionMethod =
  | 'linear'
  | 'dual'
  | 'inverse-pyramid'
  | 'myo-reps'
  | 'widowmaker'
  | 'amrap';

export type SetType = 'working' | 'warm-up' | 'failure' | 'drop';

export type EquipmentType =
  | 'barbell'
  | 'dumbbell'
  | 'bodyweight'
  | 'band'
  | 'machine'
  | 'cable';

export interface ExerciseInstruction {
  stepByStep: {
    title: string;
    description: string;
  }[];
  proTips: string[];
  commonMistakes: string[];
}

export interface SetData {
  setNumber: number;
  weight: string;
  reps: number;
  rpe: number;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight: string;
  rpe: number;
  restTime: number;
  progressionMethod: ProgressionMethod;
  setTypes: SetType[];
  instructions?: string;
  muscleGroups: string[];
  imageUrl?: string;
  videoUrl?: string;
  isUnilateral?: boolean;
  unilateralMode?: 'sequential' | 'alternating' | 'rest-between';
  lastWorkoutData?: {
    date: string;
    sets: SetData[];
  };
  equipmentType?: EquipmentType;
  bandType?: string; // For band exercises: "light", "medium", "heavy"
  detailedInstructions?: ExerciseInstruction;
}

export interface WorkoutSection {
  id: string;
  name: string;
  type: SectionType;
  exercises: Exercise[];
  // Section-specific timing
  duration?: number; // For AMRAP, Tabata total time
  workTime?: number; // For Tabata work intervals
  restTime?: number; // For Tabata rest intervals
  rounds?: number; // For Tabata rounds
  intervalTime?: number; // For EMOM (usually 60 seconds)
  amrapRestTime?: number; // For AMRAP rest between rounds
}

export interface WorkoutRoutine {
  id: string;
  name: string;
  estimatedTime: number;
  totalExercises: number;
  sections: WorkoutSection[];
}

export interface CompletedSet {
  exerciseId: string;
  setNumber: number;
  actualReps: number;
  actualWeight: string;
  actualRpe: number;
  notes: string;
  completedAt: Date;
  setType: SetType;
  mediaUrls: string[];
}
