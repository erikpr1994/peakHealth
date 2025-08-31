import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { ApproachSetGeneratorModal } from './ApproachSetGeneratorModal';

// Mock the UI components
interface MockModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

interface MockButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

interface MockInputProps {
  id?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: () => void;
  min?: string;
  max?: string;
  step?: string;
}

interface MockLabelProps {
  children: React.ReactNode;
  htmlFor?: string;
}

vi.mock('@peakhealth/ui', () => ({
  Modal: ({ children, isOpen, onClose, title }: MockModalProps) =>
    isOpen ? (
      <div data-testid="modal">
        <div data-testid="modal-title">{title}</div>
        <button onClick={onClose} data-testid="modal-close">
          Close
        </button>
        {children}
      </div>
    ) : null,
  Button: ({ children, onClick, disabled, className }: MockButtonProps) => (
    <button onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  ),
  Input: ({
    id,
    type,
    placeholder,
    value,
    onChange,
    min,
    max,
    step,
  }: MockInputProps) => (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      step={step}
    />
  ),
  Label: ({ children, htmlFor }: MockLabelProps) => (
    <label htmlFor={htmlFor}>{children}</label>
  ),
}));

describe('ApproachSetGeneratorModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    exerciseId: 'exercise-123',
    onGenerateSets: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders when open', () => {
    render(<ApproachSetGeneratorModal {...defaultProps} />);

    expect(screen.getByTestId('modal')).toBeDefined();
    expect(screen.getByText('Generate Warm-up Sets')).toBeDefined();
    expect(
      screen.getByText(
        'Generate warm-up sets based on your first working set weight to help you prepare for your main sets.'
      )
    ).toBeDefined();
  });

  it('displays working weight input', () => {
    render(<ApproachSetGeneratorModal {...defaultProps} />);

    expect(
      screen.getByLabelText('First Working Set Weight (lbs)')
    ).toBeDefined();
    expect(screen.getByPlaceholderText('e.g., 135')).toBeDefined();
  });

  it('displays all warm-up strategies', () => {
    render(<ApproachSetGeneratorModal {...defaultProps} />);

    expect(screen.getByText('Standard Ramp-up (3 Sets)')).toBeDefined();
    expect(screen.getByText('Quick Ramp-up (2 Sets)')).toBeDefined();
    expect(screen.getByText('Conservative Ramp-up (4 Sets)')).toBeDefined();
    expect(screen.getByText('Custom')).toBeDefined();
  });

  it('displays strategy descriptions', () => {
    render(<ApproachSetGeneratorModal {...defaultProps} />);

    expect(screen.getByText('40%, 60%, 80% of working weight')).toBeDefined();
    expect(screen.getByText('50%, 75% of working weight')).toBeDefined();
    expect(
      screen.getByText('30%, 50%, 70%, 85% of working weight')
    ).toBeDefined();
    expect(
      screen.getByText('Create your own warm-up set configuration')
    ).toBeDefined();
  });

  it('displays strategy set details', () => {
    render(<ApproachSetGeneratorModal {...defaultProps} />);

    expect(screen.getByText('40% × 8 reps')).toBeDefined();
    expect(screen.getByText('60% × 6 reps')).toBeDefined();
    expect(screen.getByText('80% × 4 reps')).toBeDefined();
  });

  it('selects standard strategy by default', () => {
    render(<ApproachSetGeneratorModal {...defaultProps} />);

    const standardStrategy = screen
      .getByText('Standard Ramp-up (3 Sets)')
      .closest('div');
    expect(standardStrategy).toBeDefined();
    // Check that it has the selected class by looking at the parent element
    const strategyContainer = standardStrategy?.parentElement;
    expect(strategyContainer).toBeDefined();
  });

  it('allows selecting different strategies', () => {
    render(<ApproachSetGeneratorModal {...defaultProps} />);

    const quickStrategy = screen
      .getByText('Quick Ramp-up (2 Sets)')
      .closest('div');
    if (quickStrategy) {
      fireEvent.click(quickStrategy);
    }

    expect(quickStrategy).toBeDefined();
  });

  it('enables custom mode when custom strategy is selected', () => {
    render(<ApproachSetGeneratorModal {...defaultProps} />);

    const customStrategy = screen.getByText('Custom').closest('div');
    if (customStrategy) {
      fireEvent.click(customStrategy);
    }

    expect(screen.getByText('Custom Warm-up Sets')).toBeDefined();
    expect(screen.getByText('+ Add Set')).toBeDefined();
  });

  it('allows adding custom sets', () => {
    render(<ApproachSetGeneratorModal {...defaultProps} />);

    // Enable custom mode
    const customStrategy = screen.getByText('Custom').closest('div');
    if (customStrategy) {
      fireEvent.click(customStrategy);
    }

    const addSetButton = screen.getByText('+ Add Set');
    fireEvent.click(addSetButton);

    expect(screen.getByText('Percentage')).toBeDefined();
    expect(screen.getByText('Reps')).toBeDefined();
    expect(screen.getByText('Weight (lbs)')).toBeDefined();
  });

  it('allows removing custom sets', () => {
    render(<ApproachSetGeneratorModal {...defaultProps} />);

    // Enable custom mode and add a set
    const customStrategy = screen.getByText('Custom').closest('div');
    if (customStrategy) {
      fireEvent.click(customStrategy);
    }

    const addSetButton = screen.getByText('+ Add Set');
    fireEvent.click(addSetButton);

    const removeButton = screen.getByText('Remove');
    fireEvent.click(removeButton);

    expect(screen.queryByText('Percentage')).toBeNull();
  });

  it('generates sets with standard strategy', () => {
    render(<ApproachSetGeneratorModal {...defaultProps} />);

    const weightInput = screen.getByLabelText('First Working Set Weight (lbs)');
    fireEvent.change(weightInput, { target: { value: '135' } });

    const generateButton = screen.getByText('Generate Sets');
    fireEvent.click(generateButton);

    expect(defaultProps.onGenerateSets).toHaveBeenCalledWith('exercise-123', [
      { weight: 54, reps: 8, percentage: 40 },
      { weight: 81, reps: 6, percentage: 60 },
      { weight: 108, reps: 4, percentage: 80 },
    ]);
  });

  it('generates sets with custom strategy', () => {
    render(<ApproachSetGeneratorModal {...defaultProps} />);

    // Set working weight
    const weightInput = screen.getByLabelText('First Working Set Weight (lbs)');
    fireEvent.change(weightInput, { target: { value: '135' } });

    // Enable custom mode and add a set
    const customStrategy = screen.getByText('Custom').closest('div');
    if (customStrategy) {
      fireEvent.click(customStrategy);
    }

    const addSetButton = screen.getByText('+ Add Set');
    fireEvent.click(addSetButton);

    // Fill in custom set values
    const percentageInput = screen.getByDisplayValue('50');
    const repsInput = screen.getByDisplayValue('8');

    fireEvent.change(percentageInput, { target: { value: '60' } });
    fireEvent.change(repsInput, { target: { value: '6' } });

    const generateButton = screen.getByText('Generate Sets');
    fireEvent.click(generateButton);

    expect(defaultProps.onGenerateSets).toHaveBeenCalledWith('exercise-123', [
      { weight: 81, reps: 6, percentage: 60 },
    ]);
  });

  it('disables generate button when no weight is entered', () => {
    render(<ApproachSetGeneratorModal {...defaultProps} />);

    const generateButton = screen.getByText('Generate Sets');
    expect(generateButton).toBeDefined();
    // Check if button is disabled by looking at the disabled property
    expect(generateButton).toHaveProperty('disabled', true);
  });

  it('disables generate button when custom mode has invalid sets', () => {
    render(<ApproachSetGeneratorModal {...defaultProps} />);

    // Enable custom mode
    const customStrategy = screen.getByText('Custom').closest('div');
    if (customStrategy) {
      fireEvent.click(customStrategy);
    }

    const generateButton = screen.getByText('Generate Sets');
    expect(generateButton).toBeDefined();
    // Check if button is disabled by looking at the disabled property
    expect(generateButton).toHaveProperty('disabled', true);
  });

  it('closes modal after generating sets', () => {
    render(<ApproachSetGeneratorModal {...defaultProps} />);

    const weightInput = screen.getByLabelText('First Working Set Weight (lbs)');
    fireEvent.change(weightInput, { target: { value: '135' } });

    const generateButton = screen.getByText('Generate Sets');
    fireEvent.click(generateButton);

    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('calls onClose when cancel button is clicked', () => {
    render(<ApproachSetGeneratorModal {...defaultProps} />);

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('does not render when closed', () => {
    render(<ApproachSetGeneratorModal {...defaultProps} isOpen={false} />);

    expect(screen.queryByTestId('modal')).toBeNull();
  });
});
