import { render, screen, fireEvent } from '@testing-library/react';
import { NumberInput } from './NumberInput';

describe('NumberInput', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
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
