import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import DetailedWorkoutView from './DetailedWorkoutView';
import { DetailedWorkout } from '../../../types';

// Mock dependencies
vi.mock('next/navigation');

const mockUseRouter = vi.fn();

describe('DetailedWorkoutView', () => {
  const mockRouter = {
    push: vi.fn(),
  };

  const mockWorkout: DetailedWorkout = {
    id: 'workout-1',
    name: 'Upper Body Strength',
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
        type: 'Strength',
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
                restTime: 90,
              },
              {
                id: 'set-2',
                setNumber: 2,
                setType: 'normal',
                repType: 'fixed',
                reps: 8,
                weight: 110,
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
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseRouter.mockReturnValue(mockRouter);
  });

  it('should render workout details correctly', () => {
    render(<DetailedWorkoutView workout={mockWorkout} routineId="routine-1" />);

    expect(screen.getByText('Upper Body Strength')).toBeInTheDocument();
    expect(screen.getByText('Build upper body strength')).toBeInTheDocument();
    expect(screen.getByText('Chest and Triceps')).toBeInTheDocument();

    // Click on the section to expand it
    const sectionHeader = screen.getByText('Chest and Triceps');
    fireEvent.click(sectionHeader);

    expect(screen.getByText('Bench Press')).toBeInTheDocument();
  });

  it('should render schedule information', () => {
    render(<DetailedWorkoutView workout={mockWorkout} routineId="routine-1" />);

    expect(screen.getByText(/monday, wednesday/i)).toBeInTheDocument();
    expect(screen.getByText(/morning/i)).toBeInTheDocument();
  });

  it('should render exercise sets correctly', () => {
    render(<DetailedWorkoutView workout={mockWorkout} routineId="routine-1" />);

    // Click on the section to expand it
    const sectionHeader = screen.getByText('Chest and Triceps');
    fireEvent.click(sectionHeader);

    expect(screen.getByText('Set 1')).toBeInTheDocument();
    expect(screen.getByText('Set 2')).toBeInTheDocument();
    expect(screen.getByText(/10 reps/)).toBeInTheDocument();
    expect(screen.getByText(/8 reps/)).toBeInTheDocument();
    expect(screen.getByText(/100 kg/)).toBeInTheDocument();
    expect(screen.getByText(/110 kg/)).toBeInTheDocument();
  });

  it('should handle workout without sections', () => {
    const workoutWithoutSections = {
      ...mockWorkout,
      sections: [],
    };

    render(
      <DetailedWorkoutView
        workout={workoutWithoutSections}
        routineId="routine-1"
      />
    );

    expect(screen.getByText('Upper Body Strength')).toBeInTheDocument();
    expect(screen.queryByText('Chest and Triceps')).not.toBeInTheDocument();
  });

  it('should handle workout without exercises', () => {
    const workoutWithoutExercises = {
      ...mockWorkout,
      sections: [
        {
          ...mockWorkout.sections[0],
          exercises: [],
        },
      ],
    };

    render(
      <DetailedWorkoutView
        workout={workoutWithoutExercises}
        routineId="routine-1"
      />
    );

    expect(screen.getByText('Chest and Triceps')).toBeInTheDocument();
    expect(screen.queryByText('Bench Press')).not.toBeInTheDocument();
  });
});
