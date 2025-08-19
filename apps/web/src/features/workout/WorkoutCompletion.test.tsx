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
    const { container } = render(<WorkoutCompletion />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should have proper styling classes', () => {
    const { container } = render(<WorkoutCompletion />);

    // CSS Modules generate hashed class names, so we check for the presence of elements instead
    expect(container.querySelector('[class*="container"]')).toBeInTheDocument();
    expect(container.querySelector('[class*="content"]')).toBeInTheDocument();
    expect(container.querySelector('[class*="icon"]')).toBeInTheDocument();
    expect(container.querySelector('[class*="title"]')).toBeInTheDocument();
    expect(container.querySelector('[class*="message"]')).toBeInTheDocument();
  });
});
