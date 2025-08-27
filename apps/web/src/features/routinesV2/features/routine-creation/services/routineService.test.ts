import { routineService } from './routineService';

describe('routineService', () => {
  test('should have createRoutine method', () => {
    expect(typeof routineService.createRoutine).toBe('function');
  });

  test('should have updateRoutine method', () => {
    expect(typeof routineService.updateRoutine).toBe('function');
  });

  test('should have deleteRoutine method', () => {
    expect(typeof routineService.deleteRoutine).toBe('function');
  });

  test('should have getAllRoutines method', () => {
    expect(typeof routineService.getAllRoutines).toBe('function');
  });

  test('should have getRoutineById method', () => {
    expect(typeof routineService.getRoutineById).toBe('function');
  });
});
