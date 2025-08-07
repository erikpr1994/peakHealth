-- Migration: Add Data Access RLS Policies
-- This migration adds RLS policies that respect user types and data access rules

-- Enable RLS on all tables that need data access control
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_routines ENABLE ROW LEVEL SECURITY;
ALTER TABLE routine_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_session_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_exercise_favorites ENABLE ROW LEVEL SECURITY;

-- Drop existing policies that don't respect user types
DROP POLICY IF EXISTS "Users can view their own workout routines" ON workout_routines;
DROP POLICY IF EXISTS "Users can create their own workout routines" ON workout_routines;
DROP POLICY IF EXISTS "Users can update their own workout routines" ON workout_routines;
DROP POLICY IF EXISTS "Users can delete their own workout routines" ON workout_routines;

DROP POLICY IF EXISTS "Users can view exercises in their own routines" ON routine_exercises;
DROP POLICY IF EXISTS "Users can create exercises in their own routines" ON routine_exercises;
DROP POLICY IF EXISTS "Users can update exercises in their own routines" ON routine_exercises;
DROP POLICY IF EXISTS "Users can delete exercises in their own routines" ON routine_exercises;

DROP POLICY IF EXISTS "Users can view their own workout sessions" ON workout_sessions;
DROP POLICY IF EXISTS "Users can create their own workout sessions" ON workout_sessions;
DROP POLICY IF EXISTS "Users can update their own workout sessions" ON workout_sessions;
DROP POLICY IF EXISTS "Users can delete their own workout sessions" ON workout_sessions;

DROP POLICY IF EXISTS "Users can view exercises in their own workout sessions" ON workout_session_exercises;
DROP POLICY IF EXISTS "Users can create exercises in their own workout sessions" ON workout_session_exercises;
DROP POLICY IF EXISTS "Users can update exercises in their own workout sessions" ON workout_session_exercises;
DROP POLICY IF EXISTS "Users can delete exercises in their own workout sessions" ON workout_session_exercises;

DROP POLICY IF EXISTS "Users can view their own exercise favorites" ON user_exercise_favorites;
DROP POLICY IF EXISTS "Users can create their own exercise favorites" ON user_exercise_favorites;
DROP POLICY IF EXISTS "Users can delete their own exercise favorites" ON user_exercise_favorites;

-- Create new policies that respect user types and data access rules

-- Profiles table policies
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (
    auth.uid() = id OR 
    user_has_permission(auth.uid(), 'can_access_client_profiles')
  );

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (
    auth.uid() = id OR 
    user_has_permission(auth.uid(), 'can_access_client_profiles')
  );

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (
    auth.uid() = id OR 
    user_has_permission(auth.uid(), 'can_access_client_profiles')
  );

-- Workout routines table policies
CREATE POLICY "Users can view workout routines based on data access" ON workout_routines
  FOR SELECT USING (
    -- Users can always view their own routines
    auth.uid() = user_id OR
    -- Trainers can view their clients' routines
    (user_has_permission(auth.uid(), 'can_access_client_workouts') AND
     EXISTS (
       SELECT 1 FROM user_type_assignments uta
       WHERE uta.user_id = workout_routines.user_id
       AND uta.user_type_id IN (
         SELECT id FROM user_types 
         WHERE name IN ('regular', 'basic')
       )
     ))
  );

CREATE POLICY "Users can create workout routines based on data access" ON workout_routines
  FOR INSERT WITH CHECK (
    -- Users can always create their own routines
    auth.uid() = user_id OR
    -- Trainers can create routines for their clients
    (user_has_permission(auth.uid(), 'can_access_client_workouts') AND
     EXISTS (
       SELECT 1 FROM user_type_assignments uta
       WHERE uta.user_id = workout_routines.user_id
       AND uta.user_type_id IN (
         SELECT id FROM user_types 
         WHERE name IN ('regular', 'basic')
       )
     ))
  );

CREATE POLICY "Users can update workout routines based on data access" ON workout_routines
  FOR UPDATE USING (
    -- Users can always update their own routines
    auth.uid() = user_id OR
    -- Trainers can update their clients' routines
    (user_has_permission(auth.uid(), 'can_access_client_workouts') AND
     EXISTS (
       SELECT 1 FROM user_type_assignments uta
       WHERE uta.user_id = workout_routines.user_id
       AND uta.user_type_id IN (
         SELECT id FROM user_types 
         WHERE name IN ('regular', 'basic')
       )
     ))
  );

