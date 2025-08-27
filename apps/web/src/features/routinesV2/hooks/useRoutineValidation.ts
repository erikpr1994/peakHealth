import { useCallback } from 'react';
import type { RoutineCreationData } from '../types';

export const useRoutineValidation = (): {
  validateRoutine: (data: RoutineCreationData) => string | null;
} => {
  const validateRoutine = useCallback(
    (data: RoutineCreationData): string | null => {
      if (!data.name.trim()) {
        return 'Routine name is required';
      }

      if (data.name.length < 3) {
        return 'Routine name must be at least 3 characters long';
      }

      if (data.name.length > 100) {
        return 'Routine name must be less than 100 characters';
      }

      if (!data.description.trim()) {
        return 'Routine description is required';
      }

      if (data.description.length < 10) {
        return 'Routine description must be at least 10 characters long';
      }

      if (data.description.length > 500) {
        return 'Routine description must be less than 500 characters';
      }

      if (data.duration < 1) {
        return 'Duration must be at least 1 week';
      }

      if (data.duration > 52) {
        return 'Duration must be less than 52 weeks';
      }

      if (data.objectives.length === 0) {
        return 'At least one training objective is required';
      }

      if (data.objectives.some(obj => !obj.trim())) {
        return 'All training objectives must not be empty';
      }

      return null;
    },
    []
  );

  return {
    validateRoutine,
  };
};
