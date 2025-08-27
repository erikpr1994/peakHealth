import type {
  RoutineCreationData,
  RoutineDifficulty,
  RoutineGoal,
} from './routine';

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

  test('should export RoutineDifficulty type', () => {
    // Test that we can create valid difficulty values
    const difficulties: RoutineDifficulty[] = [
      'Beginner',
      'Intermediate',
      'Advanced',
    ];
    expect(difficulties).toHaveLength(3);
  });

  test('should export RoutineGoal type', () => {
    // Test that we can create valid goal values
    const goals: RoutineGoal[] = [
      'Strength',
      'Hypertrophy',
      'Endurance',
      'Weight Loss',
    ];
    expect(goals).toHaveLength(4);
  });
});
