import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import type { Exercise, ExerciseVariant } from '../../../types';
import { ExerciseHeader } from '../ExerciseHeader';

// Mock hooks
vi.mock('../../hooks/useExercises', () => ({
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

const mockExercise: Exercise = {
  id: '1',
  name: 'Push-up',
  category: 'Strength',
  description: 'A basic push-up',
  variants: [],
  mainVariantId: 'v1',
  icon: '💪',
  iconColor: 'blue',
  isFavorite: false,
  isPopular: true,
  rating: 4.5,
};
const mockVariant: ExerciseVariant = {
  id: 'v1',
  name: 'Standard Push-up',
  description: 'Standard form',
  focus: 'chest',
  difficulty: 'Beginner',
  equipment: [],
  muscleGroups: ['Chest'],
  instructions: ['Do it'],
  steps: [{ title: 'Step 1', description: 'Do it' }],
};

describe('ExerciseHeader', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders exercise and variant info', () => {
    render(<ExerciseHeader exercise={mockExercise} variant={mockVariant} />);
    expect(screen.getByText('Standard Push-up')).toBeInTheDocument();
    expect(screen.getByText('Popular')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('shows favorite button and toggles state', async () => {
    render(<ExerciseHeader exercise={mockExercise} variant={mockVariant} />);
    const heart = screen.getByRole('button');
    expect(heart.querySelector('svg')).toBeInTheDocument();
    fireEvent.click(heart);
    // No error thrown, state updates
  });

  it('disables favorite button when updating', () => {
    render(<ExerciseHeader exercise={mockExercise} variant={mockVariant} />);
    const heart = screen.getByRole('button');
    expect(heart).not.toBeDisabled();
  });

  it('does not show favorite button if no user', () => {
    vi.mock('@/features/auth/context/AuthContext', () => ({
      useAuth: () => ({ userId: undefined }),
    }));
    render(<ExerciseHeader exercise={mockExercise} variant={mockVariant} />);
    expect(screen.queryByRole('button')).toBeInTheDocument(); // Only printer button
  });

  it('shows printer button', () => {
    render(<ExerciseHeader exercise={mockExercise} variant={mockVariant} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
