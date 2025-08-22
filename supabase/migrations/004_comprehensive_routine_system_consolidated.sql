-- Comprehensive Routine System Database Schema - Consolidated Migration
-- This migration combines all routine-related migrations (005-013) into a single file
-- Migration: 005_comprehensive_routine_system_consolidated.sql

-- Drop existing simple routine tables if they exist
DROP TABLE IF EXISTS routine_exercises CASCADE;
DROP TABLE IF EXISTS workout_routines CASCADE;

-- Create enums for the routine system
CREATE TYPE routine_difficulty AS ENUM ('Beginner', 'Intermediate', 'Advanced');
CREATE TYPE routine_goal AS ENUM ('Strength', 'Hypertrophy', 'Endurance', 'Weight Loss');
CREATE TYPE workout_type AS ENUM ('strength', 'running', 'trail-running', 'swimming', 'cycling');
CREATE TYPE section_type AS ENUM ('warmup', 'basic', 'cooldown', 'emom', 'tabata', 'amrap');
CREATE TYPE progression_method AS ENUM ('linear', 'dual', 'inverse-pyramid', 'myo-reps', 'widowmaker', 'amrap');
CREATE TYPE trail_running_difficulty AS ENUM ('beginner', 'intermediate', 'advanced', 'expert');
CREATE TYPE interval_type AS ENUM ('Run', 'Uphill', 'Downhill', 'Sprint', 'Recovery', 'Rest', 'Walk');
CREATE TYPE intensity_target_type AS ENUM ('Heart Rate', 'Speed', 'Power', 'Cadence', 'RPE');

-- Main routine tables
CREATE TABLE routines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  difficulty routine_difficulty NOT NULL DEFAULT 'Beginner',
  goal routine_goal NOT NULL,
  duration INTEGER NOT NULL DEFAULT 12 CHECK (duration BETWEEN 1 AND 52),
  is_active BOOLEAN DEFAULT false,
  is_favorite BOOLEAN DEFAULT false,
  objectives TEXT[],
  total_workouts INTEGER DEFAULT 0,
  completed_workouts INTEGER DEFAULT 0,
  estimated_duration VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_used TIMESTAMP WITH TIME ZONE
);

CREATE TABLE workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  routine_id UUID REFERENCES routines(id) ON DELETE SET NULL, -- Allow NULL to preserve historical data
  name VARCHAR(255) NOT NULL,
  type workout_type NOT NULL,
  objective TEXT,
  schedule JSONB,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE workout_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workout_id UUID NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  type section_type NOT NULL,
  order_index INTEGER NOT NULL,
  rest_after VARCHAR(50),
  emom_duration INTEGER,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE routine_exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID NOT NULL REFERENCES workout_sections(id) ON DELETE CASCADE,
  exercise_library_id UUID REFERENCES exercise_variants(id),
  order_index INTEGER NOT NULL,
  rest_timer VARCHAR(50),
  rest_after VARCHAR(50),
  notes TEXT,
  progression_method progression_method,
  has_approach_sets BOOLEAN DEFAULT false,
  emom_reps INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE exercise_sets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exercise_id UUID NOT NULL REFERENCES routine_exercises(id) ON DELETE CASCADE,
  set_number INTEGER NOT NULL,
  reps VARCHAR(50),
  weight VARCHAR(50),
  duration VARCHAR(50),
  rest_time VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE trail_running_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workout_id UUID NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  difficulty trail_running_difficulty NOT NULL DEFAULT 'beginner',
  estimated_duration INTEGER,
  target_distance DECIMAL(8,2),
  elevation_gain INTEGER,
  intensity_target_type intensity_target_type,
  intensity_target_value VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE trail_running_intervals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID NOT NULL REFERENCES workout_sections(id) ON DELETE CASCADE,
  interval_type interval_type NOT NULL,
  duration_minutes INTEGER,
  distance_km DECIMAL(6,2),
  elevation_gain INTEGER,
  intensity_target VARCHAR(100),
  repeat_count INTEGER DEFAULT 1,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit tables for preserving historical data
