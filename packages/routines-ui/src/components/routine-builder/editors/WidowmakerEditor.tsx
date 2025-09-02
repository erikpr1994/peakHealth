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
      }
    }
  }, [exercise, setIds]);

  // Handle target reps change
  const handleTargetRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTargetReps = parseInt(e.target.value, 10);
    if (!isNaN(newTargetReps) && newTargetReps > 0) {
      setTargetReps(newTargetReps);
    }
  };

  // Handle blur event to update the set
  const handleTargetRepsBlur = () => {
    // Clear existing working sets first
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
      reps: targetReps,
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
          value={targetReps}
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
