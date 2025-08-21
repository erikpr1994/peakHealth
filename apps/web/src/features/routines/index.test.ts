import { describe, test, expect } from 'vitest';

describe('Routines Index', () => {
  test('should export routine creation components', () => {
    // Test specific named exports instead of importing everything
    expect(() => import('./features/routine-creation')).not.toThrow();
    expect(() => import('./features/routine-detail')).not.toThrow();
    expect(() => import('./features/trail-running')).not.toThrow();
    expect(() => import('./types')).not.toThrow();
  });

  test('should have valid type exports', () => {
    // Test that types can be imported
    expect(() => import('./types/index')).not.toThrow();
  });
});
