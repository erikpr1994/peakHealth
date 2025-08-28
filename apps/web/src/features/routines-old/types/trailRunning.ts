// Trail Running type definitions
// Extracted from types/workout.ts to improve organization and maintainability

export type IntervalType =
  | 'run'
  | 'uphill'
  | 'downhill'
  | 'sprint'
  | 'recovery'
  | 'rest'
  | 'walk';

export interface TrailRunningInterval {
  id: string;
  name: string;
  type: IntervalType;
  distance?: number;
  duration?: number;
  intensityTarget?: IntensityTarget;
  elevationChange?: number;
}

export interface TrailRunningWorkoutData {
  id: string;
  name: string;
  description: string;
  type: 'trail-running';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  estimatedDuration: number; // calculated from sections
  targetDistance: number; // calculated from sections
  elevationGain: number; // calculated from sections
  sections: TrailRunningSection[];
}

export interface IntensityTarget {
  type: 'heart-rate' | 'speed' | 'power' | 'cadence' | 'rpe';
  value?: number; // For fixed values (cadence)
  minValue?: number | string; // For ranges (heart rate, power zones) or pace strings (speed)
  maxValue?: number | string; // For ranges (heart rate, power zones) or pace strings (speed)
  zone?: string; // For power zones (Z1, Z2, etc.)
  unit?: string; // Display unit (bpm, min/km, rpm, etc.)
}

export interface TrailRunningSection {
  id: string;
  name: string;
  type:
    | 'warm-up'
    | 'cool-down'
    | 'run'
    | 'walk'
    | 'uphill-repeat'
    | 'downhill-repeat'
    | 'recovery'
    | 'rest'
    | 'caco'
    | 'fartlek'
    | 'series'
    | 'w-series';
  distance?: number; // in km
  duration?: number; // in minutes
  intensityTarget?: IntensityTarget; // Flexible intensity target configuration
  elevationChange?: number; // in meters (positive for uphill)
  isRepeated?: boolean;
  repeatCount?: number;
  repeatSections?: TrailRunningInterval[];
}
