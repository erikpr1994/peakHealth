import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
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

  it('should return null when no objectives', () => {
    const { container } = render(<RoutineObjectives objectives={[]} />);

    expect(container.firstChild).toBeNull();
  });

  it('should return null when objectives is undefined', () => {
    const { container } = render(
      <RoutineObjectives objectives={undefined as unknown as string[]} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('should return null when objectives is null', () => {
    const { container } = render(
      <RoutineObjectives objectives={null as unknown as string[]} />
    );

    expect(container.firstChild).toBeNull();
  });
});
