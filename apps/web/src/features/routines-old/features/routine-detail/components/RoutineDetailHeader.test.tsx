import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import RoutineDetailHeader from './RoutineDetailHeader';

// Mock dependencies
const mockPush = vi.fn();
const mockBack = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    back: mockBack,
  }),
}));

describe('RoutineDetailHeader', (): void => {
  const defaultProps = {
    routineId: 'routine-1',
    name: 'Test Routine',
    description: 'This is a test routine.',
    isActive: true,
    isFavorite: false,
    onToggleFavorite: vi.fn(),
    onDuplicate: vi.fn(),
    onDelete: vi.fn(),
  };

  beforeEach((): void => {
    vi.clearAllMocks();
  });

  it('should render header with routine name and description', (): void => {
    render(<RoutineDetailHeader {...defaultProps} />);

    expect(screen.getByText('Test Routine')).toBeInTheDocument();
    expect(screen.getByText('This is a test routine.')).toBeInTheDocument();
  });

  it('should render active status when routine is active', (): void => {
    render(<RoutineDetailHeader {...defaultProps} />);

    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('should not render active status when routine is not active', (): void => {
    render(<RoutineDetailHeader {...defaultProps} isActive={false} />);

    expect(screen.queryByText('Active')).not.toBeInTheDocument();
  });

  it('should call onToggleFavorite when favorite button is clicked', (): void => {
    render(<RoutineDetailHeader {...defaultProps} />);

    const favoriteButton = screen.getByRole('button', { name: '' }); // Heart button has no text
    fireEvent.click(favoriteButton);

    expect(defaultProps.onToggleFavorite).toHaveBeenCalledTimes(1);
  });

  it('should call router.push when back button is clicked', (): void => {
    render(<RoutineDetailHeader {...defaultProps} />);

    const backButton = screen.getByRole('button', {
      name: /back to routines/i,
    });
    fireEvent.click(backButton);

    expect(mockPush).toHaveBeenCalledWith('/routines');
  });

  it('should show start workout button when routine is active', (): void => {
    render(<RoutineDetailHeader {...defaultProps} isActive={true} />);

    expect(
      screen.getByRole('button', { name: /start next workout/i })
    ).toBeInTheDocument();
  });

  it('should not show start workout button when routine is inactive', (): void => {
    render(<RoutineDetailHeader {...defaultProps} isActive={false} />);

    expect(
      screen.queryByRole('button', { name: /start next workout/i })
    ).not.toBeInTheDocument();
  });
});
