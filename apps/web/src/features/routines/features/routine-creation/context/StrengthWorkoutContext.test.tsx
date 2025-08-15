import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import {
  StrengthWorkoutProvider,
  useStrengthWorkoutContext,
} from './StrengthWorkoutContext';

// Test component that uses the context
const TestComponent = (): React.ReactElement => {
  const { operations } = useStrengthWorkoutContext();

  return (
    <div>
      <button
        onClick={operations.onAddStrengthWorkout}
        data-testid="add-workout"
      >
        Add Workout
      </button>
      <button
        onClick={() => operations.onToggleCollapse('test-id')}
        data-testid="toggle-collapse"
      >
        Toggle Collapse
      </button>
      <button
        onClick={() => operations.onUpdateName('test-id', 'New Name')}
        data-testid="update-name"
      >
        Update Name
      </button>
    </div>
  );
};

describe('StrengthWorkoutContext', () => {
  const mockOperations = {
    onAddStrengthWorkout: vi.fn(),
    onToggleCollapse: vi.fn(),
    onMoveUp: vi.fn(),
    onMoveDown: vi.fn(),
    onRemove: vi.fn(),
    onUpdateName: vi.fn(),
    onUpdateObjective: vi.fn(),
    onUpdateSchedule: vi.fn(),
    onAddSection: vi.fn(),
    onUpdateSectionName: vi.fn(),
    onUpdateSectionType: vi.fn(),
    onUpdateSectionRestAfter: vi.fn(),
    onUpdateSectionEmomDuration: vi.fn(),
    onRemoveSection: vi.fn(),
    onAddExercise: vi.fn(),
    onUpdateExerciseEmomReps: vi.fn(),
    onUpdateExerciseSets: vi.fn(),
    onUpdateExerciseName: vi.fn(),
    onUpdateRestTimer: vi.fn(),
    onUpdateExerciseRestAfter: vi.fn(),
    onRemoveExercise: vi.fn(),
    onAddApproachSets: vi.fn(),
    onUpdateProgressionMethod: vi.fn(),
    onNotesClick: vi.fn(),
  };

  describe('StrengthWorkoutProvider', () => {
    it('should provide operations to children', () => {
      render(
        <StrengthWorkoutProvider operations={mockOperations}>
          <TestComponent />
        </StrengthWorkoutProvider>
      );

      expect(screen.getByTestId('add-workout')).toBeInTheDocument();
      expect(screen.getByTestId('toggle-collapse')).toBeInTheDocument();
      expect(screen.getByTestId('update-name')).toBeInTheDocument();
    });

    it('should call operations when buttons are clicked', () => {
      render(
        <StrengthWorkoutProvider operations={mockOperations}>
          <TestComponent />
        </StrengthWorkoutProvider>
      );

      screen.getByTestId('add-workout').click();
      expect(mockOperations.onAddStrengthWorkout).toHaveBeenCalledTimes(1);

      screen.getByTestId('toggle-collapse').click();
      expect(mockOperations.onToggleCollapse).toHaveBeenCalledWith('test-id');

      screen.getByTestId('update-name').click();
      expect(mockOperations.onUpdateName).toHaveBeenCalledWith(
        'test-id',
        'New Name'
      );
    });
  });

  describe('useStrengthWorkoutContext hook', () => {
    it('should throw error when used outside provider', () => {
      const TestComponentWithoutProvider = (): React.ReactElement => {
        useStrengthWorkoutContext();
        return <div>Test</div>;
      };

      expect(() => {
        render(<TestComponentWithoutProvider />);
      }).toThrow(
        'useStrengthWorkoutContext must be used within a StrengthWorkoutProvider'
      );
    });

    it('should provide all required operations', () => {
      const TestComponentWithOperations = (): React.ReactElement => {
        const { operations } = useStrengthWorkoutContext();
        return (
          <div>
            <span data-testid="has-add-workout">
              {typeof operations.onAddStrengthWorkout === 'function'
                ? 'true'
                : 'false'}
            </span>
            <span data-testid="has-toggle-collapse">
              {typeof operations.onToggleCollapse === 'function'
                ? 'true'
                : 'false'}
            </span>
            <span data-testid="has-update-name">
              {typeof operations.onUpdateName === 'function' ? 'true' : 'false'}
            </span>
          </div>
        );
      };

      render(
        <StrengthWorkoutProvider operations={mockOperations}>
          <TestComponentWithOperations />
        </StrengthWorkoutProvider>
      );

      expect(screen.getByTestId('has-add-workout')).toHaveTextContent('true');
      expect(screen.getByTestId('has-toggle-collapse')).toHaveTextContent(
        'true'
      );
      expect(screen.getByTestId('has-update-name')).toHaveTextContent('true');
    });
  });
});
