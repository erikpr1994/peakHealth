import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CreateRoutinePage from './page';

// Mock the dynamic import
vi.mock(
  '@/features/routines/features/routine-creation/RoutineCreation',
  () => ({
    default: ({
      editRoutineId,
      mode,
    }: {
      editRoutineId?: string;
      mode?: string;
    }): React.ReactElement => (
      <div data-testid="routine-creation">
        Create Routine Page - {mode} {editRoutineId ? `(${editRoutineId})` : ''}
      </div>
    ),
  })
);

describe('CreateRoutinePage', () => {
  it('should render the routine creation component', () => {
    render(<CreateRoutinePage />);
    expect(screen.getByTestId('routine-creation')).toBeInTheDocument();
  });

  it('should pass correct props to RoutineCreation', () => {
    render(<CreateRoutinePage />);
    expect(
      screen.getByText('Create Routine Page - create')
    ).toBeInTheDocument();
  });
});
