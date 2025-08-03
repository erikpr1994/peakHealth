-- Feature Flag System Database Schema
-- Migration: 001_create_feature_flag_system.sql



-- Feature flags table with public/user-specific distinction
CREATE TABLE feature_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,
  display_name VARCHAR(200) NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT false,
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

-- Target by user roles (stored in user_metadata)
CREATE TABLE feature_flag_user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_flag_id UUID REFERENCES feature_flags(id) ON DELETE CASCADE,
  environment VARCHAR(50) NOT NULL,
  role_name VARCHAR(50) NOT NULL,
  is_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(feature_flag_id, environment, role_name)
);

-- Target by user groups (stored in user_metadata)
CREATE TABLE feature_flag_user_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_flag_id UUID REFERENCES feature_flags(id) ON DELETE CASCADE,
  environment VARCHAR(50) NOT NULL,
  group_name VARCHAR(50) NOT NULL,
  is_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(feature_flag_id, environment, group_name)
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
CREATE INDEX idx_feature_flag_environments_flag_env ON feature_flag_environments(feature_flag_id, environment);
CREATE INDEX idx_feature_flag_user_roles_flag_env ON feature_flag_user_roles(feature_flag_id, environment);
CREATE INDEX idx_feature_flag_user_groups_flag_env ON feature_flag_user_groups(feature_flag_id, environment);

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

-- Function to get user-specific feature flags with proper role/group filtering
CREATE OR REPLACE FUNCTION get_user_feature_flags(
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

-- Helper functions for checking user roles and groups
-- These functions work with the roles/groups passed as parameters
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

-- Enable RLS on tables
ALTER TABLE feature_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_flag_environments ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_flag_user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_flag_user_groups ENABLE ROW LEVEL SECURITY;
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

-- Only admins can manage feature flags (will be updated when admin role is implemented)
CREATE POLICY "Admins can manage feature flags" ON feature_flags
  FOR ALL USING (auth.role() = 'authenticated');

-- Insert sample feature flags (both public and user-specific)
INSERT INTO feature_flags (name, display_name, description, is_public) VALUES
('notification_system_feature', 'Notification System', 'Real-time notifications and alerts system', false),
('landing_page_ab_test', 'Landing Page A/B Test', 'A/B testing for landing page variants', true),
('public_beta_announcement', 'Public Beta Announcement', 'Show beta announcement to all users', true),
('maintenance_mode', 'Maintenance Mode', 'Enable maintenance mode for all users', true);

-- Insert environment configurations
INSERT INTO feature_flag_environments (feature_flag_id, environment, is_enabled, rollout_percentage) VALUES
-- Notification system (user-specific)
((SELECT id FROM feature_flags WHERE name = 'notification_system_feature'), 'development', false, 0),
((SELECT id FROM feature_flags WHERE name = 'notification_system_feature'), 'staging', false, 0),
((SELECT id FROM feature_flags WHERE name = 'notification_system_feature'), 'production', false, 0),
-- Public flags
((SELECT id FROM feature_flags WHERE name = 'landing_page_ab_test'), 'development', true, 50),
((SELECT id FROM feature_flags WHERE name = 'landing_page_ab_test'), 'staging', true, 50),
((SELECT id FROM feature_flags WHERE name = 'landing_page_ab_test'), 'production', false, 0),
((SELECT id FROM feature_flags WHERE name = 'public_beta_announcement'), 'development', true, 100),
((SELECT id FROM feature_flags WHERE name = 'public_beta_announcement'), 'staging', true, 100),
((SELECT id FROM feature_flags WHERE name = 'public_beta_announcement'), 'production', false, 0),
((SELECT id FROM feature_flags WHERE name = 'maintenance_mode'), 'development', false, 0),
((SELECT id FROM feature_flags WHERE name = 'maintenance_mode'), 'staging', false, 0),
((SELECT id FROM feature_flags WHERE name = 'maintenance_mode'), 'production', false, 0);

-- Insert sample role and group targeting rules
INSERT INTO feature_flag_user_roles (feature_flag_id, environment, role_name, is_enabled) VALUES
-- Notification system only for premium users
((SELECT id FROM feature_flags WHERE name = 'notification_system_feature'), 'development', 'premium', true),
((SELECT id FROM feature_flags WHERE name = 'notification_system_feature'), 'staging', 'premium', true),
((SELECT id FROM feature_flags WHERE name = 'notification_system_feature'), 'production', 'premium', true);

INSERT INTO feature_flag_user_groups (feature_flag_id, environment, group_name, is_enabled) VALUES
-- Notification system only for beta testers
((SELECT id FROM feature_flags WHERE name = 'notification_system_feature'), 'development', 'beta_testers', true),
((SELECT id FROM feature_flags WHERE name = 'notification_system_feature'), 'staging', 'beta_testers', true);



-- Add comments to explain the architecture
COMMENT ON TABLE feature_flags IS 'Feature flags table. is_public=true for flags available to all users, is_public=false for user-specific flags.';
COMMENT ON FUNCTION get_public_feature_flags IS 'Returns feature flags that are available to all users (no authentication required)';
COMMENT ON FUNCTION get_user_feature_flags IS 'Returns user-specific feature flags filtered by user roles and groups passed as parameters (requires authentication)';
COMMENT ON FUNCTION user_has_role IS 'Checks if a user has a specific role from the provided roles array';
COMMENT ON FUNCTION user_in_group IS 'Checks if a user belongs to a specific group from the provided groups array'; 