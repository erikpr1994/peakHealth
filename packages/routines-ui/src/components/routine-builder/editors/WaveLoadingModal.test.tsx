import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { WaveLoadingModal } from './WaveLoadingModal';

describe('WaveLoadingModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onGenerateSets: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders when open', () => {
    render(<WaveLoadingModal {...defaultProps} />);

    expect(screen.getByText('Configure Wave Loading')).toBeDefined();
    expect(screen.getByText('Number of Waves')).toBeDefined();
    expect(screen.getByText('Sets per Wave')).toBeDefined();
    expect(screen.getByText('Base Weight (lbs)')).toBeDefined();
    expect(screen.getByText('Weight Increment (lbs)')).toBeDefined();
    expect(screen.getByText('Base Reps')).toBeDefined();
    expect(screen.getByText('Reps Decrement')).toBeDefined();
  });

  it('does not render when closed', () => {
    render(<WaveLoadingModal {...defaultProps} isOpen={false} />);

    expect(screen.queryByText('Configure Wave Loading Sets')).toBeNull();
  });

  it('displays default form values', () => {
    render(<WaveLoadingModal {...defaultProps} />);

    const numberOfWavesInput = screen.getByDisplayValue('3');
    const setsPerWaveInput = screen.getByDisplayValue('2');
    const baseWeightInput = screen.getByDisplayValue('100');
    const weightIncrementInput = screen.getByDisplayValue('10');
    const baseRepsInput = screen.getByDisplayValue('8');
    const repsDecrementInput = screen.getByDisplayValue('1');

    expect(numberOfWavesInput).toBeDefined();
    expect(setsPerWaveInput).toBeDefined();
    expect(baseWeightInput).toBeDefined();
    expect(weightIncrementInput).toBeDefined();
    expect(baseRepsInput).toBeDefined();
    expect(repsDecrementInput).toBeDefined();
  });

  it('updates form values when inputs change', () => {
    render(<WaveLoadingModal {...defaultProps} />);

    const numberOfWavesInput = screen.getByDisplayValue(
      '3'
    ) as HTMLInputElement;
    fireEvent.change(numberOfWavesInput, { target: { value: '4' } });

    expect(numberOfWavesInput.getAttribute('value')).toBe('4');
  });

  it('calls onClose when cancel button is clicked', () => {
    render(<WaveLoadingModal {...defaultProps} />);

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onGenerateSets with correct data when generate button is clicked', () => {
    render(<WaveLoadingModal {...defaultProps} />);

    const generateButton = screen.getByText('Generate Sets');
    fireEvent.click(generateButton);

    expect(defaultProps.onGenerateSets).toHaveBeenCalledWith([
      { weight: 100, reps: 8 },
      { weight: 100, reps: 8 },
      { weight: 110, reps: 7 },
      { weight: 110, reps: 7 },
      { weight: 120, reps: 6 },
      { weight: 120, reps: 6 },
    ]);
  });

  it('calls onClose after generating sets', () => {
    render(<WaveLoadingModal {...defaultProps} />);

    const generateButton = screen.getByText('Generate Sets');
    fireEvent.click(generateButton);

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('validates form inputs and shows errors for invalid values', () => {
    render(<WaveLoadingModal {...defaultProps} />);

    // Set invalid values
    const numberOfWavesInput = screen.getByDisplayValue(
      '3'
    ) as HTMLInputElement;
    const setsPerWaveInput = screen.getByDisplayValue('2') as HTMLInputElement;

    fireEvent.change(numberOfWavesInput, { target: { value: '0' } });
    fireEvent.change(setsPerWaveInput, { target: { value: '0' } });

    const generateButton = screen.getByText('Generate Sets');
    fireEvent.click(generateButton);

    // Should not call onGenerateSets with invalid values
    expect(defaultProps.onGenerateSets).not.toHaveBeenCalled();
  });
});
