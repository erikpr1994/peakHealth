import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import type { Exercise, ExerciseVariant } from '../../../types';
import { createExerciseId, createExerciseVariantId } from '../../../types/ids';
import { ExerciseSteps } from '../ExerciseSteps';

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
  steps: [
    { title: 'Step 1', description: 'Do it' },
    { title: 'Step 2', description: 'Do it again' },
  ],
};

describe('ExerciseSteps', () => {
  it('renders all steps', () => {
    render(<ExerciseSteps exercise={mockExercise} variant={mockVariant} />);
    expect(screen.getByText('Step-by-Step Instructions')).toBeInTheDocument();
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Do it')).toBeInTheDocument();
    expect(screen.getByText('Do it again')).toBeInTheDocument();
  });
});
