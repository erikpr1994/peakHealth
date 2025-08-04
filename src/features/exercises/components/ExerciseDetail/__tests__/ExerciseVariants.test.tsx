import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import {
  Exercise,
  CATEGORY,
  DIFFICULTY,
  MUSCLE_GROUP,
  createExerciseId,
  createExerciseVariantId,
} from '../../../types';
import { ExerciseVariants } from '../ExerciseVariants';

// Mock Next.js router
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock the useFavoriteManagement hook
vi.mock('../../../hooks/useExercises', () => ({
  useFavoriteManagement: () => ({
    addToFavorites: vi.fn(),
    removeFromFavorites: vi.fn(),
  }),
}));

describe('ExerciseVariants', () => {
  const mockExercise: Exercise = {
    id: createExerciseId('exercise-1'),
    name: 'Push-up',
    category: CATEGORY.STRENGTH,
    description: 'A basic push-up exercise',
    variants: [
      {
        id: createExerciseVariantId('variant-1'),
        name: 'Standard Push-up',
        description: 'Basic push-up on the floor',
        focus: 'chest',
        difficulty: DIFFICULTY.BEGINNER,
        equipment: [],
        muscleGroups: [MUSCLE_GROUP.CHEST],
        instructions: ['Start in plank position'],
        steps: [{ title: 'Step 1', description: 'Get in plank position' }],
      },
      {
        id: createExerciseVariantId('variant-2'),
        name: 'Incline Push-up',
        description: 'Push-up with hands elevated',
        focus: 'chest',
        difficulty: DIFFICULTY.BEGINNER,
        equipment: [],
        muscleGroups: [MUSCLE_GROUP.CHEST],
        instructions: ['Place hands on elevated surface'],
        steps: [
          { title: 'Step 1', description: 'Place hands on elevated surface' },
        ],
      },
    ],
    mainVariantId: createExerciseVariantId('variant-1'),
    icon: 'push-up',
    iconColor: 'blue',
    isFavorite: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders variants correctly', () => {
    render(<ExerciseVariants exercise={mockExercise} />);

    expect(screen.getByText('Variants')).toBeInTheDocument();
    expect(screen.getByText('Standard Push-up')).toBeInTheDocument();
    expect(screen.getByText('Incline Push-up')).toBeInTheDocument();
  });

  it('navigates to variant page when variant card is clicked', () => {
    render(<ExerciseVariants exercise={mockExercise} />);

    const variantCard = screen
      .getByText('Incline Push-up')
      .closest('.cursor-pointer');
    fireEvent.click(variantCard!);

    expect(mockPush).toHaveBeenCalledWith(
      '/exercises/exercise-1/variants/variant-2'
    );
  });

  it('does not render when no variants exist', () => {
    const exerciseWithoutVariants = {
      ...mockExercise,
      variants: [],
    };

    render(<ExerciseVariants exercise={exerciseWithoutVariants} />);

    expect(screen.queryByText('Variants')).not.toBeInTheDocument();
  });

  it('filters out current variant from the list', () => {
    render(
      <ExerciseVariants exercise={mockExercise} currentVariantId="variant-1" />
    );

    // Should not show the current variant (Standard Push-up)
    expect(screen.queryByText('Standard Push-up')).not.toBeInTheDocument();
    // Should still show other variants
    expect(screen.getByText('Incline Push-up')).toBeInTheDocument();
  });

  it('handles favorite button click without stopping propagation', () => {
    render(<ExerciseVariants exercise={mockExercise} userId="user-1" />);

    // Get the first favorite button (heart icon)
    const favoriteButtons = screen.getAllByRole('button');
    const heartButton = favoriteButtons.find(button =>
      button.querySelector('svg[class*="lucide-heart"]')
    );

    fireEvent.click(heartButton!);

    // Should not navigate to variant page when favorite button is clicked
    expect(mockPush).not.toHaveBeenCalled();
  });
});
