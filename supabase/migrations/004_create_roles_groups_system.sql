-- Improved Roles and Groups System Database Schema
-- Migration: 004_create_roles_groups_system.sql

-- User types configuration
CREATE TABLE user_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) UNIQUE NOT NULL,
  display_name VARCHAR(100) NOT NULL,
  description TEXT,
  permissions JSONB NOT NULL DEFAULT '{}',
  data_access_rules JSONB NOT NULL DEFAULT '{}', -- What data this user type can access
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User type assignments (many-to-many)
CREATE TABLE user_type_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_type_name VARCHAR(50) NOT NULL,
  is_primary BOOLEAN DEFAULT false, -- Primary user type for UI/display purposes
  effective_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  effective_until TIMESTAMP WITH TIME ZONE,
  assigned_by UUID REFERENCES auth.users(id),
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, user_type_name, effective_from)
);

-- Subscription tiers configuration
CREATE TABLE subscription_tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) UNIQUE NOT NULL,
  display_name VARCHAR(100) NOT NULL,
  description TEXT,
  features JSONB NOT NULL DEFAULT '[]',
  price_monthly DECIMAL(10,2),
  price_yearly DECIMAL(10,2),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User groups configuration
CREATE TABLE user_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) UNIQUE NOT NULL,
  display_name VARCHAR(100) NOT NULL,
  description TEXT,
  is_managed BOOLEAN DEFAULT false, -- System-managed vs admin-managed
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User group assignments (many-to-many)
CREATE TABLE user_group_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  group_name VARCHAR(50) NOT NULL,
  effective_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  effective_until TIMESTAMP WITH TIME ZONE,
  assigned_by UUID REFERENCES auth.users(id),
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, group_name, effective_from)
);

-- Subscription assignments
CREATE TABLE subscription_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_tier_name VARCHAR(50) NOT NULL,
  effective_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  effective_until TIMESTAMP WITH TIME ZONE,
  assigned_by UUID REFERENCES auth.users(id),
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, effective_from)
);

