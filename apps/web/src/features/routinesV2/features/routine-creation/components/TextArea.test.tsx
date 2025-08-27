import { render, screen, fireEvent } from '@testing-library/react';
import { TextArea } from './TextArea';

describe('TextArea', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders textarea with label', () => {
    render(<TextArea label="Test Label" value="" onChange={mockOnChange} />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('displays current value', () => {
    const testValue = 'test text content';
    render(
      <TextArea label="Test Label" value={testValue} onChange={mockOnChange} />
    );
    expect(screen.getByRole('textbox')).toHaveValue(testValue);
  });

  test('calls onChange when text changes', () => {
    render(<TextArea label="Test Label" value="" onChange={mockOnChange} />);
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'new text' } });
    expect(mockOnChange).toHaveBeenCalledWith('new text');
  });

  test('displays placeholder when provided', () => {
    const placeholder = 'Enter text here';
    render(
      <TextArea
        label="Test Label"
        value=""
        onChange={mockOnChange}
        placeholder={placeholder}
      />
    );
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  test('applies rows attribute', () => {
    render(
      <TextArea label="Test Label" value="" onChange={mockOnChange} rows={5} />
    );
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '5');
  });

  test('shows required indicator when required is true', () => {
    render(
      <TextArea label="Test Label" value="" onChange={mockOnChange} required />
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });
});
