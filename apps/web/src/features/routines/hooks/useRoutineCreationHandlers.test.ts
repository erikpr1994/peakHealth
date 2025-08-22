import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useRoutineCreationHandlers } from './useRoutineCreationHandlers';

// Mock dependencies
vi.mock('next/navigation', () => ({
  useRouter: (): { push: ReturnType<typeof vi.fn> } => ({
    push: vi.fn(),
  }),
}));

vi.mock('@/features/auth/context/AuthContext', () => ({
  useAuth: (): { isAuthenticated: boolean; user: { id: string } } => ({
    isAuthenticated: true,
    user: { id: 'test-user-id' },
  }),
}));

vi.mock('@peakhealth/ui', () => ({
  useToast: (): { showToast: ReturnType<typeof vi.fn> } => ({
    showToast: vi.fn(),
  }),
}));

vi.mock('../services/routineService', () => ({
  routineService: {
    createRoutine: vi.fn(),
  },
}));

vi.mock('../features/routine-creation/hooks', () => ({
  useRoutineValidation: (): {
    validateRoutineData: ReturnType<typeof vi.fn>;
  } => ({
    validateRoutineData: vi.fn(() => null),
  }),
  useRoutineModals: (): {
    openModal: ReturnType<typeof vi.fn>;
    closeModal: ReturnType<typeof vi.fn>;
    getModalContext: ReturnType<typeof vi.fn>;
  } => ({
    openModal: vi.fn(),
    closeModal: vi.fn(),
    getModalContext: vi.fn(() => null),
  }),
}));

vi.mock('../utils/workoutCalculations', () => ({
  addApproachSets: vi.fn(sets => sets),
}));

describe('useRoutineCreationHandlers', () => {
  const mockProps = {
    // State from useRoutineCreationState
    name: 'Test Routine',
    difficulty: 'Beginner',
    goal: 'Strength',
    description: 'Test description',
    objectives: ['Objective 1'],
    duration: 12,
    creatingRunning: false,
    editingRunning: null,
    setCreatingRunning: vi.fn(),
    setEditingRunning: vi.fn(),
    // Workout operations from useWorkoutOperations
    strengthWorkouts: [],
    runningWorkouts: [],
    setStrengthWorkouts: vi.fn(),
    setRunningWorkouts: vi.fn(),
    addStrengthExercise: vi.fn(),
    addRunningExercise: vi.fn(),
    updateStrengthExerciseSets: vi.fn(),
    updateRunningExerciseSets: vi.fn(),
  };

  it('should return all expected handlers', () => {
    const { result } = renderHook(() =>
      useRoutineCreationHandlers(
        mockProps.name,
        mockProps.difficulty,
        mockProps.goal,
        mockProps.description,
        mockProps.objectives,
        mockProps.duration,
        mockProps.creatingRunning,
        mockProps.editingRunning,
        mockProps.setCreatingRunning,
        mockProps.setEditingRunning,
        mockProps.strengthWorkouts,
        mockProps.runningWorkouts,
        mockProps.setStrengthWorkouts,
        mockProps.setRunningWorkouts,
        mockProps.addStrengthExercise,
        mockProps.addRunningExercise,
        mockProps.updateStrengthExerciseSets,
        mockProps.updateRunningExerciseSets
      )
    );

    expect(result.current).toHaveProperty('handleSaveRoutine');
    expect(result.current).toHaveProperty('handleRunningSave');
    expect(result.current).toHaveProperty('handleEditRunning');
    expect(result.current).toHaveProperty('handleAddExerciseClick');
    expect(result.current).toHaveProperty('handleExerciseSelect');
    expect(result.current).toHaveProperty('handleNotesClick');
    expect(result.current).toHaveProperty('handleNotesSave');
    expect(result.current).toHaveProperty('handleAddApproachSets');
  });

  it('should have correct handler types', () => {
    const { result } = renderHook(() =>
      useRoutineCreationHandlers(
        mockProps.name,
        mockProps.difficulty,
        mockProps.goal,
        mockProps.description,
        mockProps.objectives,
        mockProps.duration,
        mockProps.creatingRunning,
        mockProps.editingRunning,
        mockProps.setCreatingRunning,
        mockProps.setEditingRunning,
        mockProps.strengthWorkouts,
        mockProps.runningWorkouts,
        mockProps.setStrengthWorkouts,
        mockProps.setRunningWorkouts,
        mockProps.addStrengthExercise,
        mockProps.addRunningExercise,
        mockProps.updateStrengthExerciseSets,
        mockProps.updateRunningExerciseSets
      )
    );

    expect(typeof result.current.handleSaveRoutine).toBe('function');
    expect(typeof result.current.handleRunningSave).toBe('function');
    expect(typeof result.current.handleEditRunning).toBe('function');
    expect(typeof result.current.handleAddExerciseClick).toBe('function');
    expect(typeof result.current.handleExerciseSelect).toBe('function');
    expect(typeof result.current.handleNotesClick).toBe('function');
    expect(typeof result.current.handleNotesSave).toBe('function');
    expect(typeof result.current.handleAddApproachSets).toBe('function');
  });
});
