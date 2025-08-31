import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { UnilateralExerciseModal } from './UnilateralExerciseModal';

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

describe('UnilateralExerciseModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    exerciseId: 'exercise-123',
    currentMode: 'simultaneous' as const,
    onModeSelect: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders when open', () => {
    render(<UnilateralExerciseModal {...defaultProps} />);

    expect(screen.getByTestId('modal')).toBeDefined();
    expect(screen.getByText('Configure Unilateral Exercise')).toBeDefined();
    expect(
      screen.getByText(
        'Choose how you want to perform this unilateral exercise:'
      )
    ).toBeDefined();
  });

  it('displays all three unilateral options', () => {
    render(<UnilateralExerciseModal {...defaultProps} />);

    expect(screen.getByText('Simultaneous')).toBeDefined();
    expect(screen.getByText('Alternating (within the same set)')).toBeDefined();
    expect(screen.getByText('Sequential (alternating sets)')).toBeDefined();
  });

  it('displays option descriptions', () => {
    render(<UnilateralExerciseModal {...defaultProps} />);

    expect(
      screen.getByText('Perform the exercise with both limbs at the same time.')
    ).toBeDefined();
    expect(
      screen.getByText(
        'Alternate between the left and right limb for each rep within a single set.'
      )
    ).toBeDefined();
    expect(
      screen.getByText(
        'Complete all sets for one limb before moving on to the other.'
      )
    ).toBeDefined();
  });

  it('displays option icons', () => {
    render(<UnilateralExerciseModal {...defaultProps} />);

    expect(screen.getByText('🔄')).toBeDefined();
    expect(screen.getByText('⚡')).toBeDefined();
    expect(screen.getByText('📋')).toBeDefined();
  });

  it('highlights currently selected mode', () => {
    render(<UnilateralExerciseModal {...defaultProps} />);

    const simultaneousButton = screen.getByText('Currently Selected');
    expect(simultaneousButton).toBeDefined();
    // Check that the button exists and has the expected text
    expect(simultaneousButton.textContent).toBe('Currently Selected');
  });

  it('calls onModeSelect when a mode is selected', () => {
    render(<UnilateralExerciseModal {...defaultProps} />);

    // Use a more specific selector to get the alternating button
    const alternatingTitle = screen.getByText(
      'Alternating (within the same set)'
    );
    const alternatingOption = alternatingTitle.closest(
      '.unilateral-exercise-modal__option'
    );
    const alternatingButton = alternatingOption?.querySelector('button');

    expect(alternatingButton).toBeDefined();

    if (alternatingButton) {
      fireEvent.click(alternatingButton);
    }

    expect(defaultProps.onModeSelect).toHaveBeenCalledWith(
      'exercise-123',
      'alternating'
    );
  });

  it('closes modal after selecting a mode', () => {
    render(<UnilateralExerciseModal {...defaultProps} />);

    // Use a more specific selector to get the alternating button
    const alternatingTitle = screen.getByText(
      'Alternating (within the same set)'
    );
    const alternatingOption = alternatingTitle.closest(
      '.unilateral-exercise-modal__option'
    );
    const alternatingButton = alternatingOption?.querySelector('button');

    if (alternatingButton) {
      fireEvent.click(alternatingButton);
    }

    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('does not render when closed', () => {
    render(<UnilateralExerciseModal {...defaultProps} isOpen={false} />);

    expect(screen.queryByTestId('modal')).toBeNull();
  });

  it('handles different current modes correctly', () => {
    render(
      <UnilateralExerciseModal {...defaultProps} currentMode="sequential" />
    );

    const sequentialButton = screen.getByText('Currently Selected');
    expect(sequentialButton).toBeDefined();

    // Check that simultaneous is not selected
    const simultaneousTitle = screen.getByText('Simultaneous');
    const simultaneousOption = simultaneousTitle.closest(
      '.unilateral-exercise-modal__option'
    );
    const simultaneousButtonElement =
      simultaneousOption?.querySelector('button');
    expect(simultaneousButtonElement?.textContent).toBe('Select This Option');
  });

  it('calls onClose when modal close button is clicked', () => {
    render(<UnilateralExerciseModal {...defaultProps} />);

    const closeButton = screen.getByTestId('modal-close');
    fireEvent.click(closeButton);

    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
