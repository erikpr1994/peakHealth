-- Exercise System Database Schema
-- Migration: 002_create_exercise_system.sql

-- Exercise categories enum
CREATE TYPE exercise_category AS ENUM ('Strength', 'Cardio', 'Flexibility', 'Balance');

-- Difficulty levels enum
CREATE TYPE exercise_difficulty AS ENUM ('Beginner', 'Intermediate', 'Advanced', 'Unknown');

-- Equipment types enum
CREATE TYPE exercise_equipment AS ENUM (
  'Barbell', 'Dumbbell', 'Bodyweight', 'Machine', 'Resistance Band', 
  'Kettlebell', 'Cable', 'Bench', 'Incline Bench', 'Decline Bench', 
  'Pull-up Bar', 'Squat Rack', 'Step'
);

-- Muscle groups enum
CREATE TYPE muscle_group AS ENUM (
  'Chest', 'Back', 'Legs', 'Arms', 'Shoulders', 'Core', 'Glutes', 
  'Biceps', 'Triceps', 'Cardio', 'Full Body', 'Upper Chest', 
  'Lower Chest', 'Front Delts', 'Obliques', 'Quadriceps', 'Hamstrings'
);

-- Main exercises table
CREATE TABLE exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  alternative_names TEXT[], -- Array of alternative names
  category exercise_category NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(50) DEFAULT '🏋️',
  icon_color VARCHAR(100) DEFAULT 'bg-indigo-100 text-indigo-600',
  is_popular BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT false,
  rating DECIMAL(3,2) CHECK (rating >= 0 AND rating <= 5),
  tags TEXT[], -- Array of tags for search
  related_exercise_ids UUID[], -- Array of related exercise IDs
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Exercise variants table (detailed exercise data)
CREATE TABLE exercise_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exercise_id UUID REFERENCES exercises(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  alternative_names TEXT[], -- Array of alternative names
  description TEXT NOT NULL,
  focus VARCHAR(200) NOT NULL,
  difficulty exercise_difficulty NOT NULL,
  equipment exercise_equipment[] NOT NULL, -- Array of equipment types
  muscle_groups muscle_group[] NOT NULL, -- Array of primary muscle groups
  secondary_muscles muscle_group[], -- Array of secondary muscle groups
  is_unilateral BOOLEAN DEFAULT false,
  instructions TEXT[] NOT NULL, -- Array of instruction steps
  prerequisites UUID[], -- Array of prerequisite variant IDs
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Exercise instruction steps table (detailed step-by-step instructions)
CREATE TABLE exercise_instruction_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exercise_variant_id UUID REFERENCES exercise_variants(id) ON DELETE CASCADE,
  step_order INTEGER NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(exercise_variant_id, step_order)
);

-- Exercise tips table
CREATE TABLE exercise_tips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exercise_variant_id UUID REFERENCES exercise_variants(id) ON DELETE CASCADE,
  pro_tips TEXT[] NOT NULL, -- Array of pro tips
  common_mistakes TEXT[] NOT NULL, -- Array of common mistakes
  safety_notes TEXT[], -- Array of safety notes
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Exercise media table
CREATE TABLE exercise_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exercise_variant_id UUID REFERENCES exercise_variants(id) ON DELETE CASCADE,
  images TEXT[], -- Array of image URLs
  videos TEXT[], -- Array of video URLs
  featured_image VARCHAR(500),
  featured_video VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User exercise favorites table
CREATE TABLE user_exercise_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  exercise_id UUID REFERENCES exercises(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, exercise_id)
);

-- Exercise ratings table
CREATE TABLE exercise_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  exercise_id UUID REFERENCES exercises(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  review TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, exercise_id)
);

-- Workout routines table
CREATE TABLE workout_routines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  schedule TEXT, -- e.g., "Mon, Wed, Fri"
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Routine exercises table (many-to-many relationship)
CREATE TABLE routine_exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  routine_id UUID REFERENCES workout_routines(id) ON DELETE CASCADE,
  exercise_variant_id UUID REFERENCES exercise_variants(id) ON DELETE CASCADE,
  exercise_order INTEGER NOT NULL,
  sets INTEGER DEFAULT 3,
  reps INTEGER DEFAULT 10,
  rest_time_seconds INTEGER DEFAULT 60,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(routine_id, exercise_order)
);

