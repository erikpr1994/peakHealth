# Technical Design - Premium Routine Management

This document contains the technical architecture, data models, and implementation considerations for the Premium Routine Management System.

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Premium Routine Management               │
├─────────────────────────────────────────────────────────────┤
│  Frontend (React/Next.js)                                   │
│  ├── Season Management UI                                   │
│  ├── Phase Management UI                                    │
│  ├── Routine Assignment UI                                  │
│  ├── Calendar Integration UI                                │
│  └── Progress Tracking UI                                   │
├─────────────────────────────────────────────────────────────┤
│  Backend (Supabase/PostgreSQL)                              │
│  ├── Season Management API                                  │
│  ├── Phase Management API                                   │
│  ├── Routine Assignment API                                 │
│  ├── Calendar Integration API                               │
│  └── Progress Tracking API                                  │
├─────────────────────────────────────────────────────────────┤
│  Integration Layer                                          │
│  ├── Existing Routine System                                │
│  ├── Existing Calendar System                               │
│  ├── Existing Progress Tracking                             │
│  └── Existing User Preferences                              │
└─────────────────────────────────────────────────────────────┘
```

### Component Architecture

```
PremiumRoutineManagement/
├── SeasonManagement/
│   ├── SeasonList.tsx
│   ├── SeasonCard.tsx
│   ├── CreateSeasonModal.tsx
│   └── SeasonDetail.tsx
├── PhaseManagement/
│   ├── PhaseList.tsx
│   ├── PhaseCard.tsx
│   ├── CreatePhaseModal.tsx
│   └── PhaseDetail.tsx
├── RoutineAssignment/
│   ├── RoutineAssignmentList.tsx
│   ├── RoutineAssignmentCard.tsx
│   ├── AssignRoutineModal.tsx
│   └── ConflictResolution.tsx
├── CalendarIntegration/
│   ├── SeasonCalendar.tsx
│   ├── PhaseCalendar.tsx
│   ├── WorkoutScheduler.tsx
│   └── RaceScheduler.tsx
└── ProgressTracking/
    ├── SeasonProgress.tsx
    ├── PhaseProgress.tsx
    ├── MilestoneTracker.tsx
    └── ProgressCharts.tsx
```

---

## Data Models

### Core Entities

```typescript
// Season - The main container for training periods
interface Season {
  id: string;
  userId: string;
  name: string;
  description?: string;
  objective: Objective;
  targetDate: Date;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  currentPhaseIndex: number;
  progress: SeasonProgress;
  createdDate: Date;
  lastModified: Date;
}

// Objective - The goal of the season
interface Objective {
  id: string;
  seasonId: string;
  type: ObjectiveType;
  name: string;
  description: string;
  targetDate: Date;
  competitionType?: CompetitionType;
  priority: 'low' | 'medium' | 'high';
  notes?: string;
}

// Phase - Training periods within a season
interface Phase {
  id: string;
  seasonId: string;
  name: string;
  type: PhaseType;
  description: string;
  startDate: Date;
  endDate: Date;
  duration: number; // in weeks
  focus: string[];
  intensity: 'low' | 'medium' | 'high';
  volume: 'low' | 'medium' | 'high';
  routineAssignments: RoutineAssignment[];
  progress: PhaseProgress;
  notes?: string;
}

// RoutineAssignment - Links existing routines to phases
interface RoutineAssignment {
  id: string;
  phaseId: string;
  routineId: string;
  frequency: number; // times per week
  daysOfWeek?: number[]; // specific days (0=Sunday, 6=Saturday)
  progression?: ProgressionRule;
  notes?: string;
}

// ProgressionRule - How routines evolve through phases
interface ProgressionRule {
  type: 'linear' | 'step' | 'custom';
  parameters: {
    weightIncrease?: number; // percentage
    repIncrease?: number;
    setIncrease?: number;
    durationIncrease?: number; // percentage
  };
}

// Progress tracking
interface SeasonProgress {
  currentWeek: number;
  totalWeeks: number;
  completedPhases: number;
  totalPhases: number;
  completedBlocks: number;
  totalBlocks: number;
  overallProgress: number; // percentage
}

interface PhaseProgress {
  currentWeek: number;
  totalWeeks: number;
  completedWorkouts: number;
  totalWorkouts: number;
  adherence: number; // percentage
  performance: number; // percentage
}
```

### Enums and Types

```typescript
type ObjectiveType =
  | 'competition'
  | 'multi-month-competition'
  | 'health-goal'
  | 'weight-loss'
  | 'summer-fitness';

