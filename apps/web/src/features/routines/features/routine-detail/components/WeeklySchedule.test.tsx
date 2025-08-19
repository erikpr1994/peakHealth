import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import WeeklySchedule from './WeeklySchedule';

describe('WeeklySchedule', () => {
  const mockSchedule = [true, true, false, true, false, false, false]; // Mon, Tue, Thu active
  const mockStrengthWorkouts = [
    {
      id: 'workout-1',
      name: 'Upper Body',
      type: 'strength' as const,
      objective: 'Build upper body strength',
      schedule: {
        repeatPattern: 'week',
        repeatValue: '1',
        selectedDays: ['monday', 'wednesday'],
        time: 'Morning',
      },
      sections: [],
    },
    {
      id: 'workout-2',
      name: 'Lower Body',
      type: 'strength' as const,
      objective: 'Build lower body strength',
      schedule: {
        repeatPattern: 'week',
        repeatValue: '1',
        selectedDays: ['tuesday', 'thursday'],
        time: 'Evening',
      },
      sections: [],
    },
  ];
  const mockRunningWorkouts = [
    {
      id: 'run-1',
      name: 'Morning Run',
      type: 'running' as const,
      objective: 'Improve cardiovascular fitness',
      schedule: {
        repeatPattern: 'week',
        repeatValue: '1',
        selectedDays: ['monday', 'friday'],
        time: '06:00',
      },
      sections: [],
    },
  ];

  it('should render weekly schedule title', () => {
    render(
      <WeeklySchedule
        schedule={mockSchedule}
        strengthWorkouts={mockStrengthWorkouts}
        runningWorkouts={mockRunningWorkouts}
      />
    );

    expect(screen.getByText('Weekly Schedule')).toBeInTheDocument();
  });

  it('should render all days of the week', () => {
    render(
      <WeeklySchedule
        schedule={mockSchedule}
        strengthWorkouts={mockStrengthWorkouts}
        runningWorkouts={mockRunningWorkouts}
      />
    );

    expect(screen.getByText('Monday')).toBeInTheDocument();
    expect(screen.getByText('Tuesday')).toBeInTheDocument();
    expect(screen.getByText('Wednesday')).toBeInTheDocument();
    expect(screen.getByText('Thursday')).toBeInTheDocument();
    expect(screen.getByText('Friday')).toBeInTheDocument();
    expect(screen.getByText('Saturday')).toBeInTheDocument();
    expect(screen.getByText('Sunday')).toBeInTheDocument();
  });

  it('should render workouts for scheduled days', () => {
    render(
      <WeeklySchedule
        schedule={mockSchedule}
        strengthWorkouts={mockStrengthWorkouts}
        runningWorkouts={mockRunningWorkouts}
      />
    );

    expect(screen.getByText('Upper Body')).toBeInTheDocument();
    expect(screen.getAllByText('Lower Body')).toHaveLength(2); // Appears on Tuesday and Thursday
    expect(screen.getByText('Morning Run')).toBeInTheDocument();
  });

  it('should handle empty workouts', () => {
    render(
      <WeeklySchedule
        schedule={mockSchedule}
        strengthWorkouts={[]}
        runningWorkouts={[]}
      />
    );

    expect(screen.getByText('Weekly Schedule')).toBeInTheDocument();
    expect(screen.getByText('Monday')).toBeInTheDocument();
    expect(screen.getByText('Tuesday')).toBeInTheDocument();
    // Should not show any workout names
    expect(screen.queryByText('Upper Body')).not.toBeInTheDocument();
    expect(screen.queryByText('Lower Body')).not.toBeInTheDocument();
  });

  it('should handle workouts with multiple days', () => {
    const multiDayWorkout = [
      {
        id: 'workout-1',
        name: 'Full Body',
        type: 'strength' as const,
        objective: 'Full body workout',
        schedule: {
          repeatPattern: 'week',
          repeatValue: '1',
          selectedDays: ['monday', 'wednesday', 'friday'],
          time: 'Morning',
        },
        sections: [],
      },
    ];

    render(
      <WeeklySchedule
        schedule={[true, false, true, false, true, false, false]}
        strengthWorkouts={multiDayWorkout}
        runningWorkouts={[]}
      />
    );

    expect(screen.getAllByText('Full Body')).toHaveLength(3); // Appears on Monday, Wednesday, Friday
  });

  it('should handle workouts without schedule', () => {
    const workoutWithoutSchedule = [
      {
        id: 'workout-1',
        name: 'No Schedule Workout',
        type: 'strength' as const,
        objective: 'Test workout',
        schedule: {
          repeatPattern: 'week',
          repeatValue: '1',
          selectedDays: [],
          time: 'Morning',
        },
        sections: [],
      },
    ];

    render(
      <WeeklySchedule
        schedule={mockSchedule}
        strengthWorkouts={workoutWithoutSchedule}
        runningWorkouts={[]}
      />
    );

    expect(screen.getByText('Weekly Schedule')).toBeInTheDocument();
    expect(screen.queryByText('No Schedule Workout')).not.toBeInTheDocument();
  });
});
