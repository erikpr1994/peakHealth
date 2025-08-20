import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import RoutineDetail from './RoutineDetail';

import { useAuth } from '@/features/auth/context/AuthContext';
import { routineService } from '../../services/routineService';

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});

// Mock dependencies
const mockPush = vi.fn();
const mockBack = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    back: mockBack,
  }),
}));
vi.mock('@/features/auth/context/AuthContext');
vi.mock('../../services/routineService');

const mockUseAuth = useAuth as ReturnType<typeof vi.fn>;
const mockRoutineService = vi.mocked(routineService);

describe('RoutineDetail', (): void => {
  beforeEach((): void => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({
      user: { id: 'user-1', email: 'test@example.com' },
      signIn: vi.fn(),
      signOut: vi.fn(),
      loading: false,
    });
  });

  it('should render loading state initially', (): void => {
    mockRoutineService.getRoutineById.mockResolvedValue({
      routine: {
        id: 'routine-1',
        name: 'Test Routine',
        description: 'Test Description',
        difficulty: 'Intermediate' as const,
        goal: 'Strength' as const,
        duration: 12,
        isActive: true,
        isFavorite: false,
        objectives: ['Build strength'],
        totalWorkouts: 24,
        completedWorkouts: 0,
        estimatedDuration: '45-60 min',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        lastUsed: null,
      },
      workouts: [],
    });

    render(<RoutineDetail routineId="test-routine" />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should render routine details when data is loaded', async (): Promise<void> => {
    const mockRoutineData = {
      routine: {
        id: 'routine-1',
        name: 'Test Routine',
        description: 'Test Description',
        difficulty: 'Intermediate' as const,
        goal: 'Strength' as const,
        duration: 12,
        isActive: true,
        isFavorite: false,
        objectives: ['Build strength'],
        totalWorkouts: 24,
        completedWorkouts: 0,
        estimatedDuration: '45-60 min',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        lastUsed: null,
      },
      workouts: [
        {
          id: 'workout-1',
          name: 'Strength Workout',
          type: 'strength' as const,
          objective: 'Build strength',
          order_index: 1,
          schedule: {
            selectedDays: ['monday', 'wednesday', 'friday'],
            repeatPattern: 'weekdays',
            repeatValue: '',
            time: '09:00',
          },
          sections: [
            {
              id: 'section-1',
              name: 'Warm Up',
              type: 'warmup' as const,
              exercises: [
                {
                  id: 'exercise-1',
                  name: 'Push-ups',
                  category: 'Bodyweight',
                  muscle_groups: ['Chest', 'Triceps'],
                  exerciseLibraryId: 'ex-1',
                  sets: [
                    {
                      id: 'set-1',
                      setNumber: 1,
                      setType: 'normal',
                      repType: 'fixed',
                      reps: 10,
                      weight: null,
                      rpe: null,
                      notes: '',
                    },
                  ],
                  rest_timer: '90s',
                  rest_after: '2 min',
                  notes: '',
                  progression_method: 'linear',
                },
              ],
            },
          ],
        },
      ],
    };

    mockRoutineService.getRoutineById.mockResolvedValue(mockRoutineData);

    render(<RoutineDetail routineId="test-routine" />);

    await waitFor(() => {
      expect(mockRoutineService.getRoutineById).toHaveBeenCalledWith(
        'test-routine'
      );
    });

    expect(screen.getByText('Test Routine')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    // The component doesn't render difficulty text, so we don't test for it
  });

  it('should handle error state', async (): Promise<void> => {
    mockRoutineService.getRoutineById.mockRejectedValue(
      new Error('Failed to load routine')
    );

    render(<RoutineDetail routineId="test-routine" />);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  it('should handle back navigation', async (): Promise<void> => {
    const mockRoutineData = {
      routine: {
        id: 'routine-1',
        name: 'Test Routine',
        description: 'Test Description',
        difficulty: 'Intermediate' as const,
        goal: 'Strength' as const,
        duration: 12,
        isActive: true,
        isFavorite: false,
        objectives: ['Build strength'],
        totalWorkouts: 24,
        completedWorkouts: 0,
        estimatedDuration: '45-60 min',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        lastUsed: null,
      },
      workouts: [
        {
          id: 'workout-1',
          name: 'Strength Workout',
          type: 'strength' as const,
          objective: 'Build strength',
          order_index: 1,
          schedule: {
            selectedDays: ['monday', 'wednesday', 'friday'],
            repeatPattern: 'weekdays',
            repeatValue: '',
            time: '09:00',
          },
          sections: [
            {
              id: 'section-1',
              name: 'Warm Up',
              type: 'warmup' as const,
              exercises: [
                {
                  id: 'exercise-1',
                  name: 'Push-ups',
                  category: 'Bodyweight',
                  muscle_groups: ['Chest', 'Triceps'],
                  exerciseLibraryId: 'ex-1',
                  sets: [
                    {
                      id: 'set-1',
                      setNumber: 1,
                      setType: 'normal',
                      repType: 'fixed',
                      reps: 10,
                      weight: null,
                      rpe: null,
                      notes: '',
                    },
                  ],
                  rest_timer: '90s',
                  rest_after: '2 min',
                  notes: '',
                  progression_method: 'linear',
                },
              ],
            },
          ],
        },
      ],
    };

    mockRoutineService.getRoutineById.mockResolvedValue(mockRoutineData);

    render(<RoutineDetail routineId="test-routine" />);

    await waitFor(() => {
      expect(screen.getByText('Test Routine')).toBeInTheDocument();
    });

    const backButton = screen.getByText(/back to routines/i);
    backButton.click();

    expect(mockPush).toHaveBeenCalledWith('/routines');
  });
});