CREATE POLICY "Users can delete workout routines based on data access" ON workout_routines
  FOR DELETE USING (
    -- Users can always delete their own routines
    auth.uid() = user_id OR
    -- Trainers can delete their clients' routines
    (user_has_permission(auth.uid(), 'can_access_client_workouts') AND
     EXISTS (
       SELECT 1 FROM user_type_assignments uta
       WHERE uta.user_id = workout_routines.user_id
       AND uta.user_type_id IN (
         SELECT id FROM user_types 
         WHERE name IN ('regular', 'basic')
       )
     ))
  );

-- Routine exercises table policies
CREATE POLICY "Users can view routine exercises based on data access" ON routine_exercises
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM workout_routines wr
      WHERE wr.id = routine_exercises.routine_id
      AND (
        wr.user_id = auth.uid() OR
        (user_has_permission(auth.uid(), 'can_access_client_workouts') AND
         EXISTS (
           SELECT 1 FROM user_type_assignments uta
           WHERE uta.user_id = wr.user_id
           AND uta.user_type_id IN (
             SELECT id FROM user_types 
             WHERE name IN ('regular', 'basic')
           )
         ))
      )
    )
  );

CREATE POLICY "Users can create routine exercises based on data access" ON routine_exercises
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM workout_routines wr
      WHERE wr.id = routine_exercises.routine_id
      AND (
        wr.user_id = auth.uid() OR
        (user_has_permission(auth.uid(), 'can_access_client_workouts') AND
         EXISTS (
           SELECT 1 FROM user_type_assignments uta
           WHERE uta.user_id = wr.user_id
           AND uta.user_type_id IN (
             SELECT id FROM user_types 
             WHERE name IN ('regular', 'basic')
           )
         ))
      )
    )
  );

CREATE POLICY "Users can update routine exercises based on data access" ON routine_exercises
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM workout_routines wr
      WHERE wr.id = routine_exercises.routine_id
      AND (
        wr.user_id = auth.uid() OR
        (user_has_permission(auth.uid(), 'can_access_client_workouts') AND
         EXISTS (
           SELECT 1 FROM user_type_assignments uta
           WHERE uta.user_id = wr.user_id
           AND uta.user_type_id IN (
             SELECT id FROM user_types 
             WHERE name IN ('regular', 'basic')
           )
         ))
      )
    )
  );

CREATE POLICY "Users can delete routine exercises based on data access" ON routine_exercises
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM workout_routines wr
      WHERE wr.id = routine_exercises.routine_id
      AND (
        wr.user_id = auth.uid() OR
        (user_has_permission(auth.uid(), 'can_access_client_workouts') AND
         EXISTS (
           SELECT 1 FROM user_type_assignments uta
           WHERE uta.user_id = wr.user_id
           AND uta.user_type_id IN (
             SELECT id FROM user_types 
             WHERE name IN ('regular', 'basic')
           )
         ))
      )
    )
  );

-- Workout sessions table policies
CREATE POLICY "Users can view workout sessions based on data access" ON workout_sessions
  FOR SELECT USING (
    -- Users can always view their own sessions
    auth.uid() = user_id OR
    -- Trainers can view their clients' sessions
    (user_has_permission(auth.uid(), 'can_access_client_workouts') AND
     EXISTS (
       SELECT 1 FROM user_type_assignments uta
       WHERE uta.user_id = workout_sessions.user_id
       AND uta.user_type_id IN (
         SELECT id FROM user_types 
         WHERE name IN ('regular', 'basic')
       )
     ))
  );

CREATE POLICY "Users can create workout sessions based on data access" ON workout_sessions
  FOR INSERT WITH CHECK (
    -- Users can always create their own sessions
    auth.uid() = user_id OR
    -- Trainers can create sessions for their clients
    (user_has_permission(auth.uid(), 'can_access_client_workouts') AND
     EXISTS (
       SELECT 1 FROM user_type_assignments uta
       WHERE uta.user_id = workout_sessions.user_id
       AND uta.user_type_id IN (
         SELECT id FROM user_types 
         WHERE name IN ('regular', 'basic')
       )
     ))
  );

CREATE POLICY "Users can update workout sessions based on data access" ON workout_sessions
  FOR UPDATE USING (
    -- Users can always update their own sessions
    auth.uid() = user_id OR
    -- Trainers can update their clients' sessions
    (user_has_permission(auth.uid(), 'can_access_client_workouts') AND
     EXISTS (
       SELECT 1 FROM user_type_assignments uta
       WHERE uta.user_id = workout_sessions.user_id
       AND uta.user_type_id IN (
         SELECT id FROM user_types 
         WHERE name IN ('regular', 'basic')
       )
     ))
  );

