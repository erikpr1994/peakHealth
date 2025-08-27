import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { SelectField } from './SelectField';

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'creation.selectDifficulty': 'Select difficulty',
      'creation.selectGoal': 'Select goal',
    };
    return translations[key] || key;
  },
}));

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

  test('calls onChange when selection changes to valid option', () => {
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

  test('does not call onChange when default option is selected', () => {
    render(
      <SelectField
        label="Test Label"
        value=""
        onChange={mockOnChange}
        options={mockOptions}
      />
    );
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '__default__' } });
    expect(mockOnChange).not.toHaveBeenCalled();
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

  test('shows translated default option for difficulty field', () => {
    render(
      <SelectField
        label="Difficulty"
        value=""
        onChange={mockOnChange}
        options={mockOptions}
      />
    );
    expect(screen.getByText('Select difficulty')).toBeInTheDocument();
  });

  test('shows translated default option for goal field', () => {
    render(
      <SelectField
        label="Goal"
        value=""
        onChange={mockOnChange}
        options={mockOptions}
      />
    );
    expect(screen.getByText('Select goal')).toBeInTheDocument();
  });

  test('shows fallback default option for other fields', () => {
    render(
      <SelectField
        label="Category"
        value=""
        onChange={mockOnChange}
        options={mockOptions}
      />
    );
    expect(screen.getByText('Select category')).toBeInTheDocument();
  });
});
