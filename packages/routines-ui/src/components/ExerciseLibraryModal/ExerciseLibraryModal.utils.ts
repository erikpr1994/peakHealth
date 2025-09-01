// Filter constants for the Exercise Library Modal
export const EXERCISE_CATEGORIES = [
  'All',
  'Strength',
  'Cardio',
  'Flexibility',
  'Balance',
] as const;

export const EXERCISE_MUSCLE_GROUPS = [
  'All',
  'Chest',
  'Back',
  'Legs',
  'Arms',
  'Shoulders',
  'Core',
  'Glutes',
  'Full Body',
] as const;

export const EXERCISE_DIFFICULTIES = [
  'All',
  'Beginner',
  'Intermediate',
  'Advanced',
] as const;

// Type for filter values
export type ExerciseCategory = (typeof EXERCISE_CATEGORIES)[number];
export type ExerciseDifficulty = (typeof EXERCISE_DIFFICULTIES)[number];
export type ExerciseMuscleGroup = (typeof EXERCISE_MUSCLE_GROUPS)[number];

// Helper function to check if a value is "All" (meaning no filter)
export const isNoFilter = (value: string): boolean => value === 'All';

// Helper function to convert category filter value to API parameter
export const toApiCategoryFilter = (
  value: ExerciseCategory
): 'Strength' | 'Cardio' | 'Flexibility' | 'Balance' | undefined =>
  value === 'All' ? undefined : value;

// Helper function to convert difficulty filter value to API parameter
export const toApiDifficultyFilter = (
  value: ExerciseDifficulty
): 'Beginner' | 'Intermediate' | 'Advanced' | undefined =>
  value === 'All' ? undefined : value;

// Helper function to convert muscle group filter value to API parameter
export const toApiMuscleGroupFilter = (
  value: ExerciseMuscleGroup
): string | undefined => (value === 'All' ? undefined : value);
