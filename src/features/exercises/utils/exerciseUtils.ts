import { Exercise, ExerciseVariant } from "../types";

export const getDifficultyColor = (difficulty: string) => {
  const colors = {
    Beginner: "bg-green-100 text-green-700",
    Intermediate: "bg-yellow-100 text-yellow-700",
    Advanced: "bg-red-100 text-red-700",
  };
  return colors[difficulty as keyof typeof colors] || colors.Intermediate;
};

export const getDifficultyColorWithBorder = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "Intermediate":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "Advanced":
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

export const getCategoryColor = (category: string) => {
  const colors = {
    Strength: "bg-indigo-100 text-indigo-700",
    Cardio: "bg-green-100 text-green-700",
    Flexibility: "bg-purple-100 text-purple-700",
    Balance: "bg-yellow-100 text-yellow-700",
  };
  return colors[category as keyof typeof colors] || colors.Strength;
};

export const getEffectiveExercise = (
  exercise: Exercise,
  selectedVariant?: ExerciseVariant
): Exercise => {
  if (!selectedVariant) return exercise;

  return {
    ...exercise,
    name: selectedVariant.name,
    description: selectedVariant.description,
    muscleGroups: selectedVariant.muscleGroups || exercise.muscleGroups,
    equipment: selectedVariant.equipment || exercise.equipment,
    difficulty: selectedVariant.difficulty || exercise.difficulty,
    instructions: selectedVariant.instructions || exercise.instructions,
  };
};

export const createVariantExercise = (
  exercise: Exercise,
  variant: ExerciseVariant
): Exercise => {
  return {
    ...exercise,
    id: variant.id,
    name: variant.name,
    description: variant.description,
    muscleGroups: variant.muscleGroups || exercise.muscleGroups,
    equipment: variant.equipment || exercise.equipment,
    difficulty: variant.difficulty || exercise.difficulty,
    instructions: variant.instructions || exercise.instructions,
  };
};
