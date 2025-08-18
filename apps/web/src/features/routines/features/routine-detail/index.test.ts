import { vi } from 'vitest';
import * as exports from './index';

describe('RoutineDetail exports', () => {
  it('should export RoutineDetail component', () => {
    expect(exports).toHaveProperty('default');
  });

  it('should export all expected components', () => {
    expect(exports).toHaveProperty('RoutineDetailHeader');
    expect(exports).toHaveProperty('RoutineOverviewCards');
    expect(exports).toHaveProperty('RoutineProgress');
    expect(exports).toHaveProperty('RoutineObjectives');
    expect(exports).toHaveProperty('DetailedWorkoutsList');
    expect(exports).toHaveProperty('DetailedWorkoutView');
    expect(exports).toHaveProperty('WeeklySchedule');
  });
});
