-- Migration to update feature flag system for new roles and groups system
-- This migration adds support for targeting by user types and subscription tiers

-- Add new tables for feature flag targeting
CREATE TABLE IF NOT EXISTS feature_flag_user_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_flag_id UUID NOT NULL REFERENCES feature_flags(id) ON DELETE CASCADE,
  user_type_name TEXT NOT NULL REFERENCES user_types(name) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(feature_flag_id, user_type_name)
);

CREATE TABLE IF NOT EXISTS feature_flag_subscription_tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_flag_id UUID NOT NULL REFERENCES feature_flags(id) ON DELETE CASCADE,
  subscription_tier_name TEXT NOT NULL REFERENCES subscription_tiers(name) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(feature_flag_id, subscription_tier_name)
);

-- Add indexes for performance
CREATE INDEX idx_feature_flag_user_types_feature_flag_id ON feature_flag_user_types(feature_flag_id);
CREATE INDEX idx_feature_flag_user_types_user_type_name ON feature_flag_user_types(user_type_name);
CREATE INDEX idx_feature_flag_subscription_tiers_feature_flag_id ON feature_flag_subscription_tiers(feature_flag_id);
CREATE INDEX idx_feature_flag_subscription_tiers_subscription_tier_name ON feature_flag_subscription_tiers(subscription_tier_name);

-- Update the get_user_feature_flags function to include new targeting
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
    ffr.role as targeting_value
  FROM feature_flags ff
  JOIN feature_flag_roles ffr ON ff.id = ffr.feature_flag_id
  JOIN auth.users u ON u.id = user_id_param
  WHERE ff.is_enabled = true
    AND (u.raw_app_meta_data->>'roles')::jsonb ? ffr.role
  
  UNION ALL
  
  SELECT 
    ff.id,
    ff.name,
    ff.description,
    ff.is_enabled,
    'group'::TEXT as targeting_type,
    ffg.group_name as targeting_value
  FROM feature_flags ff
  JOIN feature_flag_groups ffg ON ff.id = ffg.feature_flag_id
  JOIN auth.users u ON u.id = user_id_param
  WHERE ff.is_enabled = true
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

-- Add RLS policies for new tables
ALTER TABLE feature_flag_user_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_flag_subscription_tiers ENABLE ROW LEVEL SECURITY;

-- Policies for feature_flag_user_types
CREATE POLICY "Admins can manage feature flag user types" ON feature_flag_user_types
  FOR ALL USING (auth.role() = 'authenticated');

-- Policies for feature_flag_subscription_tiers
CREATE POLICY "Admins can manage feature flag subscription tiers" ON feature_flag_subscription_tiers
  FOR ALL USING (auth.role() = 'authenticated');

-- Add some sample targeting data for testing
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