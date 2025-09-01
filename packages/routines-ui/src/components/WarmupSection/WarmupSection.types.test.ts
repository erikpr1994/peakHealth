import { describe, it, expect } from 'vitest';
import type { WarmupSectionProps } from './WarmupSection.types';

describe('WarmupSection Types', () => {
  it('should export WarmupSectionProps interface', () => {
    const props: WarmupSectionProps = {
      workoutId: 'workout-1',
      sectionId: 'warmup-1',
    };

    expect(props).toBeDefined();
    expect(props.workoutId).toBe('workout-1');
    expect(props.sectionId).toBe('warmup-1');
  });
});
