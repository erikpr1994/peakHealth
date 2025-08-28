import { describe, test, expect } from 'vitest';
import type {
  IntervalType,
  TrailRunningInterval,
  TrailRunningWorkoutData,
  IntensityTarget,
  TrailRunningSection,
} from './trailRunning';

describe('Trail Running Types', () => {
  describe('IntervalType', () => {
    test('should accept all valid interval types', () => {
      const validTypes: IntervalType[] = [
        'run',
        'uphill',
        'downhill',
        'sprint',
        'recovery',
        'rest',
        'walk',
      ];

      validTypes.forEach(type => {
        expect(type).toBeDefined();
      });
    });
  });

  describe('TrailRunningInterval', () => {
    test('should have correct structure', () => {
      const interval: TrailRunningInterval = {
        id: 'interval-1',
        name: 'Hill Climb',
        type: 'uphill',
        distance: 0.5,
        duration: 3,
        intensityTarget: {
          type: 'heart-rate',
          minValue: 160,
          maxValue: 180,
          unit: 'bpm',
        },
        elevationChange: 50,
      };

      expect(interval.id).toBe('interval-1');
      expect(interval.name).toBe('Hill Climb');
      expect(interval.type).toBe('uphill');
      expect(interval.distance).toBe(0.5);
      expect(interval.duration).toBe(3);
      expect(interval.intensityTarget).toBeDefined();
      expect(interval.elevationChange).toBe(50);
    });

    test('should allow optional properties', () => {
      const minimalInterval: TrailRunningInterval = {
        id: 'interval-2',
        name: 'Easy Run',
        type: 'run',
      };

      expect(minimalInterval.id).toBe('interval-2');
      expect(minimalInterval.name).toBe('Easy Run');
      expect(minimalInterval.type).toBe('run');
      expect(minimalInterval.distance).toBeUndefined();
      expect(minimalInterval.duration).toBeUndefined();
      expect(minimalInterval.intensityTarget).toBeUndefined();
      expect(minimalInterval.elevationChange).toBeUndefined();
    });
  });

  describe('IntensityTarget', () => {
    test('should support heart-rate type', () => {
      const heartRateTarget: IntensityTarget = {
        type: 'heart-rate',
        minValue: 140,
        maxValue: 160,
        unit: 'bpm',
      };

      expect(heartRateTarget.type).toBe('heart-rate');
      expect(heartRateTarget.minValue).toBe(140);
      expect(heartRateTarget.maxValue).toBe(160);
      expect(heartRateTarget.unit).toBe('bpm');
    });

    test('should support speed type', () => {
      const speedTarget: IntensityTarget = {
        type: 'speed',
        minValue: '4:30',
        maxValue: '5:00',
        unit: 'min/km',
      };

      expect(speedTarget.type).toBe('speed');
      expect(speedTarget.minValue).toBe('4:30');
      expect(speedTarget.maxValue).toBe('5:00');
      expect(speedTarget.unit).toBe('min/km');
    });

    test('should support power type with zone', () => {
      const powerTarget: IntensityTarget = {
        type: 'power',
        zone: 'Z4',
        unit: 'zone',
      };

      expect(powerTarget.type).toBe('power');
      expect(powerTarget.zone).toBe('Z4');
      expect(powerTarget.unit).toBe('zone');
    });

    test('should support cadence type', () => {
      const cadenceTarget: IntensityTarget = {
        type: 'cadence',
        value: 180,
        unit: 'rpm',
      };

      expect(cadenceTarget.type).toBe('cadence');
      expect(cadenceTarget.value).toBe(180);
      expect(cadenceTarget.unit).toBe('rpm');
    });

    test('should support RPE type', () => {
      const rpeTarget: IntensityTarget = {
        type: 'rpe',
        value: 7,
        unit: 'scale',
      };

      expect(rpeTarget.type).toBe('rpe');
      expect(rpeTarget.value).toBe(7);
      expect(rpeTarget.unit).toBe('scale');
    });
  });

  describe('TrailRunningSection', () => {
    test('should have correct structure', () => {
      const section: TrailRunningSection = {
        id: 'section-1',
        name: 'Warm Up',
        type: 'warm-up',
        distance: 1.0,
        duration: 10,
        intensityTarget: {
          type: 'heart-rate',
          minValue: 120,
          maxValue: 140,
          unit: 'bpm',
        },
        elevationChange: 20,
      };

      expect(section.id).toBe('section-1');
      expect(section.name).toBe('Warm Up');
      expect(section.type).toBe('warm-up');
      expect(section.distance).toBe(1.0);
      expect(section.duration).toBe(10);
      expect(section.intensityTarget).toBeDefined();
      expect(section.elevationChange).toBe(20);
    });

    test('should support repeated sections', () => {
      const repeatedSection: TrailRunningSection = {
        id: 'section-2',
        name: 'Hill Repeats',
        type: 'uphill-repeat',
        isRepeated: true,
        repeatCount: 6,
        repeatSections: [
          {
            id: 'repeat-1',
            name: 'Uphill',
            type: 'uphill',
            distance: 0.2,
            elevationChange: 30,
          },
          {
            id: 'repeat-2',
            name: 'Recovery',
            type: 'recovery',
            distance: 0.2,
            elevationChange: -30,
          },
        ],
      };

      expect(repeatedSection.isRepeated).toBe(true);
      expect(repeatedSection.repeatCount).toBe(6);
      expect(repeatedSection.repeatSections).toHaveLength(2);
    });

    test('should accept all valid section types', () => {
      const validTypes: TrailRunningSection['type'][] = [
        'warm-up',
        'cool-down',
        'run',
        'walk',
        'uphill-repeat',
        'downhill-repeat',
        'recovery',
        'rest',
        'caco',
        'fartlek',
        'series',
        'w-series',
      ];

      validTypes.forEach(type => {
        const section: TrailRunningSection = {
          id: `section-${type}`,
          name: `Test ${type}`,
          type,
        };

        expect(section.type).toBe(type);
      });
    });
  });

  describe('TrailRunningWorkoutData', () => {
    test('should have correct structure', () => {
      const workoutData: TrailRunningWorkoutData = {
        id: 'workout-1',
        name: 'Mountain Trail Run',
        description: 'A challenging trail run with elevation changes',
        type: 'trail-running',
        difficulty: 'intermediate',
        estimatedDuration: 90,
        targetDistance: 12.5,
        elevationGain: 800,
        sections: [
          {
            id: 'section-1',
            name: 'Warm Up',
            type: 'warm-up',
            distance: 1.0,
            duration: 10,
          },
          {
            id: 'section-2',
            name: 'Main Run',
            type: 'run',
            distance: 10.0,
            duration: 60,
          },
          {
            id: 'section-3',
            name: 'Cool Down',
            type: 'cool-down',
            distance: 1.5,
            duration: 15,
          },
        ],
      };

      expect(workoutData.id).toBe('workout-1');
      expect(workoutData.name).toBe('Mountain Trail Run');
      expect(workoutData.description).toBe(
        'A challenging trail run with elevation changes'
      );
      expect(workoutData.type).toBe('trail-running');
      expect(workoutData.difficulty).toBe('intermediate');
      expect(workoutData.estimatedDuration).toBe(90);
      expect(workoutData.targetDistance).toBe(12.5);
      expect(workoutData.elevationGain).toBe(800);
      expect(workoutData.sections).toHaveLength(3);
    });

    test('should accept all difficulty levels', () => {
      const difficulties: TrailRunningWorkoutData['difficulty'][] = [
        'beginner',
        'intermediate',
        'advanced',
        'expert',
      ];

      difficulties.forEach(difficulty => {
        const workoutData: TrailRunningWorkoutData = {
          id: `workout-${difficulty}`,
          name: `Test ${difficulty} workout`,
          description: 'Test workout',
          type: 'trail-running',
          difficulty,
          estimatedDuration: 60,
          targetDistance: 5.0,
          elevationGain: 200,
          sections: [],
        };

        expect(workoutData.difficulty).toBe(difficulty);
      });
    });
  });
});
