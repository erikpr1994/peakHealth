import { describe, it, expect } from 'vitest';
import * as exports from './index';

describe('Routines Exports', () => {
  it('should export routine creation components', () => {
    expect(exports).toHaveProperty('RoutineCreation');
    expect(typeof exports.RoutineCreation).toBe('function');
  });

  it('should export routine details form', () => {
    expect(exports).toHaveProperty('RoutineDetailsForm');
    expect(typeof exports.RoutineDetailsForm).toBe('function');
  });

  it('should export routine header', () => {
    expect(exports).toHaveProperty('RoutineHeader');
    expect(typeof exports.RoutineHeader).toBe('function');
  });

  it('should export strength workouts section', () => {
    expect(exports).toHaveProperty('StrengthWorkoutsSection');
    expect(typeof exports.StrengthWorkoutsSection).toBe('function');
  });

  it('should export running workouts section', () => {
    expect(exports).toHaveProperty('RunningWorkoutsSection');
    expect(typeof exports.RunningWorkoutsSection).toBe('function');
  });
});
