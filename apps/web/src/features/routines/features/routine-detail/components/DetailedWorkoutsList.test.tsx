import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import DetailedWorkoutsList from './DetailedWorkoutsList';
import { StrengthWorkout, RunningWorkout } from '../../../types';

describe('DetailedWorkoutsList', () => {
  const mockStrengthWorkouts: StrengthWorkout[] = [
    {
      id: 'strength-1',
      name: 'Upper Body',
      objective: 'Build upper body strength',
      schedule: {
        days: ['Monday', 'Wednesday'],
        time: 'Morning',
      },
      sections: [
        {
          id: 'section-1',
          name: 'Chest and Triceps',
          type: 'Strength',
          exercises: [
            {
              id: 'exercise-1',
              name: 'Bench Press',
              sets: [
                {
                  id: 'set-1',
                  reps: 10,
                  weight: 100,
                  restTime: 90,
                },
              ],
              progressionMethod: 'Linear',
              restAfter: 120,
            },
          ],
          restAfter: 180,
        },
      ],
    },
  ];

  const mockRunningWorkouts: RunningWorkout[] = [
    {
      id: 'running-1',
      name: 'Cardio Session',
      objective: 'Improve endurance',
      schedule: {
        days: ['Tuesday', 'Thursday'],
        time: 'Evening',
      },
      sections: [
        {
          id: 'section-1',
          name: 'Warm Up',
          type: 'Cardio',
          exercises: [
            {
              id: 'exercise-1',
              name: 'Light Jog',
              sets: [
                {
                  id: 'set-1',
                  duration: 10,
                  distance: 1,
                  restTime: 60,
                },
              ],
              progressionMethod: 'Linear',
              restAfter: 120,
            },
          ],
          restAfter: 180,
        },
      ],
    },
  ];

  it('should render strength workouts section', () => {
    render(
      <DetailedWorkoutsList
        strengthWorkouts={mockStrengthWorkouts}
        runningWorkouts={[]}
        routineId="routine-1"
      />
    );
    
    expect(screen.getByText('Strength Workouts')).toBeInTheDocument();
    expect(screen.getByText('Upper Body')).toBeInTheDocument();
  });

  it('should render running workouts section', () => {
    render(
      <DetailedWorkoutsList
        strengthWorkouts={[]}
        runningWorkouts={mockRunningWorkouts}
        routineId="routine-1"
      />
    );
    
    expect(screen.getByText('Running Workouts')).toBeInTheDocument();
    expect(screen.getByText('Cardio Session')).toBeInTheDocument();
  });

  it('should render both workout types', () => {
    render(
      <DetailedWorkoutsList
        strengthWorkouts={mockStrengthWorkouts}
        runningWorkouts={mockRunningWorkouts}
        routineId="routine-1"
      />
    );
    
    expect(screen.getByText('Strength Workouts')).toBeInTheDocument();
    expect(screen.getByText('Running Workouts')).toBeInTheDocument();
    expect(screen.getByText('Upper Body')).toBeInTheDocument();
    expect(screen.getByText('Cardio Session')).toBeInTheDocument();
  });

  it('should handle empty workouts', () => {
    render(
      <DetailedWorkoutsList
        strengthWorkouts={[]}
        runningWorkouts={[]}
        routineId="routine-1"
      />
    );
    
    expect(screen.getByText('Strength Workouts')).toBeInTheDocument();
    expect(screen.getByText('Running Workouts')).toBeInTheDocument();
    expect(screen.queryByText('Upper Body')).not.toBeInTheDocument();
    expect(screen.queryByText('Cardio Session')).not.toBeInTheDocument();
  });

  it('should handle multiple strength workouts', () => {
    const multipleStrengthWorkouts = [
      ...mockStrengthWorkouts,
      {
        ...mockStrengthWorkouts[0],
        id: 'strength-2',
        name: 'Lower Body',
      },
    ];
    
    render(
      <DetailedWorkoutsList
        strengthWorkouts={multipleStrengthWorkouts}
        runningWorkouts={[]}
        routineId="routine-1"
      />
    );
    
    expect(screen.getByText('Upper Body')).toBeInTheDocument();
    expect(screen.getByText('Lower Body')).toBeInTheDocument();
  });
});
