import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import WorkoutTrackerPage from './page';

// Mock the WorkoutTrackerContainer component
vi.mock('@/features/workout', () => ({
  WorkoutTrackerContainer: ({
    routineId,
  }: {
    routineId: string;
  }): React.JSX.Element => (
    <div data-testid="workout-tracker-container">
      Workout Tracker for routine: {routineId}
    </div>
  ),
}));

// Mock next/navigation
const mockUseParams = vi.fn();

vi.mock('next/navigation', () => ({
  useParams: (): ReturnType<typeof mockUseParams> => mockUseParams(),
}));

describe('WorkoutTrackerPage', (): void => {
  beforeEach((): void => {
    vi.clearAllMocks();
  });

  it('should render WorkoutTrackerContainer with valid routine ID', (): void => {
    mockUseParams.mockReturnValue({ routineId: 'test-routine-123' });

    render(<WorkoutTrackerPage />);

    expect(screen.getByTestId('workout-tracker-container')).toBeInTheDocument();
    expect(
      screen.getByText('Workout Tracker for routine: test-routine-123')
    ).toBeInTheDocument();
  });

  it('should render error message for invalid routine ID', (): void => {
    mockUseParams.mockReturnValue({ routineId: null });

    render(<WorkoutTrackerPage />);

    expect(screen.getByText('Invalid routine')).toBeInTheDocument();
    expect(
      screen.queryByTestId('workout-tracker-container')
    ).not.toBeInTheDocument();
  });

  it('should render error message for undefined routine ID', (): void => {
    mockUseParams.mockReturnValue({ routineId: undefined });

    render(<WorkoutTrackerPage />);

    expect(screen.getByText('Invalid routine')).toBeInTheDocument();
    expect(
      screen.queryByTestId('workout-tracker-container')
    ).not.toBeInTheDocument();
  });

  it('should render error message for non-string routine ID', (): void => {
    mockUseParams.mockReturnValue({ routineId: 123 });

    render(<WorkoutTrackerPage />);

    expect(screen.getByText('Invalid routine')).toBeInTheDocument();
    expect(
      screen.queryByTestId('workout-tracker-container')
    ).not.toBeInTheDocument();
  });

  it('should handle empty string routine ID', (): void => {
    mockUseParams.mockReturnValue({ routineId: '' });

    render(<WorkoutTrackerPage />);

    expect(screen.getByTestId('workout-tracker-container')).toBeInTheDocument();
    expect(
      screen.getByText(/Workout Tracker for routine:/)
    ).toBeInTheDocument();
  });
});
