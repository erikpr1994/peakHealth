-- 005_remove_legacy_roles.sql
-- Purpose: Remove legacy role-based targeting from the feature flag system and
--          align functions and constraints accordingly.

-- Safety: wrap in a transaction
BEGIN;

-- Drop dependent policies, indexes, functions, and tables related to roles
DO $$ BEGIN
  -- Drop policies if they exist
  PERFORM 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'feature_flag_user_roles' AND policyname = 'Users can read feature flag user roles';
  IF FOUND THEN
    EXECUTE 'DROP POLICY "Users can read feature flag user roles" ON feature_flag_user_roles';
  END IF;
EXCEPTION WHEN undefined_table THEN
  -- ignore
END $$;

-- Drop role table index if exists
DO $$ BEGIN
  EXECUTE 'DROP INDEX IF EXISTS idx_feature_flag_user_roles_flag_env';
EXCEPTION WHEN undefined_table THEN
  -- ignore
END $$;

-- Drop legacy helper/function signature if exists
DO $$ BEGIN
  EXECUTE 'DROP FUNCTION IF EXISTS get_user_feature_flags_legacy(uuid, text, jsonb, jsonb)';
EXCEPTION WHEN undefined_function THEN
  -- ignore
END $$;

DO $$ BEGIN
  EXECUTE 'DROP FUNCTION IF EXISTS user_has_role(jsonb, text)';
EXCEPTION WHEN undefined_function THEN
  -- ignore
END $$;

-- Drop the legacy roles table
DROP TABLE IF EXISTS feature_flag_user_roles CASCADE;

