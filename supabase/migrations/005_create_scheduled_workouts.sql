-- Create scheduled workouts table for tracking actual workout instances
-- Migration: 005_create_scheduled_workouts.sql

-- Scheduled workouts table to track actual workout instances
CREATE TABLE scheduled_workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  routine_id UUID NOT NULL REFERENCES routines(id) ON DELETE CASCADE,
  workout_id UUID NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
  scheduled_date DATE NOT NULL,
  scheduled_time TIME,
  status VARCHAR(50) NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'missed', 'cancelled')),
  completed_at TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_scheduled_workouts_user_id ON scheduled_workouts(user_id);
CREATE INDEX idx_scheduled_workouts_routine_id ON scheduled_workouts(routine_id);
CREATE INDEX idx_scheduled_workouts_workout_id ON scheduled_workouts(workout_id);
CREATE INDEX idx_scheduled_workouts_scheduled_date ON scheduled_workouts(scheduled_date);
CREATE INDEX idx_scheduled_workouts_status ON scheduled_workouts(status);
CREATE INDEX idx_scheduled_workouts_user_date ON scheduled_workouts(user_id, scheduled_date);

-- Enable Row Level Security
ALTER TABLE scheduled_workouts ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own scheduled workouts" ON scheduled_workouts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own scheduled workouts" ON scheduled_workouts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own scheduled workouts" ON scheduled_workouts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own scheduled workouts" ON scheduled_workouts
  FOR DELETE USING (auth.uid() = user_id);

-- Function to generate scheduled workouts for a routine
CREATE OR REPLACE FUNCTION generate_scheduled_workouts(
  routine_id_param UUID,
  start_date_param DATE DEFAULT CURRENT_DATE,
  weeks_ahead_param INTEGER DEFAULT 4
)
RETURNS INTEGER AS $$
DECLARE
  workout_record RECORD;
  check_date DATE;
  end_date DATE;
  day_of_week TEXT;
  workout_count INTEGER := 0;
  routine_record RECORD;
BEGIN
  -- Get routine information
  SELECT * INTO routine_record FROM routines WHERE id = routine_id_param;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Routine not found';
  END IF;

  -- Calculate end date
  end_date := start_date_param + (weeks_ahead_param * 7);

  -- Loop through each workout in the routine
  FOR workout_record IN 
    SELECT * FROM workouts 
    WHERE routine_id = routine_id_param 
    ORDER BY order_index
  LOOP
    -- Parse the schedule to get selected days
    IF workout_record.schedule IS NOT NULL AND workout_record.schedule ? 'selectedDays' THEN
      -- Loop through each selected day
      FOR day_of_week IN 
        SELECT unnest(workout_record.schedule->'selectedDays')::TEXT
      LOOP
        -- Convert day name to day number (0 = Sunday, 1 = Monday, etc.)
        check_date := start_date_param;
        
        -- Find the next occurrence of this day of week
        WHILE check_date <= end_date LOOP
          -- Check if this day matches the workout's scheduled day
          IF (
            (day_of_week = 'sunday' AND EXTRACT(DOW FROM check_date) = 0) OR
            (day_of_week = 'monday' AND EXTRACT(DOW FROM check_date) = 1) OR
            (day_of_week = 'tuesday' AND EXTRACT(DOW FROM check_date) = 2) OR
            (day_of_week = 'wednesday' AND EXTRACT(DOW FROM check_date) = 3) OR
            (day_of_week = 'thursday' AND EXTRACT(DOW FROM check_date) = 4) OR
            (day_of_week = 'friday' AND EXTRACT(DOW FROM check_date) = 5) OR
            (day_of_week = 'saturday' AND EXTRACT(DOW FROM check_date) = 6)
          ) THEN
            -- Check if a scheduled workout already exists for this date and workout
            IF NOT EXISTS (
              SELECT 1 FROM scheduled_workouts 
              WHERE user_id = routine_record.user_id 
              AND workout_id = workout_record.id 
              AND scheduled_date = check_date
            ) THEN
              -- Insert the scheduled workout
              INSERT INTO scheduled_workouts (
                user_id,
                routine_id,
                workout_id,
                scheduled_date,
                scheduled_time
              ) VALUES (
                routine_record.user_id,
                routine_id_param,
                workout_record.id,
                check_date,
                COALESCE(workout_record.schedule->>'time', '09:00')::TIME
              );
              
              workout_count := workout_count + 1;
            END IF;
          END IF;
          
          check_date := check_date + INTERVAL '1 day';
        END LOOP;
      END LOOP;
    END IF;
  END LOOP;

  RETURN workout_count;
END;
$$ LANGUAGE plpgsql;

-- Function to clear scheduled workouts for a routine
CREATE OR REPLACE FUNCTION clear_scheduled_workouts(routine_id_param UUID)
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM scheduled_workouts 
  WHERE routine_id = routine_id_param 
  AND status = 'scheduled';
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;
