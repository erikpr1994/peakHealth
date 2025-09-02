import { describe, it, expect } from 'vitest';
import type { ProgressionMethod } from './common';

describe('Common Types', () => {
  it('should include inverse-pyramid in ProgressionMethod', () => {
    const progressionMethods: ProgressionMethod[] = [
      'amrap',
      'pyramid',
      'inverse-pyramid',
      'wave-loading',
      'cluster-sets',
    ];

    expect(progressionMethods).toContain('inverse-pyramid');
  });
});
