'use client';

import React, { useState } from 'react';
import { SetsTable } from '../../SetsTable';
import { WaveLoadingModal } from './WaveLoadingModal';
import { useExercise } from '../../../hooks/useExercise';
import type { WaveLoadingEditorProps } from './WaveLoadingEditor.types';
import type {
  StrengthExercise,
  BodyweightExercise,
  WorkoutSet,
} from '@peakhealth/routines-types';
import './WaveLoadingEditor.css';

export const WaveLoadingEditor: React.FC<WaveLoadingEditorProps> = ({
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

  const handleGenerateSets = (
    sets: Array<{ weight: number; reps: number }>
  ) => {
    // Clear existing working sets first
    if (setIds && setIds.length > 0) {
      setIds.forEach(setId => {
        removeSet(setId);
      });
    }

    // Add new sets
    sets.forEach((set, index) => {
      const newSet: WorkoutSet = {
        _id: `temp-${Date.now()}-${index}`,
        setNumber: index + 1,
        setType: 'working',
        repType: 'fixed',
        weight: set.weight,
        reps: set.reps,
        notes: '',
        restAfter: '0s',
      };

      addSet(newSet);
    });
  };

  // Cast exercise to the correct type to access progressionMethod
  const _typedExercise = exercise as StrengthExercise | BodyweightExercise;

  return (
    <div className="wave-loading-editor">
      {/* Display existing sets */}
      <SetsTable
        workoutId={workoutId}
        sectionId={sectionId}
        exerciseId={exerciseId}
      />

      {/* Configure Wave Loading button */}
      <div className="wave-loading-editor-actions">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="configure-wave-loading-button"
        >
          Configure Wave Loading
        </button>
      </div>

      {/* Wave Loading Configuration Modal */}
      <WaveLoadingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onGenerateSets={handleGenerateSets}
      />
    </div>
  );
};
