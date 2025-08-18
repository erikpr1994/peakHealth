import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/context/AuthContext';
import RoutineDetail from './RoutineDetail';
import { routineService } from '../../services/routineService';

// Mock dependencies
vi.mock('next/navigation');
vi.mock('@/features/auth/context/AuthContext');
vi.mock('../../services/routineService');

const mockUseRouter = useRouter as ReturnType<typeof vi.fn>;
const mockUseAuth = useAuth as ReturnType<typeof vi.fn>;
const mockRoutineService = routineService as ReturnType<typeof vi.fn>;

describe('RoutineDetail', () => {
  const mockRouter = {
    push: jest.fn(),
    back: jest.fn(),
  };

  const mockUser = {
    id: 'test-user-id',
    email: 'test@example.com',
  };

  const mockRoutineData = {
    id: 'test-routine-id',
    name: 'Test Routine',
    description: 'Test Description',
    difficulty: 'Beginner' as const,
    goal: 'Strength' as const,
    isActive: true,
    isFavorite: false,
    objectives: ['Build strength', 'Improve endurance'],
    progress: {
      currentWeek: 1,
      totalWeeks: 12,
      completedWorkouts: 0,
      totalWorkouts: 24,
    },
    strengthWorkouts: [],
    runningWorkouts: [],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseRouter.mockReturnValue(mockRouter);
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      user: mockUser,
      login: vi.fn(),
      logout: vi.fn(),
      signup: vi.fn(),
    });
    mockRoutineService.getRoutineById.mockResolvedValue({
      routine: mockRoutineData,
      workouts: [],
    });
    mockRoutineService.toggleRoutineFavorite.mockResolvedValue();
  });

  it('should render loading state initially', () => {
    render(<RoutineDetail routineId="test-routine-id" />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should render routine details after loading', async () => {
    render(<RoutineDetail routineId="test-routine-id" />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Routine')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Beginner')).toBeInTheDocument();
  });

  it('should handle routine not found', async () => {
    mockRoutineService.getRoutineById.mockRejectedValue(new Error('Routine not found'));
    
    render(<RoutineDetail routineId="invalid-routine-id" />);
    
    await waitFor(() => {
      expect(screen.getByText(/routine not found/i)).toBeInTheDocument();
    });
  });

  it('should scroll to top on mount', async () => {
    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    
    render(<RoutineDetail routineId="test-routine-id" />);
    
    await waitFor(() => {
      expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
    });
    
    scrollToSpy.mockRestore();
  });
});
