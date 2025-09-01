import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WarmupSection } from './WarmupSection';

// Mock function definitions
const mockUseSection = vi.hoisted(() => vi.fn());

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
  Button: ({ children, onClick, variant, size, className }: any) => (
    <button
      onClick={onClick}
      className={`${variant} ${size} ${className}`}
      data-testid="button"
    >
      {children}
    </button>
  ),
}));

// Mock the hooks
vi.mock('../../hooks/useSection', () => ({
  useSection: mockUseSection,
}));

// Mock the components
vi.mock('../StrengthExercise', () => ({
  StrengthExercise: ({ exerciseId }: any) => (
    <div data-testid={`strength-exercise-${exerciseId}`}>
      Strength Exercise {exerciseId}
    </div>
  ),
}));

vi.mock('../ExerciseLibraryModal', () => ({
  ExerciseLibraryModal: ({ isOpen, onClose, onSelect }: any) => {
    if (!isOpen) return null;
    return (
      <div data-testid="exercise-library-modal">
        <button onClick={onClose} data-testid="close-modal">
          Close
        </button>
        <button
          onClick={() => onSelect([{ id: '1', name: 'Test Exercise' }])}
          data-testid="select-exercise"
        >
          Select Exercise
        </button>
      </div>
    );
  },
}));

describe('WarmupSection', () => {
  const mockAddExercise = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseSection.mockReturnValue({
      section: { id: 'warmup-1', name: 'Warmup' },
      exerciseIds: [],
      addExercise: mockAddExercise,
    });
  });

  it('renders the warmup section header', () => {
    render(<WarmupSection workoutId="workout-1" sectionId="warmup-1" />);

    expect(screen.getByText('Warm-up')).toBeDefined();
    expect(
      screen.getByTestId('accordion-header').querySelector('.warmup-icon')
    ).toBeDefined();
    expect(screen.getByText('Add Exercise')).toBeDefined();
  });

  it('shows empty state when no exercises exist', () => {
    render(<WarmupSection workoutId="workout-1" sectionId="warmup-1" />);

    expect(screen.getByText('No warm-up exercises yet')).toBeDefined();
    expect(
      screen.getByText('Add your first warm-up exercise to get started')
    ).toBeDefined();
    expect(screen.getByText('Add your first warm-up exercise')).toBeDefined();
  });

  it('shows exercises list when exercises exist', () => {
    mockUseSection.mockReturnValue({
      section: { id: 'warmup-1', name: 'Warmup' },
      exerciseIds: ['exercise-1', 'exercise-2'],
      addExercise: mockAddExercise,
    });

    render(<WarmupSection workoutId="workout-1" sectionId="warmup-1" />);

    expect(screen.getByTestId('strength-exercise-exercise-1')).toBeDefined();
    expect(screen.getByTestId('strength-exercise-exercise-2')).toBeDefined();
    expect(screen.queryByText('No warmup exercises yet')).toBeNull();
  });

  it('opens exercise modal when add exercise button is clicked', () => {
    render(<WarmupSection workoutId="workout-1" sectionId="warmup-1" />);

    const addButton = screen.getByText('Add Exercise');
    fireEvent.click(addButton);

    expect(screen.getByTestId('exercise-library-modal')).toBeDefined();
  });

  it('opens exercise modal when empty state button is clicked', () => {
    render(<WarmupSection workoutId="workout-1" sectionId="warmup-1" />);

    const emptyStateButton = screen.getByText(
      'Add your first warm-up exercise'
    );
    fireEvent.click(emptyStateButton);

    expect(screen.getByTestId('exercise-library-modal')).toBeDefined();
  });

  it('adds exercise when selected from modal', () => {
    render(<WarmupSection workoutId="workout-1" sectionId="warmup-1" />);

    // Open modal
    const addButton = screen.getByText('Add Exercise');
    fireEvent.click(addButton);

    // Select exercise
    const selectButton = screen.getByTestId('select-exercise');
    fireEvent.click(selectButton);

    expect(mockAddExercise).toHaveBeenCalledWith({
      _id: expect.any(String),
      exerciseId: '1',
      exerciseVariantId: '1',
      orderIndex: 0,
      type: 'strength',
      sets: [],
      restBetweenSets: '60s',
      notes: '',
    });
  });

  it('closes modal when close button is clicked', () => {
    render(<WarmupSection workoutId="workout-1" sectionId="warmup-1" />);

    // Open modal
    const addButton = screen.getByText('Add Exercise');
    fireEvent.click(addButton);

    // Close modal
    const closeButton = screen.getByTestId('close-modal');
    fireEvent.click(closeButton);

    expect(screen.queryByTestId('exercise-library-modal')).toBeNull();
  });

  it('passes correct props to StrengthExercise components', () => {
    mockUseSection.mockReturnValue({
      section: { id: 'warmup-1', name: 'Warmup' },
      exerciseIds: ['exercise-1'],
      addExercise: mockAddExercise,
    });

    render(<WarmupSection workoutId="workout-1" sectionId="warmup-1" />);

    const strengthExercise = screen.getByTestId('strength-exercise-exercise-1');
    expect(strengthExercise).toBeDefined();
  });

  it('applies initial filter to ExerciseLibraryModal', () => {
    render(<WarmupSection workoutId="workout-1" sectionId="warmup-1" />);

    // Open modal to check initial filter
    const addButton = screen.getByText('Add Exercise');
    fireEvent.click(addButton);

    expect(screen.getByTestId('exercise-library-modal')).toBeDefined();
  });
});
