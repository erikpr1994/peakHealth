/**
 * Exercise constants and enums
 */

// Exercise categories
export const CATEGORY = {
  STRENGTH: 'Strength',
  CARDIO: 'Cardio',
  FLEXIBILITY: 'Flexibility',
  BALANCE: 'Balance',
} as const;

export type Category = (typeof CATEGORY)[keyof typeof CATEGORY];

// Difficulty levels
export const DIFFICULTY = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
  UNKNOWN: 'Unknown',
} as const;

export type Difficulty = (typeof DIFFICULTY)[keyof typeof DIFFICULTY];

// Equipment types
export const EQUIPMENT = {
  BARBELL: 'Barbell',
  DUMBBELL: 'Dumbbell',
  BODYWEIGHT: 'Bodyweight',
  MACHINE: 'Machine',
  RESISTANCE_BAND: 'Resistance Band',
  KETTLEBELL: 'Kettlebell',
  CABLE: 'Cable',
  BENCH: 'Bench',
  INCLINE_BENCH: 'Incline Bench',
  DECLINE_BENCH: 'Decline Bench',
  PULLUP_BAR: 'Pull-up Bar',
  SQUAT_RACK: 'Squat Rack',
  STEP: 'Step',
} as const;

export type Equipment = (typeof EQUIPMENT)[keyof typeof EQUIPMENT];

// Muscle groups
export const MUSCLE_GROUP = {
  CHEST: 'Chest',
  BACK: 'Back',
  LEGS: 'Legs',
  ARMS: 'Arms',
  SHOULDERS: 'Shoulders',
  CORE: 'Core',
  GLUTES: 'Glutes',
  BICEPS: 'Biceps',
  TRICEPS: 'Triceps',
  CARDIO: 'Cardio',
  FULL_BODY: 'Full Body',
  UPPER_CHEST: 'Upper Chest',
  LOWER_CHEST: 'Lower Chest',
  FRONT_DELTS: 'Front Delts',
  OBLIQUES: 'Obliques',
  QUADRICEPS: 'Quadriceps',
  HAMSTRINGS: 'Hamstrings',
} as const;

export type MuscleGroup = (typeof MUSCLE_GROUP)[keyof typeof MUSCLE_GROUP];
