import type { SectionType } from '@peakhealth/routines-types';

export interface SectionTypeOption {
  type: SectionType;
  label: string;
  description: string;
  category: 'common' | 'strength';
}

export const SECTION_TYPE_OPTIONS: SectionTypeOption[] = [
  // Common sections
  {
    type: 'warmup',
    label: 'Warmup',
    description:
      'Prepares the body for exercise by gradually increasing heart rate and blood flow to the muscles',
    category: 'common',
  },
  {
    type: 'cooldown',
    label: 'Cooldown',
    description:
      'Helps the body transition from exercise back to a resting state, often involving stretching',
    category: 'common',
  },

  // Strength sections
  {
    type: 'basic',
    label: 'Basic',
    description:
      'A standard section for strength training, consisting of a list of exercises performed for a specified number of sets and reps',
    category: 'strength',
  },
  {
    type: 'emom',
    label: 'EMOM',
    description:
      'Every Minute on the Minute - perform a specific exercise at the start of every minute for a set amount of time',
    category: 'strength',
  },
  {
    type: 'tabata',
    label: 'Tabata',
    description:
      'High-intensity interval training with 20 seconds of ultra-intense exercise followed by 10 seconds of rest',
    category: 'strength',
  },
  {
    type: 'circuit',
    label: 'Circuit',
    description:
      'A series of exercises performed in sequence with minimal rest in between',
    category: 'strength',
  },
];
