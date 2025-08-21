import { describe, test, expect } from 'vitest';

describe('Routine Creation Index', () => {
  test('should export RoutineCreation component', async () => {
    const { RoutineCreation } = await import('./index');
    expect(RoutineCreation).toBeDefined();
    expect(typeof RoutineCreation).toBe('function');
  });
});
