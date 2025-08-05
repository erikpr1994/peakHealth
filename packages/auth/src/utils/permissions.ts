import { UserClaims } from '../types';

export const PERMISSIONS = {
  // Profile permissions
  'read:profile': 'Read user profile',
  'write:profile': 'Update user profile',

  // Exercise permissions
  'read:exercises': 'Read exercises',
  'write:exercises': 'Create/update exercises',
  'delete:exercises': 'Delete exercises',

  // Workout permissions
  'read:workouts': 'Read workouts',
  'write:workouts': 'Create/update workouts',
  'delete:workouts': 'Delete workouts',

  // Premium features
  'premium:features': 'Access premium features',
  'pro:features': 'Access professional features',

  // Beta features
  'beta:features': 'Access beta features',
  'early:access': 'Early access to features',

  // Enterprise features
  'enterprise:features': 'Access enterprise features',

  // Admin permissions
  'admin:all': 'Full administrative access',
  'admin:users': 'Manage users',
  'admin:content': 'Manage content',
  'admin:settings': 'Manage system settings',
} as const;

export type Permission = keyof typeof PERMISSIONS;

export function getPermissionDescription(permission: string): string {
  return PERMISSIONS[permission as Permission] || 'Unknown permission';
}

export function validatePermission(
  permission: string
): permission is Permission {
  return permission in PERMISSIONS;
}

export function getRequiredPermissions(permissions: string[]): string[] {
  return permissions.filter(validatePermission);
}

export function checkPermission(
  claims: UserClaims | null,
  permission: Permission
): boolean {
  if (!claims) return false;

  // Check if user has the specific permission
  if (claims.permissions.includes(permission)) return true;

  // Check if user has admin:all permission
  if (claims.permissions.includes('admin:all')) return true;

  return false;
}

export function checkAnyPermission(
  claims: UserClaims | null,
  permissions: Permission[]
): boolean {
  if (!claims || !permissions.length) return false;
  return permissions.some(permission => checkPermission(claims, permission));
}

export function checkAllPermissions(
  claims: UserClaims | null,
  permissions: Permission[]
): boolean {
  if (!claims || !permissions.length) return false;
  return permissions.every(permission => checkPermission(claims, permission));
}
