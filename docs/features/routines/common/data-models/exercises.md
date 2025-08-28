# Exercise Data Models

These models represent exercises within workout sections, referencing the Supabase exercise library.

## Exercise Types

The `Exercise` uses a union type to support different exercise types:

```typescript
type Exercise =
  | StrengthExercise
  | BodyweightExercise
  | MobilityExercise
  | TabataExercise;
```

## Base Exercise

All exercise types extend this base interface:

```typescript
interface BaseExercise {
  _id: ObjectId;
  exerciseId: string; // Reference to Supabase exercise library
  exerciseVariantId: string; // Reference to specific exercise variant
  orderIndex: number;
  restBetweenSets?: DurationString; // Default rest time between sets. Can be overridden by a set's specific rest time.
  restAfter?: DurationString; // Rest time after completing all sets of this exercise. Not applicable for the last exercise in a section.
  notes?: string;
}
```

**Note on Exercise and Variant IDs:**

- `exerciseId`: This links to the core exercise in the Supabase library (e.g., "Squat"), acting as a grouping mechanism.
- `exerciseVariantId`: This is a **required** field that links to the specific variation of the exercise being performed (e.g., "Barbell High-Bar Squat"). A user always interacts with a variant.

## Exercise Type Interfaces

### Strength Exercise

```typescript
interface StrengthExercise extends BaseExercise {
  type: 'strength';
  progressionMethod?: ProgressionMethod;
  sets: StrengthSet[]; // This array holds ALL sets. The distinction between approach/working is made by the `type` property on the StrengthSet object itself.
  unilateralMode?: UnilateralMode; // Defines how a unilateral exercise is performed
  supersetGroupId?: string; // An optional ID. Exercises within the same section that share the same `supersetGroupId` are performed as a superset.
}
```

### Bodyweight Exercise

```typescript
interface BodyweightExercise extends BaseExercise {
  type: 'bodyweight';
  sets: BodyweightSet[];
  progressionMethod?: ProgressionMethod;
  unilateralMode?: UnilateralMode; // Defines how a unilateral exercise is performed
}
```

### Mobility Exercise

```typescript
interface MobilityExercise extends BaseExercise {
  type: 'mobility';
  sets: MobilitySet[];
  unilateralMode?: UnilateralMode; // Defines how a unilateral exercise is performed
}
```

### Tabata Exercise

```typescript
interface TabataExercise
  extends Omit<BaseExercise, 'restTimer' | 'restAfter' | 'notes'> {
  type: 'tabata';
  unilateralMode?: UnilateralMode; // Defines how a unilateral exercise is performed
  // Tabata exercises don't have sets, rest timers, or individual notes.
  // Timing is controlled by the TabataSection.
}
```

## Set Models

The `WorkoutSet` uses a union type for different set types:

```typescript
type WorkoutSet = StrengthSet | BodyweightSet | MobilitySet;
```

### Base Set

All set types extend this base interface:

```typescript
interface BaseSet {
  _id: ObjectId;
  setNumber: number;
  setType: SetType;
  repType: RepType;
  notes?: string;
  restAfter?: DurationString; // Rest time after this set. Overrides the exercise's default rest time. Not applicable for the last set.
}
```

### Strength Set

```typescript
interface StrengthSet extends BaseSet {
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
```

### Bodyweight Set

```typescript
interface BodyweightSet extends BaseSet {
  reps?: number;
  repsMin?: number;
  repsMax?: number;
  duration?: number; // for time-based bodyweight exercises
  rpe?: number;
  unilateralSide?: 'left' | 'right'; // Only used when unilateralMode is 'sequential'
}
```

### Mobility Set

```typescript
interface MobilitySet extends BaseSet {
  duration?: number; // seconds
  reps?: number;
  holdTime?: DurationString;
}
```

## Type Definitions

```typescript
type ObjectId = string;
type DurationString = string;
type ProgressionMethod =
  | 'linear'
  | 'percentage'
  | 'rpe'
  | 'time-under-tension'
  | 'dual-linear'
  | 'widowmaker'
  | 'myo-reps'
  | 'amrap'
  | 'pyramid'
  | 'wave-loading'
  | 'cluster-sets'
  | 'rest-pause';
type SetType = 'working' | 'warmup' | 'drop' | 'failure';
type RepType = 'fixed' | 'range' | 'time' | 'max';
type UnilateralMode = 'alternating' | 'sequential' | 'simultaneous';

interface Tempo {
  eccentric: number; // seconds to go down
  eccentric_pause: number; // seconds to pause at the bottom
  concentric: number; // seconds to go up
  concentric_pause: number; // seconds to pause at the top
}
```

## Key Design Principles

1.  **Exercise Library Reference**: Exercises reference the Supabase exercise library via `exerciseId` and `exerciseVariantId`.
