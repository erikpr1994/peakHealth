import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { ExerciseProvider } from '../../../context/ExerciseContext';
import type { Exercise } from '../../../types';
import { ExerciseLibrary } from '../ExerciseLibrary';

// Mock hooks
vi.mock('../../../hooks/useExercises', () => ({
  useExerciseSearch: () => ({
    exercises: [],
    isLoading: false,
  }),
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

const mockExercises: Exercise[] = [
  {
    id: '1',
    name: 'Push-up',
    category: 'Strength',
    description: 'A basic push-up',
    variants: [
      {
        id: 'v1',
        name: 'Standard Push-up',
        description: 'Standard form',
        focus: 'chest',
        difficulty: 'Beginner',
        equipment: ['Bodyweight'],
        muscleGroups: ['Chest'],
        instructions: ['Do it'],
        steps: [{ title: 'Step 1', description: 'Do it' }],
      },
    ],
    mainVariantId: 'v1',
    icon: '💪',
    iconColor: 'blue',
    isFavorite: false,
  },
  {
    id: '2',
    name: 'Squat',
    category: 'Strength',
    description: 'A basic squat',
    variants: [
      {
        id: 'v2',
        name: 'Standard Squat',
        description: 'Standard form',
        focus: 'legs',
        difficulty: 'Beginner',
        equipment: ['Bodyweight'],
        muscleGroups: ['Quadriceps'],
        instructions: ['Do it'],
        steps: [{ title: 'Step 1', description: 'Do it' }],
      },
    ],
    mainVariantId: 'v2',
    icon: '🦵',
    iconColor: 'green',
    isFavorite: true,
  },
];

const mockOnExerciseSelect = vi.fn();
const mockOnSearchChange = vi.fn();
const mockOnCategoryChange = vi.fn();

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ExerciseProvider>{children}</ExerciseProvider>
);

describe('ExerciseLibrary', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders exercise list', () => {
    render(
      <TestWrapper>
        <ExerciseLibrary
          exercises={mockExercises}
          searchTerm=""
          selectedCategory="All"
          selectedExercise={null}
          onExerciseSelect={mockOnExerciseSelect}
          onSearchChange={mockOnSearchChange}
          onCategoryChange={mockOnCategoryChange}
        />
      </TestWrapper>
    );
    expect(screen.getByText('Push-up')).toBeInTheDocument();
    expect(screen.getByText('Squat')).toBeInTheDocument();
  });

  it('shows search and filter components', () => {
    render(
      <TestWrapper>
        <ExerciseLibrary
          exercises={mockExercises}
          searchTerm=""
          selectedCategory="All"
          selectedExercise={null}
          onExerciseSelect={mockOnExerciseSelect}
          onSearchChange={mockOnSearchChange}
          onCategoryChange={mockOnCategoryChange}
        />
      </TestWrapper>
    );
    expect(
      screen.getByPlaceholderText('Search exercises...')
    ).toBeInTheDocument();
    expect(screen.getByText('Filters')).toBeInTheDocument();
  });

  it('shows category tabs', () => {
    render(
      <TestWrapper>
        <ExerciseLibrary
          exercises={mockExercises}
          searchTerm=""
          selectedCategory="All"
          selectedExercise={null}
          onExerciseSelect={mockOnExerciseSelect}
          onSearchChange={mockOnSearchChange}
          onCategoryChange={mockOnCategoryChange}
        />
      </TestWrapper>
    );
    expect(screen.getAllByText('Strength')).toHaveLength(3); // Button + 2 badges
    expect(screen.getByText('Cardio')).toBeInTheDocument();
    expect(screen.getByText('Flexibility')).toBeInTheDocument();
    expect(screen.getByText('Balance')).toBeInTheDocument();
  });
});
