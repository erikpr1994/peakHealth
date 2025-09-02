'use client';

import React, { useState, useEffect } from 'react';
import { useExercise } from '../../../hooks/useExercise';
import type { WidowmakerEditorProps } from './WidowmakerEditor.types';
import type {
  WorkoutSet,
  StrengthExercise,
  BodyweightExercise,
} from '@peakhealth/routines-types';
import './WidowmakerEditor.css';

export const WidowmakerEditor: React.FC<WidowmakerEditorProps> = ({
  exerciseId,
  workoutId,
  sectionId,
}) => {
  const { exercise, setIds, addSet, removeSet } = useExercise(
    workoutId,
    sectionId,
    exerciseId
  );

  const [targetReps, setTargetReps] = useState(20);
  const [inputValue, setInputValue] = useState('20');

  // Initialize target reps from existing sets if they exist
  useEffect(() => {
    if (setIds && setIds.length > 0) {
      // For widowmaker, we expect only one set
      // Cast to StrengthExercise or BodyweightExercise to access sets
      const typedExercise = exercise as StrengthExercise | BodyweightExercise;
      const existingSet = typedExercise?.sets?.find(
        (set: WorkoutSet) => set.setType === 'working'
      );
      if (existingSet && existingSet.reps) {
        setTargetReps(existingSet.reps);
        setInputValue(existingSet.reps.toString());
      }
    }
  }, [exercise, setIds]);

  // Handle target reps change - allow any input temporarily
  const handleTargetRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle blur event to update the set
  const handleTargetRepsBlur = () => {
    const newTargetReps = parseInt(inputValue, 10);

    // Validate the input
    if (isNaN(newTargetReps) || newTargetReps <= 0) {
      // Reset to last valid value if input is invalid
      setInputValue(targetReps.toString());
      return;
    }

    // Update the target reps state
    setTargetReps(newTargetReps);

    // Clear existing sets first
    if (setIds && setIds.length > 0) {
      setIds.forEach(setId => {
        removeSet(setId);
      });
    }

    // Add the widowmaker set
    const widowmakerSet: WorkoutSet = {
      _id: `temp-${Date.now()}`,
      setNumber: 1,
      setType: 'working' as const,
      repType: 'fixed' as const,
      reps: newTargetReps,
      notes: 'Widowmaker set',
      restAfter: '0s',
    };

    addSet(widowmakerSet);
  };

  return (
    <div className="widowmaker-editor">
      <div className="widowmaker-config">
        <label htmlFor="target-reps" className="widowmaker-label">
          Target Reps:
        </label>
        <input
          id="target-reps"
          type="number"
          min="1"
          value={inputValue}
          onChange={handleTargetRepsChange}
          onBlur={handleTargetRepsBlur}
          className="widowmaker-input"
        />
      </div>
      <div className="widowmaker-info">
        <p>Widowmaker: Single high-rep set targeting {targetReps} reps</p>
      </div>
    </div>
  );
};
