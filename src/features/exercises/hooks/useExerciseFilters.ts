import { useExerciseContext } from "../context/ExerciseContext";

export function useExerciseFilters() {
  const { filters, handleFilterChange, clearFilters, getActiveFilterCount } =
    useExerciseContext();

  return {
    filters,
    handleFilterChange,
    clearFilters,
    getActiveFilterCount,
  };
}
