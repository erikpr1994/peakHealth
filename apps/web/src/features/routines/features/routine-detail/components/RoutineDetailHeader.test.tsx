import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { useRouter } from 'next/navigation';
import RoutineDetailHeader from './RoutineDetailHeader';

// Mock dependencies
vi.mock('next/navigation');

const mockUseRouter = useRouter as ReturnType<typeof vi.fn>;

describe('RoutineDetailHeader', () => {
  const mockRouter = {
    push: jest.fn(),
    back: jest.fn(),
  };

  const defaultProps = {
    routine: {
      id: 'routine-1',
      name: 'Test Routine',
      isActive: true,
      isFavorite: false,
    },
    onToggleFavorite: vi.fn(),
    onDuplicate: vi.fn(),
    onDelete: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseRouter.mockReturnValue(mockRouter);
  });

  it('should render routine name', () => {
    render(<RoutineDetailHeader {...defaultProps} />);

    expect(screen.getByText('Test Routine')).toBeInTheDocument();
  });

  it('should render active status when routine is active', () => {
    render(<RoutineDetailHeader {...defaultProps} />);

    expect(screen.getByText(/active/i)).toBeInTheDocument();
  });

  it('should render inactive status when routine is not active', () => {
    render(
      <RoutineDetailHeader
        {...defaultProps}
        routine={{ ...defaultProps.routine, isActive: false }}
      />
    );

    expect(screen.getByText(/inactive/i)).toBeInTheDocument();
  });

  it('should call onToggleFavorite when favorite button is clicked', () => {
    render(<RoutineDetailHeader {...defaultProps} />);

    const favoriteButton = screen.getByRole('button', { name: /favorite/i });
    fireEvent.click(favoriteButton);

    expect(defaultProps.onToggleFavorite).toHaveBeenCalled();
  });

  it('should call onDuplicate when duplicate button is clicked', () => {
    render(<RoutineDetailHeader {...defaultProps} />);

    const duplicateButton = screen.getByRole('button', { name: /duplicate/i });
    fireEvent.click(duplicateButton);

    expect(defaultProps.onDuplicate).toHaveBeenCalled();
  });

  it('should call onDelete when delete button is clicked', () => {
    render(<RoutineDetailHeader {...defaultProps} />);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(defaultProps.onDelete).toHaveBeenCalled();
  });

  it('should call router.back when back button is clicked', () => {
    render(<RoutineDetailHeader {...defaultProps} />);

    const backButton = screen.getByRole('button', { name: /back/i });
    fireEvent.click(backButton);

    expect(mockRouter.back).toHaveBeenCalled();
  });

  it('should show start workout button when routine is active', () => {
    render(<RoutineDetailHeader {...defaultProps} />);

    expect(
      screen.getByRole('button', { name: /start next workout/i })
    ).toBeInTheDocument();
  });

  it('should not show start workout button when routine is not active', () => {
    render(
      <RoutineDetailHeader
        {...defaultProps}
        routine={{ ...defaultProps.routine, isActive: false }}
      />
    );

    expect(
      screen.queryByRole('button', { name: /start next workout/i })
    ).not.toBeInTheDocument();
  });
});
