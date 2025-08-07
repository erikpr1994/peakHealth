-- Exercise System Seed Data

-- Insert main exercises
INSERT INTO exercises (id, name, alternative_names, category, description, icon, icon_color, is_popular, is_new, rating, tags) VALUES
-- Bench Press
('550e8400-e29b-41d4-a716-446655440001', 'Bench Press', ARRAY['Barbell Bench Press', 'Flat Bench Press'], 'Strength', 'A fundamental upper body exercise targeting the chest, triceps, and shoulders.', '🏋️', 'bg-indigo-100 text-indigo-600', true, false, 4.8, ARRAY['compound', 'upper-body', 'strength']),

-- Squats
('550e8400-e29b-41d4-a716-446655440002', 'Squats', ARRAY['Bodyweight Squat', 'Air Squat'], 'Strength', 'A fundamental lower body exercise targeting the legs and glutes.', '🏋️', 'bg-indigo-100 text-indigo-600', true, false, 4.9, ARRAY['compound', 'lower-body', 'strength']),

-- Push-ups
('550e8400-e29b-41d4-a716-446655440003', 'Push-ups', ARRAY['Pushup', 'Floor Push-up'], 'Strength', 'A bodyweight exercise that builds upper body and core strength.', '💪', 'bg-indigo-100 text-indigo-600', true, false, 4.6, ARRAY['bodyweight', 'upper-body', 'strength']),

-- Deadlift
('550e8400-e29b-41d4-a716-446655440004', 'Deadlift', ARRAY['Conventional Deadlift', 'Barbell Deadlift'], 'Strength', 'A compound exercise that targets the entire posterior chain.', '🏋️', 'bg-indigo-100 text-indigo-600', true, false, 4.7, ARRAY['compound', 'full-body', 'strength']),

-- Pull-ups
('550e8400-e29b-41d4-a716-446655440005', 'Pull-ups', ARRAY['Pullup', 'Chin-up'], 'Strength', 'An upper body exercise that primarily targets the back and biceps.', '💪', 'bg-indigo-100 text-indigo-600', true, false, 4.5, ARRAY['bodyweight', 'upper-body', 'strength']),

-- Running
('550e8400-e29b-41d4-a716-446655440006', 'Running', ARRAY['Jogging', 'Cardio Run'], 'Cardio', 'A fundamental cardiovascular exercise that improves endurance and burns calories.', '🏃', 'bg-green-100 text-green-600', true, false, 4.4, ARRAY['cardio', 'endurance', 'full-body']),

-- Plank
('550e8400-e29b-41d4-a716-446655440007', 'Plank', ARRAY['Forearm Plank', 'Core Plank'], 'Strength', 'An isometric core exercise that builds stability and strength.', '🧘', 'bg-yellow-100 text-yellow-600', true, false, 4.3, ARRAY['core', 'stability', 'bodyweight']),

-- Yoga
('550e8400-e29b-41d4-a716-446655440008', 'Yoga', ARRAY['Hatha Yoga', 'Vinyasa'], 'Flexibility', 'A mind-body practice that improves flexibility, strength, and mental well-being.', '🧘', 'bg-purple-100 text-purple-600', false, true, 4.2, ARRAY['flexibility', 'mind-body', 'balance']);

-- Insert exercise variants
INSERT INTO exercise_variants (id, exercise_id, name, alternative_names, description, focus, difficulty, equipment, muscle_groups, secondary_muscles, is_unilateral, instructions) VALUES
-- Bench Press Variants
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Bench Press', ARRAY['Flat Bench Press'], 'A fundamental upper body exercise targeting the chest, triceps, and shoulders.', 'Overall Chest', 'Intermediate', ARRAY['Barbell'::exercise_equipment, 'Bench'::exercise_equipment], ARRAY['Chest'::muscle_group, 'Triceps'::muscle_group, 'Shoulders'::muscle_group], ARRAY['Core'::muscle_group], false, ARRAY['Lie flat on the bench with feet planted on the ground', 'Grip the barbell with hands slightly wider than shoulder-width', 'Lower the bar to your chest with control', 'Press the bar back up to starting position']),

