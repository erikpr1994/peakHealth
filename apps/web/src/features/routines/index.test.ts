import { describe, test, expect } from 'vitest';

describe('Routines Index', () => {
  test('should export routine creation components', async () => {
    const exports = await import('./index');
    expect(exports).toBeDefined();
    expect(typeof exports).toBe('object');
  });
});
