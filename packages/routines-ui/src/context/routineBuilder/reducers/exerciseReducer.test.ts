import { describe, it, expect } from 'vitest';
import {
  addExercise,
  removeExercise,
  updateExercise,
  reorderExercises,
} from './exerciseReducer';

describe('exerciseReducer', () => {
  it('should export all required functions', () => {
    expect(typeof addExercise).toBe('function');
    expect(typeof removeExercise).toBe('function');
    expect(typeof updateExercise).toBe('function');
    expect(typeof reorderExercises).toBe('function');
  });
});
