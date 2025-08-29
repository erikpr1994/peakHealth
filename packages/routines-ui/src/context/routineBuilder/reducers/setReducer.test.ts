import { describe, it, expect } from 'vitest';
import { addSet, removeSet, updateSet, reorderSets } from './setReducer';

describe('setReducer', () => {
  it('should export all required functions', () => {
    expect(typeof addSet).toBe('function');
    expect(typeof removeSet).toBe('function');
    expect(typeof updateSet).toBe('function');
    expect(typeof reorderSets).toBe('function');
  });
});
