-- Feature Flag System Database Schema
-- Migration: 004_feature_flags_system.sql
-- Consolidated migration including new roles and groups system support with correct function signature

-- Feature flags table with public/user-specific distinction
CREATE TABLE feature_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,
  display_name VARCHAR(200) NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  is_global BOOLEAN DEFAULT false,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Environment configurations
CREATE TABLE feature_flag_environments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_flag_id UUID REFERENCES feature_flags(id) ON DELETE CASCADE,
  environment VARCHAR(50) NOT NULL,
  is_enabled BOOLEAN DEFAULT false,
  rollout_percentage INTEGER DEFAULT 0 CHECK (rollout_percentage >= 0 AND rollout_percentage <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(feature_flag_id, environment)
);

-- Target by user roles (stored in user_metadata) - Legacy support
CREATE TABLE feature_flag_user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_flag_id UUID REFERENCES feature_flags(id) ON DELETE CASCADE,
  environment VARCHAR(50) NOT NULL,
  role_name VARCHAR(50) NOT NULL,
  is_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(feature_flag_id, environment, role_name)
);

-- Target by user groups (stored in user_metadata) - Legacy support
CREATE TABLE feature_flag_user_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_flag_id UUID REFERENCES feature_flags(id) ON DELETE CASCADE,
  environment VARCHAR(50) NOT NULL,
  group_name VARCHAR(50) NOT NULL,
  is_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(feature_flag_id, environment, group_name)
);

-- Target by user types (new roles and groups system)
CREATE TABLE feature_flag_user_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_flag_id UUID NOT NULL REFERENCES feature_flags(id) ON DELETE CASCADE,
  user_type_name TEXT NOT NULL REFERENCES user_types(name) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(feature_flag_id, user_type_name)
);

-- Target by subscription tiers (new roles and groups system)
CREATE TABLE feature_flag_subscription_tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_flag_id UUID NOT NULL REFERENCES feature_flags(id) ON DELETE CASCADE,
  subscription_tier_name TEXT NOT NULL REFERENCES subscription_tiers(name) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(feature_flag_id, subscription_tier_name)
);

-- Target by specific users
CREATE TABLE feature_flag_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_flag_id UUID NOT NULL REFERENCES feature_flags(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(feature_flag_id, user_id)
);

-- Audit trail for feature flag changes
CREATE TABLE feature_flag_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_flag_id UUID REFERENCES feature_flags(id),
  action VARCHAR(50) NOT NULL,
  old_values JSONB,
  new_values JSONB,
  changed_by UUID REFERENCES auth.users(id),
  changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  environment VARCHAR(50),
  reason TEXT
);

-- Add indexes for performance
CREATE INDEX idx_feature_flags_name ON feature_flags(name);
CREATE INDEX idx_feature_flags_public ON feature_flags(is_public);
CREATE INDEX idx_feature_flags_global ON feature_flags(is_global);
CREATE INDEX idx_feature_flag_environments_flag_env ON feature_flag_environments(feature_flag_id, environment);
CREATE INDEX idx_feature_flag_user_roles_flag_env ON feature_flag_user_roles(feature_flag_id, environment);
CREATE INDEX idx_feature_flag_user_groups_flag_env ON feature_flag_user_groups(feature_flag_id, environment);
CREATE INDEX idx_feature_flag_user_types_feature_flag_id ON feature_flag_user_types(feature_flag_id);
CREATE INDEX idx_feature_flag_user_types_user_type_name ON feature_flag_user_types(user_type_name);
CREATE INDEX idx_feature_flag_subscription_tiers_feature_flag_id ON feature_flag_subscription_tiers(feature_flag_id);
CREATE INDEX idx_feature_flag_subscription_tiers_subscription_tier_name ON feature_flag_subscription_tiers(subscription_tier_name);
CREATE INDEX idx_feature_flag_users_feature_flag_id ON feature_flag_users(feature_flag_id);
CREATE INDEX idx_feature_flag_users_user_id ON feature_flag_users(user_id);

