import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import type { Exercise, ExerciseVariant } from '../../../types';
import { ExerciseVideo } from '../ExerciseVideo';

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
  media: {
    featuredVideo: 'https://example.com/video.mp4',
    videos: ['https://example.com/video.mp4'],
  },
};

describe('ExerciseVideo', () => {
  it('renders video when URL is provided', () => {
    render(<ExerciseVideo exercise={mockExercise} variant={mockVariant} />);
    expect(screen.getByText('Demonstration Video')).toBeInTheDocument();
    expect(screen.getByText('Video available')).toBeInTheDocument();
    expect(screen.getByText('Full Screen')).toBeInTheDocument();
  });

  it('renders placeholder when no video URL', () => {
    const variant = { ...mockVariant, media: undefined };
    render(<ExerciseVideo exercise={mockExercise} variant={variant} />);
    expect(screen.getByText('Demonstration Video')).toBeInTheDocument();
    expect(screen.getByText('No video available')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Video demonstration not available for this exercise variant.'
      )
    ).toBeInTheDocument();
  });
});
