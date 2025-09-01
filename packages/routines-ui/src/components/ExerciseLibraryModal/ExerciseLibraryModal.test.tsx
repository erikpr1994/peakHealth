import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ExerciseLibraryModal } from './ExerciseLibraryModal';
import type { ExerciseLibraryExercise } from './ExerciseLibraryModal.types';

// Mock the UI components
vi.mock('@peakhealth/ui', () => ({
  Modal: ({ children, isOpen, onClose, title, className }: any) => {
    if (!isOpen) return null;
    return (
      <div className={className} data-testid="modal">
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose} data-testid="close-button">
            Close
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    );
  },
  Button: ({ children, onClick, disabled, variant, size, className }: any) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${variant} ${size} ${className}`}
      data-testid="button"
    >
      {children}
    </button>
  ),
  Input: ({ value, onChange, placeholder, className }: any) => (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      data-testid="search-input"
    />
  ),
}));

describe('ExerciseLibraryModal', () => {
  const mockOnClose = vi.fn();
  const mockOnSelect = vi.fn();
  const mockExercises: ExerciseLibraryExercise[] = [
    {
      id: '1',
      name: 'Push-ups',
      description: 'A classic bodyweight exercise for upper body strength',
      category: 'Strength',
      muscleGroups: ['Chest', 'Triceps', 'Shoulders'],
      equipment: ['Bodyweight'],
      difficulty: 'Beginner',
      icon: '🏋️',
      iconColor: 'bg-blue-100 text-blue-600',
    },
    {
      id: '2',
      name: 'Squats',
      description: 'Fundamental lower body exercise',
      category: 'Strength',
      muscleGroups: ['Legs', 'Glutes', 'Core'],
      equipment: ['Bodyweight'],
      difficulty: 'Beginner',
      icon: '🏋️',
      iconColor: 'bg-green-100 text-green-600',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders when open', () => {
    render(
      <ExerciseLibraryModal
        isOpen={true}
        onClose={mockOnClose}
        onSelect={mockOnSelect}
      />
    );

    expect(screen.getByTestId('modal')).toBeDefined();
    expect(screen.getByText('Exercise Library')).toBeDefined();
    expect(screen.getByTestId('search-input')).toBeDefined();
  });

  it('does not render when closed', () => {
    render(
      <ExerciseLibraryModal
        isOpen={false}
        onClose={mockOnClose}
        onSelect={mockOnSelect}
      />
    );

    expect(screen.queryByTestId('modal')).toBeNull();
  });

  it('displays exercise cards', () => {
    render(
      <ExerciseLibraryModal
        isOpen={true}
        onClose={mockOnClose}
        onSelect={mockOnSelect}
      />
    );

    expect(screen.getByText('Push-ups')).toBeDefined();
    expect(screen.getByText('Squats')).toBeDefined();
    expect(
      screen.getByText('A classic bodyweight exercise for upper body strength')
    ).toBeDefined();
  });

  it('filters exercises by search term', async () => {
    render(
      <ExerciseLibraryModal
        isOpen={true}
        onClose={mockOnClose}
        onSelect={mockOnSelect}
      />
    );

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'push' } });

    await waitFor(() => {
      expect(screen.getByText('Push-ups')).toBeDefined();
      expect(screen.queryByText('Squats')).toBeNull();
    });
  });

  it('filters exercises by category', async () => {
    render(
      <ExerciseLibraryModal
        isOpen={true}
        onClose={mockOnClose}
        onSelect={mockOnSelect}
      />
    );

    const categorySelect = screen.getByText('Category:').nextElementSibling;
    expect(categorySelect).toBeDefined();
    if (categorySelect) {
      fireEvent.change(categorySelect, { target: { value: 'Strength' } });
    }

    await waitFor(() => {
      expect(screen.getByText('Push-ups')).toBeDefined();
      expect(screen.getByText('Squats')).toBeDefined();
    });
  });

  it('allows selecting exercises', async () => {
    render(
      <ExerciseLibraryModal
        isOpen={true}
        onClose={mockOnClose}
        onSelect={mockOnSelect}
      />
    );

    const firstExerciseCard = screen
      .getByText('Push-ups')
      .closest('.exercise-card');
    expect(firstExerciseCard).toBeDefined();

    if (firstExerciseCard) {
      fireEvent.click(firstExerciseCard);

      // Check if the select button shows the count
      const selectButton = screen.getByText(/Select \(1\)/);
      expect(selectButton).toBeDefined();
    }
  });

  it('calls onSelect with selected exercises', async () => {
    render(
      <ExerciseLibraryModal
        isOpen={true}
        onClose={mockOnClose}
        onSelect={mockOnSelect}
      />
    );

    // Select an exercise
    const firstExerciseCard = screen
      .getByText('Push-ups')
      .closest('.exercise-card');
    if (firstExerciseCard) {
      fireEvent.click(firstExerciseCard);
    }

    // Click select button
    const selectButton = screen.getByText(/Select \(1\)/);
    fireEvent.click(selectButton);

    await waitFor(() => {
      expect(mockOnSelect).toHaveBeenCalledWith([mockExercises[0]]);
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <ExerciseLibraryModal
        isOpen={true}
        onClose={mockOnClose}
        onSelect={mockOnSelect}
      />
    );

    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('applies initial filter correctly', () => {
    render(
      <ExerciseLibraryModal
        isOpen={true}
        onClose={mockOnClose}
        onSelect={mockOnSelect}
        initialFilter={{
          category: 'Strength',
          difficulty: 'Beginner',
        }}
      />
    );

    // Check if the initial filters are applied by looking for specific elements
    // Check that the initial filters are applied by looking for the filtered results
    expect(screen.getByText('Push-ups')).toBeDefined();
    expect(screen.getByText('Squats')).toBeDefined();
  });

  it('clears filters when clear filters button is clicked', async () => {
    render(
      <ExerciseLibraryModal
        isOpen={true}
        onClose={mockOnClose}
        onSelect={mockOnSelect}
        initialFilter={{
          category: 'Strength',
          difficulty: 'Beginner',
        }}
      />
    );

    const clearFiltersButton = screen.getByText('Clear Filters');
    fireEvent.click(clearFiltersButton);

    await waitFor(() => {
      // After clearing, we should see "All" options
      expect(screen.getAllByText('All')).toHaveLength(3);
    });
  });

  it('disables select button when no exercises are selected', () => {
    render(
      <ExerciseLibraryModal
        isOpen={true}
        onClose={mockOnClose}
        onSelect={mockOnSelect}
      />
    );

    const selectButton = screen.getByText('Select');
    expect(selectButton).toBeDefined();
    expect(selectButton).toHaveProperty('disabled', true);
  });

  it('shows no results message when filters return empty', async () => {
    render(
      <ExerciseLibraryModal
        isOpen={true}
        onClose={mockOnClose}
        onSelect={mockOnSelect}
      />
    );

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

    await waitFor(() => {
      expect(
        screen.getByText('No exercises found matching your criteria.')
      ).toBeDefined();
    });
  });
});
