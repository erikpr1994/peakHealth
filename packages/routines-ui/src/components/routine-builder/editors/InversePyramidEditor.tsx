'use client';

import React, { useState } from 'react';
import { SetsTable } from '../../SetsTable';
import { InversePyramidModal } from './InversePyramidModal';
import { useExercise } from '../../../hooks/useExercise';
import type { InversePyramidEditorProps } from './InversePyramidEditor.types';
import type {
  StrengthExercise,
  BodyweightExercise,
  WorkoutSet,
} from '@peakhealth/routines-types';
import './InversePyramidEditor.css';

export const InversePyramidEditor: React.FC<InversePyramidEditorProps> = ({
  exerciseId,
  workoutId,
  sectionId,
}) => {
  const { exercise, setIds, addSet, removeSet } = useExercise(
    workoutId,
    sectionId,
    exerciseId
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleGenerateSets = (
    sets: Array<{ weight: number; reps: number }>
  ) => {
    // Remove existing working sets
    if (setIds) {
      setIds.forEach(setId => {
        removeSet(setId);
      });
    }

    // Add new working sets
    sets.forEach((set, index) => {
      const newSet: WorkoutSet = {
        _id: `temp-${Date.now()}-${index}`,
        setNumber: index + 1,
        setType: 'working',
        repType: 'fixed',
        weight: set.weight,
        reps: set.reps,
      };

      addSet(newSet);
    });

    setIsModalOpen(false);
  };

  // Type guard to check if exercise has sets
  const hasSets = (
    exercise: any
  ): exercise is StrengthExercise | BodyweightExercise => {
    return 'sets' in exercise && Array.isArray(exercise.sets);
  };

  // Only render if exercise has sets
  if (!exercise || !hasSets(exercise)) {
    return null;
  }

  return (
    <div className="inverse-pyramid-editor">
      {/* Sets Table */}
      <SetsTable
        workoutId={workoutId}
        sectionId={sectionId}
        exerciseId={exerciseId}
      />

      {/* Configure Pyramid Button */}
      <button
        className="configure-pyramid-btn"
        onClick={handleOpenModal}
        type="button"
      >
        Configure Pyramid
      </button>

      {/* Inverse Pyramid Modal */}
      <InversePyramidModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onGenerateSets={handleGenerateSets}
      />
    </div>
  );
};
