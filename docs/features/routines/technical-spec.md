# Routines Feature - Technical Specification

## Overview

This document provides the technical specification for implementing the Routines feature, including database schema design, API endpoints, and integration points.

## 🗄️ **Database Schema Design**

### **Option A: Fully Normalized Approach (Recommended)**

#### **Core Tables**

##### **1. routines**

```sql
CREATE TABLE routines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  difficulty VARCHAR(50) NOT NULL CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  goal VARCHAR(50) NOT NULL CHECK (goal IN ('Strength', 'Hypertrophy', 'Endurance', 'Weight Loss')),
  days_per_week INTEGER NOT NULL CHECK (days_per_week BETWEEN 1 AND 7),
  schedule BOOLEAN[7] NOT NULL DEFAULT '{false,false,false,false,false,false,false}',
  is_active BOOLEAN NOT NULL DEFAULT false,
  is_favorite BOOLEAN NOT NULL DEFAULT false,
  estimated_duration VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  version INTEGER NOT NULL DEFAULT 1,
  parent_routine_id UUID REFERENCES routines(id),

  -- Ensure only one active routine per user
  UNIQUE(user_id, is_active) WHERE is_active = true
);

-- Indexes
CREATE INDEX idx_routines_user_id ON routines(user_id);
CREATE INDEX idx_routines_active ON routines(user_id, is_active);
CREATE INDEX idx_routines_favorite ON routines(user_id, is_favorite);
```

##### **2. workouts**

```sql
CREATE TABLE workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  routine_id UUID NOT NULL REFERENCES routines(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('strength', 'running', 'trail-running', 'swimming', 'cycling')),
  objective TEXT,
  schedule_weeks VARCHAR(50),
  schedule_day VARCHAR(50),
  schedule_time VARCHAR(50),
  position INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(routine_id, position)
);

-- Indexes
CREATE INDEX idx_workouts_routine_id ON workouts(routine_id);
CREATE INDEX idx_workouts_position ON workouts(routine_id, position);
```

##### **3. workout_sections**

```sql
CREATE TABLE workout_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workout_id UUID NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('warmup', 'basic', 'cooldown', 'emom', 'tabata')),
  rest_after VARCHAR(50),
  emom_duration INTEGER, -- in minutes
  position INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(workout_id, position)
);

-- Indexes
CREATE INDEX idx_workout_sections_workout_id ON workout_sections(workout_id);
CREATE INDEX idx_workout_sections_position ON workout_sections(workout_id, position);
```

##### **4. exercises**

```sql
CREATE TABLE exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID NOT NULL REFERENCES workout_sections(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  muscle_groups TEXT[], -- Array of muscle groups
  rest_timer VARCHAR(50), -- rest between sets
  rest_after VARCHAR(50), -- rest after this exercise
  notes TEXT,
  progression_method VARCHAR(50) CHECK (progression_method IN ('linear', 'dual', 'inverse-pyramid', 'myo-reps', 'widowmaker', 'amrap')),
  has_approach_sets BOOLEAN DEFAULT false,
  emom_reps INTEGER, -- target reps per minute
  position INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(section_id, position)
);

-- Indexes
CREATE INDEX idx_exercises_section_id ON exercises(section_id);
CREATE INDEX idx_exercises_position ON exercises(section_id, position);
CREATE INDEX idx_exercises_category ON exercises(category);
CREATE INDEX idx_exercises_muscle_groups ON exercises USING GIN(muscle_groups);
```

##### **5. exercise_sets**

```sql
CREATE TABLE exercise_sets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exercise_id UUID NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
  reps VARCHAR(50),
  weight VARCHAR(100),
  duration VARCHAR(50),
  rest_time VARCHAR(50),
  position INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(exercise_id, position)
);

-- Indexes
CREATE INDEX idx_exercise_sets_exercise_id ON exercise_sets(exercise_id);
CREATE INDEX idx_exercise_sets_position ON exercise_sets(exercise_id, position);
```

#### **Trail Running Specific Tables**

##### **6. trail_running_workouts**

