-- Migration: Add delete_routine RPC function
-- This function properly handles cascading deletion of routines and all related data

CREATE OR REPLACE FUNCTION delete_routine(routine_id_param UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    routine_exists BOOLEAN;
    user_id UUID;
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
    
    -- Delete the routine (cascade will handle related records)
    DELETE FROM routines 
    WHERE id = routine_id_param 
    AND user_id = user_id;
    
    -- Check if deletion was successful
    IF FOUND THEN
        result := json_build_object(
            'success', true,
            'message', 'Routine deleted successfully'
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
        RETURN json_build_object(
            'success', false,
            'message', 'Error deleting routine: ' || SQLERRM
        );
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION delete_routine(UUID) TO authenticated;

-- Add comment for documentation
COMMENT ON FUNCTION delete_routine(UUID) IS 'Deletes a routine and all related data (workouts, sections, exercises, sets) with proper cascading';
