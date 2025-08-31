'use client';

import React from 'react';
import { Modal, Button } from '@peakhealth/ui';
import type { UnilateralMode } from '@peakhealth/routines-types';
import './UnilateralExerciseModal.css';

export interface UnilateralExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  exerciseId: string;
  currentMode?: UnilateralMode;
  onModeSelect: (exerciseId: string, mode: UnilateralMode) => void;
}

interface UnilateralOption {
  mode: UnilateralMode;
  title: string;
  description: string;
  icon: string;
}

const UNILATERAL_OPTIONS: UnilateralOption[] = [
  {
    mode: 'simultaneous',
    title: 'Simultaneous',
    description: 'Perform the exercise with both limbs at the same time.',
    icon: '🔄',
  },
  {
    mode: 'alternating',
    title: 'Alternating (within the same set)',
    description:
      'Alternate between the left and right limb for each rep within a single set.',
    icon: '⚡',
  },
  {
    mode: 'sequential',
    title: 'Sequential (alternating sets)',
    description:
      'Complete all sets for one limb before moving on to the other.',
    icon: '📋',
  },
];

export const UnilateralExerciseModal: React.FC<
  UnilateralExerciseModalProps
> = ({
  isOpen,
  onClose,
  exerciseId,
  currentMode = 'simultaneous',
  onModeSelect,
}) => {
  const handleModeSelect = (mode: UnilateralMode) => {
    onModeSelect(exerciseId, mode);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Configure Unilateral Exercise"
      showCloseButton={true}
    >
      <div className="unilateral-exercise-modal">
        <div className="unilateral-exercise-modal__description">
          Choose how you want to perform this unilateral exercise:
        </div>

        <div className="unilateral-exercise-modal__options">
          {UNILATERAL_OPTIONS.map(option => (
            <div
              key={option.mode}
              className={`unilateral-exercise-modal__option ${
                currentMode === option.mode
                  ? 'unilateral-exercise-modal__option--selected'
                  : ''
              }`}
            >
              <div className="unilateral-exercise-modal__option-header">
                <span className="unilateral-exercise-modal__option-icon">
                  {option.icon}
                </span>
                <h3 className="unilateral-exercise-modal__option-title">
                  {option.title}
                </h3>
              </div>

              <p className="unilateral-exercise-modal__option-description">
                {option.description}
              </p>

              <Button
                variant={currentMode === option.mode ? 'default' : 'outline'}
                size="lg"
                className="unilateral-exercise-modal__option-button"
                onClick={() => handleModeSelect(option.mode)}
              >
                {currentMode === option.mode
                  ? 'Currently Selected'
                  : 'Select This Option'}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
