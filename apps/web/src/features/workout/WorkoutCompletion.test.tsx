import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import WorkoutCompletion from './WorkoutCompletion';

describe('WorkoutCompletion', () => {
  it('should render completion message', () => {
    render(<WorkoutCompletion />);

    expect(screen.getByText('Workout Complete!')).toBeInTheDocument();
    expect(
      screen.getByText('Great job! Redirecting to dashboard...')
    ).toBeInTheDocument();
  });

  it('should render check icon', () => {
    render(<WorkoutCompletion />);

    const icon = screen.getByRole('img', { hidden: true });
    expect(icon).toBeInTheDocument();
  });

  it('should have proper styling classes', () => {
    const { container } = render(<WorkoutCompletion />);

    expect(container.firstChild).toHaveClass('container');
    expect(container.querySelector('.content')).toBeInTheDocument();
    expect(container.querySelector('.icon')).toBeInTheDocument();
    expect(container.querySelector('.title')).toBeInTheDocument();
    expect(container.querySelector('.message')).toBeInTheDocument();
  });
});