-- Workout sessions table
CREATE TABLE workout_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  routine_id UUID REFERENCES workout_routines(id) ON DELETE CASCADE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER,
  notes TEXT
);

-- Workout session exercises table (tracking actual performance)
CREATE TABLE workout_session_exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workout_session_id UUID REFERENCES workout_sessions(id) ON DELETE CASCADE,
  exercise_variant_id UUID REFERENCES exercise_variants(id) ON DELETE CASCADE,
  exercise_order INTEGER NOT NULL,
  sets_completed INTEGER DEFAULT 0,
  reps_completed INTEGER DEFAULT 0,
  weight_kg DECIMAL(5,2),
  rest_time_seconds INTEGER,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_exercises_category ON exercises(category);
CREATE INDEX idx_exercises_name ON exercises(name);
CREATE INDEX idx_exercises_tags ON exercises USING GIN(tags);
CREATE INDEX idx_exercise_variants_exercise_id ON exercise_variants(exercise_id);
CREATE INDEX idx_exercise_variants_difficulty ON exercise_variants(difficulty);
CREATE INDEX idx_exercise_variants_equipment ON exercise_variants USING GIN(equipment);
CREATE INDEX idx_exercise_variants_muscle_groups ON exercise_variants USING GIN(muscle_groups);
CREATE INDEX idx_user_exercise_favorites_user_id ON user_exercise_favorites(user_id);
CREATE INDEX idx_exercise_ratings_exercise_id ON exercise_ratings(exercise_id);
CREATE INDEX idx_workout_routines_user_id ON workout_routines(user_id);
CREATE INDEX idx_routine_exercises_routine_id ON routine_exercises(routine_id);
CREATE INDEX idx_workout_sessions_user_id ON workout_sessions(user_id);

-- Enable Row Level Security
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_instruction_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_tips ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_exercise_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_routines ENABLE ROW LEVEL SECURITY;
ALTER TABLE routine_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_session_exercises ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Exercises: Everyone can read, only authenticated users can create/update
CREATE POLICY "Exercises are viewable by everyone" ON exercises
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create exercises" ON exercises
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update exercises" ON exercises
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Exercise variants: Everyone can read, only authenticated users can create/update
CREATE POLICY "Exercise variants are viewable by everyone" ON exercise_variants
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create exercise variants" ON exercise_variants
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update exercise variants" ON exercise_variants
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Exercise instruction steps: Everyone can read, only authenticated users can create/update
CREATE POLICY "Exercise instruction steps are viewable by everyone" ON exercise_instruction_steps
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create exercise instruction steps" ON exercise_instruction_steps
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update exercise instruction steps" ON exercise_instruction_steps
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Exercise tips: Everyone can read, only authenticated users can create/update
CREATE POLICY "Exercise tips are viewable by everyone" ON exercise_tips
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create exercise tips" ON exercise_tips
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update exercise tips" ON exercise_tips
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Exercise media: Everyone can read, only authenticated users can create/update
CREATE POLICY "Exercise media are viewable by everyone" ON exercise_media
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create exercise media" ON exercise_media
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update exercise media" ON exercise_media
  FOR UPDATE USING (auth.role() = 'authenticated');

-- User exercise favorites: Users can only access their own favorites
CREATE POLICY "Users can view their own exercise favorites" ON user_exercise_favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own exercise favorites" ON user_exercise_favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own exercise favorites" ON user_exercise_favorites
  FOR DELETE USING (auth.uid() = user_id);

-- Exercise ratings: Everyone can read, users can only manage their own ratings
CREATE POLICY "Exercise ratings are viewable by everyone" ON exercise_ratings
  FOR SELECT USING (true);

