# Accordion (Shared Compound Component)

**File Path**: `packages/ui/src/components/common/Accordion.tsx`

## 1. Summary

The `Accordion` is a highly reusable, shared compound component designed for building expandable and collapsible content sections. It follows the compound component pattern to provide a flexible and declarative API for constructing complex nested UIs, such as those found in the `WorkoutBuilder`.

## 2. API and Usage

The component is composed of a main `Accordion` wrapper and `Header` and `Body` sub-components.

```typescript
// Main Accordion Wrapper Props
interface AccordionProps {
  children: React.ReactNode;
  title: string; // Used for accessibility and can be used by the header
  defaultOpen?: boolean; // Controls if the accordion is open by default
  className?: string;
}

// Sub-components do not take props directly, they act as wrappers.
Accordion.Header = ({ children }) => { ... };
Accordion.Body = ({ children }) => { ... };
```

### Example: Nested Accordion Structure

This example demonstrates how the `WarmupSection` would use the `Accordion` component to create its nested structure, exactly as you outlined.

```jsx
const WarmupSection = () => {
  const { exercises, addExercise } = useWorkoutForm();

  return (
    <Accordion title="Warm-up Section" defaultOpen>
      <Accordion.Header>
        {/* Component for section title, description, drag handles, etc. */}
        <SectionHeader title="Warm-up" />
      </Accordion.Header>
      <Accordion.Body>
        {exercises.length === 0 ? (
          <Button onClick={addExercise}>Add First Exercise</Button>
        ) : (
          exercises.map(exercise => (
            <Accordion key={exercise.id} title={exercise.name} defaultOpen>
              <Accordion.Header>
                {/* Component for exercise name, drag handles, delete button, etc. */}
                <ExerciseHeader exercise={exercise} />
              </Accordion.Header>
              <Accordion.Body>
                <SetsTable exercise={exercise} />
              </Accordion.Body>
            </Accordion>
          ))
        )}
      </Accordion.Body>
    </Accordion>
  );
};
```

## 3. Implementation Notes

-   The parent `Accordion` component will manage the open/closed state internally.
-   The `Accordion.Header` will act as the click handler to toggle the visibility of the `Accordion.Body`.
-   This pattern allows for maximum flexibility, as any custom components (`SectionHeader`, `ExerciseHeader`, etc.) can be rendered within the `Header` and `Body` slots.
