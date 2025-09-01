import { useState, useCallback } from 'react';
import { useSection } from './useSection';
import { createExercise, type ExerciseConfig } from '../utils/exerciseCreation';
import type { ExerciseLibraryExercise } from '../components/ExerciseLibraryModal/ExerciseLibraryModal.types';

export function useExerciseManagement(workoutId: string, sectionId: string) {
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);
  const { exerciseIds, addExercise } = useSection(workoutId, sectionId);

  const handleAddExercise = useCallback(() => {
    setIsExerciseModalOpen(true);
  }, []);

  const handleExerciseSelect = useCallback(
    (selectedExercises: ExerciseLibraryExercise[], config: ExerciseConfig) => {
      // Only add the first selected exercise to the section
      if (selectedExercises.length > 0) {
        const exercise = selectedExercises[0];
        const newExercise = createExercise(
          exercise,
          config,
          exerciseIds.length
        );
        addExercise(newExercise);
      }
    },
    [exerciseIds.length, addExercise]
  );

  const handleCloseExerciseModal = useCallback(() => {
    setIsExerciseModalOpen(false);
  }, []);

  return {
    isExerciseModalOpen,
    handleAddExercise,
    handleExerciseSelect,
    handleCloseExerciseModal,
  };
}
