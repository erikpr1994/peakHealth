import type {
  RoutineCreationData,
  RoutineHeaderProps,
  RoutineDetailsProps,
  InputFieldProps,
  SelectFieldProps,
  NumberInputProps,
  TextAreaProps,
} from './index';

describe('Type exports', () => {
  test('should export RoutineCreationData type', () => {
    // Test that we can create a valid object of this type
    const testData: RoutineCreationData = {
      name: 'Test Routine',
      description: 'Test description',
      difficulty: 'Beginner',
      goal: 'Strength',
      duration: 4,
      objectives: ['Objective 1'],
    };
    expect(testData.name).toBe('Test Routine');
  });

  test('should export RoutineHeaderProps type', () => {
    // Test that we can create a valid object of this type
    const testProps: RoutineHeaderProps = {
      mode: 'create',
      onSave: () => {},
      onCancel: () => {},
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
        duration: 4,
        objectives: [],
      },
      onUpdate: () => {},
    };
    expect(testProps.data.name).toBe('Test Routine');
  });

  test('should export InputFieldProps type', () => {
    // Test that we can create a valid object of this type
    const testProps: InputFieldProps = {
      label: 'Test Label',
      value: 'test value',
      onChange: () => {},
      placeholder: 'test placeholder',
    };
    expect(testProps.label).toBe('Test Label');
  });

  test('should export SelectFieldProps type', () => {
    // Test that we can create a valid object of this type
    const testProps: SelectFieldProps = {
      label: 'Test Label',
      value: 'test value',
      onChange: () => {},
      options: [{ value: 'test', label: 'Test' }],
    };
    expect(testProps.label).toBe('Test Label');
  });

  test('should export NumberInputProps type', () => {
    // Test that we can create a valid object of this type
    const testProps: NumberInputProps = {
      label: 'Test Label',
      value: 42,
      onChange: () => {},
      min: 0,
      max: 100,
    };
    expect(testProps.label).toBe('Test Label');
  });

  test('should export TextAreaProps type', () => {
    // Test that we can create a valid object of this type
    const testProps: TextAreaProps = {
      label: 'Test Label',
      value: 'test value',
      onChange: () => {},
      placeholder: 'test placeholder',
      rows: 3,
    };
    expect(testProps.label).toBe('Test Label');
  });
});
