import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SetRow } from './SetRow';
import { RoutineBuilderProvider } from '../../context/routineBuilder/RoutineBuilderContext';
import { RoutineBuilderState } from '../../context/routineBuilder/types';
import type { StrengthSet } from '@peakhealth/routines-types';

// Mock the hooks
vi.mock('../../hooks/useSet', () => ({
  useSet: vi.fn(),
}));

vi.mock('../../hooks/useExercise', () => ({
  useExercise: vi.fn(),
}));

const mockUseSet = vi.mocked(await import('../../hooks/useSet')).useSet;
const mockUseExercise = vi.mocked(
  await import('../../hooks/useExercise')
).useExercise;

describe('SetRow', () => {
  const defaultProps = {
    workoutId: 'workout-1',
    sectionId: 'section-1',
    exerciseId: 'exercise-1',
    setId: 'set-1',
  };

  const mockSet: StrengthSet = {
    _id: 'set-1',
    setNumber: 1,
    setType: 'working',
    repType: 'fixed',
    reps: 10,
    weight: 100,
    rpe: 8,
  };

  const mockExercise = {
    _id: 'exercise-1',
    exerciseId: 'exercise-1',
    exerciseVariantId: 'variant-1',
    orderIndex: 1,
    type: 'strength' as const,
    progressionMethod: 'linear' as const,
    sets: [],
    unilateralMode: 'simultaneous' as const,
  };

  const mockState: RoutineBuilderState = {
    _id: 'routine-1',
    name: 'Test Routine',
    description: 'Test Description',
    difficulty: 'beginner',
    goal: 'strength',
    duration: 4,
    objectives: ['Build strength'],
    workouts: [],
    schemaVersion: '1.0.0',
    userId: 'user-1',
    createdBy: 'user-1',
    routineType: 'user-created',
    isActive: true,
    isFavorite: false,
    completedWorkouts: 0,
    totalWorkouts: 0,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  };

  const mockDispatch = vi.fn();

  const renderWithProvider = (props = defaultProps) => {
    return render(
      <RoutineBuilderProvider
        value={{
          state: mockState,
          dispatch: mockDispatch,
        }}
      >
        <SetRow {...props} />
      </RoutineBuilderProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseSet.mockReturnValue({
      set: mockSet,
      updateSet: vi.fn(),
      removeSet: vi.fn(),
    });
    mockUseExercise.mockReturnValue({
      exercise: mockExercise,
      setIds: ['set-1'],
      updateExercise: vi.fn(),
      removeExercise: vi.fn(),
      addSet: vi.fn(),
      removeSet: vi.fn(),
      updateSet: vi.fn(),
      reorderSets: vi.fn(),
    });
  });

  it('renders without crashing', () => {
    renderWithProvider();
    expect(screen.getByText('1')).toBeDefined();
  });

  it('displays set number', () => {
    renderWithProvider();
    expect(screen.getByText('1')).toBeDefined();
  });

  it('displays set type dropdown', () => {
    renderWithProvider();
    expect(screen.getByRole('combobox')).toBeDefined();
  });

  it('shows correct set type options', () => {
    renderWithProvider();
    const select = screen.getByRole('combobox');
    const currentValue = (select as unknown as { value: string }).value;
    expect(currentValue).toBe('working');

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(4);
    expect(options[0].getAttribute('value')).toBe('working');
    expect(options[1].getAttribute('value')).toBe('warmup');
    expect(options[2].getAttribute('value')).toBe('drop');
    expect(options[3].getAttribute('value')).toBe('failure');
  });

  it('shows reps, weight, and RPE inputs for working set type', () => {
    renderWithProvider();

    expect(screen.getByPlaceholderText('Reps')).toBeDefined();
    expect(screen.getByPlaceholderText('Weight')).toBeDefined();
    expect(screen.getByPlaceholderText('RPE')).toBeDefined();
  });

  it('shows reps and weight inputs for warmup set type', () => {
    mockUseSet.mockReturnValue({
      set: { ...mockSet, setType: 'warmup' },
      updateSet: vi.fn(),
      removeSet: vi.fn(),
    });

    renderWithProvider();

    expect(screen.getByPlaceholderText('Reps')).toBeDefined();
    expect(screen.getByPlaceholderText('Weight')).toBeDefined();
    expect(screen.queryByPlaceholderText('RPE')).toBeNull();
  });

  it('shows reps and weight inputs for drop set type', () => {
    mockUseSet.mockReturnValue({
      set: { ...mockSet, setType: 'drop' },
      updateSet: vi.fn(),
      removeSet: vi.fn(),
    });

    renderWithProvider();

    expect(screen.getByPlaceholderText('Reps')).toBeDefined();
    expect(screen.getByPlaceholderText('Weight')).toBeDefined();
    expect(screen.queryByPlaceholderText('RPE')).toBeNull();
  });

  it('shows weight and RPE inputs for failure set type', () => {
    mockUseSet.mockReturnValue({
      set: { ...mockSet, setType: 'failure' },
      updateSet: vi.fn(),
      removeSet: vi.fn(),
    });

    renderWithProvider();

    expect(screen.queryByPlaceholderText('Reps')).toBeNull();
    expect(screen.getByPlaceholderText('Weight')).toBeDefined();
    expect(screen.getByPlaceholderText('RPE')).toBeDefined();
  });

  it('shows Min/Max Reps inputs for dual progression strength exercise', () => {
    // Mock exercise with dual progression
    mockUseExercise.mockReturnValue({
      exercise: { ...mockExercise, progressionMethod: 'dual-linear' },
      setIds: ['set-1'],
      updateExercise: vi.fn(),
      removeExercise: vi.fn(),
      addSet: vi.fn(),
      removeSet: vi.fn(),
      updateSet: vi.fn(),
      reorderSets: vi.fn(),
    });

    renderWithProvider();

    expect(screen.getByPlaceholderText('Min Reps')).toBeDefined();
    expect(screen.getByPlaceholderText('Max Reps')).toBeDefined();
    expect(screen.queryByPlaceholderText('Reps')).toBeNull();
  });

  it('shows unilateral side indicator for sequential unilateral exercise', () => {
    // Mock exercise with sequential unilateral mode
    mockUseExercise.mockReturnValue({
      exercise: { ...mockExercise, unilateralMode: 'sequential' },
      setIds: ['set-1'],
      updateExercise: vi.fn(),
      removeExercise: vi.fn(),
      addSet: vi.fn(),
      removeSet: vi.fn(),
      updateSet: vi.fn(),
      reorderSets: vi.fn(),
    });

    // Mock set with unilateral side
    mockUseSet.mockReturnValue({
      set: { ...mockSet, unilateralSide: 'left' },
      updateSet: vi.fn(),
      removeSet: vi.fn(),
    });

    renderWithProvider();

    expect(screen.getByText('L')).toBeDefined();
  });

  it('shows duration input for time-based exercises', () => {
    // Mock set with duration
    mockUseSet.mockReturnValue({
      set: { ...mockSet, duration: 60, repType: 'time' },
      updateSet: vi.fn(),
      removeSet: vi.fn(),
    });

    renderWithProvider();

    expect(screen.getByPlaceholderText('Time')).toBeDefined();
  });

  it('shows alternating unilateral inputs for alternating unilateral exercise', () => {
    // Mock exercise with alternating unilateral mode
    mockUseExercise.mockReturnValue({
      exercise: { ...mockExercise, unilateralMode: 'alternating' },
      setIds: ['set-1'],
      updateExercise: vi.fn(),
      removeExercise: vi.fn(),
      addSet: vi.fn(),
      removeSet: vi.fn(),
      updateSet: vi.fn(),
      reorderSets: vi.fn(),
    });

    renderWithProvider();

    expect(screen.getByText('Left')).toBeDefined();
    expect(screen.getByText('Right')).toBeDefined();
  });

  it('shows time input instead of reps for time-based sets', () => {
    // Mock set with time rep type
    mockUseSet.mockReturnValue({
      set: { ...mockSet, repType: 'time', duration: 30 },
      updateSet: vi.fn(),
      removeSet: vi.fn(),
    });

    renderWithProvider();

    expect(screen.getByPlaceholderText('Time')).toBeDefined();
    expect(screen.queryByPlaceholderText('Reps')).toBeNull();
  });
});