CREATE TABLE deleted_routines (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  difficulty routine_difficulty,
  goal routine_goal,
  duration INTEGER,
  is_active BOOLEAN,
  is_favorite BOOLEAN,
  objectives TEXT[],
  total_workouts INTEGER,
  completed_workouts INTEGER,
  estimated_duration VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  last_used TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deletion_reason TEXT DEFAULT 'User deleted routine'
);

CREATE TABLE deleted_workouts (
  id UUID PRIMARY KEY,
  routine_id UUID,
  name VARCHAR(255) NOT NULL,
  type workout_type NOT NULL,
  objective TEXT,
  schedule JSONB,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deletion_reason TEXT DEFAULT 'Routine deleted'
);

-- Create indexes for performance
CREATE INDEX idx_routines_user_id ON routines(user_id);
CREATE INDEX idx_routines_is_active ON routines(is_active);
CREATE INDEX idx_routines_is_favorite ON routines(is_favorite);
CREATE INDEX idx_workouts_routine_id ON workouts(routine_id);
CREATE INDEX idx_workouts_order_index ON workouts(order_index);
CREATE INDEX idx_workout_sections_workout_id ON workout_sections(workout_id);
CREATE INDEX idx_workout_sections_order_index ON workout_sections(order_index);
CREATE INDEX idx_routine_exercises_section_id ON routine_exercises(section_id);
CREATE INDEX idx_routine_exercises_order_index ON routine_exercises(order_index);
CREATE INDEX idx_exercise_sets_exercise_id ON exercise_sets(exercise_id);
CREATE INDEX idx_exercise_sets_set_number ON exercise_sets(set_number);
CREATE INDEX idx_trail_running_data_workout_id ON trail_running_data(workout_id);
CREATE INDEX idx_trail_running_intervals_section_id ON trail_running_intervals(section_id);
CREATE INDEX idx_trail_running_intervals_order_index ON trail_running_intervals(order_index);

