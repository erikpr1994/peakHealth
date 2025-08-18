import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import RoutineObjectives from './RoutineObjectives';

describe('RoutineObjectives', () => {
  it('should render objectives when provided', () => {
    const objectives = ['Build strength', 'Improve endurance', 'Lose weight'];
    
    render(<RoutineObjectives objectives={objectives} />);
    
    expect(screen.getByText('Training Objectives')).toBeInTheDocument();
    expect(screen.getByText('Build strength')).toBeInTheDocument();
    expect(screen.getByText('Improve endurance')).toBeInTheDocument();
    expect(screen.getByText('Lose weight')).toBeInTheDocument();
  });

  it('should render empty state when no objectives', () => {
    render(<RoutineObjectives objectives={[]} />);
    
    expect(screen.getByText('Training Objectives')).toBeInTheDocument();
    expect(screen.getByText(/no training objectives set/i)).toBeInTheDocument();
  });

  it('should render empty state when objectives is undefined', () => {
    render(<RoutineObjectives objectives={undefined as unknown as string[]} />);
    
    expect(screen.getByText('Training Objectives')).toBeInTheDocument();
    expect(screen.getByText(/no training objectives set/i)).toBeInTheDocument();
  });

  it('should render single objective correctly', () => {
    const objectives = ['Build muscle'];
    
    render(<RoutineObjectives objectives={objectives} />);
    
    expect(screen.getByText('Training Objectives')).toBeInTheDocument();
    expect(screen.getByText('Build muscle')).toBeInTheDocument();
  });
});
