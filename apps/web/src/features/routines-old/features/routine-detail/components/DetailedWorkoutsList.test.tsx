import { render, screen } from '@testing-library/react';
import DetailedWorkoutsList from './DetailedWorkoutsList';
import { StrengthWorkout, RunningWorkout } from '../../../types';

describe('DetailedWorkoutsList', () => {
  const mockStrengthWorkouts: StrengthWorkout[] = [
    {
      id: 'strength-1',
      name: 'Upper Body',
      type: 'strength',
      objective: 'Build upper body strength',
      schedule: {
        repeatPattern: 'weekdays',
        repeatValue: '',
        selectedDays: ['Monday', 'Wednesday'],
        time: 'Morning',
      },
      sections: [
        {
          id: 'section-1',
          name: 'Chest and Triceps',
          type: 'basic',
          exercises: [
            {
              id: 'exercise-1',
              name: 'Bench Press',
              sets: [
                {
                  id: 'set-1',
                  setNumber: 1,
                  setType: 'normal',
                  repType: 'fixed',
                  reps: 10,
                  weight: 100,
                  rpe: null,
                  notes: '',
                },
              ],
              restTimer: '90s',
              restAfter: '120s',
              notes: '',
              progressionMethod: 'linear',
            },
          ],
          restAfter: '180s',
        },
      ],
    },
  ];

  const mockRunningWorkouts: RunningWorkout[] = [
    {
      id: 'running-1',
      name: 'Cardio Session',
      type: 'running',
      objective: 'Improve endurance',
      schedule: {
        repeatPattern: 'weekdays',
        repeatValue: '',
        selectedDays: ['Tuesday', 'Thursday'],
        time: 'Evening',
      },
      sections: [
        {
          id: 'section-1',
          name: 'Warm Up',
          type: 'warmup',
          exercises: [
            {
              id: 'exercise-1',
              name: 'Light Jog',
              sets: [
                {
                  id: 'set-1',
                  setNumber: 1,
                  setType: 'normal',
                  repType: 'fixed',
                  reps: null,
                  weight: null,
                  rpe: null,
                  notes: '',
                },
              ],
              restTimer: '60s',
              restAfter: '120s',
              notes: '',
              progressionMethod: 'linear',
            },
          ],
          restAfter: '180s',
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

    expect(screen.getByText(/Strength Workouts/)).toBeInTheDocument();
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

    expect(screen.getByText(/Running Workouts/)).toBeInTheDocument();
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

    expect(screen.getByText(/Strength Workouts/)).toBeInTheDocument();
    expect(screen.getByText(/Running Workouts/)).toBeInTheDocument();
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

    expect(screen.getByText('No workouts added yet')).toBeInTheDocument();
    expect(
      screen.getByText("This routine doesn't have any workouts configured.")
    ).toBeInTheDocument();
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
