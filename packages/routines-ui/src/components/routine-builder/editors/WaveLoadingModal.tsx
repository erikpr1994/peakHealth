'use client';

import React, { useState } from 'react';
import { generateWaveLoadingSets } from '../../../utils/progressionGenerators';
import type { WaveLoadingModalProps } from './WaveLoadingEditor.types';
import './WaveLoadingModal.css';

export const WaveLoadingModal: React.FC<WaveLoadingModalProps> = ({
  isOpen,
  onClose,
  onGenerateSets,
}) => {
  const [formData, setFormData] = useState({
    numberOfWaves: 3,
    setsPerWave: 2,
    baseWeight: 100,
    weightIncrement: 10,
    baseReps: 8,
    repsDecrement: 1,
  });

  const [errors, setErrors] = useState<string[]>([]);

  // Helper function to calculate maximum allowed repsDecrement
  const getMaxRepsDecrement = () => {
    if (formData.numberOfWaves <= 1) return formData.baseReps - 1;
    return Math.floor((formData.baseReps - 1) / (formData.numberOfWaves - 1));
  };

  if (!isOpen) {
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseInt(value) || 0,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    if (formData.numberOfWaves < 1) {
      newErrors.push('Number of waves must be at least 1');
    }

    if (formData.setsPerWave < 1) {
      newErrors.push('Sets per wave must be at least 1');
    }

    if (formData.baseWeight <= 0) {
      newErrors.push('Base weight must be greater than 0');
    }

    if (formData.weightIncrement < 0) {
      newErrors.push('Weight increment must be 0 or greater');
    }

    if (formData.baseReps <= 0) {
      newErrors.push('Base reps must be greater than 0');
    }

    if (formData.repsDecrement < 0) {
      newErrors.push('Reps decrement must be 0 or greater');
    }

    // Check that repsDecrement doesn't exceed the maximum allowed value
    const maxRepsDecrement = getMaxRepsDecrement();
    if (formData.repsDecrement > maxRepsDecrement) {
      newErrors.push(
        `Reps decrement too high: maximum allowed is ${maxRepsDecrement} to ensure last wave has at least 1 rep`
      );
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleGenerateSets = () => {
    if (!validateForm()) {
      return;
    }

    try {
      const sets = generateWaveLoadingSets(formData);

      // Ensure weight and reps are defined before calling onGenerateSets
      const validSets = sets.filter(
        set => set.weight !== undefined && set.reps !== undefined
      );

      if (validSets.length === sets.length) {
        onGenerateSets(validSets as Array<{ weight: number; reps: number }>);
        onClose();
      } else {
        setErrors(['Some sets could not be generated properly']);
      }
    } catch (error) {
      setErrors([
        error instanceof Error ? error.message : 'Failed to generate sets',
      ]);
    }
  };

  const handleClose = () => {
    setErrors([]);
    onClose();
  };

  return (
    <div className="wave-loading-modal-overlay">
      <div className="wave-loading-modal">
        <div className="wave-loading-modal-header">
          <h2>Configure Wave Loading</h2>
          <button
            type="button"
            className="wave-loading-modal-close"
            onClick={handleClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className="wave-loading-modal-body">
          {errors.length > 0 && (
            <div className="wave-loading-modal-errors">
              {errors.map((error, index) => (
                <div key={index} className="wave-loading-modal-error">
                  {error}
                </div>
              ))}
            </div>
          )}

          <form onSubmit={e => e.preventDefault()}>
            <div className="wave-loading-form-group">
              <label htmlFor="numberOfWaves">Number of Waves</label>
              <input
                type="number"
                id="numberOfWaves"
                name="numberOfWaves"
                value={formData.numberOfWaves}
                onChange={handleInputChange}
                min="1"
                max="10"
              />
            </div>

            <div className="wave-loading-form-group">
              <label htmlFor="setsPerWave">Sets per Wave</label>
              <input
                type="number"
                id="setsPerWave"
                name="setsPerWave"
                value={formData.setsPerWave}
                onChange={handleInputChange}
                min="1"
                max="5"
              />
            </div>

            <div className="wave-loading-form-group">
              <label htmlFor="baseWeight">Base Weight (lbs)</label>
              <input
                type="number"
                id="baseWeight"
                name="baseWeight"
                value={formData.baseWeight}
                onChange={handleInputChange}
                min="1"
                step="5"
              />
            </div>

            <div className="wave-loading-form-group">
              <label htmlFor="weightIncrement">Weight Increment (lbs)</label>
              <input
                type="number"
                id="weightIncrement"
                name="weightIncrement"
                value={formData.weightIncrement}
                onChange={handleInputChange}
                min="0"
                step="5"
              />
            </div>

            <div className="wave-loading-form-group">
              <label htmlFor="baseReps">Base Reps</label>
              <input
                type="number"
                id="baseReps"
                name="baseReps"
                value={formData.baseReps}
                onChange={handleInputChange}
                min="1"
                max="20"
              />
            </div>

            <div className="wave-loading-form-group">
              <label htmlFor="repsDecrement">Reps Decrement</label>
              <input
                type="number"
                id="repsDecrement"
                name="repsDecrement"
                value={formData.repsDecrement}
                onChange={handleInputChange}
                min="0"
                max={getMaxRepsDecrement()}
              />
            </div>

            <div className="wave-loading-modal-actions">
              <button
                type="button"
                className="wave-loading-modal-cancel"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="wave-loading-modal-generate"
                onClick={handleGenerateSets}
              >
                Generate Sets
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
