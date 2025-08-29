'use client';

import React from 'react';
import { useRoutineBuilderContext } from '../hooks/useRoutineBuilderContext';
import { Workout } from '@peakhealth/routines-types';

export const RoutineBuilderExample: React.FC = () => {
  const { state, dispatch } = useRoutineBuilderContext();

  const handleAddWorkout = (): void => {
    const newWorkout: Workout = {
      _id: `workout-${Date.now()}`,
      name: `Workout ${state.workouts.length + 1}`,
      type: 'strength',
      orderIndex: state.workouts.length,
      sections: [],
    } as Workout;

    dispatch({
      type: 'ADD_WORKOUT',
      payload: { workout: newWorkout },
    });
  };

  const handleRemoveWorkout = (workoutId: string): void => {
    dispatch({
      type: 'REMOVE_WORKOUT',
      payload: { workoutId },
    });
  };

  const handleUpdateWorkoutName = (
    workoutId: string,
    newName: string
  ): void => {
    dispatch({
      type: 'UPDATE_WORKOUT',
      payload: {
        workoutId,
        updates: { name: newName },
      },
    });
  };

  const handleUpdateRoutineName = (newName: string): void => {
    dispatch({
      type: 'UPDATE_ROUTINE_NAME',
      payload: { name: newName },
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Routine Builder Example</h2>

      <div style={{ marginBottom: '20px' }}>
        <h3>Routine: {state.name}</h3>
        <input
          type="text"
          value={state.name}
          onChange={e => handleUpdateRoutineName(e.target.value)}
          placeholder="Routine name"
          style={{ padding: '8px', marginRight: '10px' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={handleAddWorkout}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Add Workout
        </button>
        <span style={{ marginLeft: '10px' }}>
          Total Workouts: {state.totalWorkouts}
        </span>
      </div>

      <div>
        <h3>Workouts:</h3>
        {state.workouts.length === 0 ? (
          <p>No workouts yet. Click "Add Workout" to get started!</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {state.workouts.map(workout => (
              <li
                key={workout._id}
                style={{
                  border: '1px solid #ddd',
                  margin: '10px 0',
                  padding: '15px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span style={{ fontWeight: 'bold', minWidth: '60px' }}>
                  #{workout.orderIndex + 1}
                </span>
                <input
                  type="text"
                  value={workout.name}
                  onChange={e =>
                    handleUpdateWorkoutName(workout._id, e.target.value)
                  }
                  style={{ flex: 1, padding: '5px' }}
                />
                <span style={{ color: '#666' }}>Type: {workout.type}</span>
                <button
                  onClick={() => handleRemoveWorkout(workout._id)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div
        style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
        }}
      >
        <h4>State Summary:</h4>
        <pre style={{ fontSize: '12px', overflow: 'auto' }}>
          {JSON.stringify(state, null, 2)}
        </pre>
      </div>
    </div>
  );
};
