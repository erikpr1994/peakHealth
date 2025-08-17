import { describe, test, expect } from 'vitest';

describe('Types Index', () => {
  test('should export modal types', async () => {
    const exports = await import('./index');
    expect(exports).toBeDefined();
    expect(typeof exports).toBe('object');
  });
});