-- Function to get public feature flags (no user required)
CREATE OR REPLACE FUNCTION get_public_feature_flags(environment_param TEXT)
RETURNS TABLE (
  name VARCHAR(100),
  is_enabled BOOLEAN,
  rollout_percentage INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT DISTINCT
    ff.name,
    ffe.is_enabled,
    ffe.rollout_percentage
  FROM feature_flags ff
  JOIN feature_flag_environments ffe ON ff.id = ffe.feature_flag_id
  WHERE ffe.environment = environment_param
    AND ffe.is_enabled = true
    AND ff.is_public = true
    -- Public flags should not have any user role or group targeting
    AND NOT EXISTS (
      SELECT 1 FROM feature_flag_user_roles ffur
      WHERE ffur.feature_flag_id = ff.id AND ffur.environment = environment_param
    )
    AND NOT EXISTS (
      SELECT 1 FROM feature_flag_user_groups ffug
      WHERE ffug.feature_flag_id = ff.id AND ffug.environment = environment_param
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user-specific feature flags with proper role/group filtering (legacy)
CREATE OR REPLACE FUNCTION get_user_feature_flags_legacy(
  user_id UUID, 
  environment_param TEXT,
  user_roles JSONB DEFAULT '[]'::JSONB,
  user_groups JSONB DEFAULT '[]'::JSONB
)
RETURNS TABLE (
  name VARCHAR(100),
  is_enabled BOOLEAN,
  rollout_percentage INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT DISTINCT
    ff.name,
    ffe.is_enabled,
    ffe.rollout_percentage
  FROM feature_flags ff
  JOIN feature_flag_environments ffe ON ff.id = ffe.feature_flag_id
  WHERE ffe.environment = environment_param
    AND ffe.is_enabled = true
    AND ff.is_public = false  -- Only user-specific flags
    AND (
      -- Flag has no role targeting (available to all authenticated users)
      NOT EXISTS (
        SELECT 1 FROM feature_flag_user_roles ffur
        WHERE ffur.feature_flag_id = ff.id 
          AND ffur.environment = environment_param
          AND ffur.is_enabled = true
      )
      OR
      -- User has a matching role
      EXISTS (
        SELECT 1 FROM feature_flag_user_roles ffur
        WHERE ffur.feature_flag_id = ff.id 
          AND ffur.environment = environment_param
          AND ffur.is_enabled = true
          AND ffur.role_name = ANY(SELECT jsonb_array_elements_text(user_roles))
      )
    )
    AND (
      -- Flag has no group targeting (available to all authenticated users)
      NOT EXISTS (
        SELECT 1 FROM feature_flag_user_groups ffug
        WHERE ffug.feature_flag_id = ff.id 
          AND ffug.environment = environment_param
          AND ffug.is_enabled = true
      )
      OR
      -- User has a matching group
      EXISTS (
        SELECT 1 FROM feature_flag_user_groups ffug
        WHERE ffug.feature_flag_id = ff.id 
          AND ffug.environment = environment_param
          AND ffug.is_enabled = true
          AND ffug.group_name = ANY(SELECT jsonb_array_elements_text(user_groups))
      )
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Updated function to get user feature flags with new roles and groups system
CREATE OR REPLACE FUNCTION get_user_feature_flags(user_id_param UUID)
RETURNS TABLE (
  feature_flag_id UUID,
  name TEXT,
  description TEXT,
  is_enabled BOOLEAN,
  targeting_type TEXT,
  targeting_value TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ff.id,
    ff.name,
    ff.description,
    ff.is_enabled,
    'global'::TEXT as targeting_type,
    NULL::TEXT as targeting_value
  FROM feature_flags ff
  WHERE ff.is_enabled = true
    AND ff.is_global = true
  
  UNION ALL
  
  SELECT 
    ff.id,
    ff.name,
    ff.description,
    ff.is_enabled,
    'user'::TEXT as targeting_type,
    u.email as targeting_value
  FROM feature_flags ff
  JOIN feature_flag_users ffu ON ff.id = ffu.feature_flag_id
  JOIN auth.users u ON ffu.user_id = u.id
  WHERE ff.is_enabled = true
    AND u.id = user_id_param
  
  UNION ALL
  
  SELECT 
    ff.id,
    ff.name,
    ff.description,
    ff.is_enabled,
    'role'::TEXT as targeting_type,
    ffr.role_name as targeting_value
  FROM feature_flags ff
  JOIN feature_flag_user_roles ffr ON ff.id = ffr.feature_flag_id
  JOIN auth.users u ON u.id = user_id_param
  WHERE ff.is_enabled = true
    AND ffr.is_enabled = true
    AND (u.raw_app_meta_data->>'roles')::jsonb ? ffr.role_name
  
  UNION ALL
  
  SELECT 
    ff.id,
    ff.name,
    ff.description,
    ff.is_enabled,
    'group'::TEXT as targeting_type,
    ffg.group_name as targeting_value
  FROM feature_flags ff
  JOIN feature_flag_user_groups ffg ON ff.id = ffg.feature_flag_id
  JOIN auth.users u ON u.id = user_id_param
  WHERE ff.is_enabled = true
    AND ffg.is_enabled = true
    AND (u.raw_app_meta_data->>'groups')::jsonb ? ffg.group_name
  
  UNION ALL
  
  SELECT 
    ff.id,
    ff.name,
    ff.description,
    ff.is_enabled,
    'user_type'::TEXT as targeting_type,
    fft.user_type_name as targeting_value
  FROM feature_flags ff
  JOIN feature_flag_user_types fft ON ff.id = fft.feature_flag_id
  JOIN auth.users u ON u.id = user_id_param
  WHERE ff.is_enabled = true
    AND (u.raw_app_meta_data->>'user_types')::jsonb ? fft.user_type_name
  
  UNION ALL
  
  SELECT 
    ff.id,
    ff.name,
    ff.description,
    ff.is_enabled,
    'subscription_tier'::TEXT as targeting_type,
    fft.subscription_tier_name as targeting_value
  FROM feature_flags ff
  JOIN feature_flag_subscription_tiers fft ON ff.id = fft.feature_flag_id
  JOIN auth.users u ON u.id = user_id_param
  WHERE ff.is_enabled = true
    AND (u.raw_app_meta_data->>'subscription_tier')::TEXT = fft.subscription_tier_name;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper functions for checking user roles and groups (legacy)
CREATE OR REPLACE FUNCTION user_has_role(user_roles JSONB, role_name TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN role_name = ANY(SELECT jsonb_array_elements_text(user_roles));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION user_in_group(user_groups JSONB, group_name TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN group_name = ANY(SELECT jsonb_array_elements_text(user_groups));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable RLS on all tables
ALTER TABLE feature_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_flag_environments ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_flag_user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_flag_user_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_flag_user_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_flag_subscription_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_flag_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_flag_audit_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Public feature flags (allow anonymous access)
CREATE POLICY "Anyone can read public feature flags" ON feature_flags
  FOR SELECT USING (is_public = true);

-- Authenticated users can read user-specific feature flags
CREATE POLICY "Authenticated users can read user-specific feature flags" ON feature_flags
  FOR SELECT USING (auth.role() = 'authenticated' AND is_public = false);

-- Users can read feature flag environments
CREATE POLICY "Users can read feature flag environments" ON feature_flag_environments
  FOR SELECT USING (auth.role() = 'authenticated');

-- Users can read feature flag targeting rules
CREATE POLICY "Users can read feature flag user roles" ON feature_flag_user_roles
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can read feature flag user groups" ON feature_flag_user_groups
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can read feature flag user types" ON feature_flag_user_types
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can read feature flag subscription tiers" ON feature_flag_subscription_tiers
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can read feature flag users" ON feature_flag_users
  FOR SELECT USING (auth.role() = 'authenticated');

-- Only admins can manage feature flags (will be updated when admin role is implemented)
CREATE POLICY "Admins can manage feature flags" ON feature_flags
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage feature flag user types" ON feature_flag_user_types
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage feature flag subscription tiers" ON feature_flag_subscription_tiers
  FOR ALL USING (auth.role() = 'authenticated');

-- Insert feature flags (both public and user-specific)
INSERT INTO feature_flags (name, display_name, description, is_public, is_global) VALUES
('notification_system_feature', 'Notification System', 'Real-time notifications and alerts system', false, false),
-- Page feature flags (all user-specific)
('calendar_feature', 'Calendar Feature', 'Calendar and scheduling functionality', false, false),
('performance_feature', 'Performance Feature', 'Performance tracking and analytics', false, false),
('health_feature', 'Health Feature', 'Health monitoring and tracking', false, false),
('trainer_and_clubs_feature', 'Trainer & Clubs Feature', 'Trainer and fitness clubs functionality', false, false),
('gyms_feature', 'Gyms Feature', 'Gym management and discovery', false, false),
('equipment_feature', 'Equipment Feature', 'Equipment tracking and management', false, false),
('suggestions_feature', 'Suggestions Feature', 'Exercise and workout suggestions', false, false),
('account_settings_feature', 'Account Settings Feature', 'User account settings and preferences', false, false),
('app_settings_feature', 'App Settings Feature', 'Application settings and configuration', false, false),
('help_support_feature', 'Help & Support Feature', 'Help and support functionality', false, false),
('dashboard_feature', 'Dashboard Feature', 'Main dashboard functionality', false, true),
-- New feature flags for the roles and groups system
('advanced_analytics', 'Advanced Analytics', 'Advanced analytics and reporting features', false, false),
('admin_panel', 'Admin Panel', 'Administrative panel and management tools', false, false),
('premium_features', 'Premium Features', 'Premium subscription features', false, false),
('pro_features', 'Pro Features', 'Professional subscription features', false, false);

-- Insert environment configurations
INSERT INTO feature_flag_environments (feature_flag_id, environment, is_enabled, rollout_percentage) VALUES
-- Notification system (user-specific)
((SELECT id FROM feature_flags WHERE name = 'notification_system_feature'), 'development', false, 0),
((SELECT id FROM feature_flags WHERE name = 'notification_system_feature'), 'staging', false, 0),
((SELECT id FROM feature_flags WHERE name = 'notification_system_feature'), 'production', false, 0),
-- Page feature flags (all disabled by default)
((SELECT id FROM feature_flags WHERE name = 'calendar_feature'), 'development', false, 0),
((SELECT id FROM feature_flags WHERE name = 'calendar_feature'), 'staging', false, 0),
((SELECT id FROM feature_flags WHERE name = 'calendar_feature'), 'production', false, 0),
((SELECT id FROM feature_flags WHERE name = 'performance_feature'), 'development', false, 0),
((SELECT id FROM feature_flags WHERE name = 'performance_feature'), 'staging', false, 0),
((SELECT id FROM feature_flags WHERE name = 'performance_feature'), 'production', false, 0),
((SELECT id FROM feature_flags WHERE name = 'health_feature'), 'development', false, 0),
((SELECT id FROM feature_flags WHERE name = 'health_feature'), 'staging', false, 0),
((SELECT id FROM feature_flags WHERE name = 'health_feature'), 'production', false, 0),
((SELECT id FROM feature_flags WHERE name = 'trainer_and_clubs_feature'), 'development', false, 0),
((SELECT id FROM feature_flags WHERE name = 'trainer_and_clubs_feature'), 'staging', false, 0),
((SELECT id FROM feature_flags WHERE name = 'trainer_and_clubs_feature'), 'production', false, 0),
((SELECT id FROM feature_flags WHERE name = 'gyms_feature'), 'development', false, 0),
((SELECT id FROM feature_flags WHERE name = 'gyms_feature'), 'staging', false, 0),
((SELECT id FROM feature_flags WHERE name = 'gyms_feature'), 'production', false, 0),
((SELECT id FROM feature_flags WHERE name = 'equipment_feature'), 'development', false, 0),
((SELECT id FROM feature_flags WHERE name = 'equipment_feature'), 'staging', false, 0),
((SELECT id FROM feature_flags WHERE name = 'equipment_feature'), 'production', false, 0),
((SELECT id FROM feature_flags WHERE name = 'suggestions_feature'), 'development', false, 0),
((SELECT id FROM feature_flags WHERE name = 'suggestions_feature'), 'staging', false, 0),
((SELECT id FROM feature_flags WHERE name = 'suggestions_feature'), 'production', false, 0),
((SELECT id FROM feature_flags WHERE name = 'account_settings_feature'), 'development', false, 0),
((SELECT id FROM feature_flags WHERE name = 'account_settings_feature'), 'staging', false, 0),
((SELECT id FROM feature_flags WHERE name = 'account_settings_feature'), 'production', false, 0),
((SELECT id FROM feature_flags WHERE name = 'app_settings_feature'), 'development', false, 0),
((SELECT id FROM feature_flags WHERE name = 'app_settings_feature'), 'staging', false, 0),
((SELECT id FROM feature_flags WHERE name = 'app_settings_feature'), 'production', false, 0),
((SELECT id FROM feature_flags WHERE name = 'help_support_feature'), 'development', false, 0),
((SELECT id FROM feature_flags WHERE name = 'help_support_feature'), 'staging', false, 0),
((SELECT id FROM feature_flags WHERE name = 'help_support_feature'), 'production', false, 0),
((SELECT id FROM feature_flags WHERE name = 'dashboard_feature'), 'development', true, 100),
((SELECT id FROM feature_flags WHERE name = 'dashboard_feature'), 'staging', true, 100),
((SELECT id FROM feature_flags WHERE name = 'dashboard_feature'), 'production', true, 100),
-- New feature flags
((SELECT id FROM feature_flags WHERE name = 'advanced_analytics'), 'development', false, 0),
((SELECT id FROM feature_flags WHERE name = 'advanced_analytics'), 'staging', false, 0),
((SELECT id FROM feature_flags WHERE name = 'advanced_analytics'), 'production', false, 0),
((SELECT id FROM feature_flags WHERE name = 'admin_panel'), 'development', false, 0),
((SELECT id FROM feature_flags WHERE name = 'admin_panel'), 'staging', false, 0),
((SELECT id FROM feature_flags WHERE name = 'admin_panel'), 'production', false, 0),
((SELECT id FROM feature_flags WHERE name = 'premium_features'), 'development', false, 0),
((SELECT id FROM feature_flags WHERE name = 'premium_features'), 'staging', false, 0),
((SELECT id FROM feature_flags WHERE name = 'premium_features'), 'production', false, 0),
((SELECT id FROM feature_flags WHERE name = 'pro_features'), 'development', false, 0),
((SELECT id FROM feature_flags WHERE name = 'pro_features'), 'staging', false, 0),
((SELECT id FROM feature_flags WHERE name = 'pro_features'), 'production', false, 0);

-- Insert sample role and group targeting rules (legacy)
INSERT INTO feature_flag_user_roles (feature_flag_id, environment, role_name, is_enabled) VALUES
-- Notification system only for premium users
((SELECT id FROM feature_flags WHERE name = 'notification_system_feature'), 'development', 'premium', true),
((SELECT id FROM feature_flags WHERE name = 'notification_system_feature'), 'staging', 'premium', true),
((SELECT id FROM feature_flags WHERE name = 'notification_system_feature'), 'production', 'premium', true);

INSERT INTO feature_flag_user_groups (feature_flag_id, environment, group_name, is_enabled) VALUES
-- Notification system only for beta testers
((SELECT id FROM feature_flags WHERE name = 'notification_system_feature'), 'development', 'beta_testers', true),
((SELECT id FROM feature_flags WHERE name = 'notification_system_feature'), 'staging', 'beta_testers', true);

-- Insert sample user type and subscription tier targeting rules (new system)
INSERT INTO feature_flag_user_types (feature_flag_id, user_type_name)
SELECT ff.id, 'trainer'
FROM feature_flags ff
WHERE ff.name = 'advanced_analytics'
LIMIT 1;

INSERT INTO feature_flag_user_types (feature_flag_id, user_type_name)
SELECT ff.id, 'admin'
FROM feature_flags ff
WHERE ff.name = 'admin_panel'
LIMIT 1;

INSERT INTO feature_flag_subscription_tiers (feature_flag_id, subscription_tier_name)
SELECT ff.id, 'premium'
FROM feature_flags ff
WHERE ff.name = 'premium_features'
LIMIT 1;

INSERT INTO feature_flag_subscription_tiers (feature_flag_id, subscription_tier_name)
SELECT ff.id, 'pro'
FROM feature_flags ff
WHERE ff.name = 'pro_features'
LIMIT 1;

-- Add comments to explain the architecture
COMMENT ON TABLE feature_flags IS 'Feature flags table. is_public=true for flags available to all users, is_public=false for user-specific flags. is_global=true for flags available to all authenticated users.';
COMMENT ON FUNCTION get_public_feature_flags IS 'Returns feature flags that are available to all users (no authentication required)';
COMMENT ON FUNCTION get_user_feature_flags_legacy IS 'Legacy function for user-specific feature flags filtered by user roles and groups passed as parameters';
COMMENT ON FUNCTION get_user_feature_flags IS 'Returns user-specific feature flags filtered by user types, subscription tiers, roles, and groups from JWT claims';
COMMENT ON FUNCTION user_has_role IS 'Checks if a user has a specific role from the provided roles array (legacy)';
COMMENT ON FUNCTION user_in_group IS 'Checks if a user belongs to a specific group from the provided groups array (legacy)';
