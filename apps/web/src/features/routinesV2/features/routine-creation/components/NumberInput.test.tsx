import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '@peakhealth/ui';
import { NumberInput } from './NumberInput';

describe('NumberInput', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Input component works correctly', () => {
    const inputOnChange = vi.fn();
    render(<Input type="number" value={0} onChange={inputOnChange} />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '10' } });
    expect(inputOnChange).toHaveBeenCalled();
  });

  test('renders number input with label', () => {
    render(
      <NumberInput label="Test Label" value={0} onChange={mockOnChange} />
    );
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
  });

  test('displays current value', () => {
    const testValue = 42;
    render(
      <NumberInput
        label="Test Label"
        value={testValue}
        onChange={mockOnChange}
      />
    );
    expect(screen.getByRole('spinbutton')).toHaveValue(testValue);
  });

  test('calls onChange when value changes', () => {
    render(
      <NumberInput label="Test Label" value={0} onChange={mockOnChange} />
    );
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '10' } });
    expect(mockOnChange).toHaveBeenCalledWith(10);
  });

  test('handles decimal values', () => {
    render(
      <NumberInput label="Test Label" value={0} onChange={mockOnChange} />
    );
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '10.5' } });
    expect(mockOnChange).toHaveBeenCalledWith(10.5);
  });

  test('handles empty input by setting to min value', () => {
    render(
      <NumberInput
        label="Test Label"
        value={5}
        onChange={mockOnChange}
        min={1}
      />
    );
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '' } });
    expect(mockOnChange).toHaveBeenCalledWith(1);
  });

  test('enforces max constraint', () => {
    render(
      <NumberInput
        label="Test Label"
        value={5}
        onChange={mockOnChange}
        max={10}
      />
    );
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '15' } });
    expect(mockOnChange).toHaveBeenCalledWith(10);
  });

  test('handles invalid input by setting to min value', () => {
    render(
      <NumberInput label="Test Label" value={5} onChange={mockOnChange} />
    );
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: 'abc' } });
    // HTML number inputs clear invalid values, so it becomes empty and sets to min
    expect(mockOnChange).toHaveBeenCalledWith(1);
  });

  test('applies min and max attributes', () => {
    render(
      <NumberInput
        label="Test Label"
        value={0}
        onChange={mockOnChange}
        min={0}
        max={100}
      />
    );
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('min', '0');
    expect(input).toHaveAttribute('max', '100');
  });

  test('shows required indicator when required is true', () => {
    render(
      <NumberInput
        label="Test Label"
        value={0}
        onChange={mockOnChange}
        required
      />
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });
});
