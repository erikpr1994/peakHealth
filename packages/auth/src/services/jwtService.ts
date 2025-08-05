import { UserClaims } from '../types';

export class JWTService {
  static extractClaimsFromToken(token: string): UserClaims | null {
    try {
      const payload = JSON.parse(
        Buffer.from(token.split('.')[1], 'base64').toString()
      );
      return {
        roles: payload.app_metadata?.roles || [],
        groups: payload.app_metadata?.groups || [],
        permissions: payload.app_metadata?.permissions || [],
      };
    } catch {
      // Silently handle token parsing errors
      return null;
    }
  }

  static hasRole(claims: UserClaims | null, role: string): boolean {
    if (!claims) return false;
    return claims.roles.includes(role);
  }

  static hasGroup(claims: UserClaims | null, group: string): boolean {
    if (!claims) return false;
    return claims.groups.includes(group);
  }

  static hasPermission(claims: UserClaims | null, permission: string): boolean {
    if (!claims) return false;
    return claims.permissions.includes(permission);
  }

  static hasAnyRole(claims: UserClaims | null, roles: string[]): boolean {
    if (!claims || !roles.length) return false;
    return roles.some(role => claims.roles.includes(role));
  }

  static hasAnyGroup(claims: UserClaims | null, groups: string[]): boolean {
    if (!claims || !groups.length) return false;
    return groups.some(group => claims.groups.includes(group));
  }

  static hasAnyPermission(
    claims: UserClaims | null,
    permissions: string[]
  ): boolean {
    if (!claims || !permissions.length) return false;
    return permissions.some(permission =>
      claims.permissions.includes(permission)
    );
  }

  static isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(
        Buffer.from(token.split('.')[1], 'base64').toString()
      );
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    } catch {
      // If we can't parse the token, consider it expired
      return true;
    }
  }

  static getTokenExpiration(token: string): Date | null {
    try {
      const payload = JSON.parse(
        Buffer.from(token.split('.')[1], 'base64').toString()
      );
      return new Date(payload.exp * 1000);
    } catch {
      // If we can't parse the token, return null
      return null;
    }
  }
}
