import type { SectionType } from '@peakhealth/routines-types';

export interface SectionTypeOption {
  type: SectionType;
  label: string;
  description: string;
  category: 'strength' | 'cardio' | 'recovery';
}

export const SECTION_TYPE_OPTIONS: SectionTypeOption[] = [
  // Strength sections
  {
    type: 'basic',
    label: 'Basic Strength',
    description: 'Standard strength training with sets and reps',
    category: 'strength',
  },
  {
    type: 'emom',
    label: 'EMOM',
    description: 'Every Minute On the Minute training',
    category: 'strength',
  },
  {
    type: 'tabata',
    label: 'Tabata',
    description: 'High-intensity interval training (20s work, 10s rest)',
    category: 'strength',
  },
  {
    type: 'circuit',
    label: 'Circuit',
    description: 'Multiple exercises performed in sequence',
    category: 'strength',
  },

  // Cardio sections
  {
    type: 'intervals',
    label: 'Intervals',
    description: 'Alternating high-intensity and recovery periods',
    category: 'cardio',
  },
  {
    type: 'tempo',
    label: 'Tempo',
    description: 'Sustained effort at challenging pace',
    category: 'cardio',
  },
  {
    type: 'fartlek',
    label: 'Fartlek',
    description: 'Unstructured speed play training',
    category: 'cardio',
  },
  {
    type: 'hill_repeats',
    label: 'Hill Repeats',
    description: 'Repeated uphill efforts with recovery',
    category: 'cardio',
  },

  // Recovery sections
  {
    type: 'warmup',
    label: 'Warm-up',
    description: 'Prepare your body for the workout',
    category: 'recovery',
  },
  {
    type: 'cooldown',
    label: 'Cooldown',
    description: 'Cool down and stretch after the workout',
    category: 'recovery',
  },
];
