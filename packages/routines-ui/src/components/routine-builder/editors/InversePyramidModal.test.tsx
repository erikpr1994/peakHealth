// Mock the generateInversePyramidSets function
const mockGenerateInversePyramidSets = vi.hoisted(() => vi.fn());
vi.mock('../../../utils/progressionGenerators', () => ({
  generateInversePyramidSets: mockGenerateInversePyramidSets,
}));

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { InversePyramidModal } from './InversePyramidModal';

describe('InversePyramidModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onGenerateSets: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <InversePyramidModal {...defaultProps} isOpen={false} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders modal when isOpen is true', () => {
    render(<InversePyramidModal {...defaultProps} />);
    expect(screen.getByText('Configure Inverse Pyramid')).toBeDefined();
  });

  it('renders all form inputs with default values', () => {
    render(<InversePyramidModal {...defaultProps} />);

    expect(screen.getByDisplayValue('4')).toBeDefined();
    expect(screen.getByDisplayValue('100')).toBeDefined();
    expect(screen.getByDisplayValue('70')).toBeDefined();
    expect(screen.getByDisplayValue('5')).toBeDefined();
    expect(screen.getByDisplayValue('12')).toBeDefined();
  });

  it('updates form values when inputs change', () => {
    render(<InversePyramidModal {...defaultProps} />);

    const numberOfSetsInput = screen.getByLabelText('Number of Sets');
    fireEvent.change(numberOfSetsInput, { target: { value: '6' } });

    expect(numberOfSetsInput.getAttribute('value')).toBe('6');
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(<InversePyramidModal {...defaultProps} onClose={onClose} />);

    const closeButton = screen.getByLabelText('Close modal');
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Cancel button is clicked', () => {
    const onClose = vi.fn();
    render(<InversePyramidModal {...defaultProps} onClose={onClose} />);

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('shows validation errors for invalid input', () => {
    render(<InversePyramidModal {...defaultProps} />);

    const startWeightInput = screen.getByLabelText('Start Weight (lbs)');
    const endWeightInput = screen.getByLabelText('End Weight (lbs)');

    // Set start weight less than end weight (invalid)
    fireEvent.change(startWeightInput, { target: { value: '50' } });
    fireEvent.change(endWeightInput, { target: { value: '100' } });

    const generateButton = screen.getByText('Generate Sets');
    fireEvent.click(generateButton);

    expect(
      screen.getByText('Start weight must be greater than end weight')
    ).toBeDefined();
  });

  it('calls onGenerateSets with generated sets when form is valid', () => {
    const onGenerateSets = vi.fn();
    const mockSets = [
      { weight: 100, reps: 5 },
      { weight: 85, reps: 8 },
      { weight: 70, reps: 12 },
    ];

    mockGenerateInversePyramidSets.mockReturnValue(mockSets);

    render(
      <InversePyramidModal {...defaultProps} onGenerateSets={onGenerateSets} />
    );

    const generateButton = screen.getByText('Generate Sets');
    fireEvent.click(generateButton);

    expect(mockGenerateInversePyramidSets).toHaveBeenCalledWith({
      numberOfSets: 4,
      startWeight: 100,
      endWeight: 70,
      startReps: 5,
      endReps: 12,
    });

    expect(onGenerateSets).toHaveBeenCalledWith(mockSets);
  });

  it('closes modal after successful set generation', () => {
    const onClose = vi.fn();
    const onGenerateSets = vi.fn();
    const mockSets = [
      { weight: 100, reps: 5 },
      { weight: 70, reps: 12 },
    ];

    mockGenerateInversePyramidSets.mockReturnValue(mockSets);

    render(
      <InversePyramidModal
        {...defaultProps}
        onClose={onClose}
        onGenerateSets={onGenerateSets}
      />
    );

    const generateButton = screen.getByText('Generate Sets');
    fireEvent.click(generateButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('shows error message when generateInversePyramidSets throws error', () => {
    const onGenerateSets = vi.fn();
    const errorMessage = 'Failed to generate sets';

    mockGenerateInversePyramidSets.mockImplementation(() => {
      throw new Error(errorMessage);
    });

    render(
      <InversePyramidModal {...defaultProps} onGenerateSets={onGenerateSets} />
    );

    const generateButton = screen.getByText('Generate Sets');
    fireEvent.click(generateButton);

    expect(screen.getByText(errorMessage)).toBeDefined();
    expect(onGenerateSets).not.toHaveBeenCalled();
  });

  it('clears errors when modal is closed', () => {
    const onClose = vi.fn();
    render(<InversePyramidModal {...defaultProps} onClose={onClose} />);

    // Trigger an error first
    const startWeightInput = screen.getByLabelText('Start Weight (lbs)');
    fireEvent.change(startWeightInput, { target: { value: '50' } });

    const generateButton = screen.getByText('Generate Sets');
    fireEvent.click(generateButton);

    expect(
      screen.getByText('Start weight must be greater than end weight')
    ).toBeDefined();

    // Close modal
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
