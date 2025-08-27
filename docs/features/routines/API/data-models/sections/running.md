# Running Workout Section Data Models

These models represent section types specific to `RunningWorkout` and `TrailRunningWorkout` types. They can be combined with types from `common.md`.

## Section Types

```typescript
type RunningWorkoutSection = IntervalSection | TempoSection | FartlekSection | HillRepeatsSection | WarmupSection | CooldownSection;
```

## Section Type Interfaces

These interfaces extend the `BaseSection` defined in `common.md`.

### Interval Section

For workouts alternating between high-intensity and recovery periods.

```typescript
interface IntervalSection extends BaseSection {
  type: 'intervals';
  rounds: number;
  workDistance?: number; // in meters
  workDuration?: DurationString;
  restDuration: DurationString;
  intensity: 'aerobic' | 'anaerobic' | 'vo2max';
}
```

### Tempo Section

For sustained efforts at a challenging pace.

```typescript
interface TempoSection extends BaseSection {
  type: 'tempo';
  distance?: number; // in miles/km
  duration: DurationString;
  targetPace: string; // e.g., "7:30/mile"
}
```

### Fartlek Section

Unstructured speed play.

```typescript
interface FartlekSection extends BaseSection {
  type: 'fartlek';
  duration: DurationString;
  description: string; // e.g., "Run hard on uphills, easy on downhills"
}
```

### Hill Repeats Section

Specific for trail running, but can be used in road running.

```typescript
interface HillRepeatsSection extends BaseSection {
  type: 'hill_repeats';
  repeats: number;
  hillLength?: number; // in meters
  restType: 'jog_down' | 'walk_down' | 'static';
}
```

## Type Definitions

```typescript
type SectionType = 'intervals' | 'tempo' | 'fartlek' | 'hill_repeats' | 'warmup' | 'cooldown';
```
