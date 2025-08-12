-- Migration: Preserve workout history when routines are deleted
-- This migration modifies the schema to keep historical workout data

-- First, let's create a new table to track deleted routines for audit purposes
CREATE TABLE deleted_routines (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  difficulty routine_difficulty,
  goal routine_goal,
  -- days_per_week is calculated dynamically from workout days
  duration INTEGER,
  is_active BOOLEAN,
  is_favorite BOOLEAN,
  -- schedule is calculated dynamically from workout days, not stored
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

-- Create a table to track deleted workouts for audit purposes
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

-- Now we need to modify the foreign key constraints to preserve historical data
-- We'll change the workouts.routine_id to allow NULL values and set it to NULL when routine is deleted

-- First, drop the existing foreign key constraint
ALTER TABLE workouts DROP CONSTRAINT IF EXISTS workouts_routine_id_fkey;

-- Add the new foreign key constraint that allows NULL and sets NULL on delete
ALTER TABLE workouts 
ADD CONSTRAINT workouts_routine_id_fkey 
FOREIGN KEY (routine_id) REFERENCES routines(id) ON DELETE SET NULL;

-- Update the delete_routine function to preserve historical data
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

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION delete_routine(UUID) TO authenticated;

-- Add comments for documentation
COMMENT ON FUNCTION delete_routine(UUID) IS 'Deletes a routine while preserving historical workout data. Workouts are archived and their routine_id is set to NULL.';
COMMENT ON TABLE deleted_routines IS 'Audit trail of deleted routines';
COMMENT ON TABLE deleted_workouts IS 'Audit trail of workouts from deleted routines';
