import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import RoutineDetail from './RoutineDetail';
import { useAuth } from '@/features/auth/context/AuthContext';
import { routineService } from '../../services/routineService';

// Mock dependencies
vi.mock('next/navigation', () => ({
  useRouter: (): {
    push: ReturnType<typeof vi.fn>;
    back: ReturnType<typeof vi.fn>;
  } => ({
    push: vi.fn(),
    back: vi.fn(),
  }),
}));
vi.mock('@/features/auth/context/AuthContext');
vi.mock('../../services/routineService');

const mockUseAuth = useAuth as ReturnType<typeof vi.fn>;
const mockRoutineService = vi.mocked(routineService);

describe('RoutineDetail', () => {
  const mockRouter = {
    push: vi.fn(),
    back: vi.fn(),
  };

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
      workouts: [],
    };

    mockRoutineService.getRoutineById.mockResolvedValue(mockRoutineData);

    render(<RoutineDetail routineId="test-routine" />);

    await waitFor(() => {
      expect(screen.getByText('Test Routine')).toBeInTheDocument();
    });

    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Intermediate')).toBeInTheDocument();
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

  it('should handle back navigation', (): void => {
    render(<RoutineDetail routineId="test-routine" />);

    const backButton = screen.getByText(/back to routines/i);
    backButton.click();

    expect(mockRouter.push).toHaveBeenCalledWith('/routines');
  });
});
