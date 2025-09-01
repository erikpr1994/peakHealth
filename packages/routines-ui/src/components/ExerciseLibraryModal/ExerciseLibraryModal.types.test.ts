import { describe, it, expect } from 'vitest';
import type {
  ExerciseLibraryExercise,
  ExerciseLibraryModalProps,
} from './ExerciseLibraryModal.types';

describe('ExerciseLibraryModal Types', () => {
  it('should export ExerciseLibraryExercise interface', () => {
    const exercise: ExerciseLibraryExercise = {
      id: '1',
      name: 'Test Exercise',
      description: 'Test description',
      category: 'Strength',
      muscleGroups: ['Chest'],
      equipment: ['Bodyweight'],
      difficulty: 'Beginner',
      icon: '🏋️',
      iconColor: 'bg-blue-100 text-blue-600',
    };

    expect(exercise).toBeDefined();
    expect(exercise.id).toBe('1');
    expect(exercise.category).toBe('Strength');
  });

  it('should export ExerciseLibraryModalProps interface', () => {
    const props: ExerciseLibraryModalProps = {
      isOpen: true,
      onClose: () => {},
      onSelect: () => {},
      initialFilter: {
        category: 'Strength',
        difficulty: 'Beginner',
      },
    };

    expect(props).toBeDefined();
    expect(props.isOpen).toBe(true);
    expect(props.initialFilter?.category).toBe('Strength');
  });
});
