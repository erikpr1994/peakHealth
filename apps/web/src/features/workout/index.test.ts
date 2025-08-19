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

  // Note: TypeScript types are compile-time constructs and don't exist at runtime.
  // Type assertions are removed as they should be tested through TypeScript compilation.
});
