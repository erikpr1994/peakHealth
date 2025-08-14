-- Migration: Create comprehensive routine creation function with transactional integrity
-- This function handles the complete routine creation process atomically

-- Drop the existing incomplete function
DROP FUNCTION IF EXISTS create_routine_with_workouts(JSON, JSON);

-- Create a comprehensive routine creation function that handles all aspects atomically
CREATE OR REPLACE FUNCTION create_complete_routine(
  routine_data JSON,
  strength_workouts_data JSON DEFAULT '[]'::JSON,
  running_workouts_data JSON DEFAULT '[]'::JSON
)
RETURNS JSON AS $$
DECLARE
  new_routine_id UUID;
  workout_record RECORD;
  section_record RECORD;
  exercise_record RECORD;
  set_record RECORD;
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
    -- daysPerWeek is calculated dynamically from workout days
    COALESCE((routine_data->>'isActive')::BOOLEAN, false),
    COALESCE((routine_data->>'isFavorite')::BOOLEAN, false),
    -- Schedule is calculated dynamically, not stored
    COALESCE(
      CASE 
        WHEN routine_data->'objectives' IS NOT NULL AND routine_data->'objectives' IS DISTINCT FROM 'null'::JSON
        THEN (
          SELECT COALESCE(array_agg(value::TEXT), ARRAY[]::TEXT[])
          FROM json_array_elements_text(routine_data->'objectives')
        )
        ELSE ARRAY[]::TEXT[]
      END,
      ARRAY[]::TEXT[]
    )
  ) RETURNING id INTO new_routine_id;

  -- Insert strength workouts
  FOR workout_record IN SELECT * FROM json_array_elements(strength_workouts_data)
  LOOP
    -- Insert workout
    INSERT INTO workouts (
      routine_id, name, type, objective, schedule, order_index
    ) VALUES (
      new_routine_id,
      workout_record->>'name',
      'strength',
      workout_record->>'objective',
      workout_record->'schedule',
      (workout_record->>'orderIndex')::INTEGER
    ) RETURNING id INTO new_workout_id;

    -- Insert sections for this workout
    IF workout_record ? 'sections' THEN
      FOR section_record IN SELECT * FROM json_array_elements(workout_record->'sections')
      LOOP
        -- Insert section
        INSERT INTO workout_sections (
          workout_id, name, type, order_index, rest_after, emom_duration
        ) VALUES (
          new_workout_id,
          section_record->>'name',
          (section_record->>'type')::section_type,
          (section_record->>'orderIndex')::INTEGER,
          COALESCE((section_record->>'restAfter')::INTEGER, 0),
          COALESCE((section_record->>'emomDuration')::INTEGER, 0)
        ) RETURNING id INTO new_section_id;

        -- Insert exercises for this section
        IF section_record ? 'exercises' THEN
          FOR exercise_record IN SELECT * FROM json_array_elements(section_record->'exercises')
          LOOP
            -- Insert exercise
            INSERT INTO routine_exercises (
              section_id, name, category, muscle_groups, exercise_library_id,
              order_index, rest_timer, rest_after, progression_method,
              has_approach_sets, emom_reps
            ) VALUES (
              new_section_id,
              exercise_record->>'name',
              exercise_record->>'category',
              COALESCE(
                CASE 
                  WHEN exercise_record->'muscleGroups' IS NOT NULL AND exercise_record->'muscleGroups' IS DISTINCT FROM 'null'::JSON
                  THEN (exercise_record->'muscleGroups')::TEXT[]
                  ELSE ARRAY[]::TEXT[]
                END,
                ARRAY[]::TEXT[]
              ),
              COALESCE(exercise_record->>'variantId', exercise_record->>'exerciseId'),
              (exercise_record->>'orderIndex')::INTEGER,
              COALESCE((exercise_record->>'restTimer')::INTEGER, 0),
              COALESCE((exercise_record->>'restAfter')::INTEGER, 0),
              exercise_record->>'progressionMethod',
              COALESCE((exercise_record->>'hasApproachSets')::BOOLEAN, false),
              COALESCE((exercise_record->>'emomReps')::INTEGER, 0)
            ) RETURNING id INTO new_exercise_id;

            -- Insert sets for this exercise
            IF exercise_record ? 'sets' THEN
              FOR set_record IN SELECT * FROM json_array_elements(exercise_record->'sets')
              LOOP
                INSERT INTO exercise_sets (
                  exercise_id, set_number, reps, weight, notes
                ) VALUES (
                  new_exercise_id,
                  (set_record->>'setNumber')::INTEGER,
                  (set_record->>'reps')::INTEGER,
                  COALESCE((set_record->>'weight')::DECIMAL, 0),
                  set_record->>'notes'
                );
              END LOOP;
            END IF;
          END LOOP;
        END IF;
      END LOOP;
    END IF;
  END LOOP;

  -- Insert running workouts
  FOR workout_record IN SELECT * FROM json_array_elements(running_workouts_data)
  LOOP
    -- Insert workout
    INSERT INTO workouts (
      routine_id, name, type, objective, schedule, order_index
    ) VALUES (
      new_routine_id,
      workout_record->>'name',
      (workout_record->>'type')::workout_type,
      workout_record->>'objective',
      workout_record->'schedule',
      (workout_record->>'orderIndex')::INTEGER
    ) RETURNING id INTO new_workout_id;

    -- Insert trail running data if present
    IF workout_record ? 'trailRunningData' THEN
      INSERT INTO trail_running_data (
        workout_id, name, description, difficulty, estimated_duration,
        target_distance, elevation_gain
      ) VALUES (
        new_workout_id,
        workout_record->'trailRunningData'->>'name',
        workout_record->'trailRunningData'->>'description',
        (workout_record->'trailRunningData'->>'difficulty')::trail_difficulty,
        workout_record->'trailRunningData'->>'estimatedDuration',
        COALESCE((workout_record->'trailRunningData'->>'targetDistance')::DECIMAL, 0),
        COALESCE((workout_record->'trailRunningData'->>'elevationGain')::INTEGER, 0)
      );
    END IF;

    -- Insert sections for this workout
    IF workout_record ? 'sections' THEN
      FOR section_record IN SELECT * FROM json_array_elements(workout_record->'sections')
      LOOP
        -- Insert section
        INSERT INTO workout_sections (
          workout_id, name, type, order_index, rest_after, emom_duration
        ) VALUES (
          new_workout_id,
          section_record->>'name',
          (section_record->>'type')::section_type,
          (section_record->>'orderIndex')::INTEGER,
          COALESCE((section_record->>'restAfter')::INTEGER, 0),
          COALESCE((section_record->>'emomDuration')::INTEGER, 0)
        ) RETURNING id INTO new_section_id;

        -- Insert exercises for this section
        IF section_record ? 'exercises' THEN
          FOR exercise_record IN SELECT * FROM json_array_elements(section_record->'exercises')
          LOOP
            -- Insert exercise
            INSERT INTO routine_exercises (
              section_id, name, category, muscle_groups,
              order_index, rest_timer, rest_after, emom_reps
            ) VALUES (
              new_section_id,
              exercise_record->>'name',
              exercise_record->>'category',
              COALESCE(
                CASE 
                  WHEN exercise_record->'muscleGroups' IS NOT NULL AND exercise_record->'muscleGroups' IS DISTINCT FROM 'null'::JSON
                  THEN (exercise_record->'muscleGroups')::TEXT[]
                  ELSE ARRAY[]::TEXT[]
                END,
                ARRAY[]::TEXT[]
              ),
              (exercise_record->>'orderIndex')::INTEGER,
              COALESCE((exercise_record->>'restTimer')::INTEGER, 0),
              COALESCE((exercise_record->>'restAfter')::INTEGER, 0),
              COALESCE((exercise_record->>'emomReps')::INTEGER, 0)
            ) RETURNING id INTO new_exercise_id;

            -- Insert sets for this exercise
            IF exercise_record ? 'sets' THEN
              FOR set_record IN SELECT * FROM json_array_elements(exercise_record->'sets')
              LOOP
                INSERT INTO exercise_sets (
                  exercise_id, set_number, reps, weight, notes
                ) VALUES (
                  new_exercise_id,
                  (set_record->>'setNumber')::INTEGER,
                  (set_record->>'reps')::INTEGER,
                  COALESCE((set_record->>'weight')::DECIMAL, 0),
                  set_record->>'notes'
                );
              END LOOP;
            END IF;
          END LOOP;
        END IF;
      END LOOP;
    END IF;
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
