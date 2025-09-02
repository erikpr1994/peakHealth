import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { WaveLoadingEditor } from './WaveLoadingEditor';
import { RoutineBuilderProvider } from '../../../context/routineBuilder/RoutineBuilderContext';

// Mock the useExercise hook
const mockUseExercise = vi.hoisted(() => vi.fn());

vi.mock('../../../hooks/useExercise', () => ({
  useExercise: mockUseExercise,
}));

// Mock the SetsTable component
const MockSetsTable = vi.hoisted(() =>
  vi.fn(() => <div data-testid="sets-table">Sets Table</div>)
);

vi.mock('../../SetsTable', () => ({
  SetsTable: MockSetsTable,
}));

describe('WaveLoadingEditor', () => {
  const defaultProps = {
    exerciseId: 'exercise-1',
    workoutId: 'workout-1',
    sectionId: 'section-1',
  };

  const mockExercise = {
    _id: 'exercise-1',
    name: 'Bench Press',
    type: 'strength',
    progressionMethod: 'wave-loading',
    sets: [],
  };

  const mockSetIds = ['set-1', 'set-2'];

  const mockAddSet = vi.fn();
  const mockRemoveSet = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseExercise.mockReturnValue({
      exercise: mockExercise,
      setIds: mockSetIds,
      addSet: mockAddSet,
      removeSet: mockRemoveSet,
    });
  });

  it('renders the component with sets table', () => {
    render(
      <RoutineBuilderProvider>
        <WaveLoadingEditor {...defaultProps} />
      </RoutineBuilderProvider>
    );

    expect(screen.getByTestId('sets-table')).toBeDefined();
    expect(screen.getByText('Configure Wave Loading')).toBeDefined();
  });

  it('opens modal when configure button is clicked', () => {
    render(
      <RoutineBuilderProvider>
        <WaveLoadingEditor {...defaultProps} />
      </RoutineBuilderProvider>
    );

    const configureButton = screen.getByText('Configure Wave Loading');
    fireEvent.click(configureButton);

    // Modal should be open - check for modal content
    expect(screen.getByText('Number of Waves')).toBeDefined();
    expect(screen.getByText('Generate Sets')).toBeDefined();
  });

  it('closes modal when close button is clicked', () => {
    render(
      <RoutineBuilderProvider>
        <WaveLoadingEditor {...defaultProps} />
      </RoutineBuilderProvider>
    );

    // Open modal
    const configureButton = screen.getByText('Configure Wave Loading');
    fireEvent.click(configureButton);

    // Close modal
    const closeButton = screen.getByText('Cancel');
    fireEvent.click(closeButton);

    // Modal should be closed - check that modal content is not visible
    expect(screen.queryByText('Generate Sets')).toBeNull();
  });

  it('generates sets when form is submitted', () => {
    render(
      <RoutineBuilderProvider>
        <WaveLoadingEditor {...defaultProps} />
      </RoutineBuilderProvider>
    );

    // Open modal
    const configureButton = screen.getByText('Configure Wave Loading');
    fireEvent.click(configureButton);

    // Fill form with default values (they should already be filled)
    const generateButton = screen.getByText('Generate Sets');
    fireEvent.click(generateButton);

    // Should call addSet for each generated set
    expect(mockAddSet).toHaveBeenCalled();
  });

  it('clears existing sets before adding new ones', () => {
    render(
      <RoutineBuilderProvider>
        <WaveLoadingEditor {...defaultProps} />
      </RoutineBuilderProvider>
    );

    // Open modal
    const configureButton = screen.getByText('Configure Wave Loading');
    fireEvent.click(configureButton);

    // Generate sets
    const generateButton = screen.getByText('Generate Sets');
    fireEvent.click(generateButton);

    // Should remove existing sets first
    expect(mockRemoveSet).toHaveBeenCalledWith('set-1');
    expect(mockRemoveSet).toHaveBeenCalledWith('set-2');
  });
});
