import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import type {
  Exercise,
  ExerciseVariant,
  ExerciseId,
  ExerciseVariantId,
} from '../../../types';

// Mock hooks with no user
vi.mock('../../hooks/useExercises', () => ({
  useFavoriteManagement: () => ({
    addToFavorites: vi.fn(),
    removeFromFavorites: vi.fn(),
  }),
}));
vi.mock('@/features/auth/context/AuthContext', () => ({
  useAuth: () => ({
    userId: undefined, // No user
  }),
}));

// Import the component after mocking
import { ExerciseHeader } from '../ExerciseHeader';

const mockExercise: Exercise = {
  id: '1' as ExerciseId,
  name: 'Push-up',
  category: 'Strength',
  description: 'A basic push-up',
  variants: [],
  mainVariantId: 'v1' as ExerciseVariantId,
  icon: '💪',
  iconColor: 'blue',
  isFavorite: false,
  isPopular: true,
  rating: 4.5,
};

const mockVariant: ExerciseVariant = {
  id: 'v1' as ExerciseVariantId,
  name: 'Standard Push-up',
  description: 'Standard form',
  focus: 'chest',
  difficulty: 'Beginner',
  equipment: [],
  muscleGroups: ['Chest'],
  instructions: ['Do it'],
  steps: [{ title: 'Step 1', description: 'Do it' }],
};

describe('ExerciseHeader - No User', () => {
  it('does not show favorite button when no user is authenticated', () => {
    render(<ExerciseHeader exercise={mockExercise} variant={mockVariant} />);

    // Should only have the printer button, not the favorite button
    expect(screen.queryByTestId('favorite-button')).not.toBeInTheDocument();
    expect(screen.getByTestId('printer-button')).toBeInTheDocument();
  });

  it('renders exercise and variant info correctly', () => {
    render(<ExerciseHeader exercise={mockExercise} variant={mockVariant} />);

    expect(screen.getByText('Standard Push-up')).toBeInTheDocument();
    expect(screen.getByText('Popular')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });
});
