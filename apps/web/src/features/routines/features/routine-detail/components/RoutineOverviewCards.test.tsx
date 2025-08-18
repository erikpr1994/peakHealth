import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import RoutineOverviewCards from './RoutineOverviewCards';

describe('RoutineOverviewCards', () => {
  const defaultProps = {
    difficulty: 'Intermediate' as const,
    duration: 12,
    estimatedDuration: '45-60 min',
    totalWorkouts: 24,
  };

  it('should render difficulty card', () => {
    render(<RoutineOverviewCards {...defaultProps} />);

    expect(screen.getByText('Difficulty')).toBeInTheDocument();
    expect(screen.getByText('Intermediate')).toBeInTheDocument();
  });

  it('should render duration card', () => {
    render(<RoutineOverviewCards {...defaultProps} />);

    expect(screen.getByText('Duration')).toBeInTheDocument();
    expect(screen.getByText('12 weeks')).toBeInTheDocument();
  });

  it('should render average training duration card', () => {
    render(<RoutineOverviewCards {...defaultProps} />);

    expect(screen.getByText('Average Training Duration')).toBeInTheDocument();
    expect(screen.getByText('45-60 min')).toBeInTheDocument();
  });

  it('should render total workouts card', () => {
    render(<RoutineOverviewCards {...defaultProps} />);

    expect(screen.getByText('Total Workouts')).toBeInTheDocument();
    expect(screen.getByText('24')).toBeInTheDocument();
  });

  it('should handle different difficulty levels', () => {
    const { rerender } = render(<RoutineOverviewCards {...defaultProps} />);

    expect(screen.getByText('Intermediate')).toBeInTheDocument();

    rerender(<RoutineOverviewCards {...defaultProps} difficulty="Beginner" />);
    expect(screen.getByText('Beginner')).toBeInTheDocument();

    rerender(<RoutineOverviewCards {...defaultProps} difficulty="Advanced" />);
    expect(screen.getByText('Advanced')).toBeInTheDocument();
  });

  it('should handle different durations', () => {
    const { rerender } = render(<RoutineOverviewCards {...defaultProps} />);

    expect(screen.getByText('12 weeks')).toBeInTheDocument();

    rerender(<RoutineOverviewCards {...defaultProps} duration={8} />);
    expect(screen.getByText('8 weeks')).toBeInTheDocument();
  });

  it('should handle different estimated durations', () => {
    const { rerender } = render(<RoutineOverviewCards {...defaultProps} />);

    expect(screen.getByText('45-60 min')).toBeInTheDocument();

    rerender(
      <RoutineOverviewCards {...defaultProps} estimatedDuration="30-45 min" />
    );
    expect(screen.getByText('30-45 min')).toBeInTheDocument();
  });

  it('should handle different total workouts', () => {
    const { rerender } = render(<RoutineOverviewCards {...defaultProps} />);

    expect(screen.getByText('24')).toBeInTheDocument();

    rerender(<RoutineOverviewCards {...defaultProps} totalWorkouts={12} />);
    expect(screen.getByText('12')).toBeInTheDocument();
  });
});
