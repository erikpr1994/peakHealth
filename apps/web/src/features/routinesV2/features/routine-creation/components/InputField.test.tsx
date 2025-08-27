import { render, screen, fireEvent } from '@testing-library/react';
import { InputField } from './InputField';

describe('InputField', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders input field with label', () => {
    render(<InputField label="Test Label" value="" onChange={mockOnChange} />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('displays current value', () => {
    const testValue = 'test value';
    render(
      <InputField
        label="Test Label"
        value={testValue}
        onChange={mockOnChange}
      />
    );
    expect(screen.getByRole('textbox')).toHaveValue(testValue);
  });

  test('calls onChange when input changes', () => {
    render(<InputField label="Test Label" value="" onChange={mockOnChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(mockOnChange).toHaveBeenCalledWith('new value');
  });

  test('displays placeholder when provided', () => {
    const placeholder = 'Enter text here';
    render(
      <InputField
        label="Test Label"
        value=""
        onChange={mockOnChange}
        placeholder={placeholder}
      />
    );
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  test('shows required indicator when required is true', () => {
    render(
      <InputField
        label="Test Label"
        value=""
        onChange={mockOnChange}
        required
      />
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  test('does not show required indicator when required is false', () => {
    render(
      <InputField
        label="Test Label"
        value=""
        onChange={mockOnChange}
        required={false}
      />
    );
    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });
});
