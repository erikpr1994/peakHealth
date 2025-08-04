-- Profile System Database Schema
-- Migration: 003_create_profile_system.sql

-- Profiles table for complex user profile data
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  bio TEXT,
  fitness_level VARCHAR(50),
  time_available VARCHAR(50),
  equipment_access VARCHAR(50),
  experience VARCHAR(50),
  goals TEXT[],
  workout_types TEXT[],
  limitations TEXT,
  motivation TEXT,
  onboarding_completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User statistics table
CREATE TABLE user_stats (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  total_workouts INTEGER DEFAULT 0,
  days_active INTEGER DEFAULT 0,
  hours_trained DECIMAL(5,2) DEFAULT 0,
  achievements_count INTEGER DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User achievements table
CREATE TABLE user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_type VARCHAR(50) NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(50) DEFAULT '🏆',
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Workout sessions table (placeholder for profile system)
CREATE TABLE workout_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX idx_profiles_user_id ON profiles(id);
CREATE INDEX idx_user_stats_user_id ON user_stats(user_id);
CREATE INDEX idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX idx_user_achievements_type ON user_achievements(achievement_type);
CREATE INDEX idx_user_achievements_earned_at ON user_achievements(earned_at);
CREATE INDEX idx_workout_sessions_user_id ON workout_sessions(user_id);
CREATE INDEX idx_workout_sessions_started_at ON workout_sessions(started_at);
CREATE INDEX idx_workout_sessions_completed_at ON workout_sessions(completed_at);

-- Function to get user profile with stats and achievements
CREATE OR REPLACE FUNCTION get_user_profile(user_id_param UUID)
RETURNS TABLE (
  profile_data JSONB,
  stats_data JSONB,
  achievements_data JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(
      (SELECT to_jsonb(p.*) FROM profiles p WHERE p.id = user_id_param),
      '{}'::jsonb
    ) as profile_data,
    COALESCE(
      (SELECT to_jsonb(us.*) FROM user_stats us WHERE us.user_id = user_id_param),
      '{}'::jsonb
    ) as stats_data,
    COALESCE(
      (SELECT jsonb_agg(to_jsonb(ua.*)) FROM user_achievements ua WHERE ua.user_id = user_id_param),
      '[]'::jsonb
    ) as achievements_data;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update user stats from workout data
CREATE OR REPLACE FUNCTION update_user_stats_from_workouts()
RETURNS void AS $$
BEGIN
  -- Update user stats based on workout_sessions data
  INSERT INTO user_stats (user_id, total_workouts, days_active, hours_trained, last_updated)
  SELECT 
    ws.user_id,
    COUNT(*) as total_workouts,
    COUNT(DISTINCT DATE(ws.started_at)) as days_active,
    COALESCE(SUM(EXTRACT(EPOCH FROM (ws.completed_at - ws.started_at)) / 3600), 0) as hours_trained,
    NOW() as last_updated
  FROM workout_sessions ws
  WHERE ws.completed_at IS NOT NULL
  GROUP BY ws.user_id
  ON CONFLICT (user_id) DO UPDATE SET
    total_workouts = EXCLUDED.total_workouts,
    days_active = EXCLUDED.days_active,
    hours_trained = EXCLUDED.hours_trained,
    last_updated = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to calculate and award achievements
CREATE OR REPLACE FUNCTION calculate_user_achievements(user_id_param UUID)
RETURNS void AS $$
DECLARE
  workout_count INTEGER;
  days_active INTEGER;
  hours_trained DECIMAL;
BEGIN
  -- Get user stats
  SELECT total_workouts, days_active, hours_trained 
  INTO workout_count, days_active, hours_trained
  FROM user_stats 
  WHERE user_id = user_id_param;

  -- Award achievements based on milestones
  -- First workout
  IF workout_count >= 1 AND NOT EXISTS (
    SELECT 1 FROM user_achievements 
    WHERE user_id = user_id_param AND achievement_type = 'first_workout'
  ) THEN
    INSERT INTO user_achievements (user_id, achievement_type, title, description, icon)
    VALUES (user_id_param, 'first_workout', 'First Steps', 'Completed your first workout!', '🎯');
  END IF;

  -- 10 workouts
  IF workout_count >= 10 AND NOT EXISTS (
    SELECT 1 FROM user_achievements 
    WHERE user_id = user_id_param AND achievement_type = 'workout_streak_10'
  ) THEN
    INSERT INTO user_achievements (user_id, achievement_type, title, description, icon)
    VALUES (user_id_param, 'workout_streak_10', 'Getting Started', 'Completed 10 workouts!', '🔥');
  END IF;

  -- 30 days active
  IF days_active >= 30 AND NOT EXISTS (
    SELECT 1 FROM user_achievements 
    WHERE user_id = user_id_param AND achievement_type = 'days_active_30'
  ) THEN
    INSERT INTO user_achievements (user_id, achievement_type, title, description, icon)
    VALUES (user_id_param, 'days_active_30', 'Consistency King', 'Active for 30 days!', '👑');
  END IF;

  -- 50 hours trained
  IF hours_trained >= 50 AND NOT EXISTS (
    SELECT 1 FROM user_achievements 
    WHERE user_id = user_id_param AND achievement_type = 'hours_trained_50'
  ) THEN
    INSERT INTO user_achievements (user_id, achievement_type, title, description, icon)
    VALUES (user_id_param, 'hours_trained_50', 'Dedicated Athlete', 'Trained for 50+ hours!', '💪');
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update stats when workout sessions are completed
CREATE OR REPLACE FUNCTION trigger_update_user_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- Update stats when workout session is completed
  IF NEW.completed_at IS NOT NULL AND OLD.completed_at IS NULL THEN
    PERFORM update_user_stats_from_workouts();
    PERFORM calculate_user_achievements(NEW.user_id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger on workout_sessions table
CREATE TRIGGER update_user_stats_trigger
  AFTER UPDATE ON workout_sessions
  FOR EACH ROW
  EXECUTE FUNCTION trigger_update_user_stats();

-- Row Level Security (RLS) policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_sessions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- User stats policies
CREATE POLICY "Users can view their own stats" ON user_stats
  FOR SELECT USING (auth.uid() = user_id);

-- User achievements policies
CREATE POLICY "Users can view their own achievements" ON user_achievements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert achievements" ON user_achievements
  FOR INSERT WITH CHECK (true);

-- Workout sessions policies
CREATE POLICY "Users can view their own workout sessions" ON workout_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own workout sessions" ON workout_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own workout sessions" ON workout_sessions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own workout sessions" ON workout_sessions
  FOR DELETE USING (auth.uid() = user_id); 