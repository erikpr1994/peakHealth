import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import RoutinesList from './RoutinesList';
import { Routine } from '@/features/routines/types';
import { ToastProvider } from '@peakhealth/ui';

// Mock dependencies
vi.mock('next/navigation', () => ({
  useRouter: (): { push: ReturnType<typeof vi.fn> } => ({
    push: vi.fn(),
  }),
}));

vi.mock('../../../../services/routineService', () => ({
  routineService: {
    setActiveRoutine: vi.fn(),
    toggleRoutineFavorite: vi.fn(),
  },
}));

// Test wrapper with providers
const renderWithProviders = (
  component: React.ReactElement
): ReturnType<typeof render> => {
  return render(<ToastProvider>{component}</ToastProvider>);
};

describe('RoutinesList', () => {
  const mockRoutines: Routine[] = [
    {
      id: 'routine-1',
      name: 'Strength Training',
      description: 'Build muscle and strength',
      difficulty: 'Intermediate',
      goal: 'Strength',
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
      workoutDays: [],
    },
  ];

  it('should render routines list', () => {
    renderWithProviders(
      <RoutinesList
        routines={mockRoutines}
        onRoutineUpdate={vi.fn()}
        onRoutinesChange={vi.fn()}
      />
    );

    expect(screen.getByText('My Routines')).toBeInTheDocument();
    expect(screen.getByText('Strength Training')).toBeInTheDocument();
    expect(screen.getByText('Create Routine')).toBeInTheDocument();
  });

  it('should render empty state when no routines', () => {
    renderWithProviders(
      <RoutinesList
        routines={[]}
        onRoutineUpdate={vi.fn()}
        onRoutinesChange={vi.fn()}
      />
    );

    expect(screen.getByText('My Routines')).toBeInTheDocument();
    expect(screen.getByText('Create Routine')).toBeInTheDocument();
  });
});
