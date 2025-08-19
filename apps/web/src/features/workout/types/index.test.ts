import { describe, test, expect } from 'vitest';

describe('Workout Types', () => {
  test('should export WorkoutFlowState type', async () => {
    const { WorkoutFlowState } = await import('./index');
    expect(WorkoutFlowState).toBeDefined();
  });

  test('should export WorkoutTrackerContainerProps type', async () => {
    const { WorkoutTrackerContainerProps } = await import('./index');
    expect(WorkoutTrackerContainerProps).toBeDefined();
  });

  test('should export WorkoutPreparationProps type', async () => {
    const { WorkoutPreparationProps } = await import('./index');
    expect(WorkoutPreparationProps).toBeDefined();
  });

  test('should export RoutineDetails type', async () => {
    const { RoutineDetails } = await import('./index');
    expect(RoutineDetails).toBeDefined();
  });

  test('should have correct WorkoutFlowState values', async () => {
    const { WorkoutFlowState } = await import('./index');
    expect(WorkoutFlowState).toContain('preparation');
    expect(WorkoutFlowState).toContain('active');
    expect(WorkoutFlowState).toContain('completed');
  });
});
