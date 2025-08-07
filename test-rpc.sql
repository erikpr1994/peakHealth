-- Test the assign_default_user_config function
-- First, let's check if the function exists
SELECT routine_name, routine_type 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name = 'assign_default_user_config';

-- Check if the user_defaults table has data
SELECT * FROM user_defaults WHERE is_active = true;

-- Check if user_types table has data
SELECT name, display_name FROM user_types WHERE is_active = true;

-- Check if subscription_tiers table has data
SELECT name, display_name FROM subscription_tiers WHERE is_active = true;

-- Check if user_groups table has data
SELECT name, display_name FROM user_groups WHERE is_active = true; 