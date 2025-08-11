import {
  IntensityTarget,
  TrailRunningSection,
  TrailRunningInterval,
} from '../types';

export const formatIntensityTargetDisplay = (
  target?: IntensityTarget
): string => {
  if (!target) return 'Not set';

  const _getZoneDisplayDescription = (zoneValue: number): string => {
    const zones = {
      1: 'Active Recovery',
      2: 'Endurance',
      3: 'Tempo',
      4: 'Threshold',
      5: 'VO2 Max',
      6: 'Anaerobic',
      7: 'Neuromuscular',
    };
    return zones[zoneValue as keyof typeof zones] || `Zone ${zoneValue}`;
  };

  switch (target.type) {
    case 'heart-rate':
      if (target.minValue && target.maxValue) {
        return `${target.minValue}-${target.maxValue} bpm`;
      }
      return target.value ? `${target.value} bpm` : 'Not set';
    case 'speed':
      if (target.minValue && target.maxValue) {
        return `${target.minValue}-${target.maxValue} min/km`;
      }
      return target.value ? `${target.value} min/km` : 'Not set';
    case 'power':
      if (target.zone) {
        return `Zone ${target.zone}`;
      }
      if (target.minValue && target.maxValue) {
        return `${target.minValue}-${target.maxValue}W`;
      }
      return target.value ? `${target.value}W` : 'Not set';
    case 'cadence':
      return target.value ? `${target.value} rpm` : 'Not set';
    case 'rpe':
      return target.value ? `RPE ${target.value}/10` : 'Not set';
    default:
      return 'Not set';
  }
};

export const getIntensityTargetColor = (target?: IntensityTarget): string => {
  if (!target) return 'bg-gray-100 text-gray-600';

  switch (target.type) {
    case 'heart-rate':
      return 'bg-red-100 text-red-700';
    case 'speed':
      return 'bg-blue-100 text-blue-700';
    case 'power':
      return 'bg-purple-100 text-purple-700';
    case 'cadence':
      return 'bg-green-100 text-green-700';
    case 'rpe':
      return 'bg-orange-100 text-orange-700';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

export const getDefaultIntensityTarget = (type: string): IntensityTarget => {
  switch (type) {
    case 'warm-up':
      return { type: 'heart-rate', minValue: 120, maxValue: 140, unit: 'bpm' };
    case 'cool-down':
      return { type: 'heart-rate', minValue: 100, maxValue: 120, unit: 'bpm' };
    case 'run':
      return { type: 'heart-rate', minValue: 140, maxValue: 160, unit: 'bpm' };
    case 'uphill':
      return { type: 'heart-rate', minValue: 160, maxValue: 180, unit: 'bpm' };
    case 'downhill':
      return { type: 'heart-rate', minValue: 120, maxValue: 140, unit: 'bpm' };
    case 'sprint':
      return { type: 'heart-rate', minValue: 180, maxValue: 200, unit: 'bpm' };
    case 'recovery':
      return { type: 'heart-rate', minValue: 100, maxValue: 120, unit: 'bpm' };
    case 'walk':
      return { type: 'heart-rate', minValue: 80, maxValue: 100, unit: 'bpm' };
    case 'uphill-repeat':
      return { type: 'heart-rate', minValue: 160, maxValue: 180, unit: 'bpm' };
    case 'downhill-repeat':
      return { type: 'heart-rate', minValue: 120, maxValue: 140, unit: 'bpm' };
    case 'caco':
      return { type: 'heart-rate', minValue: 140, maxValue: 160, unit: 'bpm' };
    case 'fartlek':
      return { type: 'heart-rate', minValue: 150, maxValue: 170, unit: 'bpm' };
    case 'series':
      return { type: 'heart-rate', minValue: 160, maxValue: 180, unit: 'bpm' };
    case 'w-series':
      return { type: 'heart-rate', minValue: 170, maxValue: 190, unit: 'bpm' };
    default:
      return { type: 'heart-rate', minValue: 140, maxValue: 160, unit: 'bpm' };
  }
};

export const calculateTotals = (
  sections: TrailRunningSection[]
): {
  distance: number;
  duration: number;
  elevation: number;
} => {
  let totalDistance = 0;
  let totalDuration = 0;
  let totalElevation = 0;

  const processSection = (
    section: TrailRunningSection | TrailRunningInterval,
    multiplier: number = 1
  ): void => {
    if (section.distance) {
      totalDistance += section.distance * multiplier;
    }
    if (section.duration) {
      totalDuration += section.duration * multiplier;
    }
    if (section.elevationChange) {
      totalElevation += section.elevationChange * multiplier;
    }
  };

  sections.forEach(section => {
    if (section.isRepeated && section.repeatSections) {
      const repeatCount = section.repeatCount || 1;
      section.repeatSections.forEach(interval => {
        processSection(interval, repeatCount);
      });
    } else {
      processSection(section);
    }
  });

  return {
    distance: Math.round(totalDistance * 100) / 100,
    duration: totalDuration,
    elevation: totalElevation,
  };
};

export const isRestOrRecovery = (
  section: Partial<TrailRunningSection | TrailRunningInterval>
): boolean => {
  return section.type === 'rest' || section.type === 'recovery';
};

export const getDefaultName = (type: string): string => {
  const names = {
    'warm-up': 'Warm Up',
    'cool-down': 'Cool Down',
    run: 'Easy Run',
    walk: 'Walk Break',
    'uphill-repeat': 'Uphill Repeats',
    'downhill-repeat': 'Downhill Repeats',
    recovery: 'Recovery',
    rest: 'Rest Break',
    caco: 'CACO Run/Walk',
    fartlek: 'Fartlek Play',
    series: 'Section Series',
  };
  return names[type as keyof typeof names] || 'Training Section';
};
