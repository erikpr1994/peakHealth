import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { SectionTypeSelectionModal } from './SectionTypeSelectionModal';

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
  className?: string;
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
  Button: ({ children, onClick, className }: MockButtonProps) => (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  ),
}));

describe('SectionTypeSelectionModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    workoutId: 'workout-123',
    onSectionTypeSelect: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders when open', () => {
    render(<SectionTypeSelectionModal {...defaultProps} />);

    expect(screen.getByTestId('modal')).toBeDefined();
    expect(screen.getByText('Select Section Type')).toBeDefined();
    expect(
      screen.getByText(
        "Choose the type of section you'd like to add to your workout:"
      )
    ).toBeDefined();
  });

  it('does not render when closed', () => {
    render(<SectionTypeSelectionModal {...defaultProps} isOpen={false} />);

    expect(screen.queryByTestId('modal')).toBeNull();
  });

  it('displays all section type categories', () => {
    render(<SectionTypeSelectionModal {...defaultProps} />);

    expect(screen.getByText('💪 Strength Training')).toBeDefined();
    expect(screen.getByText('🏃 Cardio & Running')).toBeDefined();
    expect(screen.getByText('🧘 Warm-up & Recovery')).toBeDefined();
  });

  it('displays section type options with labels and descriptions', () => {
    render(<SectionTypeSelectionModal {...defaultProps} />);

    expect(screen.getByText('Basic Strength')).toBeDefined();
    expect(
      screen.getByText('Standard strength training with sets and reps')
    ).toBeDefined();

    expect(screen.getByText('EMOM')).toBeDefined();
    expect(
      screen.getByText('Every Minute On the Minute training')
    ).toBeDefined();

    expect(screen.getByText('Warm-up')).toBeDefined();
    expect(screen.getByText('Prepare your body for the workout')).toBeDefined();
  });

  it('calls onSectionTypeSelect when a section type is clicked', () => {
    render(<SectionTypeSelectionModal {...defaultProps} />);

    const basicStrengthButton = screen
      .getByText('Basic Strength')
      .closest('button');
    expect(basicStrengthButton).toBeDefined();

    if (basicStrengthButton) {
      fireEvent.click(basicStrengthButton);
    }

    expect(defaultProps.onSectionTypeSelect).toHaveBeenCalledWith(
      'workout-123',
      'basic'
    );
  });

  it('closes modal after selecting a section type', () => {
    render(<SectionTypeSelectionModal {...defaultProps} />);

    const basicStrengthButton = screen
      .getByText('Basic Strength')
      .closest('button');

    if (basicStrengthButton) {
      fireEvent.click(basicStrengthButton);
    }

    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('calls onClose when close button is clicked', () => {
    render(<SectionTypeSelectionModal {...defaultProps} />);

    const closeButton = screen.getByTestId('modal-close');
    fireEvent.click(closeButton);

    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('groups section types by category correctly', () => {
    render(<SectionTypeSelectionModal {...defaultProps} />);

    // Check that all section types are rendered
    expect(screen.getByText('Basic Strength')).toBeDefined();
    expect(screen.getByText('EMOM')).toBeDefined();
    expect(screen.getByText('Tabata')).toBeDefined();
    expect(screen.getByText('Circuit')).toBeDefined();

    expect(screen.getByText('Intervals')).toBeDefined();
    expect(screen.getByText('Tempo')).toBeDefined();
    expect(screen.getByText('Fartlek')).toBeDefined();
    expect(screen.getByText('Hill Repeats')).toBeDefined();

    expect(screen.getByText('Warm-up')).toBeDefined();
    expect(screen.getByText('Cooldown')).toBeDefined();

    // Check that category headers are rendered
    expect(screen.getByText('💪 Strength Training')).toBeDefined();
    expect(screen.getByText('🏃 Cardio & Running')).toBeDefined();
    expect(screen.getByText('🧘 Warm-up & Recovery')).toBeDefined();
  });
});
