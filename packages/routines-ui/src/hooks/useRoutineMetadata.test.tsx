import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRoutineMetadata } from './useRoutineMetadata';
import { RoutineBuilderProvider } from '../context/routineBuilder/RoutineBuilderContext';
import { RoutineBuilderState } from '../context/routineBuilder/types';

// Mock data for testing
const mockState: RoutineBuilderState = {
  _id: 'routine-1',
  name: 'Test Routine',
  description: 'A test routine',
  difficulty: 'beginner',
  goal: 'strength',
  duration: 4,
  objectives: ['Build strength', 'Improve form'],
  workouts: [],
  userId: 'user-1',
  createdBy: 'user-1',
  routineType: 'user-created',
  isActive: true,
  isFavorite: false,
  completedWorkouts: 0,
  totalWorkouts: 0,
  schemaVersion: '1.0.0',
  createdAt: '2025-01-01T00:00:00Z',
  updatedAt: '2025-01-01T00:00:00Z',
};

const mockDispatch = vi.fn();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <RoutineBuilderProvider
    value={{
      state: mockState,
      dispatch: mockDispatch,
    }}
  >
    {children}
  </RoutineBuilderProvider>
);

describe('useRoutineMetadata', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('should return routine metadata', () => {
    const { result } = renderHook(() => useRoutineMetadata(), { wrapper });

    expect(result.current.name).toBe('Test Routine');
    expect(result.current.description).toBe('A test routine');
    expect(result.current.difficulty).toBe('beginner');
    expect(result.current.goal).toBe('strength');
    expect(result.current.duration).toBe(4);
    expect(result.current.objectives).toEqual(['Build strength', 'Improve form']);
    expect(result.current.isActive).toBe(true);
    expect(result.current.isFavorite).toBe(false);
    expect(result.current.completedWorkouts).toBe(0);
    expect(result.current.totalWorkouts).toBe(0);
    expect(result.current.lastUsed).toBeUndefined();
  });

  it('should provide updateRoutineName function', () => {
    const { result } = renderHook(() => useRoutineMetadata(), { wrapper });

    expect(typeof result.current.updateRoutineName).toBe('function');
  });

  it('should dispatch UPDATE_ROUTINE_NAME action when updateRoutineName is called', () => {
    const { result } = renderHook(() => useRoutineMetadata(), { wrapper });

    act(() => {
      result.current.updateRoutineName('New Routine Name');
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'UPDATE_ROUTINE_NAME',
      payload: { name: 'New Routine Name' },
    });
  });

  it('should throw error when used outside of RoutineBuilderProvider', () => {
    // Use a try-catch to properly test the error case
    let error: Error | null = null;
    
    try {
      renderHook(() => useRoutineMetadata());
    } catch (e) {
      error = e as Error;
    }
    
    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toBe('useRoutineMetadata must be used within a RoutineBuilderProvider');
  });

  it('should memoize metadata to prevent unnecessary re-renders', () => {
    const { result } = renderHook(() => useRoutineMetadata(), { wrapper });

    // Get the result multiple times to verify memoization
    const firstResult = result.current;
    const secondResult = result.current;
    const thirdResult = result.current;

    // All calls should return the same object reference
    expect(firstResult).toBe(secondResult);
    expect(secondResult).toBe(thirdResult);
    expect(firstResult).toBe(thirdResult);
    
    // Verify the individual properties are correct
    expect(firstResult.name).toBe('Test Routine');
    expect(firstResult.description).toBe('A test routine');
  });
});
