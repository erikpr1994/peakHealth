import {
  DurationString,
  ObjectId,
  ProgressionMethod,
  RepType,
  SetType,
  Tempo,
  UnilateralMode,
} from './common';

/**
 * Base Exercise Interface
 * All exercise types extend this interface
 */
export interface BaseExercise {
  _id: ObjectId;
  exerciseId: string; // Reference to Supabase exercise library
  exerciseVariantId: string; // Reference to specific exercise variant
  orderIndex: number;
  restBetweenSets?: DurationString; // Default rest time between sets. Can be overridden by a set's specific rest time.
  restAfter?: DurationString; // Rest time after completing all sets of this exercise. Not applicable for the last exercise in a section.
  notes?: string;
}

/**
 * Strength Exercise
 * For resistance training exercises
 */
export interface StrengthExercise extends BaseExercise {
  type: 'strength';
  progressionMethod?: ProgressionMethod;
  sets: StrengthSet[]; // This array holds ALL sets. The distinction between approach/working is made by the `type` property on the StrengthSet object itself.
  unilateralMode?: UnilateralMode; // Defines how a unilateral exercise is performed
  supersetGroupId?: string; // An optional ID. Exercises within the same section that share the same `supersetGroupId` are performed as a superset.
}

/**
 * Bodyweight Exercise
 * For exercises using body weight as resistance
 */
export interface BodyweightExercise extends BaseExercise {
  type: 'bodyweight';
  sets: BodyweightSet[];
  progressionMethod?: ProgressionMethod;
  unilateralMode?: UnilateralMode; // Defines how a unilateral exercise is performed
}

/**
 * Mobility Exercise
 * For flexibility and mobility work
 */
export interface MobilityExercise extends BaseExercise {
  type: 'mobility';
  sets: MobilitySet[];
  unilateralMode?: UnilateralMode; // Defines how a unilateral exercise is performed
}

/**
 * Tabata Exercise
 * For high-intensity interval training
 */
export interface TabataExercise
  extends Omit<BaseExercise, 'restTimer' | 'restAfter' | 'notes'> {
  type: 'tabata';
  unilateralMode?: UnilateralMode; // Defines how a unilateral exercise is performed
  // Tabata exercises don't have sets, rest timers, or individual notes.
  // Timing is controlled by the TabataSection.
}

/**
 * Base Set Interface
 * All set types extend this interface
 */
export interface BaseSet {
  _id: ObjectId;
  setNumber: number;
  setType: SetType;
  repType: RepType;
  notes?: string;
  restAfter?: DurationString; // Rest time after this set. Overrides the exercise's default rest time. Not applicable for the last set.
}

/**
 * Strength Set
 * For resistance training sets
 */
export interface StrengthSet extends BaseSet {
  reps?: number; // for fixed reps
  repsMin?: number; // for range reps
  repsMax?: number; // for range reps
  weight?: number; // in lbs/kg
  rpe?: number; // Rate of Perceived Exertion 1-10
  duration?: number; // for time-based exercises
  tempo?: Tempo;
  unilateralSide?: 'left' | 'right';
  // The ability for an exercise to be unilateral is defined in Supabase.
  // unilateralSide is only used when unilateralMode is 'sequential'.
}

/**
 * Bodyweight Set
 * For bodyweight exercise sets
 */
export interface BodyweightSet extends BaseSet {
  reps?: number;
  repsMin?: number;
  repsMax?: number;
  duration?: number; // for time-based bodyweight exercises
  rpe?: number;
  unilateralSide?: 'left' | 'right'; // Only used when unilateralMode is 'sequential'
}

/**
 * Mobility Set
 * For flexibility and mobility work sets
 */
export interface MobilitySet extends BaseSet {
  duration?: number; // seconds
  reps?: number;
  holdTime?: DurationString;
}

/**
 * Union types for exercises and sets
 */
export type Exercise =
  | StrengthExercise
  | BodyweightExercise
  | MobilityExercise
  | TabataExercise;
export type WorkoutSet = StrengthSet | BodyweightSet | MobilitySet;
