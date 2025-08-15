import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import {
  RoutineDetailsProvider,
  useRoutineDetailsContext,
} from './RoutineDetailsContext';

// Test component that uses the context
const TestComponent = (): React.ReactElement => {
  const { name, setName, difficulty, setDifficulty } =
    useRoutineDetailsContext();

  return (
    <div>
      <span data-testid="name">{name}</span>
      <span data-testid="difficulty">{difficulty}</span>
      <button onClick={() => setName('Test Name')}>Set Name</button>
      <button onClick={() => setDifficulty('Advanced')}>Set Difficulty</button>
    </div>
  );
};

describe('RoutineDetailsContext', () => {
  it('should provide default values when no initial data is provided', () => {
    render(
      <RoutineDetailsProvider>
        <TestComponent />
      </RoutineDetailsProvider>
    );

    expect(screen.getByTestId('name')).toHaveTextContent('');
    expect(screen.getByTestId('difficulty')).toHaveTextContent('Beginner');
  });

  it('should provide initial data when provided', () => {
    const initialData = {
      name: 'Initial Routine',
      difficulty: 'Intermediate',
    };

    render(
      <RoutineDetailsProvider initialData={initialData}>
        <TestComponent />
      </RoutineDetailsProvider>
    );

    expect(screen.getByTestId('name')).toHaveTextContent('Initial Routine');
    expect(screen.getByTestId('difficulty')).toHaveTextContent('Intermediate');
  });

  it('should throw error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi
      .spyOn(console, 'error')
      .mockImplementation((): void => {
        // Intentionally empty
      });

    expect(() => {
      render(<TestComponent />);
    }).toThrow(
      'useRoutineDetailsContext must be used within a RoutineDetailsProvider'
    );

    consoleSpy.mockRestore();
  });
});
