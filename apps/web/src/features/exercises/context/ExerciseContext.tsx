import React, { createContext, useContext, useState, ReactNode } from 'react';

import { FilterState } from '../types';

interface ExerciseContextType {
  searchTerm: string;
  handleSearchChange: (value: string) => void;
  clearSearch: () => void;
  filters: FilterState;
  handleFilterChange: (type: keyof FilterState, value: string) => void;
  clearFilters: () => void;
  getActiveFilterCount: () => number;
}

const ExerciseContext = createContext<ExerciseContextType | undefined>(
  undefined
);

interface ExerciseProviderProps {
  children: ReactNode;
}

export const ExerciseProvider = ({ children }: ExerciseProviderProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    difficulties: [],
    muscleGroups: [],
    equipment: [],
  });

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const handleFilterChange = (type: keyof FilterState, value: string) => {
    setFilters(prev => {
      const currentArray = prev[type] as any[];
      const isIncluded = currentArray.includes(value);

      return {
        ...prev,
        [type]: isIncluded
          ? currentArray.filter(item => item !== value)
          : [...currentArray, value],
      };
    });
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

  const value: ExerciseContextType = {
    searchTerm,
    handleSearchChange,
    clearSearch,
    filters,
    handleFilterChange,
    clearFilters,
    getActiveFilterCount,
  };

  return (
    <ExerciseContext.Provider value={value}>
      {children}
    </ExerciseContext.Provider>
  );
};

export function useExerciseContext() {
  const context = useContext(ExerciseContext);
  if (context === undefined) {
    throw new Error(
      'useExerciseContext must be used within an ExerciseProvider'
    );
  }
  return context;
}
