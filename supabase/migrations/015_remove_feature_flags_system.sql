-- Migration: 015_remove_feature_flags_system.sql
-- Description: Remove the custom feature flag system since Hypertune is now used

-- Drop functions first
DROP FUNCTION IF EXISTS get_public_feature_flags(TEXT);
DROP FUNCTION IF EXISTS get_user_feature_flags(UUID, TEXT);

-- Drop tables in reverse order of dependencies
DROP TABLE IF EXISTS feature_flag_audit_log;
DROP TABLE IF EXISTS feature_flag_users;
DROP TABLE IF EXISTS feature_flag_subscription_tiers;
DROP TABLE IF EXISTS feature_flag_user_types;
DROP TABLE IF EXISTS feature_flag_environments;
DROP TABLE IF EXISTS feature_flags;
