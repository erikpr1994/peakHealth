import { useState } from "react";
import { FilterState } from "../types";

export function useExerciseFilters() {
  const [filters, setFilters] = useState<FilterState>({
    difficulties: [],
    muscleGroups: [],
    equipment: [],
  });

  const handleFilterChange = (type: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };

  const clearFilters = () => {
    setFilters({
      difficulties: [],
      muscleGroups: [],
      equipment: [],
    });
  };

  const getActiveFilterCount = () => {
    return (
      filters.difficulties.length +
      filters.muscleGroups.length +
      filters.equipment.length
    );
  };

  return {
    filters,
    handleFilterChange,
    clearFilters,
    getActiveFilterCount,
  };
} 