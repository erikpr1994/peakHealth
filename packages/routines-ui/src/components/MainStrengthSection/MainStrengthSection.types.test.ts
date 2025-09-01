import { describe, it, expect } from 'vitest';
import type { MainStrengthSectionProps } from './MainStrengthSection.types';

describe('MainStrengthSection Types', () => {
  it('should export MainStrengthSectionProps interface', () => {
    const props: MainStrengthSectionProps = {
      workoutId: 'workout-1',
      sectionId: 'strength-1',
    };

    expect(props).toBeDefined();
    expect(props.workoutId).toBe('workout-1');
    expect(props.sectionId).toBe('strength-1');
  });
});
