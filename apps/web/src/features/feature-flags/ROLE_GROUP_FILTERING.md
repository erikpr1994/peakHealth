# Feature Flag Group Filtering (legacy only)

## Overview

The feature flag system filters user-specific feature flags based on user groups (legacy) and the new model (user types and subscription tiers). Legacy roles have been removed.

## How It Works

### Database Function

The `get_user_feature_flags(user_id_param, environment_param)` function reads targeting claims from `auth.users.raw_app_meta_data` directly.

### Filtering Logic

A user-specific feature flag is returned only if:

1. **Group Filtering**: The flag either has no group targeting OR the user belongs to a matching group

### Example Scenarios

#### Scenario 1: Flag with Group Targeting

- Flag: `beta_feature` (targets `beta_testers` group)
- User groups: `['free']`
- Result: ❌ Flag NOT returned (user not in `beta_testers` group)

#### Scenario 2: Flag with No Targeting

- Flag: `general_feature` (no role/group targeting)
- User roles: `['basic']`
- User groups: `['free']`
- Result: ✅ Flag returned (available to all authenticated users)

## API Notes

The `/api/feature-flags` route calls `get_user_feature_flags(user_id_param, environment_param)`; roles are not supported.

## Sample Data

```sql
-- Notification system only for beta testers
INSERT INTO feature_flag_user_groups (feature_flag_id, environment, group_name, is_enabled) VALUES
((SELECT id FROM feature_flags WHERE name = 'notification_system_feature'), 'development', 'beta_testers', true);
```

## Security Benefits

1. **Prevents Unauthorized Access**: Users can only access features they're authorized for
2. **Database-Level Security**: Filtering happens at the database level, not just in application code
3. **Audit Trail**: All targeting rules are stored in the database for audit purposes
4. **Environment-Specific**: Targeting can be different per environment (dev/staging/prod)

## Testing

The system includes integration tests that verify:

- Unauthenticated users only get public flags
- Authenticated users get flags filtered by their groups or user types
- Flags with no targeting are available to all authenticated users
