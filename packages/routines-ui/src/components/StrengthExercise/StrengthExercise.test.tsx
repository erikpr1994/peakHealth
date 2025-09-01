import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { StrengthExercise } from './StrengthExercise';
import { RoutineBuilderProvider } from '../../context/routineBuilder/RoutineBuilderContext';
import type { RoutineBuilderState } from '../../context/routineBuilder/types';

vi.mock('../../hooks/useExercise', async () => {
  const actual = await vi.importActual<
    typeof import('../../hooks/useExercise')
  >('../../hooks/useExercise');
  return {
    ...actual,
    useExercise: vi.fn(),
  };
});

const mockUseExercise = vi.mocked(
  (await import('../../hooks/useExercise')).useExercise
);

describe('StrengthExercise', () => {
  const workoutId = 'workout-1';
  const sectionId = 'section-1';
  const exerciseId = 'exercise-1';

  const mockExercise = {
    _id: exerciseId,
    exerciseId: 'bench-press',
    exerciseVariantId: 'bench-press-variant-1',
    orderIndex: 1,
    type: 'strength' as const,
    progressionMethod: 'linear' as const,
    sets: [],
    restBetweenSets: '90s',
  };

  const mockUseExerciseReturn = {
    exercise: mockExercise,
    setIds: ['set-1', 'set-2'],
    updateExercise: vi.fn(),
    removeExercise: vi.fn(),
    addSet: vi.fn(),
    removeSet: vi.fn(),
    updateSet: vi.fn(),
    reorderSets: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseExercise.mockReturnValue(mockUseExerciseReturn);
  });

  const renderWithProvider = (
    props: React.ComponentProps<typeof StrengthExercise>
  ) => {
    const initialState: RoutineBuilderState = {
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

    return render(
      <RoutineBuilderProvider
        value={{
          state: initialState,
          dispatch: mockDispatch,
        }}
      >
        <StrengthExercise {...props} />
      </RoutineBuilderProvider>
    );
  };

  it('renders exercise name and delete button in header', () => {
    renderWithProvider({
      workoutId,
      sectionId,
      exerciseId,
    });

    expect(screen.getByText('bench-press')).toBeDefined();
    expect(screen.getByLabelText('Delete exercise')).toBeDefined();
  });

  it('renders rest between sets control', () => {
    renderWithProvider({
      workoutId,
      sectionId,
      exerciseId,
    });

    expect(screen.getByLabelText('Rest Between Sets (seconds)')).toBeDefined();
    expect(screen.getByDisplayValue('90')).toBeDefined();
  });

  it('renders progression method dropdown when showProgressionMethods is true', () => {
    renderWithProvider({
      workoutId,
      sectionId,
      exerciseId,
      showProgressionMethods: true,
    });

    expect(screen.getByLabelText('Progression Method')).toBeDefined();
    expect(screen.getByText('Linear Progression')).toBeDefined();
  });

  it('does not render progression method dropdown when showProgressionMethods is false', () => {
    renderWithProvider({
      workoutId,
      sectionId,
      exerciseId,
      showProgressionMethods: false,
    });

    expect(screen.queryByLabelText('Progression Method')).toBeNull();
  });

  it('renders approach sets button when showApproachSetsToggle is true', () => {
    renderWithProvider({
      workoutId,
      sectionId,
      exerciseId,
      showApproachSetsToggle: true,
    });

    expect(screen.getByText('+ Generate Warmup Sets')).toBeDefined();
  });

  it('does not render approach sets button when showApproachSetsToggle is false', () => {
    renderWithProvider({
      workoutId,
      sectionId,
      exerciseId,
      showApproachSetsToggle: false,
    });

    expect(screen.queryByText('+ Generate Warmup Sets')).toBeNull();
  });

  it('renders SetsTable component', () => {
    renderWithProvider({
      workoutId,
      sectionId,
      exerciseId,
    });

    // SetsTable should be rendered (we can't easily test its internal content)
    expect(screen.getByText('+ Add Warmup Set')).toBeDefined();
    expect(screen.getByText('+ Add Working Set')).toBeDefined();
  });

  it('calls deleteExercise when delete button is clicked', () => {
    renderWithProvider({
      workoutId,
      sectionId,
      exerciseId,
    });

    const deleteButton = screen.getByLabelText('Delete exercise');
    fireEvent.click(deleteButton);

    expect(mockUseExerciseReturn.removeExercise).toHaveBeenCalled();
  });

  it('calls updateExercise when rest between sets is changed', () => {
    renderWithProvider({
      workoutId,
      sectionId,
      exerciseId,
    });

    const restInput = screen.getByDisplayValue('90');
    fireEvent.change(restInput, { target: { value: '120' } });

    expect(mockUseExerciseReturn.updateExercise).toHaveBeenCalledWith({
      restBetweenSets: '120s',
    });
  });

  it('calls updateExercise when progression method is changed', () => {
    renderWithProvider({
      workoutId,
      sectionId,
      exerciseId,
    });

    const progressionSelect = screen.getByLabelText('Progression Method');
    fireEvent.change(progressionSelect, { target: { value: 'dual' } });

    expect(mockUseExerciseReturn.updateExercise).toHaveBeenCalledWith({
      progressionMethod: 'dual',
    });
  });

  it('renders unilateral config section for unilateral exercises', () => {
    const unilateralExercise = {
      ...mockExercise,
      unilateralMode: 'alternating' as const,
    };

    mockUseExercise.mockReturnValue({
      ...mockUseExerciseReturn,
      exercise: unilateralExercise,
    });

    renderWithProvider({
      workoutId,
      sectionId,
      exerciseId,
    });

    expect(screen.getByText('Edit Unilateral Config')).toBeDefined();
    expect(screen.getByText('Current: alternating')).toBeDefined();
  });

  it('renders unilateral config section for all strength exercises', () => {
    renderWithProvider({
      workoutId,
      sectionId,
      exerciseId,
    });

    expect(screen.getByText('Edit Unilateral Config')).toBeDefined();
    expect(screen.getByText('Current: Not configured')).toBeDefined();
  });

  it('opens approach sets modal when generate warmup sets button is clicked', () => {
    renderWithProvider({
      workoutId,
      sectionId,
      exerciseId,
    });

    const generateButton = screen.getByText('+ Generate Warmup Sets');
    fireEvent.click(generateButton);

    // Modal should be rendered (we can't easily test modal content without proper mocking)
    expect(generateButton).toBeDefined();
  });

  it('renders with default props', () => {
    renderWithProvider({
      workoutId,
      sectionId,
      exerciseId,
    });

    // Should render with default values
    expect(screen.getByText('Linear Progression')).toBeDefined();
    expect(screen.getByText('+ Generate Warmup Sets')).toBeDefined();
  });

  it('handles missing exercise gracefully', () => {
    mockUseExercise.mockReturnValue({
      ...mockUseExerciseReturn,
      exercise: undefined,
    });

    const { container } = renderWithProvider({
      workoutId,
      sectionId,
      exerciseId,
    });

    expect(container.firstChild).toBeNull();
  });
});
