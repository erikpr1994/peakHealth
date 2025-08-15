import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NotesProvider, useNotesContext } from './NotesContext';
import { StrengthWorkout, RunningWorkout } from '../../../types';

// Test component that uses the context
const TestComponent = (): React.ReactElement => {
  const {
    notesModalOpen,
    openNotesModal,
    closeNotesModal,
    handleNotesSave,
    currentNotesContext,
  } = useNotesContext();

  return (
    <div>
      <span data-testid="modal-open">{notesModalOpen.toString()}</span>
      <span data-testid="current-notes">
        {currentNotesContext?.currentNotes || ''}
      </span>
      <button
        onClick={() =>
          openNotesModal('exercise', 'workout-1', 'section-1', 'exercise-1')
        }
        data-testid="open-exercise-notes"
      >
        Open Exercise Notes
      </button>
      <button
        onClick={() =>
          openNotesModal('set', 'workout-1', 'section-1', 'exercise-1', 'set-1')
        }
        data-testid="open-set-notes"
      >
        Open Set Notes
      </button>
      <button onClick={closeNotesModal} data-testid="close-modal">
        Close Modal
      </button>
      <button
        onClick={() => handleNotesSave('Updated notes')}
        data-testid="save-notes"
      >
        Save Notes
      </button>
    </div>
  );
};

