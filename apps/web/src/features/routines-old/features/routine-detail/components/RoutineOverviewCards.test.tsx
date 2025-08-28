import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RoutineOverviewCards from './RoutineOverviewCards';

describe('RoutineOverviewCards', () => {
  const defaultProps = {
    difficulty: 'Intermediate',
    duration: 12,
    daysPerWeek: 4,
  };

  it('should render duration card', () => {
    render(<RoutineOverviewCards {...defaultProps} />);

    expect(screen.getByText('Duration')).toBeInTheDocument();
    expect(screen.getByText('12 weeks')).toBeInTheDocument();
  });

  it('should render frequency card', () => {
    render(<RoutineOverviewCards {...defaultProps} />);

    expect(screen.getByText('Frequency')).toBeInTheDocument();
    expect(screen.getByText('4 days/week')).toBeInTheDocument();
  });

  it('should render average training duration card', () => {
    render(<RoutineOverviewCards {...defaultProps} />);

    expect(screen.getByText('Avg. Training Duration')).toBeInTheDocument();
    expect(screen.getByText('45-60 min')).toBeInTheDocument();
  });

  it('should handle different durations', () => {
    const { rerender } = render(<RoutineOverviewCards {...defaultProps} />);

    expect(screen.getByText('12 weeks')).toBeInTheDocument();

    rerender(<RoutineOverviewCards {...defaultProps} duration={8} />);
    expect(screen.getByText('8 weeks')).toBeInTheDocument();
  });

  it('should handle different days per week', () => {
    const { rerender } = render(<RoutineOverviewCards {...defaultProps} />);

    expect(screen.getByText('4 days/week')).toBeInTheDocument();

    rerender(<RoutineOverviewCards {...defaultProps} daysPerWeek={3} />);
    expect(screen.getByText('3 days/week')).toBeInTheDocument();
  });
});