('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'Incline Bench Press', ARRAY['Incline Press'], 'Targets upper chest more than flat bench press.', 'Upper Chest Focus', 'Intermediate', ARRAY['Barbell'::exercise_equipment, 'Incline Bench'::exercise_equipment], ARRAY['Upper Chest'::muscle_group, 'Shoulders'::muscle_group, 'Triceps'::muscle_group], ARRAY['Core'::muscle_group], false, ARRAY['Set bench to 30-45 degree incline', 'Lie back with feet planted firmly', 'Grip barbell with hands slightly wider than shoulder-width', 'Lower bar to upper chest with control', 'Press bar back up to starting position']),

('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'Decline Bench Press', ARRAY['Decline Press'], 'Targets lower chest more than flat bench press.', 'Lower Chest Focus', 'Intermediate', ARRAY['Barbell'::exercise_equipment, 'Decline Bench'::exercise_equipment], ARRAY['Lower Chest'::muscle_group, 'Shoulders'::muscle_group, 'Triceps'::muscle_group], ARRAY['Core'::muscle_group], false, ARRAY['Set bench to 15-30 degree decline', 'Secure feet under the foot pads', 'Grip barbell with hands slightly wider than shoulder-width', 'Lower bar to lower chest with control', 'Press bar back up to starting position']),

('660e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001', 'Dumbbell Bench Press', ARRAY['DB Bench Press'], 'Allows greater range of motion and stabilizer engagement.', 'Stabilizer Focus', 'Intermediate', ARRAY['Dumbbell'::exercise_equipment, 'Bench'::exercise_equipment], ARRAY['Chest'::muscle_group, 'Shoulders'::muscle_group, 'Triceps'::muscle_group], ARRAY['Core'::muscle_group], false, ARRAY['Lie flat on bench with dumbbells at chest level', 'Press dumbbells up until arms are fully extended', 'Lower dumbbells back to chest with control', 'Keep core engaged throughout movement', 'Maintain neutral wrist position']),

-- Squat Variants
('660e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440002', 'Squat', ARRAY['Bodyweight Squat', 'Air Squat'], 'A fundamental lower body exercise targeting the legs and glutes.', 'Overall Lower Body', 'Beginner', ARRAY['Bodyweight'::exercise_equipment], ARRAY['Legs'::muscle_group, 'Glutes'::muscle_group], ARRAY['Core'::muscle_group], false, ARRAY['Stand with feet shoulder-width apart', 'Lower hips back and down as if sitting in a chair', 'Keep knees tracking over toes', 'Return to standing position']),

('660e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440002', 'Goblet Squat', ARRAY['Goblet'], 'Squat variation with a dumbbell held at chest level.', 'Form Focus', 'Beginner', ARRAY['Dumbbell'::exercise_equipment], ARRAY['Legs'::muscle_group, 'Glutes'::muscle_group, 'Core'::muscle_group], ARRAY['Shoulders'::muscle_group], false, ARRAY['Hold dumbbell vertically at chest level', 'Stand with feet shoulder-width apart', 'Lower into squat position', 'Keep chest up and core engaged', 'Return to standing position']),

('660e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440002', 'Barbell Squat', ARRAY['Back Squat'], 'Advanced squat variation with barbell on upper back.', 'Strength Focus', 'Advanced', ARRAY['Barbell'::exercise_equipment, 'Squat Rack'::exercise_equipment], ARRAY['Legs'::muscle_group, 'Glutes'::muscle_group], ARRAY['Core'::muscle_group, 'Back'::muscle_group], false, ARRAY['Position barbell on upper back', 'Stand with feet shoulder-width apart', 'Lower into squat position', 'Keep chest up and core engaged', 'Return to standing position']),

-- Push-up Variants
('660e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440003', 'Push-up', ARRAY['Floor Push-up'], 'A bodyweight exercise that builds upper body and core strength.', 'Overall Upper Body', 'Beginner', ARRAY['Bodyweight'::exercise_equipment], ARRAY['Chest'::muscle_group, 'Triceps'::muscle_group, 'Core'::muscle_group], ARRAY['Shoulders'::muscle_group], false, ARRAY['Start in plank position with hands under shoulders', 'Lower body until chest nearly touches ground', 'Push back up to starting position', 'Keep core engaged throughout movement']),

('660e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440003', 'Incline Push-up', ARRAY['Elevated Push-up'], 'Easier variation with hands elevated.', 'Beginner Friendly', 'Beginner', ARRAY['Bench'::exercise_equipment, 'Step'::exercise_equipment], ARRAY['Chest'::muscle_group, 'Triceps'::muscle_group, 'Shoulders'::muscle_group], ARRAY['Core'::muscle_group], false, ARRAY['Place hands on elevated surface (bench, step, etc.)', 'Keep body in straight line from head to heels', 'Lower chest toward elevated surface', 'Push back up to starting position', 'Maintain core engagement throughout']),

('660e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440003', 'Diamond Push-up', ARRAY['Triangle Push-up'], 'Advanced variation targeting triceps more intensely.', 'Tricep Focus', 'Advanced', ARRAY['Bodyweight'::exercise_equipment], ARRAY['Triceps'::muscle_group, 'Chest'::muscle_group, 'Core'::muscle_group], ARRAY['Shoulders'::muscle_group], false, ARRAY['Form diamond shape with hands under chest', 'Keep elbows close to body', 'Lower chest toward hands', 'Push back up to starting position', 'Maintain straight body line throughout']),

-- Deadlift Variants
('660e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440004', 'Conventional Deadlift', ARRAY['Barbell Deadlift'], 'A compound exercise that targets the entire posterior chain.', 'Posterior Chain', 'Advanced', ARRAY['Barbell'::exercise_equipment], ARRAY['Back'::muscle_group, 'Legs'::muscle_group, 'Glutes'::muscle_group], ARRAY['Core'::muscle_group, 'Shoulders'::muscle_group], false, ARRAY['Stand with feet hip-width apart', 'Grip barbell with hands shoulder-width apart', 'Keep back straight and chest up', 'Lift bar by extending hips and knees', 'Return bar to ground with control']),

('660e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440004', 'Romanian Deadlift', ARRAY['RDL'], 'Deadlift variation focusing on hamstrings and glutes.', 'Hamstring Focus', 'Intermediate', ARRAY['Barbell'::exercise_equipment], ARRAY['Hamstrings'::muscle_group, 'Glutes'::muscle_group], ARRAY['Back'::muscle_group, 'Core'::muscle_group], false, ARRAY['Stand with feet hip-width apart', 'Hold barbell in front of thighs', 'Hinge at hips while keeping legs straight', 'Lower bar along legs until hamstrings stretch', 'Return to starting position']),

-- Pull-up Variants
('660e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440005', 'Pull-up', ARRAY['Chin-up'], 'An upper body exercise that primarily targets the back and biceps.', 'Back and Biceps', 'Advanced', ARRAY['Pull-up Bar'::exercise_equipment], ARRAY['Back'::muscle_group, 'Biceps'::muscle_group], ARRAY['Core'::muscle_group, 'Shoulders'::muscle_group], false, ARRAY['Hang from pull-up bar with hands shoulder-width apart', 'Pull body up until chin clears the bar', 'Lower body back to starting position', 'Keep core engaged throughout movement']),

('660e8400-e29b-41d4-a716-446655440014', '550e8400-e29b-41d4-a716-446655440005', 'Assisted Pull-up', ARRAY['Band Pull-up'], 'Pull-up variation with assistance for beginners.', 'Beginner Friendly', 'Beginner', ARRAY['Pull-up Bar'::exercise_equipment, 'Resistance Band'::exercise_equipment], ARRAY['Back'::muscle_group, 'Biceps'::muscle_group], ARRAY['Core'::muscle_group, 'Shoulders'::muscle_group], false, ARRAY['Loop resistance band around pull-up bar', 'Place foot or knee in band for assistance', 'Pull body up until chin clears the bar', 'Lower body back to starting position']),

-- Running Variants
('660e8400-e29b-41d4-a716-446655440015', '550e8400-e29b-41d4-a716-446655440006', 'Jogging', ARRAY['Light Running'], 'Low-intensity running for cardiovascular health.', 'Cardiovascular Health', 'Beginner', ARRAY['Bodyweight'::exercise_equipment], ARRAY['Cardio'::muscle_group], ARRAY['Legs'::muscle_group, 'Core'::muscle_group], false, ARRAY['Start with a light warm-up walk', 'Gradually increase pace to a comfortable jog', 'Maintain good posture with chest up', 'Land mid-foot with each step', 'Keep breathing steady and controlled']),

('660e8400-e29b-41d4-a716-446655440016', '550e8400-e29b-41d4-a716-446655440006', 'Sprint Intervals', ARRAY['High-Intensity Running'], 'High-intensity interval training with running.', 'Speed and Power', 'Advanced', ARRAY['Bodyweight'::exercise_equipment], ARRAY['Cardio'::muscle_group], ARRAY['Legs'::muscle_group, 'Core'::muscle_group], false, ARRAY['Warm up with light jogging', 'Sprint at maximum effort for 30 seconds', 'Walk or jog slowly for 60 seconds', 'Repeat for desired number of intervals', 'Cool down with light walking']),

-- Plank Variants
('660e8400-e29b-41d4-a716-446655440017', '550e8400-e29b-41d4-a716-446655440007', 'Forearm Plank', ARRAY['Plank Hold'], 'Basic plank position on forearms.', 'Core Stability', 'Beginner', ARRAY['Bodyweight'::exercise_equipment], ARRAY['Core'::muscle_group], ARRAY['Shoulders'::muscle_group, 'Glutes'::muscle_group], false, ARRAY['Start in forearm plank position', 'Keep body in straight line from head to heels', 'Engage core muscles', 'Hold position for desired duration', 'Maintain steady breathing']),

('660e8400-e29b-41d4-a716-446655440018', '550e8400-e29b-41d4-a716-446655440007', 'Side Plank', ARRAY['Side Plank Hold'], 'Plank variation targeting obliques.', 'Oblique Focus', 'Intermediate', ARRAY['Bodyweight'::exercise_equipment], ARRAY['Obliques'::muscle_group, 'Core'::muscle_group], ARRAY['Shoulders'::muscle_group, 'Glutes'::muscle_group], true, ARRAY['Lie on side with forearm on ground', 'Lift hips to form straight line', 'Keep body aligned from head to feet', 'Hold position for desired duration', 'Switch sides and repeat']),

-- Yoga Variants
('660e8400-e29b-41d4-a716-446655440019', '550e8400-e29b-41d4-a716-446655440008', 'Sun Salutation', ARRAY['Surya Namaskar'], 'A flowing sequence of yoga poses.', 'Full Body Flow', 'Beginner', ARRAY['Bodyweight'::exercise_equipment], ARRAY['Full Body'::muscle_group], ARRAY['Core'::muscle_group], false, ARRAY['Start in mountain pose', 'Flow through forward fold, plank, and upward dog', 'Return to standing through downward dog', 'Repeat sequence on opposite side', 'Maintain steady breathing throughout']),

('660e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440008', 'Warrior Pose', ARRAY['Virabhadrasana'], 'A standing yoga pose that builds strength and balance.', 'Strength and Balance', 'Intermediate', ARRAY['Bodyweight'::exercise_equipment], ARRAY['Legs'::muscle_group, 'Core'::muscle_group], ARRAY['Shoulders'::muscle_group, 'Arms'::muscle_group], false, ARRAY['Step one foot back into lunge position', 'Bend front knee to 90 degrees', 'Raise arms overhead', 'Keep back leg straight and strong', 'Hold pose and breathe steadily']);

-- Insert exercise instruction steps
INSERT INTO exercise_instruction_steps (exercise_variant_id, step_order, title, description) VALUES
-- Bench Press Steps
('660e8400-e29b-41d4-a716-446655440001', 1, 'Starting Position', 'Lie flat on the bench with your feet planted firmly on the floor. Your eyes should be directly under the barbell.'),
('660e8400-e29b-41d4-a716-446655440001', 2, 'Grip', 'Grip the barbell with hands slightly wider than shoulder-width apart. Wrap your thumbs around the bar for safety.'),
('660e8400-e29b-41d4-a716-446655440001', 3, 'Lowering Phase', 'Lower the bar slowly and under control to your mid-chest. Keep your elbows at approximately a 45-75 degree angle.'),
('660e8400-e29b-41d4-a716-446655440001', 4, 'Pressing Phase', 'Push the bar back up to the starting position by extending your arms. Focus on pushing through your chest muscles.'),
('660e8400-e29b-41d4-a716-446655440001', 5, 'Breathing', 'Inhale during the lowering phase and exhale during the pressing phase.'),

-- Squat Steps
('660e8400-e29b-41d4-a716-446655440005', 1, 'Starting Position', 'Stand with feet shoulder-width apart, toes pointing slightly outward.'),
('660e8400-e29b-41d4-a716-446655440005', 2, 'Movement', 'Lower hips back and down as if sitting in a chair. Keep your chest up and core engaged.'),
('660e8400-e29b-41d4-a716-446655440005', 3, 'Form', 'Keep knees tracking over toes and maintain weight in your heels.'),
('660e8400-e29b-41d4-a716-446655440005', 4, 'Return', 'Push through your heels to return to standing position.'),

-- Push-up Steps
('660e8400-e29b-41d4-a716-446655440008', 1, 'Starting Position', 'Start in plank position with hands under shoulders and body in straight line.'),
('660e8400-e29b-41d4-a716-446655440008', 2, 'Movement', 'Lower body until chest nearly touches ground, keeping elbows close to body.'),
('660e8400-e29b-41d4-a716-446655440008', 3, 'Return', 'Push back up to starting position by extending arms.'),

-- Deadlift Steps
('660e8400-e29b-41d4-a716-446655440011', 1, 'Setup', 'Stand with feet hip-width apart, barbell over mid-foot.'),
('660e8400-e29b-41d4-a716-446655440011', 2, 'Grip', 'Grip barbell with hands shoulder-width apart, keeping arms straight.'),
('660e8400-e29b-41d4-a716-446655440011', 3, 'Lift', 'Lift bar by extending hips and knees simultaneously.'),
('660e8400-e29b-41d4-a716-446655440011', 4, 'Return', 'Lower bar to ground with control, maintaining proper form.');

-- Insert exercise tips
INSERT INTO exercise_tips (exercise_variant_id, pro_tips, common_mistakes, safety_notes) VALUES
-- Bench Press Tips
('660e8400-e29b-41d4-a716-446655440001', 
 ARRAY['Keep your wrists straight and directly above your elbows.', 'Maintain a slight arch in your lower back, but keep your butt on the bench.', 'Drive through your feet for stability and added power.', 'Keep your shoulder blades retracted and "tucked" throughout the movement.', 'Focus on pushing yourself away from the bar, rather than pushing the bar away from you.'],
 ARRAY['Bouncing the bar off your chest, which can lead to injury.', 'Lifting your butt off the bench, which reduces stability.', 'Flaring your elbows out too wide, which can strain your shoulders.', 'Not lowering the bar to chest level, which reduces the effectiveness.', 'Using too much weight and sacrificing proper form.'],
 ARRAY['Always use a spotter when lifting heavy weights.', 'Ensure the barbell is properly secured in the rack before starting.', 'Stop immediately if you feel any sharp pain in your shoulders or chest.']),

-- Squat Tips
('660e8400-e29b-41d4-a716-446655440005',
 ARRAY['Keep your chest up and core engaged throughout the movement.', 'Push your knees out in the same direction as your toes.', 'Keep your weight in your heels, not your toes.', 'Breathe deeply and maintain steady breathing.', 'Focus on pushing through your glutes and hamstrings.'],
 ARRAY['Letting your knees cave inward, which can cause injury.', 'Rising your hips too fast, creating a "good morning" movement.', 'Not going deep enough in the squat.', 'Rounding your back, which can strain your spine.', 'Lifting your heels off the ground.'],
 ARRAY['Start with bodyweight squats to perfect your form before adding weight.', 'If you feel knee pain, check your form and consider consulting a professional.', 'Warm up properly before performing squats.']),

-- Push-up Tips
('660e8400-e29b-41d4-a716-446655440008',
 ARRAY['Keep your body in a straight line from head to heels.', 'Engage your core throughout the entire movement.', 'Keep your elbows close to your body at about 45 degrees.', 'Lower yourself with control, don''t drop down.', 'Focus on pushing through your chest and triceps.'],
 ARRAY['Sagging your hips, which reduces effectiveness and can cause back strain.', 'Flaring your elbows out too wide, which can strain your shoulders.', 'Not going low enough to get full range of motion.', 'Rushing through the movement without proper control.', 'Holding your breath during the exercise.'],
 ARRAY['Start with modified push-ups if you''re a beginner.', 'Stop if you feel any shoulder or wrist pain.', 'Maintain proper form even if it means doing fewer repetitions.']),

-- Deadlift Tips
('660e8400-e29b-41d4-a716-446655440011',
 ARRAY['Keep your back straight and chest up throughout the movement.', 'Drive through your heels, not your toes.', 'Keep the bar close to your body throughout the lift.', 'Engage your core and glutes to protect your lower back.', 'Breathe deeply and brace your core before lifting.'],
 ARRAY['Rounding your back, which can cause serious injury.', 'Lifting with your back instead of your legs and hips.', 'Letting the bar drift away from your body.', 'Not keeping your chest up, which can cause back rounding.', 'Using too much weight before mastering proper form.'],
 ARRAY['Always warm up properly before deadlifting.', 'Consider using a weightlifting belt for heavy lifts.', 'Stop immediately if you feel any back pain or discomfort.']);

-- Insert exercise media
INSERT INTO exercise_media (exercise_variant_id, images, videos, featured_image, featured_video) VALUES
-- Bench Press Media
('660e8400-e29b-41d4-a716-446655440001', 
 ARRAY['/exercise-images/bench-press.jpg', '/exercise-images/bench-press-side.jpg'], 
 ARRAY['/videos/bench-press.mp4'], 
 '/exercise-images/bench-press.jpg', 
 '/videos/bench-press.mp4'),

-- Squat Media
('660e8400-e29b-41d4-a716-446655440005', 
 ARRAY['/exercise-images/squat.jpg', '/exercise-images/squat-side.jpg'], 
 ARRAY['/videos/squat.mp4'], 
 '/exercise-images/squat.jpg', 
 '/videos/squat.mp4'),

-- Push-up Media
('660e8400-e29b-41d4-a716-446655440008', 
 ARRAY['/exercise-images/pushup.jpg', '/exercise-images/pushup-side.jpg'], 
 ARRAY['/videos/pushup.mp4'], 
 '/exercise-images/pushup.jpg', 
 '/videos/pushup.mp4'),

-- Deadlift Media
('660e8400-e29b-41d4-a716-446655440011', 
 ARRAY['/exercise-images/deadlift.jpg', '/exercise-images/deadlift-side.jpg'], 
 ARRAY['/videos/deadlift.mp4'], 
 '/exercise-images/deadlift.jpg', 
 '/videos/deadlift.mp4');

-- Insert sample workout routines for the test user
INSERT INTO workout_routines (id, user_id, name, description, schedule, is_active) VALUES
('770e8400-e29b-41d4-a716-446655440001', 
 (SELECT id FROM auth.users WHERE email = 'erikpastorrios1994@gmail.com'), 
 'Upper Body Split', 
 'A comprehensive upper body workout focusing on chest, back, shoulders, and arms.', 
 'Mon, Wed, Fri', 
 true),

('770e8400-e29b-41d4-a716-446655440002', 
 (SELECT id FROM auth.users WHERE email = 'erikpastorrios1994@gmail.com'), 
 'Push Day', 
 'Focus on chest, shoulders, and triceps with compound and isolation movements.', 
 'Tue, Sat', 
 true),

('770e8400-e29b-41d4-a716-446655440003', 
 (SELECT id FROM auth.users WHERE email = 'erikpastorrios1994@gmail.com'), 
 'Chest Focus', 
 'Intensive chest workout with multiple bench press variations.', 
 'Thu', 
 true);

-- Insert routine exercises
INSERT INTO routine_exercises (routine_id, exercise_variant_id, exercise_order, sets, reps, rest_time_seconds, notes) VALUES
-- Upper Body Split Routine
('770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', 1, 4, 8, 120, 'Focus on form and control'),
('770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440013', 2, 3, 8, 120, 'Full range of motion'),
('770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440008', 3, 3, 12, 90, 'Keep body straight'),

-- Push Day Routine
('770e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440001', 1, 4, 6, 180, 'Heavy weight, focus on power'),
('770e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440002', 2, 3, 10, 120, 'Upper chest focus'),
('770e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440010', 3, 3, 8, 90, 'Tricep emphasis'),

-- Chest Focus Routine
('770e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440001', 1, 5, 5, 180, 'Heavy sets'),
('770e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440002', 2, 4, 8, 120, 'Incline focus'),
('770e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440004', 3, 3, 12, 90, 'Dumbbell variation');

-- Insert sample user exercise favorites
INSERT INTO user_exercise_favorites (user_id, exercise_id) VALUES
((SELECT id FROM auth.users WHERE email = 'erikpastorrios1994@gmail.com'), '550e8400-e29b-41d4-a716-446655440001'),
((SELECT id FROM auth.users WHERE email = 'erikpastorrios1994@gmail.com'), '550e8400-e29b-41d4-a716-446655440002'),
((SELECT id FROM auth.users WHERE email = 'erikpastorrios1994@gmail.com'), '550e8400-e29b-41d4-a716-446655440004');

-- Insert sample exercise ratings
INSERT INTO exercise_ratings (user_id, exercise_id, rating, review) VALUES
((SELECT id FROM auth.users WHERE email = 'erikpastorrios1994@gmail.com'), '550e8400-e29b-41d4-a716-446655440001', 5, 'Excellent compound movement for building upper body strength.'),
((SELECT id FROM auth.users WHERE email = 'erikpastorrios1994@gmail.com'), '550e8400-e29b-41d4-a716-446655440002', 5, 'Fundamental movement that everyone should master.'),
((SELECT id FROM auth.users WHERE email = 'erikpastorrios1994@gmail.com'), '550e8400-e29b-41d4-a716-446655440003', 4, 'Great bodyweight exercise for building strength and endurance.'),
((SELECT id FROM auth.users WHERE email = 'erikpastorrios1994@gmail.com'), '550e8400-e29b-41d4-a716-446655440004', 5, 'The king of all exercises. Builds incredible strength and power.'),
((SELECT id FROM auth.users WHERE email = 'erikpastorrios1994@gmail.com'), '550e8400-e29b-41d4-a716-446655440005', 4, 'Challenging but very effective for back and bicep development.');

-- Feature Flag System Seed Data

-- Set user metadata for test user (special roles for testing)
-- Note: Regular users will get default 'basic' role and 'free' group via auth endpoints
UPDATE auth.users 
SET raw_user_meta_data = jsonb_build_object(
  'roles', ARRAY['trainer', 'admin'],
  'groups', ARRAY['beta', 'premium']
)
WHERE email = 'erikpastorrios1994@gmail.com';

-- Enable notification system feature for trainers in development
INSERT INTO feature_flag_user_roles (feature_flag_id, environment, role_name, is_enabled) VALUES
((SELECT id FROM feature_flags WHERE name = 'notification_system_feature'), 
 'development', 
 'trainer', 
 true);

-- Enable notification system feature for premium users in development
INSERT INTO feature_flag_user_groups (feature_flag_id, environment, group_name, is_enabled) VALUES
((SELECT id FROM feature_flags WHERE name = 'notification_system_feature'), 
 'development', 
 'premium', 
 true);

-- Enable some features for basic users (example)
INSERT INTO feature_flag_user_roles (feature_flag_id, environment, role_name, is_enabled) VALUES
((SELECT id FROM feature_flags WHERE name = 'notification_system_feature'), 
 'development', 
 'basic', 
 false); -- Disabled by default for basic users

-- Roles and Groups System Seed Data

-- Insert default user configuration for new signups
INSERT INTO user_defaults (default_user_types, default_subscription_tier, default_groups, is_active) VALUES
(ARRAY['regular'], 'free', ARRAY['early_access'], true);
