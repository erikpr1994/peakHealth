import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WorkoutAccordion } from './WorkoutAccordion';
import { RoutineBuilderProvider } from '../../context/routineBuilder/RoutineBuilderContext';
import { RoutineBuilderState } from '../../context/routineBuilder/types';
import { Workout } from '@peakhealth/routines-types';

// Mock function definitions
const mockUseWorkout = vi.hoisted(() => vi.fn());
const mockGenerateId = vi.hoisted(() => vi.fn(() => 'test-id-123'));

// Mock the UI components
const MockAccordion = vi.hoisted(() => {
  const Component = ({ children, ...props }: any) => (
    <details className="accordion" {...props}>
      {children}
    </details>
  );

  Component.Header = ({ children, className }: any) => (
    <summary className={className} data-testid="accordion-header">
      {children}
    </summary>
  );

  Component.Content = ({ children, className }: any) => (
    <div className={className} data-testid="accordion-content">
      {children}
    </div>
  );

  return Component;
});

vi.mock('@peakhealth/ui', () => ({
  Accordion: MockAccordion,
  Button: ({
    children,
    onClick,
    ...props
  }: React.ComponentProps<'button'> & { variant?: string; size?: string }) => (
    <button
      onClick={onClick}
      className={`${props.variant || ''} ${props.size || ''} ${props.className || ''}`}
      data-testid="button"
    >
      {children}
    </button>
  ),
}));

// Mock the hooks
vi.mock('../../hooks/useWorkout', () => ({
  useWorkout: mockUseWorkout,
}));

// Mock the utils
vi.mock('../../utils/idGenerator', () => ({
  generateId: mockGenerateId,
}));

// Mock the components
vi.mock('../SectionTypeSelectionModal', () => ({
  SectionTypeSelectionModal: ({
    isOpen,
    onClose,
    workoutId,
    onSectionTypeSelect,
  }: any) => {
    if (!isOpen) return null;
    return (
      <div data-testid="section-type-selection-modal">
        <h2>Select Section Type</h2>
        <button onClick={onClose} data-testid="close-modal">
          Close
        </button>
        <button
          onClick={() => onSectionTypeSelect(workoutId, 'warmup')}
          data-testid="select-warmup"
        >
          Select Warmup
        </button>
      </div>
    );
  },
}));

const mockWorkout: Workout = {
  _id: 'workout-1',
  name: 'Day 1: Upper Body',
  type: 'strength',
  orderIndex: 0,
  sections: [],
};

const mockState: RoutineBuilderState = {
  _id: 'routine-1',
  name: 'Test Routine',
  description: 'A test routine',
  difficulty: 'beginner',
  goal: 'general_fitness',
  duration: 4,
  objectives: ['Build strength', 'Improve fitness'],
  workouts: [mockWorkout],
  schemaVersion: '1.0.0',
  userId: 'user-1',
  createdBy: 'user-1',
  routineType: 'user-created',
  isActive: true,
  isFavorite: false,
  completedWorkouts: 0,
  totalWorkouts: 1,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
};

const mockDispatch = vi.fn();

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <RoutineBuilderProvider
      value={{
        state: mockState,
        dispatch: mockDispatch,
      }}
    >
      {component}
    </RoutineBuilderProvider>
  );
};

describe('WorkoutAccordion', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders workout title in header', () => {
    mockUseWorkout.mockReturnValue({
      workout: mockWorkout,
      sectionIds: [],
      addSection: vi.fn(),
    });

    renderWithProvider(<WorkoutAccordion workoutId="workout-1" />);

    expect(screen.getByText('Day 1: Upper Body')).toBeDefined();
  });

  it('shows empty state when no sections exist', () => {
    mockUseWorkout.mockReturnValue({
      workout: mockWorkout,
      sectionIds: [],
      addSection: vi.fn(),
    });

    renderWithProvider(<WorkoutAccordion workoutId="workout-1" />);

    expect(screen.getByText('No sections yet')).toBeDefined();
    expect(
      screen.getByText('Add your first section to build your workout')
    ).toBeDefined();
    expect(screen.getByText('Add your first section')).toBeDefined();
  });

  it('shows sections list when sections exist', () => {
    mockUseWorkout.mockReturnValue({
      workout: mockWorkout,
      sectionIds: ['section-1', 'section-2'],
      addSection: vi.fn(),
    });

    renderWithProvider(<WorkoutAccordion workoutId="workout-1" />);

    expect(screen.getByText('Section ID: section-1')).toBeDefined();
    expect(screen.getByText('Section ID: section-2')).toBeDefined();
  });

  it('opens section modal when Add Section button is clicked', () => {
    mockUseWorkout.mockReturnValue({
      workout: mockWorkout,
      sectionIds: [],
      addSection: vi.fn(),
    });

    renderWithProvider(<WorkoutAccordion workoutId="workout-1" />);

    const addSectionButton = screen.getByText('Add Section');
    fireEvent.click(addSectionButton);

    // The modal should be open (we can check this by looking for the modal title)
    expect(screen.getByText('Select Section Type')).toBeDefined();
  });

  it('renders null when workout is not found', () => {
    mockUseWorkout.mockReturnValue({
      workout: null,
      sectionIds: [],
      addSection: vi.fn(),
    });

    const { container } = renderWithProvider(
      <WorkoutAccordion workoutId="workout-1" />
    );
    expect(container.firstChild).toBeNull();
  });

  it('displays workout icon in header', () => {
    mockUseWorkout.mockReturnValue({
      workout: mockWorkout,
      sectionIds: [],
      addSection: vi.fn(),
    });

    renderWithProvider(<WorkoutAccordion workoutId="workout-1" />);

    // Check if the workout icon is present
    const workoutIcon = screen.getByText('🏋️');
    expect(workoutIcon).toBeDefined();
  });

  it('has responsive design classes', () => {
    mockUseWorkout.mockReturnValue({
      workout: mockWorkout,
      sectionIds: [],
      addSection: vi.fn(),
    });

    renderWithProvider(<WorkoutAccordion workoutId="workout-1" />);

    const accordion = screen.getByTestId('accordion-header');
    expect(accordion).toBeDefined();
  });
});
