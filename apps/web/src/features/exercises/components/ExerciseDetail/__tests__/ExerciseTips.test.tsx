import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import type { Exercise, ExerciseVariant } from '../../../types';
import { ExerciseTips } from '../ExerciseTips';

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
};
const mockVariant: ExerciseVariant = {
  id: 'v1',
  name: 'Standard Push-up',
  description: 'Standard form',
  focus: 'chest',
  difficulty: 'Beginner',
  equipment: ['Bodyweight'],
  muscleGroups: ['Chest', 'Shoulders'],
  instructions: ['Do it'],
  steps: [{ title: 'Step 1', description: 'Do it' }],
  tips: {
    proTips: ['Keep your core tight', 'Breathe properly'],
    commonMistakes: ['Letting hips sag', 'Flaring elbows'],
  },
};

describe('ExerciseTips', () => {
  it('renders pro tips and common mistakes', () => {
    render(<ExerciseTips exercise={mockExercise} variant={mockVariant} />);
    expect(screen.getByText('Pro Tips')).toBeInTheDocument();
    expect(screen.getByText('Common Mistakes')).toBeInTheDocument();
    expect(screen.getByText('Keep your core tight')).toBeInTheDocument();
    expect(screen.getByText('Breathe properly')).toBeInTheDocument();
    expect(screen.getByText('Letting hips sag')).toBeInTheDocument();
    expect(screen.getByText('Flaring elbows')).toBeInTheDocument();
  });

  it('renders nothing if no tips', () => {
    const variant = { ...mockVariant, tips: undefined };
    const { container } = render(
      <ExerciseTips exercise={mockExercise} variant={variant} />
    );
    expect(container).toBeEmptyDOMElement();
  });
});
