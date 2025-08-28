import { DurationString, ObjectId } from './common';
import { Exercise, TabataExercise } from './exercise';

/**
 * Base Section Interface
 * All section types extend this interface
 */
export interface BaseSection {
  _id: ObjectId;
  name: string;
  type: SectionType;
  orderIndex: number;
  restAfter?: DurationString; // Rest time after this section. Not applicable if it's the last section in a workout.
  notes?: string;
  exercises: Exercise[];
}

/**
 * Common Section Types
 */

/**
 * Warmup Section
 * For preparing the body for the main workout
 */
export interface WarmupSection extends BaseSection {
  type: 'warmup';
  targetMuscleGroups: string[];
  duration: number; // minutes
  intensity: 'light' | 'moderate';
}

/**
 * Cooldown Section
 * For cooling down after the main workout
 */
export interface CooldownSection extends BaseSection {
  type: 'cooldown';
  duration: number; // minutes
  stretchingFocus?: string[];
}

/**
 * Strength-specific Section Types
 */

/**
 * Basic Section
 * Standard strength training section
 */
export interface BasicSection extends BaseSection {
  type: 'basic';
  // Basic sections have no additional properties beyond the base
}

/**
 * EMOM Section
 * Every Minute On the Minute
 */
export interface EmomSection extends BaseSection {
  type: 'emom';
  emomDuration: number; // minutes for EMOM sections
  rounds: number; // number of rounds to complete
  restBetweenRounds?: DurationString;
}

/**
 * Tabata Section
 * High-intensity interval training with specific timing
 */
export interface TabataSection extends BaseSection {
  type: 'tabata';
  workInterval: DurationString; // e.g., "20 seconds"
  restInterval: DurationString; // e.g., "10 seconds"
  rounds: number; // typically 8 rounds
  exercises: TabataExercise[]; // Defined in exercises.md
}

/**
 * Circuit Section
 * Multiple exercises performed in sequence with minimal rest
 */
export interface CircuitSection extends BaseSection {
  type: 'circuit';
  rounds: number;
  restBetweenRounds: DurationString;
  restBetweenExercises?: DurationString;
}

/**
 * Running-specific Section Types
 */

/**
 * Interval Section
 * For workouts alternating between high-intensity and recovery periods
 */
export interface IntervalSection extends BaseSection {
  type: 'intervals';
  rounds: number;
  workDistance?: number; // in meters
  workDuration?: DurationString;
  restDuration: DurationString;
  intensity: 'aerobic' | 'anaerobic' | 'vo2max';
}

/**
 * Tempo Section
 * For sustained efforts at a challenging pace
 */
export interface TempoSection extends BaseSection {
  type: 'tempo';
  distance?: number; // in miles/km
  duration: DurationString;
  targetPace: string; // e.g., "7:30/mile"
}

/**
 * Fartlek Section
 * Unstructured speed play
 */
export interface FartlekSection extends BaseSection {
  type: 'fartlek';
  duration: DurationString;
  description: string; // e.g., "Run hard on uphills, easy on downhills"
}

/**
 * Hill Repeats Section
 * Specific for trail running, but can be used in road running
 */
export interface HillRepeatsSection extends BaseSection {
  type: 'hill_repeats';
  repeats: number;
  hillLength?: number; // in meters
  restType: 'jog_down' | 'walk_down' | 'static';
}

/**
 * Union types for section categories
 */
export type StrengthWorkoutSection =
  | BasicSection
  | EmomSection
  | TabataSection
  | CircuitSection
  | WarmupSection
  | CooldownSection;
export type RunningWorkoutSection =
  | IntervalSection
  | TempoSection
  | FartlekSection
  | HillRepeatsSection
  | WarmupSection
  | CooldownSection;

/**
 * All section types
 */
export type SectionType =
  | 'basic'
  | 'emom'
  | 'tabata'
  | 'circuit'
  | 'intervals'
  | 'tempo'
  | 'fartlek'
  | 'hill_repeats'
  | 'warmup'
  | 'cooldown';