describe('NotesContext', () => {
  const mockSetStrengthWorkouts = vi.fn();
  const mockSetRunningWorkouts = vi.fn();
  const mockStrengthWorkouts: StrengthWorkout[] = [
    {
      id: 'workout-1',
      name: 'Test Strength Workout',
      type: 'strength',
      objective: 'Build strength',
      schedule: {
        repeatPattern: 'weekly',
        repeatValue: '1',
        selectedDays: ['monday'],
        time: '09:00',
      },
      sections: [
        {
          id: 'section-1',
          name: 'Test Section',
          type: 'basic',
          exercises: [
            {
              id: 'exercise-1',
              name: 'Test Exercise',
              notes: 'Original exercise notes',
              sets: [],
              restTimer: '90s',
              restAfter: '2 min',
            },
          ],
          restAfter: '2 min',
        },
      ],
    },
  ];
  const mockRunningWorkouts: RunningWorkout[] = [];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('NotesProvider', () => {
    it('should provide default values when no initial data is provided', () => {
      render(
        <NotesProvider
          strengthWorkouts={[]}
          runningWorkouts={[]}
          setStrengthWorkouts={mockSetStrengthWorkouts}
          setRunningWorkouts={mockSetRunningWorkouts}
        >
          <TestComponent />
        </NotesProvider>
      );

      expect(screen.getByTestId('modal-open')).toHaveTextContent('false');
      expect(screen.getByTestId('current-notes')).toHaveTextContent('');
    });

    it('should open exercise notes modal correctly', () => {
      render(
        <NotesProvider
          strengthWorkouts={mockStrengthWorkouts}
          runningWorkouts={mockRunningWorkouts}
          setStrengthWorkouts={mockSetStrengthWorkouts}
          setRunningWorkouts={mockSetRunningWorkouts}
        >
          <TestComponent />
        </NotesProvider>
      );

      // Initially closed
      expect(screen.getByTestId('modal-open')).toHaveTextContent('false');

      // Open exercise notes modal
      fireEvent.click(screen.getByTestId('open-exercise-notes'));

      // Modal should be open and show current notes
      expect(screen.getByTestId('modal-open')).toHaveTextContent('true');
      expect(screen.getByTestId('current-notes')).toHaveTextContent(
        'Original exercise notes'
      );
    });

    it('should open set notes modal correctly', () => {
      render(
        <NotesProvider
          strengthWorkouts={mockStrengthWorkouts}
          runningWorkouts={mockRunningWorkouts}
          setStrengthWorkouts={mockSetStrengthWorkouts}
          setRunningWorkouts={mockSetRunningWorkouts}
        >
          <TestComponent />
        </NotesProvider>
      );

      // Open set notes modal
      fireEvent.click(screen.getByTestId('open-set-notes'));

      // Modal should be open and show current set notes
      expect(screen.getByTestId('modal-open')).toHaveTextContent('true');
      expect(screen.getByTestId('current-notes')).toHaveTextContent(
        'Original set notes'
      );
    });

    it('should close modal correctly', () => {
      render(
        <NotesProvider
          strengthWorkouts={mockStrengthWorkouts}
          runningWorkouts={mockRunningWorkouts}
          setStrengthWorkouts={mockSetStrengthWorkouts}
          setRunningWorkouts={mockSetRunningWorkouts}
        >
          <TestComponent />
        </NotesProvider>
      );

      // Open modal first
      fireEvent.click(screen.getByTestId('open-exercise-notes'));
      expect(screen.getByTestId('modal-open')).toHaveTextContent('true');

      // Close modal
      fireEvent.click(screen.getByTestId('close-modal'));
      expect(screen.getByTestId('modal-open')).toHaveTextContent('false');
      expect(screen.getByTestId('current-notes')).toHaveTextContent('');
    });

    it('should handle notes save for exercise notes', () => {
      render(
        <NotesProvider
          strengthWorkouts={mockStrengthWorkouts}
          runningWorkouts={mockRunningWorkouts}
          setStrengthWorkouts={mockSetStrengthWorkouts}
          setRunningWorkouts={mockSetRunningWorkouts}
        >
          <TestComponent />
        </NotesProvider>
      );

      // Open exercise notes modal
      fireEvent.click(screen.getByTestId('open-exercise-notes'));

      // Save notes
      fireEvent.click(screen.getByTestId('save-notes'));

      // Should call setStrengthWorkouts with updated data
      expect(mockSetStrengthWorkouts).toHaveBeenCalledWith(
        expect.any(Function)
      );

      // Modal should be closed after save
      expect(screen.getByTestId('modal-open')).toHaveTextContent('false');
    });

    it('should handle notes save for set notes', () => {
      render(
        <NotesProvider
          strengthWorkouts={mockStrengthWorkouts}
          runningWorkouts={mockRunningWorkouts}
          setStrengthWorkouts={mockSetStrengthWorkouts}
          setRunningWorkouts={mockSetRunningWorkouts}
        >
          <TestComponent />
        </NotesProvider>
      );

      // Open set notes modal
      fireEvent.click(screen.getByTestId('open-set-notes'));

      // Save notes
      fireEvent.click(screen.getByTestId('save-notes'));

      // Should call setStrengthWorkouts with updated data
      expect(mockSetStrengthWorkouts).toHaveBeenCalledWith(
        expect.any(Function)
      );

      // Modal should be closed after save
      expect(screen.getByTestId('modal-open')).toHaveTextContent('false');
    });

    it('should handle running workout notes correctly', () => {
      const mockRunningWorkoutsWithData: RunningWorkout[] = [
        {
          id: 'running-workout-1',
          name: 'Test Running Workout',
          type: 'running',
          objective: 'Build endurance',
          schedule: {
            repeatPattern: 'weekly',
            repeatValue: '1',
            selectedDays: ['monday'],
            time: '09:00',
          },
          sections: [
            {
              id: 'section-1',
              name: 'Test Section',
              type: 'basic',
              exercises: [
                {
                  id: 'exercise-1',
                  name: 'Test Exercise',
                  notes: 'Running exercise notes',
                  sets: [],
                  restTimer: '90s',
                  restAfter: '2 min',
                },
              ],
              restAfter: '2 min',
            },
          ],
        },
      ];

      render(
        <NotesProvider
          strengthWorkouts={[]}
          runningWorkouts={mockRunningWorkoutsWithData}
          setStrengthWorkouts={mockSetStrengthWorkouts}
          setRunningWorkouts={mockSetRunningWorkouts}
        >
          <TestComponent />
        </NotesProvider>
      );

      // Open exercise notes modal for running workout
      fireEvent.click(screen.getByTestId('open-exercise-notes'));

      // Save notes
      fireEvent.click(screen.getByTestId('save-notes'));

      // Should call setRunningWorkouts with updated data
      expect(mockSetRunningWorkouts).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  describe('useNotesContext hook', () => {
    it('should throw error when used outside provider', () => {
      // Suppress console.error for this test
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation((): void => {
          // Intentionally empty
        });

      expect(() => {
        render(<TestComponent />);
      }).toThrow('useNotesContext must be used within a NotesProvider');

      consoleSpy.mockRestore();
    });

    it('should provide all required context values', () => {
      const TestHookComponent = (): React.ReactElement => {
        const context = useNotesContext();

        return (
          <div>
            <span data-testid="has-modal-open">
              {typeof context.notesModalOpen}
            </span>
            <span data-testid="has-open-modal">
              {typeof context.openNotesModal}
            </span>
            <span data-testid="has-close-modal">
              {typeof context.closeNotesModal}
            </span>
            <span data-testid="has-save-notes">
              {typeof context.handleNotesSave}
            </span>
            <span data-testid="has-context">
              {typeof context.currentNotesContext}
            </span>
          </div>
        );
      };

      render(
        <NotesProvider
          strengthWorkouts={[]}
          runningWorkouts={[]}
          setStrengthWorkouts={mockSetStrengthWorkouts}
          setRunningWorkouts={mockSetRunningWorkouts}
        >
          <TestHookComponent />
        </NotesProvider>
      );

      expect(screen.getByTestId('has-modal-open')).toHaveTextContent('boolean');
      expect(screen.getByTestId('has-open-modal')).toHaveTextContent(
        'function'
      );
      expect(screen.getByTestId('has-close-modal')).toHaveTextContent(
        'function'
      );
      expect(screen.getByTestId('has-save-notes')).toHaveTextContent(
        'function'
      );
      expect(screen.getByTestId('has-context')).toHaveTextContent('object');
    });
  });
});
