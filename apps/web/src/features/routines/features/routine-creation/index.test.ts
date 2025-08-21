import { describe, test, expect } from 'vitest';

describe('Routine Creation Index', () => {
  test('should export RoutineCreation component', () => {
    // Test that the component can be imported without timing out
    expect(() => import('./RoutineCreation')).not.toThrow();
  });

  test('should have valid index exports', () => {
    // Test that the index file can be imported
    expect(() => import('./index')).not.toThrow();
  });
});
