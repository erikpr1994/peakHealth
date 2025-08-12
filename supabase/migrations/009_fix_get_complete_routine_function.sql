-- Migration: Fix get_complete_routine function to remove schedule field reference
-- This function was trying to access r.schedule which no longer exists

-- Drop and recreate the function without the schedule field
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

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_complete_routine(UUID) TO authenticated;