type CompetitionType =
  | 'trail-running'
  | 'road-running'
  | 'cycling'
  | 'swimming'
  | 'bodybuilding'
  | 'strength'
  | 'endurance';

type PhaseType =
  | 'base-building'
  | 'build'
  | 'peak'
  | 'competition'
  | 'recovery'
  | 'maintenance'
  | 'foundation'
  | 'refinement'
  | 'active-loss'
  | 'plateau-management';
```

---

## Database Schema

### Tables

```sql
-- Seasons table
CREATE TABLE seasons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  objective_type VARCHAR(50) NOT NULL,
  objective_name VARCHAR(255) NOT NULL,
  objective_description TEXT,
  target_date DATE NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_active BOOLEAN DEFAULT false,
  current_phase_index INTEGER DEFAULT 0,
  created_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_modified TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Phases table
CREATE TABLE phases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  season_id UUID NOT NULL REFERENCES seasons(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  duration INTEGER NOT NULL, -- in weeks
  focus TEXT[], -- array of focus areas
  intensity VARCHAR(20) NOT NULL,
  volume VARCHAR(20) NOT NULL,
  notes TEXT,
  created_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Routine assignments table
CREATE TABLE routine_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phase_id UUID NOT NULL REFERENCES phases(id) ON DELETE CASCADE,
  routine_id UUID NOT NULL REFERENCES routines(id),
  frequency INTEGER NOT NULL, -- times per week
  days_of_week INTEGER[], -- array of days (0=Sunday, 6=Saturday)
  progression_type VARCHAR(20),
  progression_parameters JSONB,
  notes TEXT,
  created_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Progress tracking table
CREATE TABLE season_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  season_id UUID NOT NULL REFERENCES seasons(id) ON DELETE CASCADE,
  current_week INTEGER NOT NULL,
  total_weeks INTEGER NOT NULL,
  completed_phases INTEGER DEFAULT 0,
  total_phases INTEGER NOT NULL,
  completed_blocks INTEGER DEFAULT 0,
  total_blocks INTEGER NOT NULL,
  overall_progress DECIMAL(5,2) DEFAULT 0, -- percentage
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Phase progress table
CREATE TABLE phase_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phase_id UUID NOT NULL REFERENCES phases(id) ON DELETE CASCADE,
  current_week INTEGER NOT NULL,
  total_weeks INTEGER NOT NULL,
  completed_workouts INTEGER DEFAULT 0,
  total_workouts INTEGER NOT NULL,
  adherence DECIMAL(5,2) DEFAULT 0, -- percentage
  performance DECIMAL(5,2) DEFAULT 0, -- percentage
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Indexes

```sql
-- Performance indexes
CREATE INDEX idx_seasons_user_id ON seasons(user_id);
CREATE INDEX idx_seasons_is_active ON seasons(is_active);
CREATE INDEX idx_phases_season_id ON phases(season_id);
CREATE INDEX idx_routine_assignments_phase_id ON routine_assignments(phase_id);
CREATE INDEX idx_routine_assignments_routine_id ON routine_assignments(routine_id);
CREATE INDEX idx_season_progress_season_id ON season_progress(season_id);
CREATE INDEX idx_phase_progress_phase_id ON phase_progress(phase_id);
```

---

## API Design

### Season Management

```typescript
// GET /api/seasons
interface GetSeasonsResponse {
  seasons: Season[];
  total: number;
}

// POST /api/seasons
interface CreateSeasonRequest {
  name: string;
  description?: string;
  objective: {
    type: ObjectiveType;
    name: string;
    description: string;
    targetDate: string;
    competitionType?: CompetitionType;
  };
  targetDate: string;
}

// PUT /api/seasons/:id
interface UpdateSeasonRequest {
  name?: string;
  description?: string;
  isActive?: boolean;
  currentPhaseIndex?: number;
}

// DELETE /api/seasons/:id
interface DeleteSeasonResponse {
  success: boolean;
}
```

### Phase Management

```typescript
// GET /api/seasons/:seasonId/phases
interface GetPhasesResponse {
  phases: Phase[];
}

// POST /api/seasons/:seasonId/phases
interface CreatePhaseRequest {
  name: string;
  type: PhaseType;
  description: string;
  startDate: string;
  endDate: string;
  focus: string[];
  intensity: 'low' | 'medium' | 'high';
  volume: 'low' | 'medium' | 'high';
}

// PUT /api/phases/:id
interface UpdatePhaseRequest {
  name?: string;
  description?: string;
  focus?: string[];
  intensity?: 'low' | 'medium' | 'high';
  volume?: 'low' | 'medium' | 'high';
}
```

### Routine Assignment

```typescript
// GET /api/phases/:phaseId/routine-assignments
interface GetRoutineAssignmentsResponse {
  assignments: RoutineAssignment[];
}

// POST /api/phases/:phaseId/routine-assignments
interface CreateRoutineAssignmentRequest {
  routineId: string;
  frequency: number;
  daysOfWeek?: number[];
  progression?: ProgressionRule;
}

// PUT /api/routine-assignments/:id
interface UpdateRoutineAssignmentRequest {
  frequency?: number;
  daysOfWeek?: number[];
  progression?: ProgressionRule;
}
```

---

## Integration Points

### Existing Routine System

```typescript
// Integration with existing routine system
interface RoutineIntegration {
  // Get available routines for assignment
  getAvailableRoutines(userId: string): Promise<Routine[]>;

  // Check routine compatibility with phase
  checkRoutineCompatibility(
    routineId: string,
    phaseType: PhaseType
  ): Promise<boolean>;

  // Get routine details for assignment
  getRoutineDetails(routineId: string): Promise<RoutineDetails>;
}
```

### Existing Calendar System

```typescript
// Integration with existing calendar system
interface CalendarIntegration {
  // Schedule workouts in calendar
  scheduleWorkouts(
    assignments: RoutineAssignment[],
    phase: Phase
  ): Promise<void>;

  // Check for calendar conflicts
  checkConflicts(workoutDate: Date, userId: string): Promise<Conflict[]>;

  // Resolve conflicts automatically
  resolveConflicts(conflicts: Conflict[]): Promise<Resolution[]>;

  // Schedule races and events
  scheduleRace(race: Race, season: Season): Promise<void>;
}
```

### Existing Progress Tracking

```typescript
// Integration with existing progress tracking
interface ProgressIntegration {
  // Track workout completion
  trackWorkoutCompletion(workoutId: string, userId: string): Promise<void>;

  // Calculate phase progress
  calculatePhaseProgress(phaseId: string): Promise<PhaseProgress>;

  // Calculate season progress
  calculateSeasonProgress(seasonId: string): Promise<SeasonProgress>;

  // Track milestones
  trackMilestone(milestone: Milestone, userId: string): Promise<void>;
}
```

---

## Implementation Considerations

### Performance

1. **Database Optimization**:
   - Use appropriate indexes for frequent queries
   - Implement pagination for large datasets
   - Cache frequently accessed data

2. **Frontend Optimization**:
   - Implement virtual scrolling for large lists
   - Use React.memo for expensive components
   - Implement proper loading states

3. **API Optimization**:
   - Use GraphQL for complex data fetching
   - Implement proper caching strategies
   - Use connection pooling for database connections

### Security

1. **Data Access Control**:
   - Implement row-level security (RLS) in PostgreSQL
   - Validate user ownership of all resources
   - Implement proper authentication and authorization

2. **Input Validation**:
   - Validate all user inputs on both frontend and backend
   - Implement proper error handling
   - Sanitize data before database operations

### Scalability

1. **Database Scaling**:
   - Plan for horizontal scaling of database
   - Implement proper partitioning strategies
   - Use read replicas for heavy read operations

2. **Application Scaling**:
   - Design for horizontal scaling
   - Implement proper caching strategies
   - Use CDN for static assets

### Monitoring

1. **Application Monitoring**:
   - Implement comprehensive logging
   - Set up error tracking and alerting
   - Monitor performance metrics

2. **User Analytics**:
   - Track feature usage and adoption
   - Monitor user engagement metrics
   - Implement A/B testing capabilities

---

## Development Phases

### Phase 1: Core Infrastructure

- Database schema implementation
- Basic API endpoints
- Core data models and types

### Phase 2: Basic Functionality

- Season creation and management
- Phase creation and management
- Basic routine assignment

### Phase 3: Advanced Features

- Calendar integration
- Progress tracking
- Conflict resolution

### Phase 4: Optimization

- Performance optimization
- Advanced analytics
- User experience improvements

---

_This document will be updated as technical decisions are made and requirements evolve._
