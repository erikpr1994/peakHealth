import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import RoutineProgress from './RoutineProgress';

describe('RoutineProgress', () => {
  const defaultProps = {
    currentWeek: 3,
    totalWeeks: 12,
    completedWorkouts: 8,
    totalWorkouts: 24,
    isActive: true,
  };

  it('should render active progress correctly', () => {
    render(<RoutineProgress {...defaultProps} />);
    
    expect(screen.getByText('Progress')).toBeInTheDocument();
    expect(screen.getByText('Week 3 of 12')).toBeInTheDocument();
    expect(screen.getByText('8 of 24 workouts completed')).toBeInTheDocument();
  });

  it('should render inactive progress message', () => {
    render(<RoutineProgress {...defaultProps} isActive={false} />);
    
    expect(screen.getByText('Progress')).toBeInTheDocument();
    expect(screen.getByText(/this routine is not currently active/i)).toBeInTheDocument();
    expect(screen.getByText(/progress tracking will be available once you activate the routine/i)).toBeInTheDocument();
  });

  it('should handle zero completed workouts', () => {
    render(<RoutineProgress {...defaultProps} completedWorkouts={0} />);
    
    expect(screen.getByText('0 of 24 workouts completed')).toBeInTheDocument();
  });

  it('should handle all workouts completed', () => {
    render(<RoutineProgress {...defaultProps} completedWorkouts={24} />);
    
    expect(screen.getByText('24 of 24 workouts completed')).toBeInTheDocument();
  });

  it('should handle first week', () => {
    render(<RoutineProgress {...defaultProps} currentWeek={1} />);
    
    expect(screen.getByText('Week 1 of 12')).toBeInTheDocument();
  });

  it('should handle last week', () => {
    render(<RoutineProgress {...defaultProps} currentWeek={12} />);
    
    expect(screen.getByText('Week 12 of 12')).toBeInTheDocument();
  });
});
