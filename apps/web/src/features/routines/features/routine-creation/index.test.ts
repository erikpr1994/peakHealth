import { describe, it, expect } from 'vitest';
import * as exports from './index';

describe('Routine Creation Exports', () => {
  it('should export RoutineCreation component', () => {
    expect(exports).toHaveProperty('RoutineCreation');
    expect(typeof exports.RoutineCreation).toBe('function');
  });

  it('should export RoutineDetailsForm component', () => {
    expect(exports).toHaveProperty('RoutineDetailsForm');
    expect(typeof exports.RoutineDetailsForm).toBe('function');
  });

  it('should export RoutineHeader component', () => {
    expect(exports).toHaveProperty('RoutineHeader');
    expect(typeof exports.RoutineHeader).toBe('function');
  });

  it('should export StrengthWorkoutsSection component', () => {
    expect(exports).toHaveProperty('StrengthWorkoutsSection');
    expect(typeof exports.StrengthWorkoutsSection).toBe('function');
  });

  it('should export RunningWorkoutsSection component', () => {
    expect(exports).toHaveProperty('RunningWorkoutsSection');
    expect(typeof exports.RunningWorkoutsSection).toBe('function');
  });
});
