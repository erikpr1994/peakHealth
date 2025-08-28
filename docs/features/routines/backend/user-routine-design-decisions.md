# User-Created Routines: Design Decisions

This document clarifies the design principles for `UserCreatedRoutine` documents, specifically addressing versioning and sharing to distinguish them from `TemplateRoutine`s.

---

## 1. Versioning

### Decision: User-created routines are NOT versioned.

User-created routines are single, mutable documents. When a user edits their routine, the document is updated directly.

### Rationale:

- **Simplicity & User Experience**: For a user managing their own plan, direct editing is a much more intuitive and simpler experience than managing a formal version history.
- **Preservation of History**: Data integrity for past workouts is maintained. When a workout is performed, an immutable `workoutSnapshot` is stored in the `workout_sessions` collection. This means that future changes to a routine will **not** alter the historical record of what was actually performed.
- **Clear Distinction**: Versioning is a critical feature for the **reusable library components** (`TemplateRoutine`, `workouts`, `sections`) to allow creators to update templates without affecting users who have already started them. This level of complexity is unnecessary for personal routines in the MVP.

---

## 2. Sharing

### Decision: User-created routines are PRIVATE.

In the current architecture, `UserCreatedRoutine`s cannot be shared directly with other users.

### Rationale:

- **MVP Scope**: The primary sharing model is top-down: trainers or the platform create `TemplateRoutine`s which are then assigned to users. This covers the core business requirement.
- **Feature Complexity**: Peer-to-peer sharing is a significant social feature that introduces complexities in permissions, discovery, moderation, and UI.
- **Future Scope**: This functionality is a prime candidate for a dedicated "Community Features" or "Social Sharing" epic. The current schema does not preclude adding sharing capabilities in the future.
