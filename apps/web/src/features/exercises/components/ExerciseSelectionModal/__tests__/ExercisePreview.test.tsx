import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import type { Exercise } from '../../../types';
import { createExerciseId, createExerciseVariantId } from '../../../types/ids';
import { ExercisePreview } from '../ExercisePreview';

// Mock hooks
vi.mock('../../../hooks/useExercises', () => ({
  useFavoriteManagement: () => ({
    addToFavorites: vi.fn(),
    removeFromFavorites: vi.fn(),
  }),
}));

vi.mock('@/features/auth/context/AuthContext', () => ({
  useAuth: () => ({
    userId: 'user-1',
  }),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

const mockExercise: Exercise = {
  id: createExerciseId('1'),
  name: 'Push-up',
  category: 'Strength',
  description: 'A basic push-up',
  variants: [
    {
      id: createExerciseVariantId('v1'),
      name: 'Standard Push-up',
      description: 'Standard form',
      focus: 'chest',
      difficulty: 'Beginner',
      equipment: ['Bodyweight'],
      muscleGroups: ['Chest'],
      instructions: ['Do it'],
      steps: [{ title: 'Step 1', description: 'Do it' }],
    },
    {
      id: createExerciseVariantId('v2'),
      name: 'Wide Push-up',
      description: 'Wide stance',
      focus: 'chest',
      difficulty: 'Intermediate',
      equipment: ['Bodyweight'],
      muscleGroups: ['Chest', 'Shoulders'],
      instructions: ['Do it wide'],
      steps: [{ title: 'Step 1', description: 'Do it wide' }],
    },
  ],
  mainVariantId: createExerciseVariantId('v1'),
  icon: '💪',
  iconColor: 'blue',
  isFavorite: false,
};

const mockOnVariantSelect = vi.fn();
const mockOnSelectExercise = vi.fn();
const mockOnClose = vi.fn();

describe('ExercisePreview', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders exercise details', () => {
    render(
      <ExercisePreview
        exercise={mockExercise}
        selectedVariant={mockExercise.variants[0]}
        onVariantSelect={mockOnVariantSelect}
        onSelectExercise={mockOnSelectExercise}
        onClose={mockOnClose}
      />
    );
    expect(screen.getAllByText('Standard Push-up')).toHaveLength(3); // h2, h5, p
    expect(screen.getAllByText('Standard form')).toHaveLength(2); // p elements
    expect(screen.getByText('Strength')).toBeInTheDocument();
  });

  it('shows variant selector', () => {
    render(
      <ExercisePreview
        exercise={mockExercise}
        selectedVariant={mockExercise.variants[0]}
        onVariantSelect={mockOnVariantSelect}
        onSelectExercise={mockOnSelectExercise}
        onClose={mockOnClose}
      />
    );
    expect(screen.getByText('Variants')).toBeInTheDocument();
    expect(screen.getAllByText('Standard Push-up')).toHaveLength(3);
    expect(screen.getByText('Wide Push-up')).toBeInTheDocument();
  });

  it('calls onVariantSelect when variant is clicked', () => {
    render(
      <ExercisePreview
        exercise={mockExercise}
        selectedVariant={mockExercise.variants[0]}
        onVariantSelect={mockOnVariantSelect}
        onSelectExercise={mockOnSelectExercise}
        onClose={mockOnClose}
      />
    );
    const wideVariant = screen.getByText('Wide Push-up');
    fireEvent.click(wideVariant);
    expect(mockOnVariantSelect).toHaveBeenCalledWith(mockExercise.variants[1]);
  });

  it('calls onSelectExercise when add exercise button is clicked', () => {
    render(
      <ExercisePreview
        exercise={mockExercise}
        selectedVariant={mockExercise.variants[0]}
        onVariantSelect={mockOnVariantSelect}
        onSelectExercise={mockOnSelectExercise}
        onClose={mockOnClose}
      />
    );
    const addButton = screen.getByRole('button', { name: /add exercise/i });
    fireEvent.click(addButton);
    expect(mockOnSelectExercise).toHaveBeenCalled();
  });
});
