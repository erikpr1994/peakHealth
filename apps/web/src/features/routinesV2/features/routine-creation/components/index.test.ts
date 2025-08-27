import {
  RoutineHeader,
  RoutineDetails,
  ObjectivesInput,
  InputField,
  SelectField,
  NumberInput,
  TextArea,
} from './index';

describe('Component exports', () => {
  test('exports RoutineHeader component', () => {
    expect(RoutineHeader).toBeDefined();
    expect(typeof RoutineHeader).toBe('function');
  });

  test('exports RoutineDetails component', () => {
    expect(RoutineDetails).toBeDefined();
    expect(typeof RoutineDetails).toBe('function');
  });

  test('exports ObjectivesInput component', () => {
    expect(ObjectivesInput).toBeDefined();
    expect(typeof ObjectivesInput).toBe('function');
  });

  test('exports InputField component', () => {
    expect(InputField).toBeDefined();
    expect(typeof InputField).toBe('function');
  });

  test('exports SelectField component', () => {
    expect(SelectField).toBeDefined();
    expect(typeof SelectField).toBe('function');
  });

  test('exports NumberInput component', () => {
    expect(NumberInput).toBeDefined();
    expect(typeof NumberInput).toBe('function');
  });

  test('exports TextArea component', () => {
    expect(TextArea).toBeDefined();
    expect(typeof TextArea).toBe('function');
  });
});
