import type {
  RoutineHeaderProps,
  RoutineDetailsProps,
} from './component-props';

describe('Component Props Types', () => {
  test('should export RoutineHeaderProps type', () => {
    // Test that we can create a valid object of this type
    const testProps: RoutineHeaderProps = {
      mode: 'create',
      onSave: vi.fn(),
      onCancel: vi.fn(),
    };
    expect(testProps.mode).toBe('create');
  });

  test('should export RoutineDetailsProps type', () => {
    // Test that we can create a valid object of this type
    const testProps: RoutineDetailsProps = {
      data: {
        name: 'Test Routine',
        description: 'Test description',
        difficulty: 'Beginner',
        goal: 'Strength',
        duration: 12,
        objectives: ['Objective 1'],
      },
      onUpdate: vi.fn(),
    };
    expect(testProps.data.name).toBe('Test Routine');
  });
});
