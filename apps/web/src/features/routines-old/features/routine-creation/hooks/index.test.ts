import { describe, test, expect } from 'vitest';

describe('Hooks Index', () => {
  test('should export useRoutineModals', async () => {
    const { useRoutineModals } = await import('./index');
    expect(useRoutineModals).toBeDefined();
    expect(typeof useRoutineModals).toBe('function');
  });
});
