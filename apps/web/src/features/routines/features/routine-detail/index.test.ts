import * as exports from './index';

describe('RoutineDetail exports', () => {
  it('should export RoutineDetail component', () => {
    expect(exports).toHaveProperty('RoutineDetail');
  });

  it('should export all expected components', () => {
    expect(exports).toHaveProperty('RoutineDetailHeader');
    expect(exports).toHaveProperty('RoutineInfo');
    expect(exports).toHaveProperty('RoutineOverviewCards');
    expect(exports).toHaveProperty('RoutineProgress');
    expect(exports).toHaveProperty('WeeklySchedule');
  });
});
