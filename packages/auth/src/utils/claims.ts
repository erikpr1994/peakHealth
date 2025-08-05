import { UserClaims } from '../types';

export const DEFAULT_CLAIMS: UserClaims = {
  roles: ['basic'],
  groups: ['free'],
  permissions: ['read:profile'],
};

export const ROLE_HIERARCHY = {
  basic: 1,
  premium: 2,
  pro: 3,
  admin: 4,
} as const;

export const GROUP_PERMISSIONS = {
  free: ['read:profile', 'read:exercises'],
  beta_testers: ['read:profile', 'read:exercises', 'beta:features'],
  early_adopters: ['read:profile', 'read:exercises', 'early:access'],
  premium: ['read:profile', 'read:exercises', 'premium:features'],
  enterprise: ['read:profile', 'read:exercises', 'enterprise:features'],
} as const;

export const ROLE_PERMISSIONS = {
  basic: ['read:profile', 'read:exercises'],
  premium: ['read:profile', 'read:exercises', 'premium:features'],
  pro: ['read:profile', 'read:exercises', 'premium:features', 'pro:features'],
  admin: [
    'read:profile',
    'read:exercises',
    'premium:features',
    'pro:features',
    'admin:all',
  ],
} as const;

export function getRoleLevel(role: string): number {
  return ROLE_HIERARCHY[role as keyof typeof ROLE_HIERARCHY] || 0;
}

export function hasRoleLevel(
  claims: UserClaims | null,
  requiredRole: string
): boolean {
  if (!claims) return false;

  const requiredLevel = getRoleLevel(requiredRole);
  return claims.roles.some(role => getRoleLevel(role) >= requiredLevel);
}

export function getEffectivePermissions(claims: UserClaims | null): string[] {
  if (!claims) return DEFAULT_CLAIMS.permissions;

  const permissions = new Set<string>();

  // Add role-based permissions
  claims.roles.forEach(role => {
    const rolePerms =
      ROLE_PERMISSIONS[role as keyof typeof ROLE_PERMISSIONS] || [];
    rolePerms.forEach(perm => permissions.add(perm));
  });

  // Add group-based permissions
  claims.groups.forEach(group => {
    const groupPerms =
      GROUP_PERMISSIONS[group as keyof typeof GROUP_PERMISSIONS] || [];
    groupPerms.forEach(perm => permissions.add(perm));
  });

  return Array.from(permissions);
}

export function hasPermission(
  claims: UserClaims | null,
  permission: string
): boolean {
  if (!claims) return false;
  const effectivePermissions = getEffectivePermissions(claims);
  return effectivePermissions.includes(permission);
}

export function hasAnyPermission(
  claims: UserClaims | null,
  permissions: string[]
): boolean {
  if (!claims || !permissions.length) return false;
  const effectivePermissions = getEffectivePermissions(claims);
  return permissions.some(permission =>
    effectivePermissions.includes(permission)
  );
}
