import { describe, test, expect } from 'vitest';

describe('Routines Index', () => {
  test('should export routine creation components', async () => {
    // Test that routine creation module can be imported and has exports
    const routineCreation = await import('./features/routine-creation');
    expect(routineCreation).toBeDefined();
    expect(typeof routineCreation).toBe('object');
  });

  test('should export routine detail components', async () => {
    // Test that routine detail module can be imported and has exports
    const routineDetail = await import('./features/routine-detail');
    expect(routineDetail).toBeDefined();
    expect(typeof routineDetail).toBe('object');
  });

  test('should export trail running components', async () => {
    // Test that trail running module can be imported and has exports
    const trailRunning = await import('./features/trail-running');
    expect(trailRunning).toBeDefined();
    expect(typeof trailRunning).toBe('object');
  });

  test('should export types', async () => {
    // Test that types module can be imported and has exports
    const types = await import('./types');
    expect(types).toBeDefined();
    expect(typeof types).toBe('object');
  });

  test('should have valid type exports', async () => {
    // Test that types index can be imported and has exports
    const typesIndex = await import('./types/index');
    expect(typesIndex).toBeDefined();
    expect(typeof typesIndex).toBe('object');
  });
});
