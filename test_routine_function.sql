-- Test script to verify get_complete_routine function works
-- This will help us debug any remaining issues

-- First, let's check if we have any routines in the database
SELECT COUNT(*) as routine_count FROM routines;

-- Let's check if we have any exercise variants
SELECT COUNT(*) as variant_count FROM exercise_variants;

-- Let's create a test routine to verify the function works
-- First, create a test user (if needed)
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES (
  'test-user-id-123',
  'test@example.com',
  crypt('password', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- Create a test routine
INSERT INTO routines (
  id,
  user_id,
  name,
  description,
  difficulty,
  goal,
  duration,
  is_active,
  is_favorite,
  objectives
) VALUES (
  'test-routine-id-123',
  'test-user-id-123',
  'Test Routine',
  'A test routine for debugging',
  'Beginner',
  'Strength',
  12,
  true,
  false,
  ARRAY['Build strength', 'Improve form']
) ON CONFLICT (id) DO NOTHING;

-- Create a test workout
INSERT INTO workouts (
  id,
  routine_id,
  name,
  type,
  objective,
  schedule,
  order_index
) VALUES (
  'test-workout-id-123',
  'test-routine-id-123',
  'Test Workout',
  'strength',
  'Build strength',
  '{"selectedDays": ["monday", "wednesday", "friday"]}',
  0
) ON CONFLICT (id) DO NOTHING;

-- Create a test section
INSERT INTO workout_sections (
  id,
  workout_id,
  name,
  type,
  order_index,
  rest_after
) VALUES (
  'test-section-id-123',
  'test-workout-id-123',
  'Test Section',
  'basic',
  0,
  '2 min'
) ON CONFLICT (id) DO NOTHING;

-- Create a test exercise (using an existing exercise variant)
INSERT INTO routine_exercises (
  id,
  section_id,
  exercise_library_id,
  order_index,
  rest_timer,
  rest_after,
  progression_method
) VALUES (
  'test-exercise-id-123',
  'test-section-id-123',
  '660e8400-e29b-41d4-a716-446655440001', -- Bench Press variant
  0,
  '90s',
  '2 min',
  'linear'
) ON CONFLICT (id) DO NOTHING;

-- Create test sets
INSERT INTO exercise_sets (
  id,
  exercise_id,
  set_number,
  reps,
  weight,
  rest_time
) VALUES 
  ('test-set-id-1', 'test-exercise-id-123', 1, 10, 135, '90s'),
  ('test-set-id-2', 'test-exercise-id-123', 2, 10, 135, '90s'),
  ('test-set-id-3', 'test-exercise-id-123', 3, 10, 135, '90s')
ON CONFLICT (id) DO NOTHING;

-- Now test the function
SELECT get_complete_routine('test-routine-id-123');