```sql
CREATE TABLE trail_running_workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workout_id UUID NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
  description TEXT,
  difficulty VARCHAR(50) NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced', 'expert')),
  estimated_duration INTEGER, -- in minutes
  target_distance DECIMAL(8,2), -- in km
  elevation_gain INTEGER, -- in meters
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(workout_id)
);

-- Indexes
CREATE INDEX idx_trail_running_workouts_workout_id ON trail_running_workouts(workout_id);
```

##### **7. trail_running_sections**

```sql
CREATE TABLE trail_running_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trail_running_workout_id UUID NOT NULL REFERENCES trail_running_workouts(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('warm-up', 'cool-down', 'run', 'walk', 'uphill-repeat', 'downhill-repeat', 'recovery', 'rest', 'caco', 'fartlek', 'series', 'w-series')),
  distance DECIMAL(8,2), -- in km
  duration INTEGER, -- in minutes
  elevation_change INTEGER, -- in meters
  is_repeated BOOLEAN DEFAULT false,
  repeat_count INTEGER,
  position INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(trail_running_workout_id, position)
);

-- Indexes
CREATE INDEX idx_trail_running_sections_workout_id ON trail_running_sections(trail_running_workout_id);
CREATE INDEX idx_trail_running_sections_position ON trail_running_sections(trail_running_workout_id, position);
```

##### **8. intensity_targets**

```sql
CREATE TABLE intensity_targets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trail_running_section_id UUID NOT NULL REFERENCES trail_running_sections(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL CHECK (type IN ('heart-rate', 'speed', 'power', 'cadence', 'rpe')),
  value DECIMAL(10,2),
  min_value VARCHAR(50),
  max_value VARCHAR(50),
  zone VARCHAR(10),
  unit VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(trail_running_section_id)
);

-- Indexes
CREATE INDEX idx_intensity_targets_section_id ON intensity_targets(trail_running_section_id);
```

##### **9. trail_running_intervals**

```sql
CREATE TABLE trail_running_intervals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trail_running_section_id UUID NOT NULL REFERENCES trail_running_sections(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('run', 'uphill', 'downhill', 'sprint', 'recovery', 'rest', 'walk')),
  distance DECIMAL(8,2), -- in km
  duration INTEGER, -- in minutes
  elevation_change INTEGER, -- in meters
  position INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(trail_running_section_id, position)
);

-- Indexes
CREATE INDEX idx_trail_running_intervals_section_id ON trail_running_intervals(trail_running_section_id);
CREATE INDEX idx_trail_running_intervals_position ON trail_running_intervals(trail_running_section_id, position);
```

#### **Progress Tracking Tables**

##### **10. routine_progress**

```sql
CREATE TABLE routine_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  routine_id UUID NOT NULL REFERENCES routines(id) ON DELETE CASCADE,
  current_week INTEGER NOT NULL DEFAULT 1,
  total_weeks INTEGER NOT NULL,
  completed_workouts INTEGER NOT NULL DEFAULT 0,
  total_workouts INTEGER NOT NULL DEFAULT 0,
  last_workout_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(routine_id)
);

-- Indexes
CREATE INDEX idx_routine_progress_routine_id ON routine_progress(routine_id);
```

### **Database Functions & Triggers**

#### **Position Management**

```sql
-- Function to reorder positions when items are moved
CREATE OR REPLACE FUNCTION reorder_positions(
  table_name TEXT,
  parent_column TEXT,
  parent_id UUID,
  old_position INTEGER,
  new_position INTEGER
) RETURNS VOID AS $$
BEGIN
  -- Implementation depends on specific table structure
  -- This is a placeholder for the actual implementation
END;
$$ LANGUAGE plpgsql;
```

#### **Updated At Triggers**

```sql
-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables
CREATE TRIGGER update_routines_updated_at BEFORE UPDATE ON routines FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_workouts_updated_at BEFORE UPDATE ON workouts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
-- ... repeat for all tables
```

## 🔌 **API Design**

### **Base URL Structure**

```
/api/routines
```

### **Authentication**

All endpoints require authentication via Supabase Auth.

### **Response Format**

```typescript
interface ApiResponse<T> {
  data: T;
  error?: string;
  message?: string;
}
```

### **Error Handling**

```typescript
interface ApiError {
  code: string;
  message: string;
  details?: any;
}
```

### **Endpoints**

