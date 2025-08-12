-- Comprehensive Routine System Database Schema
-- Migration: 005_create_comprehensive_routine_system.sql

-- Drop existing simple routine tables if they exist
DROP TABLE IF EXISTS routine_exercises CASCADE;
DROP TABLE IF EXISTS workout_routines CASCADE;

-- Create enums for routine system
CREATE TYPE routine_difficulty AS ENUM ('Beginner', 'Intermediate', 'Advanced');
CREATE TYPE routine_goal AS ENUM ('Strength', 'Hypertrophy', 'Endurance', 'Weight Loss');
CREATE TYPE workout_type AS ENUM ('strength', 'running', 'trail-running', 'swimming', 'cycling');
CREATE TYPE section_type AS ENUM ('warmup', 'basic', 'cooldown', 'emom', 'tabata', 'amrap');
CREATE TYPE progression_method AS ENUM ('linear', 'dual', 'inverse-pyramid', 'myo-reps', 'widowmaker', 'amrap');
CREATE TYPE trail_running_difficulty AS ENUM ('beginner', 'intermediate', 'advanced', 'expert');
CREATE TYPE interval_type AS ENUM ('Run', 'Uphill', 'Downhill', 'Sprint', 'Recovery', 'Rest', 'Walk');
CREATE TYPE intensity_target_type AS ENUM ('Heart Rate', 'Speed', 'Power', 'Cadence', 'RPE');

-- Main routines table
CREATE TABLE routines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  difficulty routine_difficulty NOT NULL DEFAULT 'Beginner',
  goal routine_goal NOT NULL,
  days_per_week INTEGER NOT NULL CHECK (days_per_week BETWEEN 1 AND 7),
  duration INTEGER NOT NULL DEFAULT 12 CHECK (duration BETWEEN 1 AND 52), -- Duration in weeks (default 12 weeks = 3 months)
  is_active BOOLEAN DEFAULT false,
  is_favorite BOOLEAN DEFAULT false,
  -- Schedule is calculated dynamically from workout days, not stored
  objectives TEXT[],
  total_workouts INTEGER DEFAULT 0,
  completed_workouts INTEGER DEFAULT 0,
  estimated_duration VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_used TIMESTAMP WITH TIME ZONE
);

-- Workouts table (strength, running, trail-running, etc.)
CREATE TABLE workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  routine_id UUID NOT NULL REFERENCES routines(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  type workout_type NOT NULL,
  objective TEXT,
  schedule JSONB, -- Store complex schedule data as JSON
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Workout sections table
CREATE TABLE workout_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workout_id UUID NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  type section_type NOT NULL,
  order_index INTEGER NOT NULL,
  rest_after VARCHAR(50), -- e.g., "2 min"
  emom_duration INTEGER, -- duration in minutes for EMOM sections
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Routine exercises table (within sections)
CREATE TABLE routine_exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID NOT NULL REFERENCES workout_sections(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  muscle_groups TEXT[],
  exercise_library_id UUID REFERENCES exercise_variants(id), -- Link to exercise library
  order_index INTEGER NOT NULL,
  rest_timer VARCHAR(50), -- e.g., "90s"
  rest_after VARCHAR(50), -- e.g., "2 min"
  notes TEXT,
  progression_method progression_method,
  has_approach_sets BOOLEAN DEFAULT false,
  emom_reps INTEGER, -- target reps per minute for EMOM
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Exercise sets table
CREATE TABLE exercise_sets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exercise_id UUID NOT NULL REFERENCES routine_exercises(id) ON DELETE CASCADE,
  set_number INTEGER NOT NULL,
  reps VARCHAR(50), -- e.g., "8-12", "AMRAP"
  weight VARCHAR(50), -- e.g., "155 lbs", "Bodyweight"
  duration VARCHAR(50), -- e.g., "30s", "1 min"
  rest_time VARCHAR(50), -- e.g., "90s"
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trail running specific data table
CREATE TABLE trail_running_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workout_id UUID NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  difficulty trail_running_difficulty NOT NULL DEFAULT 'beginner',
  estimated_duration INTEGER, -- in minutes
  target_distance DECIMAL(8,2), -- in kilometers
  elevation_gain INTEGER, -- in meters
  intensity_target_type intensity_target_type,
  intensity_target_value VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trail running intervals table
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

-- RLS Policies for routines
CREATE POLICY "Users can view their own routines" ON routines
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own routines" ON routines
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own routines" ON routines
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own routines" ON routines
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for workouts
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

-- RLS Policies for workout_sections
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

-- RLS Policies for routine_exercises
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

-- RLS Policies for exercise_sets
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

-- RLS Policies for trail_running_data
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

-- RLS Policies for trail_running_intervals
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

-- Create functions for common operations

-- Function to get a complete routine with all related data
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
      'daysPerWeek', r.days_per_week,
      'duration', r.duration,
      'isActive', r.is_active,
      'isFavorite', r.is_favorite,
      -- Schedule is calculated dynamically from workout days
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
                             'name', e.name,
                             'category', e.category,
                             'muscleGroups', e.muscle_groups,
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
                         ) FROM routine_exercises e WHERE e.section_id = ws.id), '[]'::json
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

