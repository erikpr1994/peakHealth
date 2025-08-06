import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import type { Exercise, ExerciseVariant } from '../../../types';
import { createExerciseId, createExerciseVariantId } from '../../../types/ids';
import { ExerciseInfo } from '../ExerciseInfo';

const mockExercise: Exercise = {
  id: createExerciseId('1'),
  name: 'Push-up',
  category: 'Strength',
  description: 'A basic push-up',
  variants: [],
  mainVariantId: createExerciseVariantId('v1'),
  icon: '💪',
  iconColor: 'blue',
  isFavorite: false,
};
const mockVariant: ExerciseVariant = {
  id: createExerciseVariantId('v1'),
  name: 'Standard Push-up',
  description: 'Standard form',
  focus: 'chest',
  difficulty: 'Beginner',
  equipment: ['Bodyweight'],
  muscleGroups: ['Chest', 'Shoulders'],
  instructions: ['Do it'],
  steps: [{ title: 'Step 1', description: 'Do it' }],
};

describe('ExerciseInfo', () => {
  it('renders all info fields', () => {
    render(<ExerciseInfo exercise={mockExercise} variant={mockVariant} />);
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Strength')).toBeInTheDocument();
    expect(screen.getByText('Equipment')).toBeInTheDocument();
    expect(screen.getByText('Bodyweight')).toBeInTheDocument();
    expect(screen.getByText('Difficulty')).toBeInTheDocument();
    expect(screen.getByText('Beginner')).toBeInTheDocument();
    expect(screen.getByText('Focus')).toBeInTheDocument();
    expect(screen.getByText('chest')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Standard form')).toBeInTheDocument();
    expect(screen.getByText('Primary Muscles')).toBeInTheDocument();
    expect(screen.getByText('Chest')).toBeInTheDocument();
    expect(screen.getByText('Shoulders')).toBeInTheDocument();
  });

  it('renders none for missing equipment', () => {
    const variant = { ...mockVariant, equipment: [] };
    render(<ExerciseInfo exercise={mockExercise} variant={variant} />);
    expect(screen.getByText('None')).toBeInTheDocument();
  });
});
