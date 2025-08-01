import { useExerciseContext } from "../context/ExerciseContext";

export function useExerciseSearch() {
  const { searchTerm, handleSearchChange, clearSearch } = useExerciseContext();

  return {
    searchTerm,
    handleSearchChange,
    clearSearch,
  };
}
