-- Feature Flag System Enhancements
-- Migration: 003_enhance_feature_flag_system.sql

-- Add a new column to feature_flags to distinguish between public and user-specific flags
ALTER TABLE feature_flags 
ADD COLUMN is_public BOOLEAN DEFAULT false;

-- Add index for public flags
CREATE INDEX idx_feature_flags_public ON feature_flags(is_public);

-- Create function to get public feature flags (no user required)
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
    -- Public flags should not have any user type or group targeting
    AND NOT EXISTS (
      SELECT 1 FROM feature_flag_user_types ffut
      WHERE ffut.feature_flag_id = ff.id AND ffut.environment = environment_param
    )
    AND NOT EXISTS (
      SELECT 1 FROM feature_flag_user_groups ffug
      WHERE ffug.feature_flag_id = ff.id AND ffug.environment = environment_param
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update the existing get_user_feature_flags function to exclude public flags
-- (since they're now handled separately)
CREATE OR REPLACE FUNCTION get_user_feature_flags(user_id UUID, environment_param TEXT)
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
      -- No targeting (enabled for all authenticated users)
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

-- Add RLS policy for public feature flags (allow anonymous access)
CREATE POLICY "Anyone can read public feature flags" ON feature_flags
  FOR SELECT USING (is_public = true);

-- Update existing policy to exclude public flags
DROP POLICY IF EXISTS "Users can read feature flags" ON feature_flags;
CREATE POLICY "Authenticated users can read user-specific feature flags" ON feature_flags
  FOR SELECT USING (auth.role() = 'authenticated' AND is_public = false);

-- Add some sample public feature flags
INSERT INTO feature_flags (name, display_name, description, is_public) VALUES
('landing_page_ab_test', 'Landing Page A/B Test', 'A/B testing for landing page variants', true),
('public_beta_announcement', 'Public Beta Announcement', 'Show beta announcement to all users', true),
('maintenance_mode', 'Maintenance Mode', 'Enable maintenance mode for all users', true);

-- Insert environment configurations for public flags
INSERT INTO feature_flag_environments (feature_flag_id, environment, is_enabled, rollout_percentage) VALUES
((SELECT id FROM feature_flags WHERE name = 'landing_page_ab_test'), 'development', true, 50),
((SELECT id FROM feature_flags WHERE name = 'landing_page_ab_test'), 'staging', true, 50),
((SELECT id FROM feature_flags WHERE name = 'landing_page_ab_test'), 'production', false, 0),
((SELECT id FROM feature_flags WHERE name = 'public_beta_announcement'), 'development', true, 100),
((SELECT id FROM feature_flags WHERE name = 'public_beta_announcement'), 'staging', true, 100),
((SELECT id FROM feature_flags WHERE name = 'public_beta_announcement'), 'production', false, 0),
((SELECT id FROM feature_flags WHERE name = 'maintenance_mode'), 'development', false, 0),
((SELECT id FROM feature_flags WHERE name = 'maintenance_mode'), 'staging', false, 0),
((SELECT id FROM feature_flags WHERE name = 'maintenance_mode'), 'production', false, 0);

-- Update existing notification system feature flag to be user-specific
UPDATE feature_flags 
SET is_public = false 
WHERE name = 'notification_system_feature';

-- Add comment to explain the new architecture
COMMENT ON TABLE feature_flags IS 'Feature flags table. is_public=true for flags available to all users, is_public=false for user-specific flags.';
COMMENT ON FUNCTION get_public_feature_flags IS 'Returns feature flags that are available to all users (no authentication required)';
COMMENT ON FUNCTION get_user_feature_flags IS 'Returns user-specific feature flags based on user types and groups (requires authentication)'; 