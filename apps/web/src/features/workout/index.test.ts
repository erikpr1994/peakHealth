import { describe, test, expect } from 'vitest';

describe('Workout Index', () => {
  test('should export workout components', async () => {
    const exports = await import('./index');
    expect(exports).toBeDefined();
    expect(typeof exports).toBe('object');
    expect(exports.WorkoutTracker).toBeDefined();
    expect(exports.WorkoutTrackerContainer).toBeDefined();
    expect(exports.WorkoutPreparation).toBeDefined();
    expect(exports.WorkoutCompletion).toBeDefined();
    expect(exports.ExerciseView).toBeDefined();
    expect(exports.RestView).toBeDefined();
    expect(exports.WorkoutSummary).toBeDefined();
    expect(exports.SetManagement).toBeDefined();
    expect(exports.RestTimer).toBeDefined();
    expect(exports.WorkoutTypeSelectionModal).toBeDefined();
  });

  test('should export hooks', async () => {
    const exports = await import('./index');
    expect(exports.useWorkoutNavigation).toBeDefined();
  });

  test('should export types', async () => {
    const exports = await import('./index');
    expect(exports).toHaveProperty('WorkoutFlowState');
    expect(exports).toHaveProperty('WorkoutTrackerContainerProps');
    expect(exports).toHaveProperty('WorkoutPreparationProps');
    expect(exports).toHaveProperty('RoutineDetails');
  });
});