CREATE POLICY "Users can delete workout sessions based on data access" ON workout_sessions
  FOR DELETE USING (
    -- Users can always delete their own sessions
    auth.uid() = user_id OR
    -- Trainers can delete their clients' sessions
    (user_has_permission(auth.uid(), 'can_access_client_workouts') AND
     EXISTS (
       SELECT 1 FROM user_type_assignments uta
       WHERE uta.user_id = workout_sessions.user_id
       AND uta.user_type_id IN (
         SELECT id FROM user_types 
         WHERE name IN ('regular', 'basic')
       )
     ))
  );

-- Workout session exercises table policies
CREATE POLICY "Users can view session exercises based on data access" ON workout_session_exercises
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM workout_sessions ws
      WHERE ws.id = workout_session_exercises.workout_session_id
      AND (
        ws.user_id = auth.uid() OR
        (user_has_permission(auth.uid(), 'can_access_client_workouts') AND
         EXISTS (
           SELECT 1 FROM user_type_assignments uta
           WHERE uta.user_id = ws.user_id
           AND uta.user_type_id IN (
             SELECT id FROM user_types 
             WHERE name IN ('regular', 'basic')
           )
         ))
      )
    )
  );

CREATE POLICY "Users can create session exercises based on data access" ON workout_session_exercises
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM workout_sessions ws
      WHERE ws.id = workout_session_exercises.workout_session_id
      AND (
        ws.user_id = auth.uid() OR
        (user_has_permission(auth.uid(), 'can_access_client_workouts') AND
         EXISTS (
           SELECT 1 FROM user_type_assignments uta
           WHERE uta.user_id = ws.user_id
           AND uta.user_type_id IN (
             SELECT id FROM user_types 
             WHERE name IN ('regular', 'basic')
           )
         ))
      )
    )
  );

CREATE POLICY "Users can update session exercises based on data access" ON workout_session_exercises
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM workout_sessions ws
      WHERE ws.id = workout_session_exercises.workout_session_id
      AND (
        ws.user_id = auth.uid() OR
        (user_has_permission(auth.uid(), 'can_access_client_workouts') AND
         EXISTS (
           SELECT 1 FROM user_type_assignments uta
           WHERE uta.user_id = ws.user_id
           AND uta.user_type_id IN (
             SELECT id FROM user_types 
             WHERE name IN ('regular', 'basic')
           )
         ))
      )
    )
  );

CREATE POLICY "Users can delete session exercises based on data access" ON workout_session_exercises
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM workout_sessions ws
      WHERE ws.id = workout_session_exercises.workout_session_id
      AND (
        ws.user_id = auth.uid() OR
        (user_has_permission(auth.uid(), 'can_access_client_workouts') AND
         EXISTS (
           SELECT 1 FROM user_type_assignments uta
           WHERE uta.user_id = ws.user_id
           AND uta.user_type_id IN (
             SELECT id FROM user_types 
             WHERE name IN ('regular', 'basic')
           )
         ))
      )
    )
  );

-- User exercise favorites table policies
CREATE POLICY "Users can view exercise favorites based on data access" ON user_exercise_favorites
  FOR SELECT USING (
    -- Users can always view their own favorites
    auth.uid() = user_id OR
    -- Trainers can view their clients' favorites
    (user_has_permission(auth.uid(), 'can_access_client_workouts') AND
     EXISTS (
       SELECT 1 FROM user_type_assignments uta
       WHERE uta.user_id = user_exercise_favorites.user_id
       AND uta.user_type_id IN (
         SELECT id FROM user_types 
         WHERE name IN ('regular', 'basic')
       )
     ))
  );

CREATE POLICY "Users can create exercise favorites based on data access" ON user_exercise_favorites
  FOR INSERT WITH CHECK (
    -- Users can always create their own favorites
    auth.uid() = user_id OR
    -- Trainers can create favorites for their clients
    (user_has_permission(auth.uid(), 'can_access_client_workouts') AND
     EXISTS (
       SELECT 1 FROM user_type_assignments uta
       WHERE uta.user_id = user_exercise_favorites.user_id
       AND uta.user_type_id IN (
         SELECT id FROM user_types 
         WHERE name IN ('regular', 'basic')
       )
     ))
  );

CREATE POLICY "Users can delete exercise favorites based on data access" ON user_exercise_favorites
  FOR DELETE USING (
    -- Users can always delete their own favorites
    auth.uid() = user_id OR
    -- Trainers can delete their clients' favorites
    (user_has_permission(auth.uid(), 'can_access_client_workouts') AND
     EXISTS (
       SELECT 1 FROM user_type_assignments uta
       WHERE uta.user_id = user_exercise_favorites.user_id
       AND uta.user_type_id IN (
         SELECT id FROM user_types 
         WHERE name IN ('regular', 'basic')
       )
     ))
  );