-- Enable Row Level Security
ALTER TABLE routines ENABLE ROW LEVEL SECURITY;
ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE routine_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE trail_running_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE trail_running_intervals ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own routines" ON routines
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own routines" ON routines
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own routines" ON routines
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own routines" ON routines
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view workouts in their own routines" ON workouts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM routines r 
      WHERE r.id = workouts.routine_id 
      AND r.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create workouts in their own routines" ON workouts
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM routines r 
      WHERE r.id = workouts.routine_id 
      AND r.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update workouts in their own routines" ON workouts
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM routines r 
      WHERE r.id = workouts.routine_id 
      AND r.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete workouts in their own routines" ON workouts
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM routines r 
      WHERE r.id = workouts.routine_id 
      AND r.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view sections in their own workouts" ON workout_sections
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM workouts w 
      JOIN routines r ON w.routine_id = r.id 
      WHERE w.id = workout_sections.workout_id 
      AND r.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create sections in their own workouts" ON workout_sections
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM workouts w 
      JOIN routines r ON w.routine_id = r.id 
      WHERE w.id = workout_sections.workout_id 
      AND r.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update sections in their own workouts" ON workout_sections
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM workouts w 
      JOIN routines r ON w.routine_id = r.id 
      WHERE w.id = workout_sections.workout_id 
      AND r.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete sections in their own workouts" ON workout_sections
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM workouts w 
      JOIN routines r ON w.routine_id = r.id 
      WHERE w.id = workout_sections.workout_id 
      AND r.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view exercises in their own sections" ON routine_exercises
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM workout_sections ws 
      JOIN workouts w ON ws.workout_id = w.id 
      JOIN routines r ON w.routine_id = r.id 
      WHERE ws.id = routine_exercises.section_id 
      AND r.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create exercises in their own sections" ON routine_exercises
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM workout_sections ws 
      JOIN workouts w ON ws.workout_id = w.id 
      JOIN routines r ON w.routine_id = r.id 
      WHERE ws.id = routine_exercises.section_id 
      AND r.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update exercises in their own sections" ON routine_exercises
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM workout_sections ws 
      JOIN workouts w ON ws.workout_id = w.id 
      JOIN routines r ON w.routine_id = r.id 
      WHERE ws.id = routine_exercises.section_id 
      AND r.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete exercises in their own sections" ON routine_exercises
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM workout_sections ws 
      JOIN workouts w ON ws.workout_id = w.id 
      JOIN routines r ON w.routine_id = r.id 
      WHERE ws.id = routine_exercises.section_id 
      AND r.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view sets in their own exercises" ON exercise_sets
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM routine_exercises e 
      JOIN workout_sections ws ON e.section_id = ws.id 
      JOIN workouts w ON ws.workout_id = w.id 
      JOIN routines r ON w.routine_id = r.id 
      WHERE e.id = exercise_sets.exercise_id 
      AND r.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create sets in their own exercises" ON exercise_sets
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM routine_exercises e 
      JOIN workout_sections ws ON e.section_id = ws.id 
      JOIN workouts w ON ws.workout_id = w.id 
      JOIN routines r ON w.routine_id = r.id 
      WHERE e.id = exercise_sets.exercise_id 
      AND r.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update sets in their own exercises" ON exercise_sets
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM routine_exercises e 
      JOIN workout_sections ws ON e.section_id = ws.id 
      JOIN workouts w ON ws.workout_id = w.id 
      JOIN routines r ON w.routine_id = r.id 
      WHERE e.id = exercise_sets.exercise_id 
      AND r.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete sets in their own exercises" ON exercise_sets
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM routine_exercises e 
      JOIN workout_sections ws ON e.section_id = ws.id 
      JOIN workouts w ON ws.workout_id = w.id 
      JOIN routines r ON w.routine_id = r.id 
      WHERE e.id = exercise_sets.exercise_id 
      AND r.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view trail running data in their own workouts" ON trail_running_data
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM workouts w 
      JOIN routines r ON w.routine_id = r.id 
      WHERE w.id = trail_running_data.workout_id 
      AND r.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create trail running data in their own workouts" ON trail_running_data
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM workouts w 
      JOIN routines r ON w.routine_id = r.id 
      WHERE w.id = trail_running_data.workout_id 
      AND r.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update trail running data in their own workouts" ON trail_running_data
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM workouts w 
      JOIN routines r ON w.routine_id = r.id 
      WHERE w.id = trail_running_data.workout_id 
      AND r.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete trail running data in their own workouts" ON trail_running_data
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM workouts w 
      JOIN routines r ON w.routine_id = r.id 
      WHERE w.id = trail_running_data.workout_id 
      AND r.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view intervals in their own sections" ON trail_running_intervals
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM workout_sections ws 
      JOIN workouts w ON ws.workout_id = w.id 
      JOIN routines r ON w.routine_id = r.id 
      WHERE ws.id = trail_running_intervals.section_id 
      AND r.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create intervals in their own sections" ON trail_running_intervals
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM workout_sections ws 
      JOIN workouts w ON ws.workout_id = w.id 
      JOIN routines r ON w.routine_id = r.id 
      WHERE ws.id = trail_running_intervals.section_id 
      AND r.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update intervals in their own sections" ON trail_running_intervals
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM workout_sections ws 
      JOIN workouts w ON ws.workout_id = w.id 
      JOIN routines r ON w.routine_id = r.id 
      WHERE ws.id = trail_running_intervals.section_id 
      AND r.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete intervals in their own sections" ON trail_running_intervals
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM workout_sections ws 
      JOIN workouts w ON ws.workout_id = w.id 
      JOIN routines r ON w.routine_id = r.id 
      WHERE ws.id = trail_running_intervals.section_id 
      AND r.user_id = auth.uid()
    )
  );

-- Functions

