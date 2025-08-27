import type {
  InputFieldProps,
  SelectFieldProps,
  NumberInputProps,
  TextAreaProps,
} from './form-fields';

describe('Form Fields Types', () => {
  test('should export InputFieldProps type', () => {
    // Test that we can create a valid object of this type
    const testProps: InputFieldProps = {
      label: 'Test Label',
      value: 'test value',
      onChange: vi.fn(),
      required: true,
    };
    expect(testProps.label).toBe('Test Label');
  });

  test('should export SelectFieldProps type', () => {
    // Test that we can create a valid object of this type
    const testProps: SelectFieldProps = {
      label: 'Test Label',
      value: 'option1',
      onChange: vi.fn(),
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ],
      required: true,
    };
    expect(testProps.label).toBe('Test Label');
  });

  test('should export NumberInputProps type', () => {
    // Test that we can create a valid object of this type
    const testProps: NumberInputProps = {
      label: 'Test Label',
      value: 42,
      onChange: vi.fn(),
      min: 1,
      max: 100,
      required: true,
    };
    expect(testProps.label).toBe('Test Label');
  });

  test('should export TextAreaProps type', () => {
    // Test that we can create a valid object of this type
    const testProps: TextAreaProps = {
      label: 'Test Label',
      value: 'test text content',
      onChange: vi.fn(),
      rows: 4,
      required: true,
    };
    expect(testProps.label).toBe('Test Label');
  });
});
