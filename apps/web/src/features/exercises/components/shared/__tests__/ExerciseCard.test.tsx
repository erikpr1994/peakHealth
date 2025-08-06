import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import type { Exercise } from '../../../types';
import {
  CATEGORY,
  DIFFICULTY,
  EQUIPMENT,
  MUSCLE_GROUP,
} from '../../../types/constants';
import { createExerciseId, createExerciseVariantId } from '../../../types/ids';
import { ExerciseCard } from '../ExerciseCard';

// Mock the hooks
vi.mock('../../../hooks/useExercises', () => ({
  useFavoriteManagement: () => ({
    addToFavorites: vi.fn(),
    removeFromFavorites: vi.fn(),
  }),
}));

vi.mock('@/features/auth/context/AuthContext', () => ({
  useAuth: () => ({
    userId: 'test-user-id',
  }),
}));

const mockExercise: Exercise = {
  id: createExerciseId('1'),
  name: 'Push-up',
  category: CATEGORY.STRENGTH,
  description: 'A classic bodyweight exercise',
  icon: '💪',
  iconColor: '#3B82F6',
  isFavorite: false,
  isPopular: false,
  isNew: false,
  rating: 4.5,
  mainVariantId: createExerciseVariantId('variant-1'),
  variants: [
    {
      id: createExerciseVariantId('variant-1'),
      name: 'Standard Push-up',
      description: 'Basic push-up variation',
      focus: 'Upper body strength',
      difficulty: DIFFICULTY.BEGINNER,
      equipment: [EQUIPMENT.BODYWEIGHT],
      muscleGroups: [MUSCLE_GROUP.CHEST, MUSCLE_GROUP.SHOULDERS],
      instructions: [
        'Start in plank position',
        'Lower your body',
        'Push back up',
      ],
      steps: [
        { title: 'Start Position', description: 'Get into a plank position' },
        { title: 'Lower', description: 'Lower your body to the ground' },
        { title: 'Push Up', description: 'Push back up to starting position' },
      ],
    },
    {
      id: createExerciseVariantId('variant-2'),
      name: 'Diamond Push-up',
      description: 'Advanced push-up variation',
      focus: 'Tricep strength',
      difficulty: DIFFICULTY.INTERMEDIATE,
      equipment: [EQUIPMENT.BODYWEIGHT],
      muscleGroups: [MUSCLE_GROUP.CHEST, MUSCLE_GROUP.TRICEPS],
      instructions: ['Form diamond with hands', 'Perform push-up'],
      steps: [
        {
          title: 'Diamond Position',
          description: 'Form diamond shape with hands',
        },
        {
          title: 'Perform Push-up',
          description: 'Execute the push-up movement',
        },
      ],
    },
  ],
};

