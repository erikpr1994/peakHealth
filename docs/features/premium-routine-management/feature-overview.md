# Premium Routine Management System - Feature Overview

## Overview

The Premium Routine Management System is designed to help users plan and execute structured training seasons with clear objectives, phases, and integrated routine management. Unlike the basic routine system, this provides a higher-level planning framework that adapts to different user goals and timeframes.

## Core Principles

1. **One Active Season**: Only one training season can be active at a time
2. **Intelligent Recommendations**: AI-powered phase calculation with user control
3. **Date-Driven Planning**: Seasons are anchored to specific target dates
4. **Phase-Based Structure**: Training is organized into logical phases with specific purposes
5. **Week-Based Progression**: Phases progress automatically by calendar weeks
6. **Routine Integration**: Existing routines are assigned to phases, not created from scratch
7. **Calendar Integration**: Training plans integrate with the calendar for race scheduling and progress tracking
8. **Platform Integration**: Leverages data from Strava, Garmin Connect, and other fitness platforms
9. **User Management Types**: Support for both self-managed and trainer-managed users
10. **Progressive Complexity**: Beginner, intermediate, and expert modes with feature disclosure
11. **Professional Collaboration**: Integration with health professionals through professional platform
12. **Different Interfaces**: Separate interfaces for planning vs. execution with context-aware information

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

### User Management Types

**Self-Managed Users:**

- **Full Control**: Complete autonomy over training and health plans
- **AI Guidance**: AI-powered recommendations and educational content
- **Progressive Learning**: Built-in guidance that adapts to user experience
- **Feature Access**: Access to all features with appropriate complexity levels
- **Decision Making**: Users make all final decisions about their plans

**Trainer-Managed Users:**

- **Professional Oversight**: Health professionals provide guidance and modifications
- **Collaborative Planning**: Joint planning with trainers and other professionals
- **Professional Tools**: Access to professional-grade features and recommendations
- **Cross-Professional Support**: Multiple specialists can contribute to their health
- **User Autonomy**: Maintains control while benefiting from professional expertise

**Management Type Switching:**

- **Flexible Transitions**: Users can switch between management types
- **Hybrid Approaches**: Combination of self-management and professional support
- **Professional Referrals**: System can suggest professional help when needed
- **Gradual Progression**: Users can start with professional help and transition to self-management

### Progressive Complexity Modes

**Beginner Mode:**

- **Maximum Guidance**: Strong guidance and educational content
- **Simplified Interfaces**: Streamlined workflows and explanations
- **Step-by-Step Setup**: Guided season and phase creation
- **Built-in Learning**: Educational content integrated throughout

**Intermediate Mode:**

- **Balanced Automation**: Balanced automation with customization options
- **Additional Features**: Advanced capabilities and customization options
- **Moderate Guidance**: Moderate guidance and recommendations
- **Progressive Disclosure**: Advanced features become available

**Expert Mode:**

- **High Automation**: High automation with advanced control capabilities
- **Full Feature Access**: Complete feature access with minimal guidance
- **Professional Tools**: Professional-grade tools and analytics
- **Maximum Customization**: Complete control and customization

### Routine Integration

**Key Concept**: Phases contain assigned routines, not create new ones

**Integration Points**:

1. **Routine Assignment**: Users assign existing routines to phases
2. **Frequency Management**: Define how often each routine runs in a phase
3. **Progression Logic**: How routines evolve through phases
4. **Calendar Scheduling**: Automatic scheduling of routines within phases

**Example by Persona**:

```
Trail Runner - Base Building Phase (8 weeks)
├── Strength Routine: 3x/week (Full Body)
├── Cardio Routine: 2x/week (Endurance)
└── Mobility Routine: 1x/week (Recovery)

Bodybuilding - Off-Season Building (6 months)
├── Strength Routine: 5x/week (Split)
├── Cardio Routine: 2x/week (Low Intensity)
└── Recovery Routine: 1x/week (Active Recovery)

Health-Conscious - Building Phase (3 months)
├── Strength Routine: 3x/week (Progressive)
├── Cardio Routine: 3x/week (Balanced)
└── Flexibility Routine: 2x/week (Maintenance)
```

### Interface Design & Execution

**Different Interfaces for Planning vs. Execution:**

**Dashboard Execution View:**

- **Next Trainings**: Upcoming workouts and schedule
- **Weekly Schedule**: Current week's training plan
- **Progress Indicators**: Completion status and milestones
- **Quick Actions**: Start workout, view details, adjust schedule
- **Important Data**: Key metrics and upcoming events

**Premium Routine Management View:**

- **Season Planning**: Phase creation and management
- **Routine Assignment**: Assigning routines to phases
- **Progress Tracking**: Overall season and phase progress
- **Plan Modifications**: Adjusting phases and routines
- **Analytics and Insights**: Detailed progress analysis

**Integration Approach:**

- **Unified Data Model**: Same data displayed differently per context
- **Context-Aware Information**: Relevant data for each page/feature
- **Seamless Navigation**: Easy movement between planning and execution
- **Consistent Experience**: Unified design language across interfaces

**Key Features**:

- **No strict limits** on routine assignments
- **Frequency-based conflict handling**
- **Load monitoring and recommendations**
- **Running routine flexibility** for weekly variations
- **Smart defaults** approach for routine combinations

### Professional Collaboration

**Integration with Professional Platform:**

- **Trainer Management**: Personal trainers can modify training plans
- **Cross-Professional Support**: Physiotherapists, nutritionists, doctors can contribute
- **Professional Recommendations**: Health professionals can add notes and suggestions
- **Client-Professional Communication**: Direct messaging and collaboration tools

**Professional Boundaries:**

- **Role-Based Access**: Professionals only modify areas within their expertise
- **Recommendation System**: Professionals can recommend but not override other areas
- **Collaborative Planning**: Multiple professionals can work together on client health
- **Professional Notes**: Each professional can add relevant notes and recommendations

### Technical Architecture

**Database Foundation:**

- **Supabase Infrastructure**: Leverage existing Supabase foundation
- **New Table Structure**: Dedicated tables for season management
- **Performance Optimization**: Optimize for complex season plan queries
- **Real-Time Capabilities**: Leverage Supabase real-time features

**API Design:**

- **New Endpoints**: Create dedicated API for season management
- **RESTful Design**: Follow standard REST API patterns
- **Comprehensive Coverage**: Support all season management operations
- **Future Integration**: Prepare for external platform integrations

**Offline Support:**

- **Future Feature**: Offline support planned for post-MVP development
- **Cross-Platform**: Offline functionality for both desktop and mobile
- **Web App Approach**: Consistent offline experience across platforms
- **Progressive Enhancement**: Add offline capabilities incrementally

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
