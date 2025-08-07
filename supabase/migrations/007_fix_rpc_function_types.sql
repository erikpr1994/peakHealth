-- Fix type mismatch in get_user_assignments function
-- The function was returning TEXT[] but the table columns are VARCHAR(50)

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
      SELECT uta.user_type_name::TEXT
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
      SELECT uga.group_name::TEXT
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