CREATE POLICY "Users can create their own exercise ratings" ON exercise_ratings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own exercise ratings" ON exercise_ratings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own exercise ratings" ON exercise_ratings
  FOR DELETE USING (auth.uid() = user_id);

-- Workout routines: Users can only access their own routines
CREATE POLICY "Users can view their own workout routines" ON workout_routines
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own workout routines" ON workout_routines
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own workout routines" ON workout_routines
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own workout routines" ON workout_routines
  FOR DELETE USING (auth.uid() = user_id);

-- Routine exercises: Users can only access exercises in their own routines
CREATE POLICY "Users can view exercises in their own routines" ON routine_exercises
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM workout_routines wr 
      WHERE wr.id = routine_exercises.routine_id 
      AND wr.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create exercises in their own routines" ON routine_exercises
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM workout_routines wr 
      WHERE wr.id = routine_exercises.routine_id 
      AND wr.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update exercises in their own routines" ON routine_exercises
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM workout_routines wr 
      WHERE wr.id = routine_exercises.routine_id 
      AND wr.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete exercises in their own routines" ON routine_exercises
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM workout_routines wr 
      WHERE wr.id = routine_exercises.routine_id 
      AND wr.user_id = auth.uid()
    )
  );

-- Workout sessions: Users can only access their own sessions
CREATE POLICY "Users can view their own workout sessions" ON workout_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own workout sessions" ON workout_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own workout sessions" ON workout_sessions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own workout sessions" ON workout_sessions
  FOR DELETE USING (auth.uid() = user_id);

-- Workout session exercises: Users can only access exercises in their own sessions
CREATE POLICY "Users can view exercises in their own workout sessions" ON workout_session_exercises
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM workout_sessions ws 
      WHERE ws.id = workout_session_exercises.workout_session_id 
      AND ws.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create exercises in their own workout sessions" ON workout_session_exercises
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM workout_sessions ws 
      WHERE ws.id = workout_session_exercises.workout_session_id 
      AND ws.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update exercises in their own workout sessions" ON workout_session_exercises
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM workout_sessions ws 
      WHERE ws.id = workout_session_exercises.workout_session_id 
      AND ws.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete exercises in their own workout sessions" ON workout_session_exercises
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM workout_sessions ws 
      WHERE ws.id = workout_session_exercises.workout_session_id 
      AND ws.user_id = auth.uid()
    )
  );

-- Helper functions

