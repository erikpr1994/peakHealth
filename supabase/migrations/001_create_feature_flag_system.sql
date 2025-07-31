-- Feature Flag System Database Schema
-- Migration: 001_create_feature_flag_system.sql

-- User types (trainer, physio, admin, etc.)
CREATE TABLE user_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) UNIQUE NOT NULL,
  display_name VARCHAR(100) NOT NULL,
  description TEXT,
  permissions JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User groups (beta, premium, etc.)
CREATE TABLE user_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) UNIQUE NOT NULL,
  display_name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User type assignments (one user can have MULTIPLE types)
CREATE TABLE user_type_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_type_id UUID REFERENCES user_types(id) ON DELETE CASCADE,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  assigned_by UUID REFERENCES auth.users(id),
  UNIQUE(user_id, user_type_id)
);

-- User group assignments (one user can be in multiple groups)
CREATE TABLE user_group_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  group_id UUID REFERENCES user_groups(id) ON DELETE CASCADE,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  assigned_by UUID REFERENCES auth.users(id),
  UNIQUE(user_id, group_id)
);

-- Feature flags table
CREATE TABLE feature_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,
  display_name VARCHAR(200) NOT NULL,
  description TEXT,
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

-- Target by user types
CREATE TABLE feature_flag_user_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_flag_id UUID REFERENCES feature_flags(id) ON DELETE CASCADE,
  environment VARCHAR(50) NOT NULL,
  user_type_id UUID REFERENCES user_types(id) ON DELETE CASCADE,
  is_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(feature_flag_id, environment, user_type_id)
);

-- Target by user groups
CREATE TABLE feature_flag_user_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_flag_id UUID REFERENCES feature_flags(id) ON DELETE CASCADE,
  environment VARCHAR(50) NOT NULL,
  group_id UUID REFERENCES user_groups(id) ON DELETE CASCADE,
  is_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(feature_flag_id, environment, group_id)
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
CREATE INDEX idx_feature_flag_environments_flag_env ON feature_flag_environments(feature_flag_id, environment);
CREATE INDEX idx_feature_flag_user_types_flag_env ON feature_flag_user_types(feature_flag_id, environment);
CREATE INDEX idx_feature_flag_user_groups_flag_env ON feature_flag_user_groups(feature_flag_id, environment);
CREATE INDEX idx_user_type_assignments_user ON user_type_assignments(user_id);
CREATE INDEX idx_user_group_assignments_user ON user_group_assignments(user_id);

-- Stored procedure to get user's feature flags
CREATE OR REPLACE FUNCTION get_user_feature_flags(user_id UUID, environment_param TEXT)
RETURNS TABLE (
  name TEXT,
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
    AND (
      -- Check user type targeting (user can have multiple types)
      EXISTS (
        SELECT 1 FROM user_type_assignments uta
        JOIN feature_flag_user_types ffut ON uta.user_type_id = ffut.user_type_id
        WHERE uta.user_id = get_user_feature_flags.user_id
          AND ffut.feature_flag_id = ff.id
          AND ffut.environment = environment_param
          AND ffut.is_enabled = true
      )
      OR
      -- Check user group targeting (user can be in multiple groups)
      EXISTS (
        SELECT 1 FROM user_group_assignments uga
        JOIN feature_flag_user_groups ffug ON uga.group_id = ffug.group_id
        WHERE uga.user_id = get_user_feature_flags.user_id
          AND ffug.feature_flag_id = ff.id
          AND ffug.environment = environment_param
          AND ffug.is_enabled = true
      )
      OR
      -- No targeting (enabled for everyone)
      NOT EXISTS (
        SELECT 1 FROM feature_flag_user_types ffut
        WHERE ffut.feature_flag_id = ff.id AND ffut.environment = environment_param
      )
      AND NOT EXISTS (
        SELECT 1 FROM feature_flag_user_groups ffug
        WHERE ffug.feature_flag_id = ff.id AND ffug.environment = environment_param
      )
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper functions for user management
CREATE OR REPLACE FUNCTION get_user_types(user_id UUID)
RETURNS TABLE (
  type_name TEXT,
  display_name TEXT,
  description TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ut.name,
    ut.display_name,
    ut.description
  FROM user_types ut
  JOIN user_type_assignments uta ON ut.id = uta.user_type_id
  WHERE uta.user_id = get_user_types.user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get all user groups for a user
CREATE OR REPLACE FUNCTION get_user_groups(user_id UUID)
RETURNS TABLE (
  group_name TEXT,
  display_name TEXT,
  description TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ug.name,
    ug.display_name,
    ug.description
  FROM user_groups ug
  JOIN user_group_assignments uga ON ug.id = uga.group_id
  WHERE uga.user_id = get_user_groups.user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user has a specific type
CREATE OR REPLACE FUNCTION user_has_type(user_id UUID, type_name TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_type_assignments uta
    JOIN user_types ut ON uta.user_type_id = ut.id
    WHERE uta.user_id = user_has_type.user_id AND ut.name = type_name
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user is in a specific group
CREATE OR REPLACE FUNCTION user_in_group(user_id UUID, group_name TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_group_assignments uga
    JOIN user_groups ug ON uga.group_id = ug.id
    WHERE uga.user_id = user_in_group.user_id AND ug.name = group_name
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable RLS on tables
ALTER TABLE user_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_flag_environments ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_flag_user_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_flag_user_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_type_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_group_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_flag_audit_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can read feature flags
CREATE POLICY "Users can read feature flags" ON feature_flags
  FOR SELECT USING (auth.role() = 'authenticated');

-- Users can read their own type and group assignments
CREATE POLICY "Users can read their own type assignments" ON user_type_assignments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can read their own group assignments" ON user_group_assignments
  FOR SELECT USING (auth.uid() = user_id);

-- Users can read user types and groups
CREATE POLICY "Users can read user types" ON user_types
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can read user groups" ON user_groups
  FOR SELECT USING (auth.role() = 'authenticated');

-- Only admins can manage feature flags (will be updated when admin role is implemented)
CREATE POLICY "Admins can manage feature flags" ON feature_flags
  FOR ALL USING (auth.role() = 'authenticated');

-- Insert seed data
INSERT INTO user_types (name, display_name, description) VALUES
('regular', 'Regular User', 'Standard user with basic access'),
('trainer', 'Trainer', 'Fitness trainer with training capabilities'),
('physio', 'Physiotherapist', 'Physiotherapist with specialized access'),
('admin', 'Administrator', 'System administrator with full access');

INSERT INTO user_groups (name, display_name, description) VALUES
('beta', 'Beta Users', 'Users with access to beta features'),
('premium', 'Premium Users', 'Users with premium subscription'),
('early_access', 'Early Access', 'Users with early access to new features');

-- Insert sample feature flags
INSERT INTO feature_flags (name, display_name, description) VALUES
('notification_system_feature', 'Notification System', 'Real-time notifications and alerts system');

-- Insert environment configurations
INSERT INTO feature_flag_environments (feature_flag_id, environment, is_enabled, rollout_percentage) VALUES
((SELECT id FROM feature_flags WHERE name = 'notification_system_feature'), 'development', true, 100),
((SELECT id FROM feature_flags WHERE name = 'notification_system_feature'), 'staging', true, 100),
((SELECT id FROM feature_flags WHERE name = 'notification_system_feature'), 'production', true, 100); 