-- Function to get complete routine with all related data
CREATE OR REPLACE FUNCTION get_complete_routine(routine_id_param UUID)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'routine', json_build_object(
      'id', r.id,
      'name', r.name,
      'description', r.description,
      'difficulty', r.difficulty,
      'goal', r.goal,
      'duration', r.duration,
      'isActive', r.is_active,
      'isFavorite', r.is_favorite,
      'objectives', r.objectives,
      'totalWorkouts', r.total_workouts,
      'completedWorkouts', r.completed_workouts,
      'estimatedDuration', r.estimated_duration,
      'createdAt', r.created_at,
      'updatedAt', r.updated_at,
      'lastUsed', r.last_used
    ),
    'workouts', COALESCE(
      (SELECT json_agg(
        json_build_object(
          'id', w.id,
          'name', w.name,
          'type', w.type,
          'objective', w.objective,
          'schedule', w.schedule,
          'orderIndex', w.order_index,
          'sections', COALESCE(
            (SELECT json_agg(
              json_build_object(
                'id', ws.id,
                'name', ws.name,
                'type', ws.type,
                'orderIndex', ws.order_index,
                'restAfter', ws.rest_after,
                'emomDuration', ws.emom_duration,
                'notes', ws.notes,
                'exercises', COALESCE(
                  (SELECT json_agg(
                    json_build_object(
                      'id', e.id,
                      'name', COALESCE(ev.name, 'Unknown Exercise'),
                      'category', ev.focus,
                      'muscleGroups', ev.muscle_groups,
                      'exerciseLibraryId', e.exercise_library_id,
                      'orderIndex', e.order_index,
                      'restTimer', e.rest_timer,
                      'restAfter', e.rest_after,
                      'notes', e.notes,
                      'progressionMethod', e.progression_method,
                      'hasApproachSets', e.has_approach_sets,
                      'emomReps', e.emom_reps,
                      'sets', COALESCE(
                        (SELECT json_agg(
                          json_build_object(
                            'id', es.id,
                            'setNumber', es.set_number,
                            'reps', es.reps,
                            'weight', es.weight,
                            'duration', es.duration,
                            'restTime', es.rest_time,
                            'notes', es.notes
                          ) ORDER BY es.set_number
                        ) FROM exercise_sets es WHERE es.exercise_id = e.id), '[]'::json
                      )
                    ) ORDER BY e.order_index
                  ) FROM routine_exercises e 
                  LEFT JOIN exercise_variants ev ON e.exercise_library_id = ev.id 
                  WHERE e.section_id = ws.id), '[]'::json
                )
              ) ORDER BY ws.order_index
            ) FROM workout_sections ws WHERE ws.workout_id = w.id), '[]'::json
          )
        ) ORDER BY w.order_index
      ) FROM workouts w WHERE w.routine_id = r.id), '[]'::json
    )
  ) INTO result
  FROM routines r
  WHERE r.id = routine_id_param;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create complete routine with all related data
CREATE OR REPLACE FUNCTION create_complete_routine(
  routine_data JSON,
  strength_workouts_data JSON DEFAULT '[]'::JSON,
  running_workouts_data JSON DEFAULT '[]'::JSON
)
RETURNS JSON AS $$
DECLARE
  new_routine_id UUID;
  workout_json JSON;
  section_json JSON;
  exercise_json JSON;
  set_json JSON;
  new_workout_id UUID;
  new_section_id UUID;
  new_exercise_id UUID;
  result JSON;
