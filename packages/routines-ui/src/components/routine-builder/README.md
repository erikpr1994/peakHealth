# Routine Builder Components

This directory contains components used in the routine builder UI.

## Components

### SetRow

The most fundamental UI component of the routine builder. Represents a single row in a sets table with conditional rendering based on set type and unilateral configuration.

#### Props

- `workoutId`: string - ID of the workout
- `sectionId`: string - ID of the section
- `exerciseId`: string - ID of the exercise
- `setId`: string - ID of the set
- `exercise`: Exercise - The exercise object
- `side?`: 'left' | 'right' - Only used when unilateralMode is 'sequential'

#### Features

- Conditional rendering based on set type (Standard, AMRAP, Timed, To Failure)
- Support for different progression methods (standard vs min/max reps)
- UI adaptation based on unilateral configuration
- Input handling for reps, weight, RPE, and time

