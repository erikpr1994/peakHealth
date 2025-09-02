'use client';

import React, { useState } from 'react';
import { generateInversePyramidSets } from '../../../utils/progressionGenerators';
import type { InversePyramidModalProps } from './InversePyramidEditor.types';
import './InversePyramidModal.css';

export const InversePyramidModal: React.FC<InversePyramidModalProps> = ({
  isOpen,
  onClose,
  onGenerateSets,
}) => {
  const [formData, setFormData] = useState({
    numberOfSets: 4,
    startWeight: 100,
    endWeight: 70,
    startReps: 5,
    endReps: 12,
  });

  const [errors, setErrors] = useState<string[]>([]);

  if (!isOpen) {
    return null;
  }

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      setFormData(prev => ({ ...prev, [field]: numValue }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    if (formData.numberOfSets < 2) {
      newErrors.push('Number of sets must be at least 2');
    }

    if (formData.startWeight <= formData.endWeight) {
      newErrors.push('Start weight must be greater than end weight');
    }

    if (formData.startReps >= formData.endReps) {
      newErrors.push('Start reps must be less than end reps');
    }

    if (formData.startWeight <= 0 || formData.endWeight <= 0) {
      newErrors.push('Weights must be positive numbers');
    }

    if (formData.startReps <= 0 || formData.endReps <= 0) {
      newErrors.push('Reps must be positive numbers');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleGenerateSets = () => {
    if (!validateForm()) {
      return;
    }

    try {
      const sets = generateInversePyramidSets(formData);

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
    <div className="inverse-pyramid-modal-overlay">
      <div className="inverse-pyramid-modal">
        <div className="inverse-pyramid-modal-header">
          <h2>Configure Inverse Pyramid</h2>
          <button
            type="button"
            className="inverse-pyramid-modal-close"
            onClick={handleClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className="inverse-pyramid-modal-body">
          {errors.length > 0 && (
            <div className="inverse-pyramid-modal-errors">
              {errors.map((error, index) => (
                <div key={index} className="error-message">
                  {error}
                </div>
              ))}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="numberOfSets">Number of Sets</label>
            <input
              id="numberOfSets"
              type="number"
              min="2"
              max="10"
              value={formData.numberOfSets}
              onChange={e => handleInputChange('numberOfSets', e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="startWeight">Start Weight (lbs)</label>
            <input
              id="startWeight"
              type="number"
              min="1"
              value={formData.startWeight}
              onChange={e => handleInputChange('startWeight', e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="endWeight">End Weight (lbs)</label>
            <input
              id="endWeight"
              type="number"
              min="1"
              value={formData.endWeight}
              onChange={e => handleInputChange('endWeight', e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="startReps">Start Reps</label>
            <input
              id="startReps"
              type="number"
              min="1"
              value={formData.startReps}
              onChange={e => handleInputChange('startReps', e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="endReps">End Reps</label>
            <input
              id="endReps"
              type="number"
              min="1"
              value={formData.endReps}
              onChange={e => handleInputChange('endReps', e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        <div className="inverse-pyramid-modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleGenerateSets}
          >
            Generate Sets
          </button>
        </div>
      </div>
    </div>
  );
};
