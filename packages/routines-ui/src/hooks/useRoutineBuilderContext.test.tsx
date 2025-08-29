import { renderHook } from '@testing-library/react';
import { useRoutineBuilderContext } from './useRoutineBuilderContext';
import {
  RoutineBuilderProvider,
  RoutineBuilderContextType,
} from '../context/routineBuilder/RoutineBuilderContext';
import { vi } from 'vitest';

describe('useRoutineBuilderContext', () => {
  it('should return context value when used within RoutineBuilderProvider', () => {
    const mockContextValue: RoutineBuilderContextType = {
      state: {
        _id: '1',
        name: 'Test Routine',
        description: 'Test description',
        difficulty: 'beginner',
        goal: 'strength',
        duration: 4,
        objectives: ['Build strength'],
        workouts: [],
        schemaVersion: '1.0',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        userId: 'user1',
        createdBy: 'user1',
        routineType: 'user-created',
        isActive: true,
        isFavorite: false,
        completedWorkouts: 0,
        totalWorkouts: 0,
      },
      dispatch: vi.fn(),
    };

    const { result } = renderHook(() => useRoutineBuilderContext(), {
      wrapper: ({ children }) => (
        <RoutineBuilderProvider value={mockContextValue}>
          {children}
        </RoutineBuilderProvider>
      ),
    });

    expect(result.current).toBeDefined();
    expect(result.current.state).toBeDefined();
    expect(result.current.dispatch).toBeDefined();
  });

  it('should throw error when used outside RoutineBuilderProvider', () => {
    expect(() => {
      renderHook(() => useRoutineBuilderContext());
    }).toThrow(
      'useRoutineBuilderContext must be used within a RoutineBuilderProvider'
    );
  });
});
