-- Migration: Fix create_complete_routine function to handle JSON to RECORD conversion properly
-- The issue was using ->> operator on RECORD types instead of JSON types

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
      (workout_json->>'orderIndex')::INTEGER
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
        (section_json->>'orderIndex')::INTEGER,
        COALESCE((section_json->>'restAfter')::INTEGER, 0),
        COALESCE((section_json->>'emomDuration')::INTEGER, 0)
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
            (exercise_json->>'variantId')::UUID,
            (exercise_json->>'exerciseId')::UUID
          ),
          (exercise_json->>'orderIndex')::INTEGER,
          COALESCE(exercise_json->>'restTimer', '90s'),
          COALESCE(exercise_json->>'restAfter', '2 min'),
          exercise_json->>'progressionMethod',
          COALESCE((exercise_json->>'hasApproachSets')::BOOLEAN, false),
          COALESCE((exercise_json->>'emomReps')::INTEGER, 0)
        ) RETURNING id INTO new_exercise_id;

        -- Insert sets for this exercise
        FOR set_json IN SELECT value FROM json_array_elements(exercise_json->'sets')
        LOOP
          INSERT INTO exercise_sets (
            exercise_id, set_number, reps, weight, notes
          ) VALUES (
            new_exercise_id,
            (set_json->>'setNumber')::INTEGER,
            (set_json->>'reps')::INTEGER,
            COALESCE((set_json->>'weight')::DECIMAL, 0),
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
      (workout_json->>'orderIndex')::INTEGER
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
        (workout_json->'trailRunningData'->>'difficulty')::trail_difficulty,
        workout_json->'trailRunningData'->>'estimatedDuration',
        COALESCE((workout_json->'trailRunningData'->>'targetDistance')::DECIMAL, 0),
        COALESCE((workout_json->'trailRunningData'->>'elevationGain')::INTEGER, 0)
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
        (section_json->>'orderIndex')::INTEGER,
        COALESCE((section_json->>'restAfter')::INTEGER, 0),
        COALESCE((section_json->>'emomDuration')::INTEGER, 0)
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
            (exercise_json->>'variantId')::UUID,
            (exercise_json->>'exerciseId')::UUID
          ),
          (exercise_json->>'orderIndex')::INTEGER,
          COALESCE(exercise_json->>'restTimer', '90s'),
          COALESCE(exercise_json->>'restAfter', '2 min'),
          exercise_json->>'progressionMethod',
          COALESCE((exercise_json->>'hasApproachSets')::BOOLEAN, false),
          COALESCE((exercise_json->>'emomReps')::INTEGER, 0)
        ) RETURNING id INTO new_exercise_id;

        -- Insert sets for this exercise
        FOR set_json IN SELECT value FROM json_array_elements(exercise_json->'sets')
        LOOP
          INSERT INTO exercise_sets (
            exercise_id, set_number, reps, weight, notes
          ) VALUES (
            new_exercise_id,
            (set_json->>'setNumber')::INTEGER,
            (set_json->>'reps')::INTEGER,
            COALESCE((set_json->>'weight')::DECIMAL, 0),
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

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION create_complete_routine(JSON, JSON, JSON) TO authenticated;
