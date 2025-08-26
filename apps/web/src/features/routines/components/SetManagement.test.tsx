import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SetManagement, { type WorkoutSet } from './SetManagement';

const mockSets: WorkoutSet[] = [
  {
    id: '1',
    setNumber: 1,
    setType: 'normal',
    repType: 'fixed',
    reps: 10,
    weight: 50,
    rpe: 7,
    notes: '',
    isUnilateral: true,
    unilateralSide: 'left',
  },
  {
    id: '2',
    setNumber: 2,
    setType: 'normal',
    repType: 'fixed',
    reps: 10,
    weight: 50,
    rpe: 7,
    notes: '',
    isUnilateral: true,
    unilateralSide: 'right',
  },
];

const defaultProps = {
  sets: mockSets,
  onSetsChange: vi.fn(),
  isUnilateral: true,
  unilateralMode: 'sequential' as const,
};

describe('SetManagement', () => {
  it('should render sets with unilateral side indicators', () => {
    render(<SetManagement {...defaultProps} />);

    expect(screen.getByText('Set 1 (L)')).toBeInTheDocument();
    expect(screen.getByText('Set 2 (R)')).toBeInTheDocument();
  });

  it('should render sets without side indicators for non-unilateral exercises', () => {
    const nonUnilateralProps = {
      ...defaultProps,
      isUnilateral: false,
      sets: mockSets.map(set => ({
        ...set,
        isUnilateral: false,
        unilateralSide: undefined,
      })),
    };

    render(<SetManagement {...nonUnilateralProps} />);

    expect(screen.getByText('Set 1')).toBeInTheDocument();
    expect(screen.getByText('Set 2')).toBeInTheDocument();
  });

  it('should render sets without side indicators for alternating mode', () => {
    const alternatingProps = {
      ...defaultProps,
      unilateralMode: 'alternating' as const,
      sets: mockSets.map(set => ({ ...set, unilateralSide: 'both' })),
    };

    render(<SetManagement {...alternatingProps} />);

    expect(screen.getByText('Set 1')).toBeInTheDocument();
    expect(screen.getByText('Set 2')).toBeInTheDocument();
  });

  it('should add new set with correct unilateral side for sequential mode', () => {
    render(<SetManagement {...defaultProps} />);

    const addSetButton = screen.getByText('Add Set');
    fireEvent.click(addSetButton);

    expect(defaultProps.onSetsChange).toHaveBeenCalledWith([
      ...mockSets,
      expect.objectContaining({
        setNumber: 3,
        isUnilateral: true,
        unilateralSide: 'left', // Should alternate from 'right' to 'left'
      }),
    ]);
  });

  it('should add new set with "both" side for alternating mode', () => {
    const alternatingProps = {
      ...defaultProps,
      unilateralMode: 'alternating' as const,
    };

    render(<SetManagement {...alternatingProps} />);

    const addSetButton = screen.getByText('Add Set');
    fireEvent.click(addSetButton);

    expect(defaultProps.onSetsChange).toHaveBeenCalledWith([
      ...mockSets,
      expect.objectContaining({
        setNumber: 3,
        isUnilateral: true,
        unilateralSide: 'both',
      }),
    ]);
  });

  it('should add new set with "both" side for simultaneous mode', () => {
    const simultaneousProps = {
      ...defaultProps,
      unilateralMode: 'simultaneous' as const,
    };

    render(<SetManagement {...simultaneousProps} />);

    const addSetButton = screen.getByText('Add Set');
    fireEvent.click(addSetButton);

    expect(defaultProps.onSetsChange).toHaveBeenCalledWith([
      ...mockSets,
      expect.objectContaining({
        setNumber: 3,
        isUnilateral: true,
        unilateralSide: 'both',
      }),
    ]);
  });

  it('should remove set when remove button is clicked', () => {
    render(<SetManagement {...defaultProps} />);

    const removeButtons = screen.getAllByText('Remove');
    fireEvent.click(removeButtons[0]);

    expect(defaultProps.onSetsChange).toHaveBeenCalledWith([mockSets[1]]);
  });

  it('should update set when form fields are changed', () => {
    render(<SetManagement {...defaultProps} />);

    const repsInput = screen.getAllByDisplayValue('10')[0];
    fireEvent.change(repsInput, { target: { value: '12' } });

    expect(defaultProps.onSetsChange).toHaveBeenCalledWith([
      {
        ...mockSets[0],
        reps: 12,
      },
      mockSets[1],
    ]);
  });
});
