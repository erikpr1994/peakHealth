# Feature Flag Role/Group Filtering

## Overview

The feature flag system now properly filters user-specific feature flags based on user roles and groups. This ensures that users only have access to features they are authorized to use.

## How It Works

### Database Function

The `get_user_feature_flags` function now accepts additional parameters:

- `user_roles`: JSONB array of user roles (e.g., `['basic', 'premium']`)
- `user_groups`: JSONB array of user groups (e.g., `['free', 'beta_testers']`)

### Filtering Logic

A user-specific feature flag is returned only if:

1. **Role Filtering**: The flag either has no role targeting OR the user has a matching role
2. **Group Filtering**: The flag either has no group targeting OR the user belongs to a matching group

### Example Scenarios

#### Scenario 1: Flag with Role Targeting

- Flag: `notification_system_feature` (targets `premium` role)
- User roles: `['basic']`
- Result: ❌ Flag NOT returned (user doesn't have `premium` role)

#### Scenario 2: Flag with Role Targeting

- Flag: `notification_system_feature` (targets `premium` role)
- User roles: `['premium', 'admin']`
- Result: ✅ Flag returned (user has `premium` role)

#### Scenario 3: Flag with Group Targeting

- Flag: `beta_feature` (targets `beta_testers` group)
- User groups: `['free']`
- Result: ❌ Flag NOT returned (user not in `beta_testers` group)

#### Scenario 4: Flag with No Targeting

- Flag: `general_feature` (no role/group targeting)
- User roles: `['basic']`
- User groups: `['free']`
- Result: ✅ Flag returned (available to all authenticated users)

## API Changes

### Updated Function Signature

```sql
get_user_feature_flags(
  user_id UUID,
  environment_param TEXT,
  user_roles JSONB DEFAULT '[]'::JSONB,
  user_groups JSONB DEFAULT '[]'::JSONB
)
```

### API Route Changes

The `/api/feature-flags` route now extracts user roles and groups from the user object and passes them to the database function:

```typescript
const userRoles = (user as any).userRoles || ['basic'];
const userGroups = (user as any).userGroups || ['free'];

const flagsResponse = await supabase.rpc('get_user_feature_flags', {
  user_id: user.id,
  environment_param: environment,
  user_roles: userRoles,
  user_groups: userGroups,
});
```

## Sample Data

The migration includes sample targeting rules:

```sql
-- Notification system only for premium users
INSERT INTO feature_flag_user_roles (feature_flag_id, environment, role_name, is_enabled) VALUES
((SELECT id FROM feature_flags WHERE name = 'notification_system_feature'), 'development', 'premium', true);

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
- Authenticated users get flags filtered by their roles/groups
- Flags with no targeting are available to all authenticated users