BEGIN
  -- Start transaction (PostgreSQL functions are automatically wrapped in transactions)
  
  -- Insert routine
  INSERT INTO routines (
    user_id, name, description, difficulty, goal,
    is_active, is_favorite, objectives
  ) VALUES (
    (routine_data->>'userId')::UUID,
    routine_data->>'name',
    routine_data->>'description',
    (routine_data->>'difficulty')::routine_difficulty,
    (routine_data->>'goal')::routine_goal,
    COALESCE((routine_data->>'isActive')::BOOLEAN, false),
    COALESCE((routine_data->>'isFavorite')::BOOLEAN, false),
    (
      SELECT array_agg(value::TEXT)
      FROM json_array_elements_text(routine_data->'objectives')
    )
  ) RETURNING id INTO new_routine_id;

  -- Insert strength workouts
  FOR workout_json IN SELECT value FROM json_array_elements(strength_workouts_data)
  LOOP
    -- Insert workout
    INSERT INTO workouts (
      routine_id, name, type, objective, schedule, order_index
    ) VALUES (
      new_routine_id,
      workout_json->>'name',
      'strength',
      workout_json->>'objective',
      workout_json->'schedule',
      COALESCE(NULLIF(workout_json->>'orderIndex', '')::INTEGER, 0)
    ) RETURNING id INTO new_workout_id;

    -- Insert sections for this workout
    FOR section_json IN SELECT value FROM json_array_elements(workout_json->'sections')
    LOOP
      -- Insert section
      INSERT INTO workout_sections (
        workout_id, name, type, order_index, rest_after, emom_duration
      ) VALUES (
        new_workout_id,
        section_json->>'name',
        (section_json->>'type')::section_type,
        COALESCE(NULLIF(section_json->>'orderIndex', '')::INTEGER, 0),
        COALESCE(NULLIF(section_json->>'restAfter', '')::INTEGER, 0),
        COALESCE(NULLIF(section_json->>'emomDuration', '')::INTEGER, 0)
      ) RETURNING id INTO new_section_id;

      -- Insert exercises for this section
      FOR exercise_json IN SELECT value FROM json_array_elements(section_json->'exercises')
      LOOP
        -- Insert exercise
        INSERT INTO routine_exercises (
          section_id, exercise_library_id,
          order_index, rest_timer, rest_after, progression_method,
          has_approach_sets, emom_reps
        ) VALUES (
          new_section_id,
          COALESCE(
            NULLIF(exercise_json->>'variantId', '')::UUID,
            NULLIF(exercise_json->>'exerciseId', '')::UUID
          ),
          COALESCE(NULLIF(exercise_json->>'orderIndex', '')::INTEGER, 0),
          COALESCE(exercise_json->>'restTimer', '90s'),
          COALESCE(exercise_json->>'restAfter', '2 min'),
          COALESCE((exercise_json->>'progressionMethod')::progression_method, 'linear'),
          COALESCE((exercise_json->>'hasApproachSets')::BOOLEAN, false),
          COALESCE(NULLIF(exercise_json->>'emomReps', '')::INTEGER, 0)
        ) RETURNING id INTO new_exercise_id;

        -- Insert sets for this exercise
        FOR set_json IN SELECT value FROM json_array_elements(exercise_json->'sets')
        LOOP
          INSERT INTO exercise_sets (
            exercise_id, set_number, reps, weight, notes
          ) VALUES (
            new_exercise_id,
            COALESCE(NULLIF(set_json->>'setNumber', '')::INTEGER, 1),
            COALESCE(NULLIF(set_json->>'reps', '')::INTEGER, 0),
            COALESCE(NULLIF(set_json->>'weight', '')::DECIMAL, 0),
            set_json->>'notes'
          );
        END LOOP;
      END LOOP;
    END LOOP;
  END LOOP;

  -- Insert running workouts
  FOR workout_json IN SELECT value FROM json_array_elements(running_workouts_data)
  LOOP
    -- Insert workout
    INSERT INTO workouts (
      routine_id, name, type, objective, schedule, order_index
    ) VALUES (
      new_routine_id,
      workout_json->>'name',
      (workout_json->>'type')::workout_type,
      workout_json->>'objective',
      workout_json->'schedule',
      COALESCE(NULLIF(workout_json->>'orderIndex', '')::INTEGER, 0)
    ) RETURNING id INTO new_workout_id;

    -- Insert trail running data if present
    IF workout_json ? 'trailRunningData' THEN
      INSERT INTO trail_running_data (
        workout_id, name, description, difficulty, estimated_duration,
        target_distance, elevation_gain
      ) VALUES (
        new_workout_id,
        workout_json->'trailRunningData'->>'name',
        workout_json->'trailRunningData'->>'description',
        (workout_json->'trailRunningData'->>'difficulty')::trail_running_difficulty,
        workout_json->'trailRunningData'->>'estimatedDuration',
        COALESCE(NULLIF(workout_json->'trailRunningData'->>'targetDistance', '')::DECIMAL, 0),
        COALESCE(NULLIF(workout_json->'trailRunningData'->>'elevationGain', '')::INTEGER, 0)
      );
    END IF;

    -- Insert sections for this workout
    FOR section_json IN SELECT value FROM json_array_elements(workout_json->'sections')
    LOOP
      -- Insert section
      INSERT INTO workout_sections (
        workout_id, name, type, order_index, rest_after, emom_duration
      ) VALUES (
        new_workout_id,
        section_json->>'name',
        (section_json->>'type')::section_type,
        COALESCE(NULLIF(section_json->>'orderIndex', '')::INTEGER, 0),
        COALESCE(NULLIF(section_json->>'restAfter', '')::INTEGER, 0),
        COALESCE(NULLIF(section_json->>'emomDuration', '')::INTEGER, 0)
      ) RETURNING id INTO new_section_id;

      -- Insert exercises for this section
      FOR exercise_json IN SELECT value FROM json_array_elements(section_json->'exercises')
      LOOP
        -- Insert exercise
        INSERT INTO routine_exercises (
          section_id, exercise_library_id,
          order_index, rest_timer, rest_after, progression_method,
          has_approach_sets, emom_reps
        ) VALUES (
          new_section_id,
          COALESCE(
            NULLIF(exercise_json->>'variantId', '')::UUID,
            NULLIF(exercise_json->>'exerciseId', '')::UUID
          ),
          COALESCE(NULLIF(exercise_json->>'orderIndex', '')::INTEGER, 0),
          COALESCE(exercise_json->>'restTimer', '90s'),
          COALESCE(exercise_json->>'restAfter', '2 min'),
          COALESCE((exercise_json->>'progressionMethod')::progression_method, 'linear'),
          COALESCE((exercise_json->>'hasApproachSets')::BOOLEAN, false),
          COALESCE(NULLIF(exercise_json->>'emomReps', '')::INTEGER, 0)
        ) RETURNING id INTO new_exercise_id;

        -- Insert sets for this exercise
        FOR set_json IN SELECT value FROM json_array_elements(exercise_json->'sets')
        LOOP
          INSERT INTO exercise_sets (
            exercise_id, set_number, reps, weight, notes
          ) VALUES (
            new_exercise_id,
            COALESCE(NULLIF(set_json->>'setNumber', '')::INTEGER, 1),
            COALESCE(NULLIF(set_json->>'reps', '')::INTEGER, 0),
            COALESCE(NULLIF(set_json->>'weight', '')::DECIMAL, 0),
            set_json->>'notes'
          );
        END LOOP;
      END LOOP;
    END LOOP;
  END LOOP;

  -- Return the created routine data
  SELECT json_build_object(
    'success', true,
    'routineId', new_routine_id,
    'message', 'Routine created successfully'
  ) INTO result;

  RETURN result;
