import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Routines from './Routines';
import { routineService } from '../../services/routineService';

// Mock dependencies
vi.mock('../../services/routineService');

const mockRoutineService = routineService as ReturnType<typeof vi.fn>;

describe('Routines', () => {
  const mockRoutines = [
    {
      id: 'routine-1',
      name: 'Strength Training',
      description: 'Build muscle and strength',
      difficulty: 'Intermediate' as const,
      goal: 'Strength' as const,
      isActive: true,
      isFavorite: false,
      progress: {
        current: 5,
        total: 12,
      },
      objectives: ['Build strength', 'Improve form'],
      totalWorkouts: 12,
      completedWorkouts: 5,
      estimatedDuration: '45-60 min',
      workoutDays: ['Monday', 'Wednesday', 'Friday'],
    },
    {
      id: 'routine-2',
      name: 'Cardio Blast',
      description: 'High-intensity cardio workout',
      difficulty: 'Advanced' as const,
      goal: 'Endurance' as const,
      isActive: false,
      isFavorite: true,
      progress: {
        current: 0,
        total: 8,
      },
      objectives: ['Improve endurance', 'Burn calories'],
      totalWorkouts: 8,
      completedWorkouts: 0,
      estimatedDuration: '30-45 min',
      workoutDays: ['Tuesday', 'Thursday'],
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading state initially', () => {
    mockRoutineService.getUserRoutines.mockImplementation(() => new Promise(() => {}));
    
    render(<Routines />);
    expect(screen.getByText(/loading routines/i)).toBeInTheDocument();
  });

  it('should render routines list after loading', async () => {
    mockRoutineService.getUserRoutines.mockResolvedValue(mockRoutines);
    
    render(<Routines />);
    
    await waitFor(() => {
      expect(screen.getByText('Strength Training')).toBeInTheDocument();
      expect(screen.getByText('Cardio Blast')).toBeInTheDocument();
    });
  });

  it('should handle error state', async () => {
    mockRoutineService.getUserRoutines.mockRejectedValue(new Error('Failed to fetch routines'));
    
    render(<Routines />);
    
    await waitFor(() => {
      expect(screen.getByText(/error: failed to fetch routines/i)).toBeInTheDocument();
    });
  });

  it('should scroll to top on mount', async () => {
    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    mockRoutineService.getUserRoutines.mockResolvedValue(mockRoutines);
    
    render(<Routines />);
    
    await waitFor(() => {
      expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
    });
    
    scrollToSpy.mockRestore();
  });
});
