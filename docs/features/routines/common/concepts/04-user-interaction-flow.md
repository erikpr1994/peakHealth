# 4. User Interaction Flow

This document outlines how a user interacts with the core concepts of the Routines feature.

## 4.1 Routine Assignment
A user is linked to a specific version of a `TemplateRoutine`. This assignment tracks their overall progress through the program. This ensures that the user's prescribed plan remains consistent, even if the trainer updates the template later.

## 4.2 Workout Session
This represents a single, scheduled workout from a user's assigned routine. It contains an immutable **snapshot** of the planned workout. This is critical for historical accuracy, as it preserves the exact workout the user was supposed to do, regardless of any future changes to the routine template.

## 4.3 Workout Log
This is a detailed record of the user's actual performance for a workout session. It captures the reps, weight, time, etc., for each set they performed. The workout log allows for a direct comparison between the planned workout (from the snapshot) and what the user actually accomplished.
