# Routines Feature - Technical Design

## Overview

This document provides the technical design specification for the Routines feature, including database schema, API design, and component architecture.

## 🗄️ **Database Schema Design** ✅ **RESOLVED**

**Decision**: **Option A - Fully normalized tables with version history**

### **Core Tables**

#### **1. routines**

```sql
CREATE TABLE routines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  difficulty VARCHAR(50) NOT NULL CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  goal VARCHAR(50) NOT NULL CHECK (goal IN ('Strength', 'Hypertrophy', 'Endurance', 'Weight Loss')),
  days_per_week INTEGER NOT NULL CHECK (days_per_week BETWEEN 1 AND 7),
  is_active BOOLEAN DEFAULT false,
  is_favorite BOOLEAN DEFAULT false,
  schedule BOOLEAN[] DEFAULT ARRAY[false, false, false, false, false, false, false],
  objectives TEXT[],
  total_workouts INTEGER DEFAULT 0,
  completed_workouts INTEGER DEFAULT 0,
  estimated_duration VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_used TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX idx_routines_user_id ON routines(user_id);
CREATE INDEX idx_routines_is_active ON routines(is_active);
CREATE INDEX idx_routines_is_favorite ON routines(is_favorite);
```

#### **2. workouts**

```sql
CREATE TABLE workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  routine_id UUID NOT NULL REFERENCES routines(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  workout_type VARCHAR(50) NOT NULL CHECK (workout_type IN ('Strength', 'Running', 'TrailRunning')),
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_workouts_routine_id ON workouts(routine_id);
CREATE INDEX idx_workouts_order_index ON workouts(order_index);
```

#### **3. workout_sections**

```sql
CREATE TABLE workout_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workout_id UUID NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  section_type VARCHAR(50) NOT NULL CHECK (section_type IN ('Warmup', 'Basic', 'Cooldown', 'EMOM', 'Tabata')),
  order_index INTEGER NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_workout_sections_workout_id ON workout_sections(workout_id);
CREATE INDEX idx_workout_sections_order_index ON workout_sections(order_index);
```

#### **4. exercises**

```sql
CREATE TABLE exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID NOT NULL REFERENCES workout_sections(id) ON DELETE CASCADE,
  exercise_name VARCHAR(255) NOT NULL,
  exercise_id UUID REFERENCES exercise_library(id), -- Link to exercise library
  order_index INTEGER NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_exercises_section_id ON exercises(section_id);
CREATE INDEX idx_exercises_order_index ON exercises(order_index);
```

#### **5. exercise_sets**

```sql
CREATE TABLE exercise_sets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exercise_id UUID NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
  set_number INTEGER NOT NULL,
  reps INTEGER,
  weight DECIMAL(6,2),
  duration_seconds INTEGER,
  rest_seconds INTEGER,
  progression_method VARCHAR(50) CHECK (progression_method IN ('linear', 'dual', 'inverse-pyramid', 'myo-reps', 'widowmaker', 'amrap')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_exercise_sets_exercise_id ON exercise_sets(exercise_id);
CREATE INDEX idx_exercise_sets_set_number ON exercise_sets(set_number);
```

#### **6. trail_running_data**

```sql
CREATE TABLE trail_running_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workout_id UUID NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
  total_distance DECIMAL(8,2),
  total_elevation_gain INTEGER,
  estimated_duration_minutes INTEGER,
  intensity_target_type VARCHAR(50) CHECK (intensity_target_type IN ('Heart Rate', 'Speed', 'Power', 'Cadence', 'RPE')),
  intensity_target_value VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_trail_running_data_workout_id ON trail_running_data(workout_id);
```

#### **7. trail_running_intervals**

```sql
CREATE TABLE trail_running_intervals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID NOT NULL REFERENCES workout_sections(id) ON DELETE CASCADE,
  interval_type VARCHAR(50) NOT NULL CHECK (interval_type IN ('Run', 'Uphill', 'Downhill', 'Sprint', 'Recovery', 'Rest', 'Walk')),
  duration_minutes INTEGER,
  distance_km DECIMAL(6,2),
  elevation_gain INTEGER,
  intensity_target VARCHAR(100),
  repeat_count INTEGER DEFAULT 1,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_trail_running_intervals_section_id ON trail_running_intervals(section_id);
CREATE INDEX idx_trail_running_intervals_order_index ON trail_running_intervals(order_index);
```

