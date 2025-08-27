import { useCallback } from 'react';
import { useTranslations } from 'next-intl';
import type { RoutineCreationData } from '../types';

export const useRoutineValidation = (): {
  validateRoutine: (data: RoutineCreationData) => string | null;
} => {
  const t = useTranslations('routines');

  const validateRoutine = useCallback(
    (data: RoutineCreationData): string | null => {
      if (!data.name.trim()) {
        return t('validation.routineNameRequired');
      }

      if (data.name.length < 3) {
        return t('validation.routineNameMinLength');
      }

      if (data.name.length > 100) {
        return t('validation.routineNameMaxLength');
      }

      if (!data.description.trim()) {
        return t('validation.descriptionRequired');
      }

      if (data.description.length < 10) {
        return t('validation.descriptionMinLength');
      }

      if (data.description.length > 500) {
        return t('validation.descriptionMaxLength');
      }

      if (data.duration < 1) {
        return t('validation.durationMin');
      }

      if (data.duration > 52) {
        return t('validation.durationMax');
      }

      if (data.objectives.length === 0) {
        return t('validation.objectivesRequired');
      }

      if (data.objectives.some(obj => !obj.trim())) {
        return t('validation.objectivesNotEmpty');
      }

      if (!data.difficulty || data.difficulty.trim() === '') {
        return t('validation.difficultyRequired');
      }

      if (!data.goal || data.goal.trim() === '') {
        return t('validation.goalRequired');
      }

      return null;
    },
    [t]
  );

  return {
    validateRoutine,
  };
};