#### **Routines**

##### **GET /api/routines**

List all routines for the authenticated user.

**Query Parameters:**

- `active` (boolean): Filter by active status
- `favorite` (boolean): Filter by favorite status
- `difficulty` (string): Filter by difficulty level
- `goal` (string): Filter by goal
- `limit` (number): Number of items per page
- `offset` (number): Pagination offset

**Response:**

```typescript
interface RoutinesResponse {
  routines: Routine[];
  total: number;
  hasMore: boolean;
}
```

##### **GET /api/routines/:id**

Get a specific routine by ID.

**Response:**

```typescript
interface RoutineDetailResponse {
  routine: RoutineWithWorkouts;
}
```

##### **POST /api/routines**

Create a new routine.

**Request Body:**

```typescript
interface CreateRoutineRequest {
  name: string;
  description?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  goal: 'Strength' | 'Hypertrophy' | 'Endurance' | 'Weight Loss';
  daysPerWeek: number;
  schedule: boolean[];
  estimatedDuration?: string;
}
```

##### **PUT /api/routines/:id**

Update an existing routine.

**Request Body:**

```typescript
interface UpdateRoutineRequest {
  name?: string;
  description?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  goal?: 'Strength' | 'Hypertrophy' | 'Endurance' | 'Weight Loss';
  daysPerWeek?: number;
  schedule?: boolean[];
  estimatedDuration?: string;
  isActive?: boolean;
  isFavorite?: boolean;
}
```

##### **DELETE /api/routines/:id**

Delete a routine.

##### **POST /api/routines/:id/duplicate**

Duplicate a routine.

##### **POST /api/routines/:id/share**

Share a routine (generate share link).

#### **Workouts**

##### **GET /api/routines/:routineId/workouts**

Get all workouts for a routine.

##### **POST /api/routines/:routineId/workouts**

Add a new workout to a routine.

##### **PUT /api/routines/:routineId/workouts/:workoutId**

Update a workout.

##### **DELETE /api/routines/:routineId/workouts/:workoutId**

Delete a workout.

##### **POST /api/routines/:routineId/workouts/:workoutId/move**

Move a workout to a new position.

#### **Sections**

##### **GET /api/workouts/:workoutId/sections**

Get all sections for a workout.

##### **POST /api/workouts/:workoutId/sections**

Add a new section to a workout.

##### **PUT /api/workouts/:workoutId/sections/:sectionId**

Update a section.

##### **DELETE /api/workouts/:workoutId/sections/:sectionId**

Delete a section.

##### **POST /api/workouts/:workoutId/sections/:sectionId/move**

Move a section to a new position.

#### **Exercises**

##### **GET /api/sections/:sectionId/exercises**

Get all exercises for a section.

##### **POST /api/sections/:sectionId/exercises**

Add a new exercise to a section.

##### **PUT /api/sections/:sectionId/exercises/:exerciseId**

Update an exercise.

##### **DELETE /api/sections/:sectionId/exercises/:exerciseId**

Delete an exercise.

##### **POST /api/sections/:sectionId/exercises/:exerciseId/move**

Move an exercise to a new position.

#### **Sets**

##### **GET /api/exercises/:exerciseId/sets**

Get all sets for an exercise.

##### **POST /api/exercises/:exerciseId/sets**

Add a new set to an exercise.

##### **PUT /api/exercises/:exerciseId/sets/:setId**

Update a set.

##### **DELETE /api/exercises/:exerciseId/sets/:setId**

Delete a set.

##### **POST /api/exercises/:exerciseId/sets/:setId/move**

Move a set to a new position.

#### **Trail Running**

##### **GET /api/workouts/:workoutId/trail-running**

Get trail running data for a workout.

##### **POST /api/workouts/:workoutId/trail-running**

Create trail running data for a workout.

##### **PUT /api/workouts/:workoutId/trail-running**

Update trail running data.

##### **GET /api/trail-running/:workoutId/sections**

Get trail running sections.

##### **POST /api/trail-running/:workoutId/sections**

Add a trail running section.

##### **PUT /api/trail-running/:workoutId/sections/:sectionId**

Update a trail running section.

##### **DELETE /api/trail-running/:workoutId/sections/:sectionId**