### **Row Level Security (RLS)**

```sql
-- Enable RLS on all tables
ALTER TABLE routines ENABLE ROW LEVEL SECURITY;
ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE trail_running_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE trail_running_intervals ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own routines" ON routines
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own routines" ON routines
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own routines" ON routines
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own routines" ON routines
  FOR DELETE USING (auth.uid() = user_id);

-- Similar policies for other tables...
```

## 🔌 **API Design**

### **RESTful Endpoints**

#### **Routines**

```
GET    /api/routines              # List user's routines
POST   /api/routines              # Create new routine
GET    /api/routines/:id          # Get routine details
PUT    /api/routines/:id          # Update routine
DELETE /api/routines/:id          # Delete routine
PATCH  /api/routines/:id/favorite # Toggle favorite
PATCH  /api/routines/:id/active   # Set active routine
```

#### **Workouts**

```
GET    /api/routines/:id/workouts           # List workouts in routine
POST   /api/routines/:id/workouts           # Add workout to routine
GET    /api/workouts/:id                    # Get workout details
PUT    /api/workouts/:id                    # Update workout
DELETE /api/workouts/:id                    # Delete workout
PATCH  /api/workouts/:id/reorder            # Reorder workouts
```

#### **Sections**

```
GET    /api/workouts/:id/sections           # List sections in workout
POST   /api/workouts/:id/sections           # Add section to workout
GET    /api/sections/:id                    # Get section details
PUT    /api/sections/:id                    # Update section
DELETE /api/sections/:id                    # Delete section
PATCH  /api/sections/:id/reorder            # Reorder sections
```

#### **Exercises**

```
GET    /api/sections/:id/exercises          # List exercises in section
POST   /api/sections/:id/exercises          # Add exercise to section
GET    /api/exercises/:id                   # Get exercise details
PUT    /api/exercises/:id                   # Update exercise
DELETE /api/exercises/:id                   # Delete exercise
PATCH  /api/exercises/:id/reorder           # Reorder exercises
```

#### **Sets**

```
GET    /api/exercises/:id/sets              # List sets for exercise
POST   /api/exercises/:id/sets              # Add set to exercise
GET    /api/sets/:id                        # Get set details
PUT    /api/sets/:id                        # Update set
DELETE /api/sets/:id                        # Delete set
```

### **API Response Format**

**Success Responses:**

```typescript
// Simple data return
return NextResponse.json({ routines: routines || [] });

// Complex data return
return NextResponse.json({
  routine: { ... },
  workouts: [ ... ],
  progress: { ... }
});

// Success confirmation
return NextResponse.json({ success: true });
```

**Error Responses:**

```typescript
// Authentication error
return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

// Database connection error
return NextResponse.json(
  { error: 'Database connection not available' },
  { status: 503 }
);

// Not found error
return NextResponse.json({ error: 'Routine not found' }, { status: 404 });

// Internal server error
return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
```

### **Standard Error Messages**

```typescript
const ERROR_MESSAGES = {
  NOT_AUTHENTICATED: 'Not authenticated',
  DATABASE_UNAVAILABLE: 'Database connection not available',
  ROUTINE_NOT_FOUND: 'Routine not found',
  WORKOUT_NOT_FOUND: 'Workout not found',
  SECTION_NOT_FOUND: 'Section not found',
  EXERCISE_NOT_FOUND: 'Exercise not found',
  SET_NOT_FOUND: 'Set not found',
  INSUFFICIENT_PERMISSIONS: 'Insufficient permissions',
  VALIDATION_ERROR: 'Validation error',
  INTERNAL_ERROR: 'Internal server error',
  FAILED_TO_FETCH: 'Failed to fetch data',
  FAILED_TO_UPDATE: 'Failed to update data',
  FAILED_TO_CREATE: 'Failed to create data',
  FAILED_TO_DELETE: 'Failed to delete data',
};
```

## 🏗️ **Component Architecture**

### **Feature Structure**

