# Strength Workout Section Data Models

These models represent section types that are specific to `StrengthWorkout` types. They can be combined with types from `common.md`.

## Section Types

```typescript
type StrengthWorkoutSection = BasicSection | EmomSection | TabataSection | CircuitSection | WarmupSection | CooldownSection;
```

## Section Type Interfaces

These interfaces extend the `BaseSection` defined in `common.md`.

### Basic Section

```typescript
interface BasicSection extends BaseSection {
  type: 'basic';
  // Basic sections have no additional properties beyond the base
}
```

### EMOM Section

```typescript
interface EmomSection extends BaseSection {
  type: 'emom';
  emomDuration: number; // minutes for EMOM sections
  rounds: number; // number of rounds to complete
  restBetweenRounds?: DurationString;
}
```

### Tabata Section

```typescript
interface TabataSection extends BaseSection {
  type: 'tabata';
  workInterval: DurationString; // e.g., "20 seconds"
  restInterval: DurationString; // e.g., "10 seconds"
  rounds: number; // typically 8 rounds
  exercises: TabataExercise[]; // Defined in exercises.md
}
```

### Circuit Section

```typescript
interface CircuitSection extends BaseSection {
  type: 'circuit';
  rounds: number;
  restBetweenRounds: DurationString;
  restBetweenExercises?: DurationString;
}
```

## Type Definitions

```typescript
type SectionType = 'basic' | 'emom' | 'tabata' | 'circuit' | 'warmup' | 'cooldown';
```
