import React, { useEffect, useState } from 'react';
import { useSet } from '../../hooks/useSet';
import { Exercise, SetType, WorkoutSet } from '@peakhealth/routines-types';
import styles from './SetRow.module.css';

interface SetRowProps {
  workoutId: string;
  sectionId: string;
  exerciseId: string;
  setId: string;
  exercise: Exercise;
  side?: 'left' | 'right'; // Only used when unilateralMode is 'sequential'
}

/**
 * SetRow Component
 * 
 * The most fundamental UI component of the routine builder.
 * Represents a single row in a sets table with conditional rendering
 * based on set type and unilateral configuration.
 */
export function SetRow({ 
  workoutId, 
  sectionId, 
  exerciseId, 
  setId, 
  exercise,
  side 
}: SetRowProps) {
  // Get set data and update functions from context
  const { set, updateSet } = useSet(workoutId, sectionId, exerciseId, setId);
  
  // Local state for form inputs (to avoid excessive context updates)
  const [localSet, setLocalSet] = useState<Partial<WorkoutSet>>({});
  
  // Initialize local state from context
  useEffect(() => {
    if (set) {
      setLocalSet(set);
    }
  }, [set]);

  // Early return if set is not found
  if (!set) {
    return <div className={styles.error}>Set not found</div>;
  }

  // Handle input changes
  const handleInputChange = (field: keyof WorkoutSet, value: unknown) => {
    setLocalSet(prev => ({ ...prev, [field]: value }));
  };

  // Update context on blur
  const handleBlur = (field: keyof WorkoutSet) => {
    if (localSet[field] !== set[field]) {
      updateSet({ [field]: localSet[field] });
    }
  };

  // Handle set type change
  const handleSetTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSetType = e.target.value as SetType;
    updateSet({ setType: newSetType });
    
    // Reset reps/duration based on new set type
    if (newSetType === 'working' || newSetType === 'warmup') {
      // Standard sets can have reps
    } else if (newSetType === 'failure') {
      // To failure sets don't need reps
      updateSet({ reps: undefined, repsMin: undefined, repsMax: undefined });
    }
  };

  // Determine if we should show dual progression inputs (min/max reps)
  const isDualProgression = exercise.progressionMethod === 'dual-linear';
  
  // Determine if this is a timed set
  const isTimedSet = set.repType === 'time';
  
  // Determine if this is a failure set
  const isFailureSet = set.setType === 'failure';

  // Determine unilateral configuration
  const unilateralMode = exercise.unilateralMode || 'simultaneous';
  const isUnilateral = unilateralMode !== 'simultaneous';
  
  // Determine side label for unilateral exercises
  const getSideLabel = () => {
    if (!isUnilateral) return '';
    
    if (unilateralMode === 'sequential' && side) {
      return side === 'left' ? 'Left' : 'Right';
    }
    
    if (unilateralMode === 'alternating') {
      return 'Left / Right';
    }
    
    return '';
  };
  
  const sideLabel = getSideLabel();

  return (
    <div className={styles.setRow}>
      {/* Set Number */}
      <div className={styles.setNumber}>
        Set {set.setNumber}
        {sideLabel && <span className={styles.sideLabel}> ({sideLabel})</span>}
      </div>
      
      {/* Set Type Dropdown */}
      <div className={styles.setTypeContainer}>
        <select
          value={set.setType}
          onChange={handleSetTypeChange}
          className={styles.setTypeSelect}
        >
          <option value="working">Standard</option>
          <option value="warmup">AMRAP</option>
          <option value="failure">To Failure</option>
          <option value="drop">Timed</option>
        </select>
      </div>
      
      {/* Reps Input - Conditional based on set type */}
      {!isTimedSet && !isFailureSet && (
        <div className={styles.repsContainer}>
          {isDualProgression ? (
            // Dual progression (min/max reps)
            <>
              <div className={styles.dualRepInput}>
                <label htmlFor={`min-reps-${setId}`}>Min</label>
                <input
                  id={`min-reps-${setId}`}
                  type="number"
                  min="0"
                  value={localSet.repsMin || ''}
                  onChange={(e) => handleInputChange('repsMin', parseInt(e.target.value) || 0)}
                  onBlur={() => handleBlur('repsMin')}
                  className={styles.repInput}
                />
              </div>
              <div className={styles.dualRepInput}>
                <label htmlFor={`max-reps-${setId}`}>Max</label>
                <input
                  id={`max-reps-${setId}`}
                  type="number"
                  min="0"
                  value={localSet.repsMax || ''}
                  onChange={(e) => handleInputChange('repsMax', parseInt(e.target.value) || 0)}
                  onBlur={() => handleBlur('repsMax')}
                  className={styles.repInput}
                />
              </div>
            </>
          ) : (
            // Standard reps
            <div className={styles.repInput}>
              <label htmlFor={`reps-${setId}`}>Reps</label>
              <input
                id={`reps-${setId}`}
                type="number"
                min="0"
                value={localSet.reps || ''}
                onChange={(e) => handleInputChange('reps', parseInt(e.target.value) || 0)}
                onBlur={() => handleBlur('reps')}
                className={styles.repInput}
              />
            </div>
          )}
        </div>
      )}
      
      {/* Time Input - Only for timed sets */}
      {isTimedSet && (
        <div className={styles.timeContainer}>
          <label htmlFor={`time-${setId}`}>Time (sec)</label>
          <input
            id={`time-${setId}`}
            type="number"
            min="0"
            value={localSet.duration || ''}
            onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 0)}
            onBlur={() => handleBlur('duration')}
            className={styles.timeInput}
          />
        </div>
      )}
      
      {/* Weight Input - For all set types */}
      <div className={styles.weightContainer}>
        <label htmlFor={`weight-${setId}`}>Weight</label>
        <input
          id={`weight-${setId}`}
          type="number"
          min="0"
          step="0.5"
          value={localSet.weight || ''}
          onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0)}
          onBlur={() => handleBlur('weight')}
          className={styles.weightInput}
        />
      </div>
      
      {/* RPE Input - For all set types */}
      <div className={styles.rpeContainer}>
        <label htmlFor={`rpe-${setId}`}>RPE</label>
        <input
          id={`rpe-${setId}`}
          type="number"
          min="1"
          max="10"
          step="0.5"
          value={localSet.rpe || ''}
          onChange={(e) => handleInputChange('rpe', parseFloat(e.target.value) || 0)}
          onBlur={() => handleBlur('rpe')}
          className={styles.rpeInput}
        />
      </div>
    </div>
  );
}

export default SetRow;

