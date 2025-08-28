import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import UnilateralExerciseModal from './UnilateralExerciseModal';

describe('UnilateralExerciseModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onConfirm: vi.fn(),
    exerciseName: 'Dumbbell Curl',
  };

  it('should render modal with exercise name', () => {
    render(<UnilateralExerciseModal {...defaultProps} />);

    expect(screen.getByText('Unilateral Exercise Setup')).toBeInTheDocument();
    expect(
      screen.getByText(/Choose how you want to perform/)
    ).toBeInTheDocument();
    expect(screen.getByText('Dumbbell Curl')).toBeInTheDocument();
  });

  it('should display all three unilateral modes', () => {
    render(<UnilateralExerciseModal {...defaultProps} />);

    expect(screen.getByText('Alternating')).toBeInTheDocument();
    expect(screen.getByText('Sequential')).toBeInTheDocument();
    expect(screen.getByText('Simultaneous')).toBeInTheDocument();
  });

  it('should show mode descriptions', () => {
    render(<UnilateralExerciseModal {...defaultProps} />);

    expect(
      screen.getByText(/Each set performed on both sides/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Sets alternate between left and right sides/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Perform both sides at the same time/)
    ).toBeInTheDocument();
  });

  it('should allow selecting a mode', () => {
    render(<UnilateralExerciseModal {...defaultProps} />);

    const alternatingCard = screen
      .getByText('Alternating')
      .closest('[data-slot="card"]');
    expect(alternatingCard).toBeInTheDocument();

    if (alternatingCard) fireEvent.click(alternatingCard);

    expect(screen.getByText('Selected')).toBeInTheDocument();
  });

  it('should enable confirm button when mode is selected', () => {
    render(<UnilateralExerciseModal {...defaultProps} />);

    const confirmButton = screen.getByText('Confirm Selection');
    expect(confirmButton).toBeDisabled();

    const alternatingCard = screen
      .getByText('Alternating')
      .closest('[data-slot="card"]');
    if (alternatingCard) fireEvent.click(alternatingCard);

    expect(confirmButton).not.toBeDisabled();
  });

  it('should call onConfirm with selected mode when confirmed', () => {
    render(<UnilateralExerciseModal {...defaultProps} />);

    const alternatingCard = screen
      .getByText('Alternating')
      .closest('[data-slot="card"]');
    if (alternatingCard) fireEvent.click(alternatingCard);

    const confirmButton = screen.getByText('Confirm Selection');
    fireEvent.click(confirmButton);

    expect(defaultProps.onConfirm).toHaveBeenCalledWith('alternating');
  });

  it('should call onClose when cancel is clicked', () => {
    render(<UnilateralExerciseModal {...defaultProps} />);

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('should show benefits for each mode', () => {
    render(<UnilateralExerciseModal {...defaultProps} />);

    expect(screen.getByText('Balanced workload per set')).toBeInTheDocument();
    expect(screen.getByText('Focus on one side per set')).toBeInTheDocument();
    expect(screen.getByText('Faster completion')).toBeInTheDocument();
  });

  it('should show examples for each mode', () => {
    render(<UnilateralExerciseModal {...defaultProps} />);

    expect(
      screen.getByText(/12 reps left \+ 12 reps right = 24 total/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Set 1: Left, Set 2: Right, Set 3: Left, Set 4: Right/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Both arms curl together/)).toBeInTheDocument();
  });
});
