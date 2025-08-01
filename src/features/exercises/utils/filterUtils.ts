import { Exercise, FilterState } from "../types";

export const filterExercises = (
  exercises: Exercise[],
  searchTerm: string,
  selectedCategory: string,
  filters: FilterState
): Exercise[] => {
  return exercises.filter((exercise) => {
    // Search filter
    const matchesSearch =
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.muscleGroups.some((muscle) =>
        muscle.toLowerCase().includes(searchTerm.toLowerCase())
      );

    // Category filter
    const matchesCategory =
      selectedCategory === "All" || exercise.category === selectedCategory;

    // Advanced filters
    const matchesDifficulty =
      filters.difficulties.length === 0 ||
      filters.difficulties.includes(exercise.difficulty);

    const matchesMuscleGroup =
      filters.muscleGroups.length === 0 ||
      filters.muscleGroups.some((group) =>
        exercise.muscleGroups.includes(group)
      );

    const matchesEquipment =
      filters.equipment.length === 0 ||
      (exercise.equipment &&
        filters.equipment.some((eq) => exercise.equipment!.includes(eq)));

    return (
      matchesSearch &&
      matchesCategory &&
      matchesDifficulty &&
      matchesMuscleGroup &&
      matchesEquipment
    );
  });
};

export const getActiveFilterCount = (filters: FilterState): number => {
  return (
    filters.difficulties.length +
    filters.muscleGroups.length +
    filters.equipment.length
  );
}; 