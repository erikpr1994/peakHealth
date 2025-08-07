-- Test script to debug RPC function issue
-- Run this in Supabase Studio SQL editor

-- 1. Check if user_defaults table has data
SELECT 'user_defaults' as table_name, COUNT(*) as count FROM user_defaults;
SELECT * FROM user_defaults WHERE is_active = true;

-- 2. Check if user_types table has data
SELECT 'user_types' as table_name, COUNT(*) as count FROM user_types;
SELECT name, is_active FROM user_types;

-- 3. Check if subscription_tiers table has data
SELECT 'subscription_tiers' as table_name, COUNT(*) as count FROM subscription_tiers;
SELECT name, is_active FROM subscription_tiers;

-- 4. Check if user_groups table has data
SELECT 'user_groups' as table_name, COUNT(*) as count FROM user_groups;
SELECT name, is_active FROM user_groups;

-- 5. Test get_user_assignments function with a non-existent user
SELECT 'Testing get_user_assignments with non-existent user' as test;
SELECT * FROM get_user_assignments('00000000-0000-0000-0000-000000000000'::UUID);

-- 6. Test generate_user_jwt_claims function with a non-existent user
SELECT 'Testing generate_user_jwt_claims with non-existent user' as test;
SELECT generate_user_jwt_claims('00000000-0000-0000-0000-000000000000'::UUID);

-- 7. Test assign_default_user_config function with a non-existent user
SELECT 'Testing assign_default_user_config with non-existent user' as test;
SELECT assign_default_user_config('00000000-0000-0000-0000-000000000000'::UUID);

-- 8. Check if any users exist in auth.users
SELECT 'auth.users' as table_name, COUNT(*) as count FROM auth.users;
SELECT id, email FROM auth.users LIMIT 5;

-- 9. If users exist, test with a real user ID
-- Replace 'actual-user-id' with a real user ID from step 8
-- SELECT 'Testing with real user' as test;
-- SELECT assign_default_user_config('actual-user-id'::UUID); 