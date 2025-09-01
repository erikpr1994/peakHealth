import { describe, it, expect } from 'vitest';
import type { SetsTableProps } from './SetsTable.types';

function identity(props: SetsTableProps): SetsTableProps {
  return props;
}

describe('SetsTable.types', () => {
  it('accepts a valid SetsTableProps shape', () => {
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
});
