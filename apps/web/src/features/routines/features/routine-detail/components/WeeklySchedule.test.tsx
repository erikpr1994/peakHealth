import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import WeeklySchedule from './WeeklySchedule';

describe('WeeklySchedule', () => {
  const mockWorkouts = [
    {
      id: 'workout-1',
      name: 'Upper Body',
      schedule: {
        days: ['Monday', 'Wednesday'],
        time: 'Morning',
      },
    },
    {
      id: 'workout-2',
      name: 'Lower Body',
      schedule: {
        days: ['Tuesday', 'Thursday'],
        time: 'Evening',
      },
    },
  ];

  it('should render weekly schedule title', () => {
    render(<WeeklySchedule workouts={mockWorkouts} />);

    expect(screen.getByText('Weekly Schedule')).toBeInTheDocument();
  });

  it('should render all days of the week', () => {
    render(<WeeklySchedule workouts={mockWorkouts} />);

    expect(screen.getByText('Monday')).toBeInTheDocument();
    expect(screen.getByText('Tuesday')).toBeInTheDocument();
    expect(screen.getByText('Wednesday')).toBeInTheDocument();
    expect(screen.getByText('Thursday')).toBeInTheDocument();
    expect(screen.getByText('Friday')).toBeInTheDocument();
    expect(screen.getByText('Saturday')).toBeInTheDocument();
    expect(screen.getByText('Sunday')).toBeInTheDocument();
  });

  it('should render workouts for scheduled days', () => {
    render(<WeeklySchedule workouts={mockWorkouts} />);

    expect(screen.getByText('Upper Body')).toBeInTheDocument();
    expect(screen.getByText('Lower Body')).toBeInTheDocument();
    expect(screen.getByText('Morning')).toBeInTheDocument();
    expect(screen.getByText('Evening')).toBeInTheDocument();
  });

  it('should handle empty workouts', () => {
    render(<WeeklySchedule workouts={[]} />);

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
        schedule: {
          days: ['Monday', 'Wednesday', 'Friday'],
          time: 'Morning',
        },
      },
    ];

    render(<WeeklySchedule workouts={multiDayWorkout} />);

    expect(screen.getByText('Full Body')).toBeInTheDocument();
    expect(screen.getByText('Morning')).toBeInTheDocument();
  });

  it('should handle workouts without schedule', () => {
    const workoutWithoutSchedule = [
      {
        id: 'workout-1',
        name: 'No Schedule Workout',
        schedule: {
          days: [],
          time: 'Morning',
        },
      },
    ];

    render(<WeeklySchedule workouts={workoutWithoutSchedule} />);

    expect(screen.getByText('Weekly Schedule')).toBeInTheDocument();
    expect(screen.queryByText('No Schedule Workout')).not.toBeInTheDocument();
  });
});
