import { describe, it, expect } from 'vitest';
import type { StrengthExerciseProps } from './StrengthExercise.types';

function identity(props: StrengthExerciseProps): StrengthExerciseProps {
  return props;
}

describe('StrengthExercise.types', () => {
  it('accepts a valid StrengthExerciseProps shape', () => {
    const sample = identity({
      workoutId: 'workout-1',
      sectionId: 'section-1',
      exerciseId: 'exercise-1',
    });

    expect(sample).toBeDefined();
    expect(sample.workoutId).toBe('workout-1');
    expect(sample.sectionId).toBe('section-1');
    expect(sample.exerciseId).toBe('exercise-1');
  });

  it('accepts optional props', () => {
    const sample = identity({
      workoutId: 'workout-1',
      sectionId: 'section-1',
      exerciseId: 'exercise-1',
      showApproachSetsToggle: false,
      showProgressionMethods: true,
    });

    expect(sample.showApproachSetsToggle).toBe(false);
    expect(sample.showProgressionMethods).toBe(true);
  });
});