```
features/routines/
├── features/
│   ├── routine-creation/
│   │   ├── RoutineCreation.tsx
│   │   ├── components/
│   │   │   ├── RoutineHeader.tsx
│   │   │   ├── RoutineDetailsForm.tsx
│   │   │   ├── StrengthWorkoutsSection.tsx
│   │   │   ├── RunningWorkoutsSection.tsx
│   │   │   └── RoutineModals.tsx
│   │   └── index.ts
│   ├── routine-detail/
│   │   ├── RoutineDetail.tsx
│   │   ├── components/
│   │   │   ├── RoutineDetailHeader.tsx
│   │   │   ├── RoutineOverviewCards.tsx
│   │   │   ├── RoutineProgress.tsx
│   │   │   ├── WeeklySchedule.tsx
│   │   │   ├── WorkoutDaysList.tsx
│   │   │   └── ExerciseList.tsx
│   │   └── index.ts
│   ├── routine-list/
│   │   ├── Routines.tsx
│   │   ├── components/
│   │   │   ├── RoutinesList.tsx
│   │   │   ├── RoutineCard.tsx
│   │   │   ├── ActiveRoutineCard.tsx
│   │   │   └── WorkoutCard.tsx
│   │   └── index.ts
│   └── workout-management/
│       ├── WorkoutManagement.tsx
│       ├── components/
│       │   ├── WorkoutHeader.tsx
│       │   ├── WorkoutDetails.tsx
│       │   ├── WorkoutSection.tsx
│       │   └── ExerciseManagement.tsx
│       └── index.ts
├── hooks/
│   ├── useRoutineOperations.ts
│   ├── useWorkoutOperations.ts
│   └── useTrailRunningWorkout.ts
├── types/
│   └── index.ts
├── utils/
│   ├── index.ts
│   ├── smartDefaults.ts
│   ├── workoutCalculations.ts
│   └── trailRunningUtils.ts
└── index.ts
```

### **State Management**

#### **Hook Architecture**

```typescript
// useRoutineOperations.ts
export const useRoutineOperations = () => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createRoutine = async (routineData: CreateRoutineData) => {
    // Implementation
  };

  const updateRoutine = async (id: string, routineData: UpdateRoutineData) => {
    // Implementation
  };

  const deleteRoutine = async (id: string) => {
    // Implementation
  };

  return {
    routines,
    loading,
    error,
    createRoutine,
    updateRoutine,
    deleteRoutine,
  };
};
```

#### **Data Flow**

```
User Action → Component → Hook → API → Database
     ↑                                        ↓
     ← Component ← Hook ← API ← Database ←
```

## 🔧 **Utility Functions**

### **Smart Defaults**

```typescript
// smartDefaults.ts
export const getDefaultRoutine = (
  goal: Goal,
  difficulty: Difficulty
): Partial<Routine> => {
  const defaults = {
    [Goal.Strength]: {
      daysPerWeek: 3,
      schedule: [true, false, true, false, true, false, false],
    },
    [Goal.Hypertrophy]: {
      daysPerWeek: 4,
      schedule: [true, false, true, false, true, false, true],
    },
    // ... more defaults
  };

  return defaults[goal] || {};
};
```

### **Workout Calculations**

```typescript
// workoutCalculations.ts
export const calculateWorkoutDuration = (workout: Workout): number => {
  // Calculate total duration based on exercises and rest times
};

export const calculateTotalVolume = (workout: Workout): number => {
  // Calculate total volume (sets × reps × weight)
};
```

## 🧪 **Testing Strategy**

### **Unit Tests**

- Hook functionality testing
- Utility function testing
- Component rendering testing
- API integration testing

### **Integration Tests**

- End-to-end routine creation flow
- Data persistence testing
- User authentication integration
- Error handling scenarios

### **Performance Tests**

- Large routine loading performance
- API response time testing
- Memory usage optimization
- Database query optimization

## 🔒 **Security Considerations**

### **Authentication & Authorization**

- JWT token validation
- User-specific data access
- Row-level security policies
- API rate limiting

### **Data Validation**

- Input sanitization
- SQL injection prevention
- XSS protection
- CSRF protection

### **Privacy**

- User data encryption
- Secure data transmission
- Data retention policies
- GDPR compliance

## 📊 **Performance Optimization**

### **Database Optimization**

- Proper indexing strategy
- Query optimization
- Connection pooling
- Caching strategies

### **Frontend Optimization**

- Component memoization
- Lazy loading
- Code splitting
- Bundle optimization

### **API Optimization**

- Response caching
- Pagination
- Compression
- CDN integration

## 📚 **Related Documentation**

- [Feature Overview](./feature-overview.md)
- [MVP Scope](./mvp-scope.md)
- [Questions & Feedback](./questions.md)
- [User App MVP Scope](../../app-overview/user-app/mvp-scope.md)
- [Project TODO](../../todo.md)
