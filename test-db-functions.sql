-- Test script for the new roles and groups system
-- Run this in Supabase SQL editor to test the functions

-- Test 1: Check if user defaults are set correctly
SELECT * FROM user_defaults WHERE is_active = true;

-- Test 2: Check if user types are created
SELECT name, display_name, permissions FROM user_types WHERE is_active = true;

-- Test 3: Check if subscription tiers are created
SELECT name, display_name, features FROM subscription_tiers WHERE is_active = true;

-- Test 4: Check if user groups are created
SELECT name, display_name FROM user_groups WHERE is_active = true;

-- Test 5: Test the assign_default_user_config function with a test user
-- (Replace with an actual user ID from your auth.users table)
-- SELECT assign_default_user_config('your-test-user-id-here');

-- Test 6: Test the generate_user_jwt_claims function
-- (Replace with an actual user ID from your auth.users table)
-- SELECT generate_user_jwt_claims('your-test-user-id-here');

-- Test 7: Test the get_user_assignments function
-- (Replace with an actual user ID from your auth.users table)
-- SELECT * FROM get_user_assignments('your-test-user-id-here');

-- Test 8: Test permission checking
-- (Replace with an actual user ID from your auth.users table)
-- SELECT user_has_permission('your-test-user-id-here', 'view_exercises');

-- Test 9: Test feature checking
-- (Replace with an actual user ID from your auth.users table)
-- SELECT user_has_feature('your-test-user-id-here', 'basic_exercises');

-- Test 10: Test data access checking
-- (Replace with an actual user ID from your auth.users table)
-- SELECT can_access_data('your-test-user-id-here', 'own_profile', 'full'); 