-- Default user configuration
CREATE TABLE user_defaults (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  default_user_types TEXT[] DEFAULT ARRAY['regular'],
  default_subscription_tier VARCHAR(50) NOT NULL DEFAULT 'free',
  default_groups TEXT[] DEFAULT ARRAY['early_access'],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX idx_user_types_name ON user_types(name);
CREATE INDEX idx_user_types_active ON user_types(is_active);
CREATE INDEX idx_user_type_assignments_user_id ON user_type_assignments(user_id);
CREATE INDEX idx_user_type_assignments_effective_from ON user_type_assignments(effective_from);
CREATE INDEX idx_user_type_assignments_primary ON user_type_assignments(user_id, is_primary) WHERE is_primary = true;

CREATE INDEX idx_subscription_tiers_name ON subscription_tiers(name);
CREATE INDEX idx_subscription_tiers_active ON subscription_tiers(is_active);
CREATE INDEX idx_subscription_assignments_user_id ON subscription_assignments(user_id);
CREATE INDEX idx_subscription_assignments_effective_from ON subscription_assignments(effective_from);

CREATE INDEX idx_user_groups_name ON user_groups(name);
CREATE INDEX idx_user_groups_active ON user_groups(is_active);
CREATE INDEX idx_user_group_assignments_user_id ON user_group_assignments(user_id);
CREATE INDEX idx_user_group_assignments_effective_from ON user_group_assignments(effective_from);

-- Function to get user's current assignments
CREATE OR REPLACE FUNCTION get_user_assignments(user_id_param UUID)
RETURNS TABLE (
  user_types TEXT[],
  primary_user_type VARCHAR(50),
  subscription_tier VARCHAR(50),
  groups TEXT[],
  permissions JSONB,
  features JSONB,
  data_access_rules JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ARRAY(
      SELECT uta.user_type_name 
      FROM user_type_assignments uta
      WHERE uta.user_id = user_id_param
        AND (uta.effective_until IS NULL OR uta.effective_until > NOW())
    ) as user_types,
    
    (SELECT uta.user_type_name 
     FROM user_type_assignments uta
     WHERE uta.user_id = user_id_param
       AND uta.is_primary = true
       AND (uta.effective_until IS NULL OR uta.effective_until > NOW())
     LIMIT 1) as primary_user_type,
    
    (SELECT sa.subscription_tier_name 
     FROM subscription_assignments sa
     WHERE sa.user_id = user_id_param
       AND (sa.effective_until IS NULL OR sa.effective_until > NOW())
     ORDER BY sa.effective_from DESC
     LIMIT 1) as subscription_tier,
    
    ARRAY(
      SELECT uga.group_name 
      FROM user_group_assignments uga
      WHERE uga.user_id = user_id_param
        AND (uga.effective_until IS NULL OR uga.effective_until > NOW())
    ) as groups,
    
    -- Aggregate permissions from all user types
    (SELECT jsonb_object_agg(key, value)
     FROM (
       SELECT DISTINCT key, value
       FROM user_type_assignments uta
       JOIN user_types ut ON ut.name = uta.user_type_name AND ut.is_active = true
       CROSS JOIN LATERAL jsonb_each(ut.permissions) AS p(key, value)
       WHERE uta.user_id = user_id_param
         AND (uta.effective_until IS NULL OR uta.effective_until > NOW())
     ) AS permissions) as permissions,
    
    -- Get features from subscription tier
    (SELECT st.features
     FROM subscription_assignments sa
     JOIN subscription_tiers st ON st.name = sa.subscription_tier_name AND st.is_active = true
     WHERE sa.user_id = user_id_param
       AND (sa.effective_until IS NULL OR sa.effective_until > NOW())
     ORDER BY sa.effective_from DESC
     LIMIT 1) as features,
    
    -- Aggregate data access rules from all user types
    (SELECT jsonb_object_agg(key, value)
     FROM (
       SELECT DISTINCT key, value
       FROM user_type_assignments uta
       JOIN user_types ut ON ut.name = uta.user_type_name AND ut.is_active = true
       CROSS JOIN LATERAL jsonb_each(ut.data_access_rules) AS d(key, value)
       WHERE uta.user_id = user_id_param
         AND (uta.effective_until IS NULL OR uta.effective_until > NOW())
     ) AS data_access_rules) as data_access_rules;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to generate JWT claims for a user
CREATE OR REPLACE FUNCTION generate_user_jwt_claims(user_id_param UUID)
RETURNS JSONB AS $$
DECLARE
  user_assignments RECORD;
  claims JSONB;
BEGIN
  -- Get user's current assignments
  SELECT * INTO user_assignments
  FROM get_user_assignments(user_id_param);
  
  -- If no assignments found, use defaults
  IF user_assignments.user_types IS NULL OR array_length(user_assignments.user_types, 1) IS NULL THEN
    SELECT 
      default_user_types,
      default_subscription_tier,
      default_groups
    INTO user_assignments
    FROM user_defaults
    WHERE is_active = true
    LIMIT 1;
    
    IF user_assignments.user_types IS NULL THEN
      -- Fallback to hardcoded defaults
      claims := jsonb_build_object(
        'user_types', '["regular"]'::jsonb,
        'primary_user_type', 'regular',
        'subscription_tier', 'free',
        'groups', '[]'::jsonb,
        'permissions', '{}'::jsonb,
        'features', '[]'::jsonb,
        'data_access_rules', '{}'::jsonb
      );
    ELSE
      -- Use database defaults
      claims := jsonb_build_object(
        'user_types', to_jsonb(user_assignments.user_types),
        'primary_user_type', user_assignments.user_types[1],
        'subscription_tier', user_assignments.default_subscription_tier,
        'groups', to_jsonb(user_assignments.default_groups),
        'permissions', '{}'::jsonb,
        'features', '[]'::jsonb,
        'data_access_rules', '{}'::jsonb
      );
    END IF;
  ELSE
    claims := jsonb_build_object(
      'user_types', to_jsonb(user_assignments.user_types),
      'primary_user_type', user_assignments.primary_user_type,
      'subscription_tier', user_assignments.subscription_tier,
      'groups', to_jsonb(user_assignments.groups),
      'permissions', user_assignments.permissions,
      'features', user_assignments.features,
      'data_access_rules', user_assignments.data_access_rules
    );
  END IF;
  
  RETURN claims;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to assign default user configuration to a new user
CREATE OR REPLACE FUNCTION assign_default_user_config(user_id_param UUID)
RETURNS JSONB AS $$
DECLARE
  default_config RECORD;
  claims JSONB;
BEGIN
  -- Get default configuration
  SELECT 
    default_user_types,
    default_subscription_tier,
    default_groups
  INTO default_config
  FROM user_defaults
  WHERE is_active = true
  LIMIT 1;
  
  -- If no defaults configured, use hardcoded defaults
  IF default_config.user_types IS NULL THEN
    default_config.user_types := ARRAY['regular'];
    default_config.default_subscription_tier := 'free';
    default_config.default_groups := ARRAY['early_access'];
  END IF;
  
  -- Create user type assignments
  INSERT INTO user_type_assignments (
    user_id,
    user_type_name,
    is_primary,
    reason
  ) 
  SELECT 
    user_id_param,
    user_type,
    CASE WHEN user_type = default_config.user_types[1] THEN true ELSE false END,
    'Default assignment on signup'
  FROM unnest(default_config.user_types) AS user_type;
  
  -- Create subscription assignment
  INSERT INTO subscription_assignments (
    user_id,
    subscription_tier_name,
    reason
  ) VALUES (
    user_id_param,
    default_config.default_subscription_tier,
    'Default assignment on signup'
  );
  
  -- Create group assignments
  INSERT INTO user_group_assignments (
    user_id,
    group_name,
    reason
  )
  SELECT 
    user_id_param,
    group_name,
    'Default assignment on signup'
  FROM unnest(default_config.default_groups) AS group_name;
  
  -- Generate claims
  claims := generate_user_jwt_claims(user_id_param);
  
  RETURN claims;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user has permission
CREATE OR REPLACE FUNCTION user_has_permission(user_id_param UUID, permission_name TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  user_permissions JSONB;
BEGIN
  SELECT permissions INTO user_permissions
  FROM get_user_assignments(user_id_param);
  
  RETURN user_permissions ? permission_name AND user_permissions->permission_name = 'true';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user has feature
CREATE OR REPLACE FUNCTION user_has_feature(user_id_param UUID, feature_name TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  user_features JSONB;
BEGIN
  SELECT features INTO user_features
  FROM get_user_assignments(user_id_param);
  
  RETURN user_features ? feature_name;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check data access permissions
CREATE OR REPLACE FUNCTION can_access_data(user_id_param UUID, data_type TEXT, access_level TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  user_data_access JSONB;
  user_access_level TEXT;
  access_levels JSONB;
BEGIN
  SELECT data_access_rules INTO user_data_access
  FROM get_user_assignments(user_id_param);
  
  -- Get user's access level for this data type
  user_access_level := user_data_access->data_type;
  
  -- Define access level hierarchy
  access_levels := '{"none": 0, "read_only": 1, "training_only": 2, "medical_training": 3, "full": 4}'::jsonb;
  
  -- Check if user has sufficient access level
  RETURN (access_levels->user_access_level)::int >= (access_levels->access_level)::int;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable RLS on tables
ALTER TABLE user_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_type_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_group_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_defaults ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Anyone can read user types, subscription tiers, and user groups
CREATE POLICY "Anyone can read user types" ON user_types
  FOR SELECT USING (true);

CREATE POLICY "Anyone can read subscription tiers" ON subscription_tiers
  FOR SELECT USING (true);

CREATE POLICY "Anyone can read user groups" ON user_groups
  FOR SELECT USING (true);

CREATE POLICY "Anyone can read user defaults" ON user_defaults
  FOR SELECT USING (true);

-- Users can read their own assignments
CREATE POLICY "Users can read their own type assignments" ON user_type_assignments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can read their own group assignments" ON user_group_assignments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can read their own subscription assignments" ON subscription_assignments
  FOR SELECT USING (auth.uid() = user_id);

-- Only admins can manage assignments (will be updated when admin role is implemented)
CREATE POLICY "Admins can manage user type assignments" ON user_type_assignments
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage user group assignments" ON user_group_assignments
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage subscription assignments" ON subscription_assignments
  FOR ALL USING (auth.role() = 'authenticated');

-- Insert seed data
INSERT INTO user_types (name, display_name, description, permissions, data_access_rules) VALUES
('regular', 'Regular User', 'Standard fitness enthusiast', 
 '{"view_exercises": true, "create_workouts": true, "track_progress": true, "view_routines": true}',
 '{"own_profile": "full", "own_workouts": "full", "own_progress": "full"}'),
 
('trainer', 'Trainer', 'Certified fitness trainer', 
 '{"view_exercises": true, "create_workouts": true, "track_progress": true, "view_routines": true, "manage_clients": true, "create_routines": true, "view_client_progress": true}',
 '{"own_profile": "full", "own_workouts": "full", "own_progress": "full", "client_profiles": "training_only", "client_workouts": "full", "client_progress": "full"}'),
 
('physio', 'Physiotherapist', 'Licensed physiotherapist', 
 '{"view_exercises": true, "create_workouts": true, "track_progress": true, "view_routines": true, "manage_clients": true, "create_routines": true, "view_client_progress": true, "medical_assessments": true, "prescribe_exercises": true}',
 '{"own_profile": "full", "own_workouts": "full", "own_progress": "full", "client_profiles": "medical_training", "client_workouts": "full", "client_progress": "full", "medical_records": "read_only"}'),
 
('doctor', 'Doctor', 'Medical doctor', 
 '{"view_exercises": true, "create_workouts": true, "track_progress": true, "view_routines": true, "manage_clients": true, "create_routines": true, "view_client_progress": true, "medical_assessments": true, "prescribe_exercises": true, "prescribe_treatments": true, "view_medical_records": true}',
 '{"own_profile": "full", "own_workouts": "full", "own_progress": "full", "client_profiles": "full", "client_workouts": "full", "client_progress": "full", "medical_records": "full"}'),
 
('admin', 'Administrator', 'Platform administrator', 
 '{"*": true}',
 '{"*": "full"}');

INSERT INTO subscription_tiers (name, display_name, description, features, price_monthly, price_yearly) VALUES
('free', 'Free', 'Basic access to core features', 
 '["basic_exercises", "workout_tracking", "progress_basic", "limited_routines"]', 0, 0),
('basic', 'Basic', 'Enhanced features for fitness enthusiasts', 
 '["basic_exercises", "workout_tracking", "progress_advanced", "custom_routines", "exercise_library", "unlimited_routines"]', 9.99, 99.99),
('premium', 'Premium', 'Advanced features for serious athletes', 
 '["basic_exercises", "workout_tracking", "progress_advanced", "custom_routines", "exercise_library", "unlimited_routines", "advanced_analytics", "nutrition_tracking", "recovery_tracking", "personalized_recommendations"]', 19.99, 199.99),
('pro', 'Professional', 'Professional tools for trainers and coaches', 
 '["basic_exercises", "workout_tracking", "progress_advanced", "custom_routines", "exercise_library", "unlimited_routines", "advanced_analytics", "nutrition_tracking", "recovery_tracking", "personalized_recommendations", "client_management", "team_management", "white_label", "api_access"]', 49.99, 499.99),
('enterprise', 'Enterprise', 'Corporate wellness solutions', 
 '["basic_exercises", "workout_tracking", "progress_advanced", "custom_routines", "exercise_library", "unlimited_routines", "advanced_analytics", "nutrition_tracking", "recovery_tracking", "personalized_recommendations", "client_management", "team_management", "white_label", "api_access", "corporate_analytics", "custom_integrations", "dedicated_support"]', 199.99, 1999.99);

INSERT INTO user_groups (name, display_name, description, is_managed) VALUES
('beta_testers', 'Beta Testers', 'Users who test new features before release', true),
('early_access', 'Early Access', 'Users who get early access to new features', true),
('corporate_partners', 'Corporate Partners', 'Partners with special access', false),
('influencers', 'Influencers', 'Fitness influencers and content creators', false),
('moderators', 'Moderators', 'Community moderators', true);

INSERT INTO user_defaults (default_user_types, default_subscription_tier, default_groups) VALUES
(ARRAY['regular'], 'free', ARRAY['early_access']);

-- Add comments to explain the architecture
COMMENT ON TABLE user_types IS 'User types define the professional role of users with permissions and data access rules';
COMMENT ON TABLE user_type_assignments IS 'User type assignments allow users to have multiple types with one primary type';
COMMENT ON TABLE subscription_tiers IS 'Subscription tiers define the access level and features available to users';
COMMENT ON TABLE user_groups IS 'User groups provide special access for beta testing, early access, etc.';
COMMENT ON TABLE user_group_assignments IS 'User group assignments allow users to belong to multiple groups';
COMMENT ON TABLE subscription_assignments IS 'Subscription assignments track user subscription tier changes';
COMMENT ON TABLE user_defaults IS 'Default configuration for new user signups';
COMMENT ON FUNCTION get_user_assignments IS 'Gets current user assignments with aggregated permissions and data access rules';
COMMENT ON FUNCTION generate_user_jwt_claims IS 'Generates JWT claims for a user based on their current assignments';
COMMENT ON FUNCTION assign_default_user_config IS 'Assigns default configuration to a new user and returns JWT claims';
COMMENT ON FUNCTION user_has_permission IS 'Checks if a user has a specific permission';
COMMENT ON FUNCTION user_has_feature IS 'Checks if a user has access to a specific feature';
COMMENT ON FUNCTION can_access_data IS 'Checks if a user can access specific data at a given access level'; 