-- Function to create a new routine with workouts
CREATE OR REPLACE FUNCTION create_routine_with_workouts(
  routine_data JSON,
  workouts_data JSON
)
RETURNS UUID AS $$
DECLARE
  new_routine_id UUID;
  workout_record RECORD;
  section_record RECORD;
  exercise_record RECORD;
  set_record RECORD;
BEGIN
  -- Insert routine
  INSERT INTO routines (
    user_id, name, description, difficulty, goal, duration, days_per_week,
    is_active, is_favorite, schedule, objectives, estimated_duration
  ) VALUES (
    (routine_data->>'userId')::UUID,
    routine_data->>'name',
    routine_data->>'description',
    (routine_data->>'difficulty')::routine_difficulty,
    (routine_data->>'goal')::routine_goal,
    COALESCE((routine_data->>'duration')::INTEGER, 12),
    (routine_data->>'daysPerWeek')::INTEGER,
    COALESCE((routine_data->>'isActive')::BOOLEAN, false),
    COALESCE((routine_data->>'isFavorite')::BOOLEAN, false),
    -- Schedule is calculated dynamically, not stored
    COALESCE(
      CASE 
        WHEN routine_data->>'objectives' IS NOT NULL 
        THEN (routine_data->'objectives')::TEXT[]
        ELSE ARRAY[]::TEXT[]
      END,
      ARRAY[]::TEXT[]
    ),
    routine_data->>'estimatedDuration'
  ) RETURNING id INTO new_routine_id;

  -- Insert workouts
  FOR workout_record IN SELECT * FROM json_array_elements(workouts_data)
  LOOP
    INSERT INTO workouts (
      routine_id, name, type, objective, schedule, order_index
    ) VALUES (
      new_routine_id,
      workout_record->>'name',
      (workout_record->>'type')::workout_type,
      workout_record->>'objective',
      workout_record->'schedule',
      (workout_record->>'orderIndex')::INTEGER
    );
  END LOOP;

  RETURN new_routine_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update routine metadata
CREATE OR REPLACE FUNCTION update_routine(
  routine_id_param UUID,
  name TEXT,
  description TEXT,
  difficulty routine_difficulty,
  goal routine_goal,
  duration INTEGER,
  days_per_week INTEGER,
  -- Schedule is calculated dynamically, not stored
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
    days_per_week = update_routine.days_per_week,
    -- Schedule is calculated dynamically, not stored
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

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_routines_updated_at BEFORE UPDATE ON routines
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workouts_updated_at BEFORE UPDATE ON workouts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workout_sections_updated_at BEFORE UPDATE ON workout_sections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_exercises_updated_at BEFORE UPDATE ON exercises
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_exercise_sets_updated_at BEFORE UPDATE ON exercise_sets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trail_running_data_updated_at BEFORE UPDATE ON trail_running_data
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trail_running_intervals_updated_at BEFORE UPDATE ON trail_running_intervals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
