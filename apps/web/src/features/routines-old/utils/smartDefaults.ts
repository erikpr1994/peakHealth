import { TrailRunningInterval, IntervalType } from '../types';

export const getSmartDefaults = (
  type: string
): {
  repeatCount: number;
  intervals: Array<{
    name: string;
    type: string;
    distance?: number;
    duration?: number;
    intensityTarget?: {
      type: string;
      value?: number;
      unit?: string;
    };
    elevationChange?: number;
  }>;
} | null => {
  const defaults = {
    'uphill-repeat': {
      repeatCount: 6,
      intervals: [
        {
          name: 'Hill Climb',
          type: 'uphill',
          distance: 0.2,
          intensityTarget: { type: 'power', value: 4, unit: 'zone' },
          elevationChange: 30,
        },
        {
          name: 'Recovery Jog',
          type: 'recovery',
          distance: 0.2,
          intensityTarget: { type: 'heart-rate', value: 1, unit: 'zone' },
          elevationChange: -30,
        },
      ],
    },
    'downhill-repeat': {
      repeatCount: 6,
      intervals: [
        {
          name: 'Downhill Run',
          type: 'downhill',
          distance: 0.3,
          intensityTarget: { type: 'heart-rate', value: 3, unit: 'zone' },
          elevationChange: -40,
        },
        {
          name: 'Easy Recovery',
          type: 'recovery',
          distance: 0.2,
          intensityTarget: { type: 'heart-rate', value: 1, unit: 'zone' },
          elevationChange: 20,
        },
      ],
    },
    'w-series': {
      repeatCount: 6,
      intervals: [
        {
          name: 'Uphill Segment',
          type: 'uphill',
          distance: 0.4,
          intensityTarget: { type: 'power', value: 4, unit: 'zone' },
          elevationChange: 40,
        },
        {
          name: 'Downhill Segment',
          type: 'downhill',
          distance: 0.4,
          intensityTarget: { type: 'power', value: 4, unit: 'zone' },
          elevationChange: -40,
        },
      ],
    },
    caco: {
      repeatCount: 8,
      intervals: [
        {
          name: 'Run Segment',
          type: 'run',
          distance: 0.4,
          duration: 2,
          intensityTarget: { type: 'heart-rate', value: 2, unit: 'zone' },
        },
        {
          name: 'Walk Break',
          type: 'walk',
          distance: 0.4,
          duration: 2,
          intensityTarget: { type: 'heart-rate', value: 1, unit: 'zone' },
        },
      ],
    },
    fartlek: {
      repeatCount: 5,
      intervals: [
        {
          name: 'Fast Surge',
          type: 'sprint',
          distance: 0.3,
          intensityTarget: { type: 'heart-rate', value: 4, unit: 'zone' },
        },
        {
          name: 'Easy Recovery',
          type: 'recovery',
          distance: 0.5,
          intensityTarget: { type: 'heart-rate', value: 1, unit: 'zone' },
        },
      ],
    },
    series: {
      repeatCount: 4,
      intervals: [
        {
          name: 'Work Interval',
          type: 'run',
          distance: 0.5,
          intensityTarget: { type: 'heart-rate', value: 4, unit: 'zone' },
        },
        {
          name: 'Rest Interval',
          type: 'rest',
          duration: 2,
        },
      ],
    },
  };
  return defaults[type as keyof typeof defaults] || null;
};

export const processRepeatSections = (
  sections: Partial<TrailRunningInterval>[],
  skipLast: boolean
): TrailRunningInterval[] => {
  if (skipLast && sections.length > 0) {
    const lastSection = sections[sections.length - 1];
    if (lastSection.type === 'rest' || lastSection.type === 'recovery') {
      return sections.slice(0, -1).map((section, index) => ({
        ...section,
        id: `${Date.now()}-${index}`,
        type: (section.type as IntervalType) || 'run',
      })) as TrailRunningInterval[];
    }
  }
  return sections.map((section, index) => ({
    ...section,
    id: `${Date.now()}-${index}`,
    type: (section.type as IntervalType) || 'run',
  })) as TrailRunningInterval[];
};
