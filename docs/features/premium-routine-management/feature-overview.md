# Premium Routine Management System - Feature Overview

## Overview

The Premium Routine Management System is designed to help users plan and execute structured training seasons with clear objectives, phases, and integrated routine management. Unlike the basic routine system, this provides a higher-level planning framework that adapts to different user goals and timeframes.

## Core Principles

1. **One Active Season**: Only one training season can be active at a time
2. **Intelligent Recommendations**: AI-powered phase calculation with user control
3. **Date-Driven Planning**: Seasons are anchored to specific target dates
4. **Phase-Based Structure**: Training is organized into logical phases with specific purposes
5. **Routine Integration**: Existing routines are assigned to phases, not created from scratch
6. **Calendar Integration**: Training plans integrate with the calendar for race scheduling and progress tracking
7. **Platform Integration**: Leverages data from Strava, Garmin Connect, and other fitness platforms

## System Architecture

### Season Structure

```
Season
├── Objective (Competition, Health Goal, Weight Loss)
├── Target Date
├── Current Phase
├── Phases[]
│   ├── Phase Type (Base, Build, Peak, Maintenance, etc.)
│   ├── Duration (calculated or user-defined)
│   ├── Focus Areas
│   ├── Assigned Routines[]
│   └── Progress Tracking
└── Calendar Integration
```

### Phase Types

**Competition-Focused Phases** (Trail Runner, City Runner):

- **Base Building**: Foundation work (endurance, strength, technique)
- **Build Phase**: Increased volume and intensity
- **Peak Phase**: Race-specific training and tapering
- **Recovery**: Post-competition rest and maintenance

**Bodybuilding Phases** (Bodybuilding Competitor):

- **Off-Season Building**: 4-6 months, muscle mass development, higher volume training
- **Cutting**: 2-3 months, fat loss and conditioning, modified training protocols
- **Peak Week**: 1 week, specialized competition preparation with day-by-day protocols
- **Recovery**: 1-2 months, post-competition rest and maintenance

**Health/Fitness Phases**:

- **Foundation**: Establish consistent habits
- **Building**: Progressive overload and skill development
- **Refinement**: Fine-tuning and optimization
- **Maintenance**: Sustaining achieved level

**Weight Loss Phases**:

- **Foundation**: Habit formation and baseline establishment
- **Active Loss**: Caloric deficit and exercise consistency
- **Plateau Management**: Adjustments and continued progress
- **Maintenance**: Stabilization and rebound prevention

### Routine Integration

**Key Concept**: Phases contain assigned routines, not create new ones

**Integration Points**:

1. **Routine Assignment**: Users assign existing routines to phases
2. **Frequency Management**: Define how often each routine runs in a phase
3. **Progression Logic**: How routines evolve through phases
4. **Calendar Scheduling**: Automatic scheduling of routines within phases

**Example**:

```
Base Building Phase (8 weeks)
├── Strength Routine: 3x/week (Full Body)
├── Cardio Routine: 2x/week (Endurance)
└── Mobility Routine: 1x/week (Recovery)

Build Phase (6 weeks)
├── Strength Routine: 4x/week (Split)
├── Cardio Routine: 3x/week (Intervals)
└── Mobility Routine: 2x/week (Active Recovery)
```

## Calendar Integration

### Key Features

1. **Automatic Scheduling**: Routines automatically scheduled based on phase assignments
2. **Race Integration**: Support for scheduling races and adjusting training around them
3. **Recovery Planning**: Built-in recovery periods and deload weeks
4. **Progress Tracking**: Visual indicators of phase progress and milestone completion

### Calendar Views

1. **Season Overview**: High-level view of entire season with phase boundaries
2. **Phase Detail**: Detailed view of current phase with routine scheduling
3. **Weekly View**: Day-by-day breakdown of training and recovery
4. **Race Calendar**: Integration with race scheduling and tapering

## Technical Considerations

### Data Model

```typescript
interface Season {
  id: string;
  userId: string;
  objective: Objective;
  targetDate: Date;
  startDate: Date;
  isActive: boolean;
  phases: Phase[];
  currentPhaseIndex: number;
  progress: SeasonProgress;
  recommendations: PhaseRecommendation[];
  userAccepted: boolean;
  platformIntegrations: PlatformIntegration[];
}

interface PhaseRecommendation {
  id: string;
  seasonId: string;
  phaseType: PhaseType;
  recommendedDuration: number;
  confidence: number;
  reasoning: string;
  userAccepted: boolean;
  userModified: boolean;
}

interface PlatformIntegration {
  platform: 'strava' | 'garmin' | 'fitbit' | 'apple_health';
  connected: boolean;
  lastSync: Date;
  dataTypes: string[];
}

interface Phase {
  id: string;
  seasonId: string;
  type: PhaseType;
  name: string;
  startDate: Date;
  endDate: Date;
  focus: string[];
  routineAssignments: RoutineAssignment[];
  progress: PhaseProgress;
}

interface RoutineAssignment {
  routineId: string;
  frequency: number; // times per week
  daysOfWeek?: number[]; // specific days
  progression?: ProgressionRule;
}
```

### Integration Points

1. **Existing Routine System**: Leverage current routine creation and management
2. **Calendar System**: Integrate with existing calendar functionality
3. **Progress Tracking**: Connect with existing workout tracking
4. **User Preferences**: Use existing user settings and preferences

## Implementation Status

- [x] Initial design document created
- [x] User personas defined
- [x] System architecture outlined
- [ ] Questions gathered and answered
- [ ] Technical specifications finalized
- [ ] MVP scope defined
- [ ] Development planning complete

## Next Steps

1. **Answer Questions**: Complete all questions in `questions.md`
2. **Finalize Design**: Update this document based on answers
3. **Define MVP**: Establish scope for first implementation
4. **Plan Development**: Create development timeline and tasks

---

_This document will be updated as questions are answered and design decisions are made._
