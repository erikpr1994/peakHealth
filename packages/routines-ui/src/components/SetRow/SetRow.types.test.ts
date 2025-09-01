import { describe, it, expect } from 'vitest';
import type { SetRowProps } from './SetRow.types';

function identity(props: SetRowProps): SetRowProps {
  return props;
}

describe('SetRow.types', () => {
  it('accepts a valid SetRowProps shape', () => {
    const sample = identity({
      workoutId: 'workout-1',
      sectionId: 'section-1',
      exerciseId: 'exercise-1',
      setId: 'set-1',
    });

    expect(sample.workoutId).toBe('workout-1');
    expect(sample.sectionId).toBe('section-1');
    expect(sample.exerciseId).toBe('exercise-1');
    expect(sample.setId).toBe('set-1');
  });
});