Delete a trail running section.

#### **Progress Tracking**

##### **GET /api/routines/:routineId/progress**

Get progress for a routine.

##### **POST /api/routines/:routineId/progress**

Update progress for a routine.

##### **POST /api/routines/:routineId/workouts/:workoutId/complete**

Mark a workout as completed.

## 🔄 **Data Flow**

### **Routine Creation Flow**

1. User creates routine metadata
2. User adds workouts to routine
3. User adds sections to workouts
4. User adds exercises to sections
5. User configures sets for exercises
6. System validates and saves routine

### **Routine Execution Flow**

1. User selects routine to start
2. System creates workout session
3. User executes workout via workout tracker
4. System updates progress and completion data
5. System provides feedback and recommendations

### **Data Synchronization**

1. Client maintains local state for editing
2. Changes are batched and sent to server
3. Server validates and persists changes
4. Server returns updated data
5. Client updates local state

## 🔒 **Security & Permissions**

### **Row Level Security (RLS)**

```sql
-- Enable RLS on all tables
ALTER TABLE routines ENABLE ROW LEVEL SECURITY;
ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;
-- ... repeat for all tables

-- Policies for routines
CREATE POLICY "Users can view their own routines" ON routines
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own routines" ON routines
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own routines" ON routines
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own routines" ON routines
  FOR DELETE USING (auth.uid() = user_id);
```

### **Sharing Permissions**

```sql
-- For shared routines
CREATE TABLE routine_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  routine_id UUID NOT NULL REFERENCES routines(id) ON DELETE CASCADE,
  shared_by UUID NOT NULL REFERENCES auth.users(id),
  shared_with UUID REFERENCES auth.users(id),
  permission VARCHAR(20) NOT NULL CHECK (permission IN ('view', 'edit', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(routine_id, shared_with)
);
```

## 📊 **Performance Considerations**

### **Indexing Strategy**

- Primary keys on all tables
- Foreign key indexes for joins
- Composite indexes for common queries
- GIN indexes for array fields (muscle_groups)

### **Query Optimization**

- Use pagination for large datasets
- Implement cursor-based pagination for better performance
- Cache frequently accessed data
- Use materialized views for complex aggregations

### **Caching Strategy**

- Cache routine metadata
- Cache user's active routine
- Cache exercise library data
- Implement cache invalidation on updates

## 🔗 **Integration Points**

### **Workout Tracker Integration**

```typescript
interface WorkoutSession {
  id: string;
  routineId: string;
  workoutId: string;
  startedAt: Date;
  completedAt?: Date;
  exercises: WorkoutExercise[];
}

interface WorkoutExercise {
  exerciseId: string;
  sets: CompletedSet[];
  notes?: string;
}

interface CompletedSet {
  reps?: number;
  weight?: number;
  duration?: number;
  completed: boolean;
}
```

### **Exercise Library Integration**

```typescript
interface ExerciseReference {
  exerciseId: string;
  name: string;
  category: string;
  muscleGroups: string[];
  instructions?: string;
  videoUrl?: string;
}
```

### **User System Integration**

```typescript
interface UserRoutinePreferences {
  userId: string;
  defaultDifficulty: string;
  defaultGoal: string;
  preferredDays: boolean[];
  estimatedDuration: string;
}
```

## 🧪 **Testing Strategy**

### **Unit Tests**

- Test all API endpoints
- Test database functions and triggers
- Test data validation logic
- Test permission checks

### **Integration Tests**

- Test complete routine creation flow
- Test routine execution flow
- Test data consistency across tables
- Test error handling scenarios

### **Performance Tests**

- Test with large datasets
- Test concurrent user scenarios
- Test database query performance
- Test API response times

## 📈 **Monitoring & Analytics**

### **Key Metrics**

- Routine creation completion rate
- Workout execution rate
- User engagement with routines
- Performance metrics (API response times)

### **Error Tracking**

- API error rates
- Database query performance
- User-reported issues
- System failures

---

## 🔗 **Related Documentation**

- [Routines Feature README](./README.md)
- [Routines Questions](./questions.md)
- [User App MVP Scope](../../app-overview/user-app/mvp-scope.md)
- [Project TODO](../../todo.md)
