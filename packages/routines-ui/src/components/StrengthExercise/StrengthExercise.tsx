'use client';

import React, { useState, useEffect } from 'react';
import { Accordion } from '@peakhealth/ui';
import { useExercise } from '../../hooks/useExercise';
import { SetsTable } from '../SetsTable';
import { UnilateralExerciseModal } from '../UnilateralExerciseModal';
import { ApproachSetGeneratorModal } from '../ApproachSetGeneratorModal';
import type { StrengthExerciseProps } from './StrengthExercise.types';
import type {
  ProgressionMethod,
  UnilateralMode,
  StrengthExercise as StrengthExerciseType,
  BodyweightExercise,
} from '@peakhealth/routines-types';
import './StrengthExercise.css';

export const StrengthExercise: React.FC<StrengthExerciseProps> = ({
  workoutId,
  sectionId,
  exerciseId,
  showApproachSetsToggle = true,
  showProgressionMethods = true,
}) => {
  const { exercise, removeExercise, updateExercise } = useExercise(
    workoutId,
    sectionId,
    exerciseId
  );

  const [isUnilateralModalOpen, setIsUnilateralModalOpen] = useState(false);
  const [isApproachModalOpen, setIsApproachModalOpen] = useState(false);

  // Auto-open unilateral modal for new unilateral exercises
  useEffect(() => {
    const isUnilateral =
      exercise?.type === 'strength' || exercise?.type === 'bodyweight';
    const hasUnilateralConfig = (exercise as any)?.unilateralMode;
    if (isUnilateral && !hasUnilateralConfig) {
      // Only auto-open for new exercises without unilateral config
      // setIsUnilateralModalOpen(true);
    }
  }, [exercise]);

  if (!exercise) {
    return null;
  }

  const handleDeleteExercise = () => {
    removeExercise();
  };

  const handleUnilateralModeSelect = (mode: string) => {
    // Cast to strength/bodyweight exercise to set unilateralMode
    updateExercise({ unilateralMode: mode as UnilateralMode });
  };

  const handleGenerateWarmupSets = (
    exerciseId: string,
    warmupSets: Array<{ weight: number; reps: number; percentage: number }>
  ) => {
    // TODO: Implement warmup set generation logic
    // This will be implemented when the actual warmup set generation logic is added
    void exerciseId;
    void warmupSets;
  };

  const handleProgressionMethodChange = (method: string) => {
    updateExercise({ progressionMethod: method as ProgressionMethod });
  };

  const handleRestBetweenSetsChange = (rest: string) => {
    // Convert to duration string format (for now just use seconds)
    updateExercise({ restBetweenSets: `${parseInt(rest) || 0}s` });
  };

  return (
    <>
      <Accordion open={true}>
        <Accordion.Header>
          <div className="strength-exercise-header">
            <span className="strength-exercise-name">
              {exercise.exerciseId || 'Exercise'}
            </span>
            <button
              type="button"
              className="strength-exercise-delete-button"
              onClick={handleDeleteExercise}
              aria-label="Delete exercise"
            >
              🗑️
            </button>
          </div>
        </Accordion.Header>

        <Accordion.Content>
          <div className="strength-exercise-body">
            {/* Editor Controls */}
            <div className="strength-exercise-controls">
              <div className="control-group">
                <label htmlFor={`rest-${exerciseId}`} className="control-label">
                  Rest Between Sets (seconds)
                </label>
                <input
                  id={`rest-${exerciseId}`}
                  type="number"
                  min="0"
                  value={
                    exercise.restBetweenSets
                      ? parseInt(exercise.restBetweenSets)
                      : 0
                  }
                  onChange={e => handleRestBetweenSetsChange(e.target.value)}
                  className="control-input"
                />
              </div>

              {showProgressionMethods && (
                <div className="control-group">
                  <label
                    htmlFor={`progression-${exerciseId}`}
                    className="control-label"
                  >
                    Progression Method
                  </label>
                  <select
                    id={`progression-${exerciseId}`}
                    value={
                      (exercise as StrengthExerciseType | BodyweightExercise)
                        .progressionMethod || 'linear'
                    }
                    onChange={e =>
                      handleProgressionMethodChange(e.target.value)
                    }
                    className="control-select"
                  >
                    <option value="linear">Linear Progression</option>
                    <option value="dual">Dual Progression</option>
                    <option value="inverse-pyramid">Inverse Pyramid</option>
                    <option value="myo-reps">Myo-Reps</option>
                    <option value="widowmaker">Widowmaker</option>
                    <option value="amrap">AMRAP</option>
                  </select>
                </div>
              )}
            </div>

            {/* Unilateral Configuration */}
            {(exercise.type === 'strength' ||
              exercise.type === 'bodyweight') && (
              <div className="unilateral-config-section">
                <button
                  type="button"
                  className="unilateral-config-button"
                  onClick={() => setIsUnilateralModalOpen(true)}
                >
                  Edit Unilateral Config
                </button>
                <span className="unilateral-config-info">
                  Current:{' '}
                  {(exercise as StrengthExerciseType | BodyweightExercise)
                    .unilateralMode || 'Not configured'}
                </span>
              </div>
            )}

            {/* Approach Sets Wizard */}
            {showApproachSetsToggle && (
              <div className="approach-sets-section">
                <button
                  type="button"
                  className="approach-sets-button"
                  onClick={() => setIsApproachModalOpen(true)}
                >
                  + Generate Warmup Sets
                </button>
              </div>
            )}

            {/* Sets Table */}
            <SetsTable
              workoutId={workoutId}
              sectionId={sectionId}
              exerciseId={exerciseId}
            />
          </div>
        </Accordion.Content>
      </Accordion>

      {/* Modals */}
      <UnilateralExerciseModal
        isOpen={isUnilateralModalOpen}
        onClose={() => setIsUnilateralModalOpen(false)}
        exerciseId={exerciseId}
        currentMode={
          (exercise as StrengthExerciseType | BodyweightExercise).unilateralMode
        }
        onModeSelect={handleUnilateralModeSelect}
      />

      <ApproachSetGeneratorModal
        isOpen={isApproachModalOpen}
        onClose={() => setIsApproachModalOpen(false)}
        exerciseId={exerciseId}
        onGenerateSets={handleGenerateWarmupSets}
      />
    </>
  );
};
