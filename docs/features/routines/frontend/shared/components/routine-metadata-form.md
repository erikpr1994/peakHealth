# Shared Component: RoutineMetadataForm

**File Path**: `packages/ui/src/components/routine-builder/RoutineMetadataForm.tsx`

## 1. Summary

This is a shared form component used in the Routine Builder. It provides the input fields for editing the high-level metadata of a routine, such as its name, description, and difficulty level.

## 2. Props

This is a controlled component that gets its state and update functions from the `RoutineBuilderContext`.

```typescript
interface RoutineMetadataFormProps {
  // No direct props are needed as it consumes the context.
}
```

## 3. UI and Interaction

The form contains standard input fields:

- `Input` for `name`
- `Textarea` for `description`
- `Select` for `difficulty`
- `Select` for `goal`

## 4. State Management

- The component uses a selector hook, `useRoutineMetadata()`, which consumes the `RoutineBuilderContext`.
- This hook provides the current metadata values for the form fields and the pre-configured dispatch functions (e.g., `updateName`, `updateGoal`) to be called on `onChange` or `onBlur`.
