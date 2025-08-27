import { RoutineCreation } from './index';

describe('routinesV2 exports', () => {
  test('exports RoutineCreation component', () => {
    expect(RoutineCreation).toBeDefined();
    expect(typeof RoutineCreation).toBe('function');
  });
});