describe('ExerciseCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render exercise information correctly', () => {
    render(<ExerciseCard exercise={mockExercise} />);

    expect(screen.getByText('Push-up')).toBeInTheDocument();
    expect(screen.getByText('Chest, Shoulders')).toBeInTheDocument();
    expect(screen.getByText('Strength')).toBeInTheDocument();
    expect(screen.getByText('2 variants')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('should call onClick when card is clicked', () => {
    const handleClick = vi.fn();
    render(<ExerciseCard exercise={mockExercise} onClick={handleClick} />);

    const card = screen.getByText('Push-up').closest('[data-slot="card"]');
    expect(card).toBeInTheDocument();
    if (card) {
      fireEvent.click(card);
    }

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should show chevron when showChevron is true', () => {
    render(<ExerciseCard exercise={mockExercise} showChevron />);

    const chevrons = screen
      .getAllByText('')
      .map(el => el.closest('svg'))
      .filter(Boolean);
    const hasChevron = chevrons.some(svg =>
      svg?.classList.contains('lucide-chevron-right')
    );
    expect(hasChevron).toBe(true);
  });

  it('should not show chevron when showChevron is false', () => {
    render(<ExerciseCard exercise={mockExercise} showChevron={false} />);

    const chevrons = screen
      .getAllByText('')
      .map(el => el.closest('svg'))
      .filter(Boolean);
    const hasChevron = chevrons.some(svg =>
      svg?.classList.contains('lucide-chevron-right')
    );
    expect(hasChevron).toBe(false);
  });

  it('should show selected state when isSelected is true', () => {
    render(<ExerciseCard exercise={mockExercise} isSelected />);

    const card = screen.getByText('Push-up').closest('[data-slot="card"]');
    expect(card).toHaveClass('border-primary');
  });

  it('should show popular badge when exercise is popular', () => {
    const popularExercise = { ...mockExercise, isPopular: true };
    render(<ExerciseCard exercise={popularExercise} />);

    expect(screen.getByText('Popular')).toBeInTheDocument();
  });

  it('should show new badge when exercise is new', () => {
    const newExercise = { ...mockExercise, isNew: true };
    render(<ExerciseCard exercise={newExercise} />);

    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('should show filled heart when exercise is favorite', () => {
    const favoriteExercise = { ...mockExercise, isFavorite: true };
    render(<ExerciseCard exercise={favoriteExercise} />);

    const heart = screen.getByRole('button');
    expect(heart.querySelector('svg')).toHaveClass(
      'text-red-500',
      'fill-red-500'
    );
  });

  it('should show empty heart when exercise is not favorite', () => {
    render(<ExerciseCard exercise={mockExercise} />);

    const heart = screen.getByRole('button');
    expect(heart.querySelector('svg')).toHaveClass('text-gray-400');
  });

  it('should handle favorite toggle click', async () => {
    const onFavoriteToggle = vi.fn();
    render(
      <ExerciseCard
        exercise={mockExercise}
        onFavoriteToggle={onFavoriteToggle}
      />
    );

    const heartButton = screen.getByRole('button');
    fireEvent.click(heartButton);

    await waitFor(() => {
      expect(onFavoriteToggle).toHaveBeenCalledTimes(1);
    });
  });

  it('should handle exercise without variants', () => {
    const exerciseWithoutVariants = { ...mockExercise, variants: [] };
    render(<ExerciseCard exercise={exerciseWithoutVariants} />);

    expect(screen.queryByText(/variants/)).not.toBeInTheDocument();
  });

  it('should handle exercise without main variant', () => {
    const exerciseWithoutMainVariant = {
      ...mockExercise,
      mainVariantId: createExerciseVariantId('non-existent'),
    };
    render(<ExerciseCard exercise={exerciseWithoutMainVariant} />);

    expect(screen.getByText('Multiple muscle groups')).toBeInTheDocument();
  });

  it('should handle exercise without rating', () => {
    const exerciseWithoutRating = { ...mockExercise, rating: undefined };
    render(<ExerciseCard exercise={exerciseWithoutRating} />);

    expect(screen.queryByText('4.5')).not.toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(<ExerciseCard exercise={mockExercise} className="custom-class" />);

    const card = screen.getByText('Push-up').closest('[data-slot="card"]');
    expect(card).toHaveClass('custom-class');
  });

  it('should render different sizes correctly', () => {
    const { rerender } = render(
      <ExerciseCard exercise={mockExercise} size="sm" />
    );

    let card = screen.getByText('Push-up').closest('[data-slot="card"]');
    expect(card).toHaveClass('max-w-xs');

    rerender(<ExerciseCard exercise={mockExercise} size="lg" />);

    card = screen.getByText('Push-up').closest('[data-slot="card"]');
    expect(card).toHaveClass('max-w-md');
  });

  it('should prevent event propagation on favorite button click', async () => {
    const handleClick = vi.fn();
    render(<ExerciseCard exercise={mockExercise} onClick={handleClick} />);

    const heartButton = screen.getByRole('button');
    await act(async () => {
      fireEvent.click(heartButton);
    });

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should handle exercise with long name', () => {
    const longNameExercise = {
      ...mockExercise,
      name: 'This is a very long exercise name that should be truncated',
    };
    render(<ExerciseCard exercise={longNameExercise} />);

    expect(
      screen.getByText(
        'This is a very long exercise name that should be truncated'
      )
    ).toBeInTheDocument();
  });

  it('should handle exercise with many muscle groups', () => {
    const exerciseWithManyMuscleGroups = {
      ...mockExercise,
      variants: [
        {
          id: createExerciseVariantId('variant-1'),
          name: 'Standard Push-up',
          description: 'Basic push-up variation',
          focus: 'Upper body strength',
          difficulty: DIFFICULTY.BEGINNER,
          equipment: [EQUIPMENT.BODYWEIGHT],
          muscleGroups: [
            MUSCLE_GROUP.CHEST,
            MUSCLE_GROUP.SHOULDERS,
            MUSCLE_GROUP.TRICEPS,
            MUSCLE_GROUP.CORE,
          ],
          instructions: [
            'Start in plank position',
            'Lower your body',
            'Push back up',
          ],
          steps: [
            {
              title: 'Start Position',
              description: 'Get into a plank position',
            },
            { title: 'Lower', description: 'Lower your body to the ground' },
            {
              title: 'Push Up',
              description: 'Push back up to starting position',
            },
          ],
        },
      ],
    };
    render(<ExerciseCard exercise={exerciseWithManyMuscleGroups} />);

    expect(
      screen.getByText('Chest, Shoulders, Triceps, Core')
    ).toBeInTheDocument();
  });
});
