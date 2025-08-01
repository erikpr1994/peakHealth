export const muscleGroups = [
  "Chest",
  "Back", 
  "Legs", 
  "Arms", 
  "Shoulders", 
  "Core", 
  "Glutes", 
  "Biceps", 
  "Triceps", 
  "Cardio", 
  "Full Body",
  "Upper Chest",
  "Lower Chest",
  "Front Delts",
  "Obliques",
  "Quadriceps",
  "Hamstrings"
] as const;

export type MuscleGroup = typeof muscleGroups[number]; 