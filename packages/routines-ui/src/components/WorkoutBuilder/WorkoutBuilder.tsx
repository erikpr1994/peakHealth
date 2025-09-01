'use client';

import React, { useState } from 'react';
import { Button } from '@peakhealth/ui';
import { useRoutineWorkouts } from '../../hooks/useRoutineWorkouts';
import { WorkoutAccordion } from '../WorkoutAccordion';
import { createDefaultStrengthWorkout } from '../../utils/workoutCreation';
import './WorkoutBuilder.css';

export interface WorkoutBuilderProps {
  className?: string;
}

export const WorkoutBuilder: React.FC<WorkoutBuilderProps> = ({
  className,
}) => {
  const { workoutIds, addWorkout } = useRoutineWorkouts();
  const [isAddingWorkout, setIsAddingWorkout] = useState(false);

  const handleAddWorkout = () => {
    setIsAddingWorkout(true);

    // Create a default strength workout with a generic name
    const workoutNumber = workoutIds.length + 1;
    const newWorkout = createDefaultStrengthWorkout(
      `Workout ${workoutNumber}`,
      workoutIds.length
    );

    addWorkout(newWorkout);
    setIsAddingWorkout(false);
  };

  return (
    <div className={`workout-builder ${className || ''}`}>
      <div className="workout-builder-header">
        <h2 className="workout-builder-title">Workouts</h2>
        <Button
          variant="default"
          size="sm"
          onClick={handleAddWorkout}
          disabled={isAddingWorkout}
          className="add-workout-btn"
        >
          {isAddingWorkout ? 'Adding...' : '+ Add Workout'}
        </Button>
      </div>

      <div className="workout-builder-content">
        {workoutIds.length === 0 ? (
          <div className="workout-builder-empty-state">
            <div className="empty-state-icon">🏋️</div>
            <h3 className="empty-state-title">No workouts yet</h3>
            <p className="empty-state-description">
              Start building your routine by adding your first workout.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddWorkout}
              disabled={isAddingWorkout}
              className="empty-state-btn"
            >
              {isAddingWorkout ? 'Adding...' : 'Add Your First Workout'}
            </Button>
          </div>
        ) : (
          <div className="workouts-list">
            {workoutIds.map(workoutId => (
              <WorkoutAccordion key={workoutId} workoutId={workoutId} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
