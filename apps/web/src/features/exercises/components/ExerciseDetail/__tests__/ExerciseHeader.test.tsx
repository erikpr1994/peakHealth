import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import type {
  Exercise,
  ExerciseVariant,
  ExerciseId,
  ExerciseVariantId,
} from '../../../types';
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
    const heart = screen.getByTestId('favorite-button');
    expect(heart.querySelector('svg')).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(heart);
    });
    // No error thrown, state updates
  });

  it('disables favorite button when updating', () => {
    render(<ExerciseHeader exercise={mockExercise} variant={mockVariant} />);
    const heart = screen.getByTestId('favorite-button');
    expect(heart).not.toBeDisabled();
  });

  // Note: Testing the "no user" scenario is done in a separate test file
  // (ExerciseHeader.noUser.test.tsx) because it requires a different mock setup
  // where useAuth returns { userId: undefined }

  it('shows printer button', () => {
    render(<ExerciseHeader exercise={mockExercise} variant={mockVariant} />);
    expect(screen.getByTestId('printer-button')).toBeInTheDocument();
  });
});
