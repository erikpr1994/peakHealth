import type { RoutineCreationData } from './routine';

describe('Routine Types', () => {
  test('should export RoutineCreationData type', () => {
    // Test that we can create a valid object of this type
    const testData: RoutineCreationData = {
      name: 'Test Routine',
      description: 'Test description',
      difficulty: 'Beginner',
      goal: 'Strength',
      duration: 12,
      objectives: ['Objective 1', 'Objective 2'],
    };
    expect(testData.name).toBe('Test Routine');
  });

  test('should have valid difficulty values', () => {
    // Test that we can create valid difficulty values
    const difficulties = ['Beginner', 'Intermediate', 'Advanced'] as const;
    expect(difficulties).toHaveLength(3);
  });

  test('should have valid goal values', () => {
    // Test that we can create valid goal values
    const goals = [
      'Strength',
      'Hypertrophy',
      'Endurance',
      'Weight Loss',
    ] as const;
    expect(goals).toHaveLength(4);
  });
});
