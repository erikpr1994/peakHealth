export const exerciseCategories = [
  'All',
  'Strength',
  'Cardio',
  'Flexibility',
  'Balance',
] as const;

export type ExerciseCategory = (typeof exerciseCategories)[number];
