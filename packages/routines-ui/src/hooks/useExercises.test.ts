import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock SWR module
vi.mock('swr', () => ({
  default: vi.fn(),
}));

// Import after mocking
import { useExercises, useExercise } from './useExercises';
import useSWR from 'swr';

describe('useExercises', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch exercises without filters', () => {
    const mockExercises = [
      {
        id: '1',
        name: 'Push-ups',
        description: 'A classic bodyweight exercise',
        category: 'Strength' as const,
        muscleGroups: ['Chest', 'Triceps'],
        equipment: ['Bodyweight'],
        difficulty: 'Beginner' as const,
        icon: '🏋️',
        iconColor: 'bg-blue-100 text-blue-600',
      },
    ];

    vi.mocked(useSWR).mockReturnValue({
      data: { exercises: mockExercises },
      error: null,
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    });

    const { result } = renderHook(() => useExercises());

    expect(result.current.exercises).toEqual(mockExercises);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should fetch exercises with filters', () => {
    vi.mocked(useSWR).mockReturnValue({
      data: { exercises: [] },
      error: null,
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    });

    const filters = {
      searchTerm: 'push',
      category: 'Strength' as const,
      muscleGroup: 'Chest',
      difficulty: 'Beginner' as const,
    };

    renderHook(() => useExercises(filters));

    // Verify SWR was called with the correct URL
    expect(vi.mocked(useSWR)).toHaveBeenCalledWith(
      '/api/exercises?searchTerm=push&category=Strength&muscleGroup=Chest&difficulty=Beginner',
      expect.any(Function)
    );
  });

  it('should handle loading state', () => {
    vi.mocked(useSWR).mockReturnValue({
      data: undefined,
      error: null,
      isLoading: true,
      isValidating: true,
      mutate: vi.fn(),
    });

    const { result } = renderHook(() => useExercises());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.exercises).toEqual([]);
  });

  it('should handle error state', () => {
    const mockError = new Error('Failed to fetch');
    vi.mocked(useSWR).mockReturnValue({
      data: undefined,
      error: mockError,
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    });

    const { result } = renderHook(() => useExercises());

    expect(result.current.error).toBe(mockError);
    expect(result.current.exercises).toEqual([]);
  });

  it('should not add "All" values to query params', () => {
    vi.mocked(useSWR).mockReturnValue({
      data: { exercises: [] },
      error: null,
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    });

    const filters = {
      category: 'All' as any,
      muscleGroup: 'All',
      difficulty: 'All' as any,
    };

    renderHook(() => useExercises(filters));

    // Verify SWR was called with no query params
    expect(vi.mocked(useSWR)).toHaveBeenCalledWith(
      '/api/exercises',
      expect.any(Function)
    );
  });
});

describe('useExercise', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch a single exercise by ID', () => {
    const mockExercise = {
      id: '1',
      name: 'Push-ups',
      description: 'A classic bodyweight exercise',
      category: 'Strength' as const,
      muscleGroups: ['Chest', 'Triceps'],
      equipment: ['Bodyweight'],
      difficulty: 'Beginner' as const,
      icon: '🏋️',
      iconColor: 'bg-blue-100 text-blue-600',
    };

    vi.mocked(useSWR).mockReturnValue({
      data: { exercise: mockExercise },
      error: null,
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    });

    const { result } = renderHook(() => useExercise('1'));

    expect(result.current.exercise).toEqual(mockExercise);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should not fetch when exerciseId is null', () => {
    vi.mocked(useSWR).mockReturnValue({
      data: undefined,
      error: null,
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    });

    renderHook(() => useExercise(''));

    // Verify SWR was called with null (no fetch)
    expect(vi.mocked(useSWR)).toHaveBeenCalledWith(null, expect.any(Function));
  });
});
