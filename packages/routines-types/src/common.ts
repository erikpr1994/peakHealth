/**
 * Common type definitions used across the routines feature
 */

export type ObjectId = string;
export type ISODateString = string;
export type DurationString = string;

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export type Goal =
  | 'strength'
  | 'hypertrophy'
  | 'endurance'
  | 'power'
  | 'weight_loss'
  | 'general_fitness'
  | 'mobility'
  | 'sport_specific';

export type ProgressionMethod =
  | 'linear'
  | 'percentage'
  | 'rpe'
  | 'time-under-tension'
  | 'dual-linear'
  | 'widowmaker'
  | 'myo-reps'
  | 'amrap'
  | 'pyramid'
  | 'inverse-pyramid'
  | 'wave-loading'
  | 'cluster-sets'
  | 'rest-pause';

export type SetType = 'working' | 'warmup' | 'drop' | 'failure';
export type RepType = 'fixed' | 'range' | 'time' | 'max';
export type UnilateralMode = 'alternating' | 'sequential' | 'simultaneous';

export interface Tempo {
  eccentric: number; // seconds to go down
  eccentric_pause: number; // seconds to pause at the bottom
  concentric: number; // seconds to go up
  concentric_pause: number; // seconds to pause at the top
}
