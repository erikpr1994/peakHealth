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
    render(
      <WaveLoadingModal
        isOpen={true}
        onClose={vi.fn()}
        onGenerateSets={vi.fn()}
      />
    );

    // Test invalid numberOfWaves
    const numberOfWavesInput = screen.getByLabelText('Number of Waves');
    fireEvent.change(numberOfWavesInput, { target: { value: '0' } });
    fireEvent.click(screen.getByText('Generate Sets'));
    expect(
      screen.getByText('Number of waves must be at least 1')
    ).toBeDefined();

    // Test invalid setsPerWave
    fireEvent.change(numberOfWavesInput, { target: { value: '3' } });
    const setsPerWaveInput = screen.getByLabelText('Sets per Wave');
    fireEvent.change(setsPerWaveInput, { target: { value: '0' } });
    fireEvent.click(screen.getByText('Generate Sets'));
    expect(screen.getByText('Sets per wave must be at least 1')).toBeDefined();

    // Test invalid baseWeight
    fireEvent.change(setsPerWaveInput, { target: { value: '2' } });
    const baseWeightInput = screen.getByLabelText('Base Weight (lbs)');
    fireEvent.change(baseWeightInput, { target: { value: '0' } });
    fireEvent.click(screen.getByText('Generate Sets'));
    expect(
      screen.getByText('Base weight must be greater than 0')
    ).toBeDefined();

    // Test invalid weightIncrement
    fireEvent.change(baseWeightInput, { target: { value: '100' } });
    const weightIncrementInput = screen.getByLabelText(
      'Weight Increment (lbs)'
    );
    fireEvent.change(weightIncrementInput, { target: { value: '-5' } });
    fireEvent.click(screen.getByText('Generate Sets'));
    expect(
      screen.getByText('Weight increment must be 0 or greater')
    ).toBeDefined();

    // Test invalid baseReps
    fireEvent.change(weightIncrementInput, { target: { value: '10' } });
    const baseRepsInput = screen.getByLabelText('Base Reps');
    fireEvent.change(baseRepsInput, { target: { value: '0' } });
    fireEvent.click(screen.getByText('Generate Sets'));
    expect(screen.getByText('Base reps must be greater than 0')).toBeDefined();

    // Test invalid repsDecrement
    fireEvent.change(baseRepsInput, { target: { value: '8' } });
    const repsDecrementInput = screen.getByLabelText('Reps Decrement');
    fireEvent.change(repsDecrementInput, { target: { value: '-1' } });
    fireEvent.click(screen.getByText('Generate Sets'));
    expect(
      screen.getByText('Reps decrement must be 0 or greater')
    ).toBeDefined();

    // Test repsDecrement that would result in zero/negative reps in later waves
    fireEvent.change(repsDecrementInput, { target: { value: '4' } });
    fireEvent.click(screen.getByText('Generate Sets'));
    expect(
      screen.getByText(
        /Reps decrement too high: maximum allowed is \d+ to ensure last wave has at least 1 rep/
      )
    ).toBeDefined();
  });
});