-- Recreate get_public_feature_flags without role checks (groups constraint remains)
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
    -- Public flags should not have any group targeting
    AND NOT EXISTS (
      SELECT 1 FROM feature_flag_user_groups ffug
      WHERE ffug.feature_flag_id = ff.id AND ffug.environment = environment_param
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate get_user_feature_flags without role union
CREATE OR REPLACE FUNCTION get_user_feature_flags(
  user_id_param UUID,
  environment_param TEXT
)
RETURNS TABLE (
  feature_flag_id UUID,
  name TEXT,
  description TEXT,
  is_enabled BOOLEAN,
  rollout_percentage INTEGER,
  environment TEXT,
  targeting_type TEXT,
  targeting_value TEXT
) AS $$
BEGIN
  RETURN QUERY
  -- Global flags enabled for all authenticated users in the given environment
  SELECT 
    ff.id,
    (ff.name)::TEXT,
    (ff.description)::TEXT,
    (
      CASE 
        WHEN COALESCE(ffe.rollout_percentage, 0) >= 100 THEN ffe.is_enabled
        WHEN COALESCE(ffe.rollout_percentage, 0) <= 0 THEN false
        ELSE ffe.is_enabled AND (
          (("x" || substr(md5(user_id_param::TEXT || ff.id::TEXT), 1, 8))::bit(32)::int % 100) < ffe.rollout_percentage
        )
      END
    ) AS is_enabled,
    ffe.rollout_percentage,
    (ffe.environment)::TEXT,
    'global'::TEXT as targeting_type,
    NULL::TEXT as targeting_value
  FROM feature_flags ff
  JOIN feature_flag_environments ffe 
    ON ff.id = ffe.feature_flag_id AND ffe.environment = environment_param
  WHERE ff.is_global = true

  UNION ALL

  -- Flags explicitly targeted to the specific user in the given environment
  SELECT 
    ff.id,
    (ff.name)::TEXT,
    (ff.description)::TEXT,
    (
      CASE 
        WHEN COALESCE(ffe.rollout_percentage, 0) >= 100 THEN ffe.is_enabled
        WHEN COALESCE(ffe.rollout_percentage, 0) <= 0 THEN false
        ELSE ffe.is_enabled AND (
          (("x" || substr(md5(user_id_param::TEXT || ff.id::TEXT), 1, 8))::bit(32)::int % 100) < ffe.rollout_percentage
        )
      END
    ) AS is_enabled,
    ffe.rollout_percentage,
    (ffe.environment)::TEXT,
    'user'::TEXT as targeting_type,
    (u.email)::TEXT as targeting_value
  FROM feature_flags ff
  JOIN feature_flag_environments ffe 
    ON ff.id = ffe.feature_flag_id AND ffe.environment = environment_param
  JOIN feature_flag_users ffu ON ff.id = ffu.feature_flag_id
  JOIN auth.users u ON ffu.user_id = u.id
  WHERE u.id = user_id_param

  UNION ALL

  -- Flags enabled for users in specific legacy groups in the given environment
  SELECT 
    ff.id,
    (ff.name)::TEXT,
    (ff.description)::TEXT,
    (
      CASE 
        WHEN COALESCE(ffe.rollout_percentage, 0) >= 100 THEN ffe.is_enabled
        WHEN COALESCE(ffe.rollout_percentage, 0) <= 0 THEN false
        ELSE ffe.is_enabled AND (
          (("x" || substr(md5(user_id_param::TEXT || ff.id::TEXT), 1, 8))::bit(32)::int % 100) < ffe.rollout_percentage
        )
      END
    ) AS is_enabled,
    ffe.rollout_percentage,
    (ffe.environment)::TEXT,
    'group'::TEXT as targeting_type,
    (ffg.group_name)::TEXT as targeting_value
  FROM feature_flags ff
  JOIN feature_flag_environments ffe 
    ON ff.id = ffe.feature_flag_id AND ffe.environment = environment_param
  JOIN feature_flag_user_groups ffg 
    ON ff.id = ffg.feature_flag_id AND ffg.environment = environment_param
  JOIN auth.users u ON u.id = user_id_param
  WHERE ffg.is_enabled = true
    AND (u.raw_app_meta_data->'groups') ? ffg.group_name

  UNION ALL

  -- Flags enabled for users with a given user_type (new system) in the given environment
  SELECT 
    ff.id,
    (ff.name)::TEXT,
    (ff.description)::TEXT,
    (
      CASE 
        WHEN COALESCE(ffe.rollout_percentage, 0) >= 100 THEN ffe.is_enabled
        WHEN COALESCE(ffe.rollout_percentage, 0) <= 0 THEN false
        ELSE ffe.is_enabled AND (
          (("x" || substr(md5(user_id_param::TEXT || ff.id::TEXT), 1, 8))::bit(32)::int % 100) < ffe.rollout_percentage
        )
      END
    ) AS is_enabled,
    ffe.rollout_percentage,
    (ffe.environment)::TEXT,
    'user_type'::TEXT as targeting_type,
    (fft.user_type_name)::TEXT as targeting_value
  FROM feature_flags ff
  JOIN feature_flag_environments ffe 
    ON ff.id = ffe.feature_flag_id AND ffe.environment = environment_param
  JOIN feature_flag_user_types fft ON ff.id = fft.feature_flag_id
  JOIN auth.users u ON u.id = user_id_param
  WHERE (u.raw_app_meta_data->'user_types') ? fft.user_type_name

  UNION ALL

  -- Flags enabled for users in a subscription tier (new system) in the given environment
  SELECT 
    ff.id,
    (ff.name)::TEXT,
    (ff.description)::TEXT,
    (
      CASE 
        WHEN COALESCE(ffe.rollout_percentage, 0) >= 100 THEN ffe.is_enabled
        WHEN COALESCE(ffe.rollout_percentage, 0) <= 0 THEN false
        ELSE ffe.is_enabled AND (
          (("x" || substr(md5(user_id_param::TEXT || ff.id::TEXT), 1, 8))::bit(32)::int % 100) < ffe.rollout_percentage
        )
      END
    ) AS is_enabled,
    ffe.rollout_percentage,
    (ffe.environment)::TEXT,
    'subscription_tier'::TEXT as targeting_type,
    (fst.subscription_tier_name)::TEXT as targeting_value
  FROM feature_flags ff
  JOIN feature_flag_environments ffe 
    ON ff.id = ffe.feature_flag_id AND ffe.environment = environment_param
  JOIN feature_flag_subscription_tiers fst ON ff.id = fst.feature_flag_id
  JOIN auth.users u ON u.id = user_id_param
  WHERE (u.raw_app_meta_data->>'subscription_tier')::TEXT = fst.subscription_tier_name;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop user_in_group helper if it exists and is unused (optional)
-- Keeping user_in_group is harmless but no longer needed; we remove for simplicity
DO $$ BEGIN
  EXECUTE 'DROP FUNCTION IF EXISTS user_in_group(jsonb, text)';
EXCEPTION WHEN undefined_function THEN
  -- ignore
END $$;

COMMIT;