EXCEPTION
  WHEN OTHERS THEN
    -- Rollback will happen automatically due to transaction
    RAISE EXCEPTION 'Failed to create routine: % (SQL State: %)', 
      SQLERRM, SQLSTATE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to delete routine while preserving historical data
CREATE OR REPLACE FUNCTION delete_routine(routine_id_param UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    routine_exists BOOLEAN;
    user_id UUID;
    routine_data RECORD;
    result JSON;
BEGIN
    -- Get the current user ID
    user_id := auth.uid();
    
    -- Check if user is authenticated
    IF user_id IS NULL THEN
        RETURN json_build_object(
            'success', false,
            'message', 'Not authenticated'
        );
    END IF;
    
    -- Check if routine exists and belongs to the user
    SELECT EXISTS(
        SELECT 1 FROM routines 
        WHERE id = routine_id_param 
        AND user_id = user_id
    ) INTO routine_exists;
    
    IF NOT routine_exists THEN
        RETURN json_build_object(
            'success', false,
            'message', 'Routine not found or access denied'
        );
    END IF;
    
    -- Get routine data for audit trail
    SELECT * INTO routine_data FROM routines WHERE id = routine_id_param;
    
    -- Begin transaction
    BEGIN
        -- Archive the routine data before deletion
        INSERT INTO deleted_routines (
            id, user_id, name, description, difficulty, goal,
            duration, is_active, is_favorite, objectives,
            total_workouts, completed_workouts, estimated_duration,
            created_at, updated_at, last_used
        ) VALUES (
            routine_data.id, routine_data.user_id, routine_data.name, routine_data.description,
            routine_data.difficulty, routine_data.goal,
            routine_data.duration, routine_data.is_active, routine_data.is_favorite,
            routine_data.objectives, routine_data.total_workouts,
            routine_data.completed_workouts, routine_data.estimated_duration,
            routine_data.created_at, routine_data.updated_at, routine_data.last_used
        );
        
        -- Archive associated workouts before setting routine_id to NULL
        INSERT INTO deleted_workouts (
            id, routine_id, name, type, objective, schedule, order_index,
            created_at, updated_at
        )
        SELECT 
            id, routine_id, name, type, objective, schedule, order_index,
            created_at, updated_at
        FROM workouts 
        WHERE routine_id = routine_id_param;
        
        -- Set routine_id to NULL for all associated workouts (preserves historical data)
        UPDATE workouts 
        SET routine_id = NULL 
        WHERE routine_id = routine_id_param;
        
        -- Now delete the routine (workouts are preserved with NULL routine_id)
        DELETE FROM routines 
        WHERE id = routine_id_param 
        AND user_id = user_id;
        
        -- Check if deletion was successful
        IF FOUND THEN
            result := json_build_object(
                'success', true,
                'message', 'Routine deleted successfully. Historical workout data preserved.'
            );
        ELSE
            result := json_build_object(
                'success', false,
                'message', 'Failed to delete routine'
            );
        END IF;
        
        RETURN result;
        
    EXCEPTION
        WHEN OTHERS THEN
            -- Rollback will happen automatically
            RETURN json_build_object(
                'success', false,
                'message', 'Error deleting routine: ' || SQLERRM
            );
    END;
    
END;
$$;

-- Function to update routine
CREATE OR REPLACE FUNCTION update_routine(
  routine_id_param UUID,
  name TEXT,
  description TEXT,
  difficulty routine_difficulty,
  goal routine_goal,
  duration INTEGER,
  objectives TEXT[]
)
RETURNS VOID AS $$
BEGIN
  UPDATE routines 
  SET 
    name = update_routine.name,
    description = update_routine.description,
    difficulty = update_routine.difficulty,
    goal = update_routine.goal,
    duration = update_routine.duration,
    objectives = update_routine.objectives,
    updated_at = NOW()
  WHERE id = routine_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update routine progress
CREATE OR REPLACE FUNCTION update_routine_progress(
  routine_id_param UUID,
  completed_workouts_increment INTEGER DEFAULT 1
)
RETURNS VOID AS $$
BEGIN
  UPDATE routines 
  SET 
    completed_workouts = completed_workouts + completed_workouts_increment,
    last_used = NOW(),
    updated_at = NOW()
  WHERE id = routine_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at columns
CREATE TRIGGER update_routines_updated_at BEFORE UPDATE ON routines
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workouts_updated_at BEFORE UPDATE ON workouts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workout_sections_updated_at BEFORE UPDATE ON workout_sections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_routine_exercises_updated_at BEFORE UPDATE ON routine_exercises
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_exercise_sets_updated_at BEFORE UPDATE ON exercise_sets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trail_running_data_updated_at BEFORE UPDATE ON trail_running_data
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trail_running_intervals_updated_at BEFORE UPDATE ON trail_running_intervals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION get_complete_routine(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION create_complete_routine(JSON, JSON, JSON) TO authenticated;
GRANT EXECUTE ON FUNCTION delete_routine(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION update_routine(UUID, TEXT, TEXT, routine_difficulty, routine_goal, INTEGER, TEXT[]) TO authenticated;
GRANT EXECUTE ON FUNCTION update_routine_progress(UUID, INTEGER) TO authenticated;

-- Add comments for documentation
COMMENT ON FUNCTION get_complete_routine(UUID) IS 'Gets a complete routine with all workouts, sections, exercises, and sets';
COMMENT ON FUNCTION create_complete_routine(JSON, JSON, JSON) IS 'Creates a complete routine with all related data atomically';
COMMENT ON FUNCTION delete_routine(UUID) IS 'Deletes a routine while preserving historical workout data. Workouts are archived and their routine_id is set to NULL.';
COMMENT ON FUNCTION update_routine(UUID, TEXT, TEXT, routine_difficulty, routine_goal, INTEGER, TEXT[]) IS 'Updates routine metadata';
COMMENT ON FUNCTION update_routine_progress(UUID, INTEGER) IS 'Updates routine progress by incrementing completed workouts count';
COMMENT ON TABLE deleted_routines IS 'Audit trail of deleted routines';
COMMENT ON TABLE deleted_workouts IS 'Audit trail of workouts from deleted routines';
