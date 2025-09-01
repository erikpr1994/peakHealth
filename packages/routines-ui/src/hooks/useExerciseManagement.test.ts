import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useExerciseManagement } from './useExerciseManagement';
import type { ExerciseLibraryExercise } from '../components/ExerciseLibraryModal/ExerciseLibraryModal.types';

// Use vi.hoisted to define mocks that can be accessed in vi.mock
const mocks = vi.hoisted(() => ({
  useSection: vi.fn(),
  createExercise: vi.fn(),
}));

// Mock the useSection hook
vi.mock('./useSection', () => ({
  useSection: mocks.useSection,
}));

// Mock the exercise creation utility
vi.mock('../utils/exerciseCreation', () => ({
  createExercise: mocks.createExercise,
}));

describe('useExerciseManagement', () => {
  const mockAddExercise = vi.fn();
  const mockExercise: ExerciseLibraryExercise = {
    id: 'exercise-1',
    name: 'Push-ups',
    description: 'A classic bodyweight exercise',
    category: 'Strength',
    muscleGroups: ['Chest', 'Triceps'],
    equipment: ['Bodyweight'],
    difficulty: 'Beginner',
    icon: '🏋️',
    iconColor: 'bg-blue-100 text-blue-600',
  };

  beforeEach(() => {
    vi.clearAllMocks();

    // Setup default mock implementations
    mocks.useSection.mockReturnValue({
      exerciseIds: ['existing-1', 'existing-2'],
      addExercise: mockAddExercise,
    });

    mocks.createExercise.mockReturnValue({
      _id: 'new-exercise-id',
      exerciseId: 'exercise-1',
      exerciseVariantId: 'exercise-1',
      orderIndex: 2,
      type: 'strength',
      sets: [],
      restBetweenSets: '60s',
      notes: '',
    });
  });

  it('should initialize with modal closed', () => {
    const { result } = renderHook(() =>
      useExerciseManagement('workout-1', 'section-1')
    );

    expect(result.current.isExerciseModalOpen).toBe(false);
  });

  it('should open modal when handleAddExercise is called', () => {
    const { result } = renderHook(() =>
      useExerciseManagement('workout-1', 'section-1')
    );

    act(() => {
      result.current.handleAddExercise();
    });

    expect(result.current.isExerciseModalOpen).toBe(true);
  });

  it('should close modal when handleCloseExerciseModal is called', () => {
    const { result } = renderHook(() =>
      useExerciseManagement('workout-1', 'section-1')
    );

    // First open the modal
    act(() => {
      result.current.handleAddExercise();
    });

    expect(result.current.isExerciseModalOpen).toBe(true);

    // Then close it
    act(() => {
      result.current.handleCloseExerciseModal();
    });

    expect(result.current.isExerciseModalOpen).toBe(false);
  });

  it('should handle exercise selection and add exercise', () => {
    const { result } = renderHook(() =>
      useExerciseManagement('workout-1', 'section-1')
    );

    const config = {
      restBetweenSets: '60s',
      notes: '',
    };

    act(() => {
      result.current.handleExerciseSelect([mockExercise], config);
    });

    expect(mocks.createExercise).toHaveBeenCalledWith(mockExercise, config, 2);
    expect(mockAddExercise).toHaveBeenCalledWith({
      _id: 'new-exercise-id',
      exerciseId: 'exercise-1',
      exerciseVariantId: 'exercise-1',
      orderIndex: 2,
      type: 'strength',
      sets: [],
      restBetweenSets: '60s',
      notes: '',
    });
  });

  it('should only add first exercise when multiple are selected', () => {
    const { result } = renderHook(() =>
      useExerciseManagement('workout-1', 'section-1')
    );

    const multipleExercises = [
      mockExercise,
      { ...mockExercise, id: 'exercise-2', name: 'Squats' },
    ];

    const config = {
      restBetweenSets: '60s',
      notes: '',
    };

    act(() => {
      result.current.handleExerciseSelect(multipleExercises, config);
    });

    // Should only call createExercise once with the first exercise
    expect(mocks.createExercise).toHaveBeenCalledTimes(1);
    expect(mocks.createExercise).toHaveBeenCalledWith(mockExercise, config, 2);
    expect(mockAddExercise).toHaveBeenCalledTimes(1);
  });

  it('should not add exercise when no exercises are selected', () => {
    const { result } = renderHook(() =>
      useExerciseManagement('workout-1', 'section-1')
    );

    const config = {
      restBetweenSets: '60s',
      notes: '',
    };

    act(() => {
      result.current.handleExerciseSelect([], config);
    });

    expect(mocks.createExercise).not.toHaveBeenCalled();
    expect(mockAddExercise).not.toHaveBeenCalled();
  });
});
