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
  onNotesClick: vi.fn(),
  onAddApproachSets: vi.fn(),
  isUnilateral: true,
  unilateralMode: 'sequential' as const,
};

describe('SetManagement', () => {
  it('should render sets with unilateral side indicators', () => {
    render(<SetManagement {...defaultProps} />);

    expect(screen.getByText('1 (L)')).toBeInTheDocument();
    expect(screen.getByText('2 (R)')).toBeInTheDocument();
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

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should render sets without side indicators for alternating mode', () => {
    const alternatingProps = {
      ...defaultProps,
      unilateralMode: 'alternating' as const,
      sets: mockSets.map(set => ({ ...set, unilateralSide: 'both' as const })),
    };

    render(<SetManagement {...alternatingProps} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
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

  it('should add new set with correct unilateral side for alternating mode', () => {
    const alternatingProps = {
      ...defaultProps,
      unilateralMode: 'alternating' as const,
    };

    render(<SetManagement {...alternatingProps} />);

    const addSetButton = screen.getByText('Add Set');
    fireEvent.click(addSetButton);

    expect(alternatingProps.onSetsChange).toHaveBeenCalledWith([
      ...mockSets,
      expect.objectContaining({
        setNumber: 3,
        isUnilateral: true,
        unilateralSide: 'both', // Alternating mode uses 'both'
      }),
    ]);
  });

  it('should add new set with correct unilateral side for simultaneous mode', () => {
    const simultaneousProps = {
      ...defaultProps,
      unilateralMode: 'simultaneous' as const,
    };

    render(<SetManagement {...simultaneousProps} />);

    const addSetButton = screen.getByText('Add Set');
    fireEvent.click(addSetButton);

    expect(simultaneousProps.onSetsChange).toHaveBeenCalledWith([
      ...mockSets,
      expect.objectContaining({
        setNumber: 3,
        isUnilateral: true,
        unilateralSide: 'both', // Simultaneous mode uses 'both'
      }),
    ]);
  });

  it('should remove a set', () => {
    render(<SetManagement {...defaultProps} />);

    const removeButtons = screen.getAllByRole('button', {
      name: /delete set/i,
    });
    fireEvent.click(removeButtons[0]);

    // Check the last call to onSetsChange (after removal)
    const lastCall =
      defaultProps.onSetsChange.mock.calls[
        defaultProps.onSetsChange.mock.calls.length - 1
      ];
    expect(lastCall[0]).toHaveLength(1); // Should have only one set remaining
    expect(lastCall[0][0].id).toBe('2'); // Should be the second set from mockSets
  });

  it('should handle set removal and update set numbers', () => {
    render(<SetManagement {...defaultProps} />);

    const removeButtons = screen.getAllByRole('button', {
      name: /delete set/i,
    });
    fireEvent.click(removeButtons[0]);

    // Check the last call to onSetsChange (after removal)
    const lastCall =
      defaultProps.onSetsChange.mock.calls[
        defaultProps.onSetsChange.mock.calls.length - 1
      ];
    expect(lastCall[0]).toHaveLength(1); // Should have only one set remaining
    expect(lastCall[0][0]).toEqual(
      expect.objectContaining({
        id: '2',
        setNumber: 1, // Should be renumbered
      })
    );
  });
});