-- Function to get exercise with all its variants
CREATE OR REPLACE FUNCTION get_exercise_with_variants(exercise_id_param UUID)
RETURNS TABLE (
  exercise_id UUID,
  exercise_name VARCHAR(200),
  exercise_category exercise_category,
  exercise_description TEXT,
  exercise_icon VARCHAR(50),
  exercise_icon_color VARCHAR(100),
  exercise_is_popular BOOLEAN,
  exercise_is_new BOOLEAN,
  exercise_rating DECIMAL(3,2),
  exercise_tags TEXT[],
  variant_id UUID,
  variant_name VARCHAR(200),
  variant_description TEXT,
  variant_focus VARCHAR(200),
  variant_difficulty exercise_difficulty,
  variant_equipment exercise_equipment[],
  variant_muscle_groups muscle_group[],
  variant_secondary_muscles muscle_group[],
  variant_is_unilateral BOOLEAN,
  variant_instructions TEXT[]
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    e.id as exercise_id,
    e.name as exercise_name,
    e.category as exercise_category,
    e.description as exercise_description,
    e.icon as exercise_icon,
    e.icon_color as exercise_icon_color,
    e.is_popular as exercise_is_popular,
    e.is_new as exercise_is_new,
    e.rating as exercise_rating,
    e.tags as exercise_tags,
    ev.id as variant_id,
    ev.name as variant_name,
    ev.description as variant_description,
    ev.focus as variant_focus,
    ev.difficulty as variant_difficulty,
    ev.equipment as variant_equipment,
    ev.muscle_groups as variant_muscle_groups,
    ev.secondary_muscles as variant_secondary_muscles,
    ev.is_unilateral as variant_is_unilateral,
    ev.instructions as variant_instructions
  FROM exercises e
  LEFT JOIN exercise_variants ev ON e.id = ev.exercise_id
  WHERE e.id = exercise_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to search exercises by various criteria
CREATE OR REPLACE FUNCTION search_exercises(
  search_term TEXT DEFAULT NULL,
  category_filter exercise_category DEFAULT NULL,
  difficulty_filter exercise_difficulty DEFAULT NULL,
  equipment_filter exercise_equipment DEFAULT NULL,
  muscle_group_filter muscle_group DEFAULT NULL
)
RETURNS TABLE (
  exercise_id UUID,
  exercise_name VARCHAR(200),
  exercise_category exercise_category,
  exercise_description TEXT,
  exercise_icon VARCHAR(50),
  exercise_icon_color VARCHAR(100),
  exercise_is_popular BOOLEAN,
  exercise_is_new BOOLEAN,
  exercise_rating DECIMAL(3,2),
  exercise_tags TEXT[],
  variant_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    e.id as exercise_id,
    e.name as exercise_name,
    e.category as exercise_category,
    e.description as exercise_description,
    e.icon as exercise_icon,
    e.icon_color as exercise_icon_color,
    e.is_popular as exercise_is_popular,
    e.is_new as exercise_is_new,
    e.rating as exercise_rating,
    e.tags as exercise_tags,
    COUNT(ev.id) as variant_count
  FROM exercises e
  LEFT JOIN exercise_variants ev ON e.id = ev.exercise_id
  WHERE 
    (search_term IS NULL OR 
     e.name ILIKE '%' || search_term || '%' OR 
     e.description ILIKE '%' || search_term || '%' OR
     e.tags && ARRAY[search_term])
    AND (category_filter IS NULL OR e.category = category_filter)
    AND (difficulty_filter IS NULL OR ev.difficulty = difficulty_filter)
    AND (equipment_filter IS NULL OR ev.equipment @> ARRAY[equipment_filter])
    AND (muscle_group_filter IS NULL OR ev.muscle_groups @> ARRAY[muscle_group_filter])
  GROUP BY e.id, e.name, e.category, e.description, e.icon, e.icon_color, 
           e.is_popular, e.is_new, e.rating, e.tags
  ORDER BY e.name;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's favorite exercises
CREATE OR REPLACE FUNCTION get_user_favorite_exercises(user_id_param UUID)
RETURNS TABLE (
  exercise_id UUID,
  exercise_name VARCHAR(200),
  exercise_category exercise_category,
  exercise_description TEXT,
  exercise_icon VARCHAR(50),
  exercise_icon_color VARCHAR(100),
  exercise_rating DECIMAL(3,2),
  favorited_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    e.id as exercise_id,
    e.name as exercise_name,
    e.category as exercise_category,
    e.description as exercise_description,
    e.icon as exercise_icon,
    e.icon_color as exercise_icon_color,
    e.rating as exercise_rating,
    uef.created_at as favorited_at
  FROM exercises e
  JOIN user_exercise_favorites uef ON e.id = uef.exercise_id
  WHERE uef.user_id = user_id_param
  ORDER BY uef.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's workout routines
CREATE OR REPLACE FUNCTION get_user_workout_routines(user_id_param UUID)
RETURNS TABLE (
  routine_id UUID,
  routine_name VARCHAR(200),
  routine_description TEXT,
  routine_schedule TEXT,
  routine_is_active BOOLEAN,
  exercise_count BIGINT,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    wr.id as routine_id,
    wr.name as routine_name,
    wr.description as routine_description,
    wr.schedule as routine_schedule,
    wr.is_active as routine_is_active,
    COUNT(re.id) as exercise_count,
    wr.created_at
  FROM workout_routines wr
  LEFT JOIN routine_exercises re ON wr.id = re.routine_id
  WHERE wr.user_id = user_id_param
  GROUP BY wr.id, wr.name, wr.description, wr.schedule, wr.is_active, wr.created_at
  ORDER BY wr.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 