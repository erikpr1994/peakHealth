# Common Section Data Models

These models represent section types that can be shared across different workout types, such as `strength` and `running`.

## Base Section

All section types extend this base interface:

```typescript
interface BaseSection {
  _id: ObjectId;
  name: string;
  type: SectionType;
  orderIndex: number;
  restAfter?: DurationString;
  notes?: string;
  exercises: Exercise[];
}
```

## Section Type Interfaces

### Warmup Section

```typescript
interface WarmupSection extends BaseSection {
  type: 'warmup';
  targetMuscleGroups: string[];
  duration: number; // minutes
  intensity: 'light' | 'moderate';
}
```

### Cooldown Section

```typescript
interface CooldownSection extends BaseSection {
  type: 'cooldown';
  duration: number; // minutes
  stretchingFocus?: string[];
}
```

## Type Definitions

```typescript
type ObjectId = string;
type DurationString = string;
// SectionType will be a union of types from all section files.
```
