import { render, screen, fireEvent } from '@testing-library/react';
import { SelectField } from './SelectField';

describe('SelectField', () => {
  const mockOnChange = vi.fn();
  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders select field with label', () => {
    render(
      <SelectField
        label="Test Label"
        value=""
        onChange={mockOnChange}
        options={mockOptions}
      />
    );
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  test('displays current value', () => {
    render(
      <SelectField
        label="Test Label"
        value="option2"
        onChange={mockOnChange}
        options={mockOptions}
      />
    );
    expect(screen.getByDisplayValue('Option 2')).toBeInTheDocument();
  });

  test('calls onChange when selection changes', () => {
    render(
      <SelectField
        label="Test Label"
        value=""
        onChange={mockOnChange}
        options={mockOptions}
      />
    );
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'option3' } });
    expect(mockOnChange).toHaveBeenCalledWith('option3');
  });

  test('renders all options', () => {
    render(
      <SelectField
        label="Test Label"
        value=""
        onChange={mockOnChange}
        options={mockOptions}
      />
    );
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  test('shows required indicator when required is true', () => {
    render(
      <SelectField
        label="Test Label"
        value=""
        onChange={mockOnChange}
        options={mockOptions}
        required
      />
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  test('does not show required indicator when required is false', () => {
    render(
      <SelectField
        label="Test Label"
        value=""
        onChange={mockOnChange}
        options={mockOptions}
        required={false}
      />
    );
    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });
});
