declare module '@peakhealth/auth' {
  export interface AuthUser {
    id: string;
    email: string;
    created_at: string;
    app_metadata: {
      roles?: string[];
      groups?: string[];
      permissions?: string[];
    };
    user_metadata: {
      name?: string;
      roles?: string[];
      groups?: string[];
      avatar_url?: string;
      display_name?: string;
      full_name?: string;
      email?: string;
    };
    aud: string;
    userRoles?: string[];
    userGroups?: string[];
  }

  export interface UserProfile {
    id: string;
    email: string;
    name?: string;
    roles: string[];
    groups: string[];
    permissions: string[];
    createdAt: string;
    updatedAt: string;
  }

  export interface UserClaims {
    roles: string[];
    groups: string[];
    permissions: string[];
  }

  export interface AuthContextType {
    isAuthenticated: boolean;
    isAuthOperationLoading: boolean;
    user: AuthUser | null;
    userId: string | null;
    userRoles: string[];
    userGroups: string[];
    login: (email?: string, password?: string) => Promise<void>;
    signUp: (email?: string, password?: string, name?: string) => Promise<void>;
    logout: () => Promise<void>;
    hasRole: (role: string) => boolean;
    hasGroup: (group: string) => boolean;
    hasAnyRole: (roles?: string[]) => boolean;
    hasAnyGroup: (groups?: string[]) => boolean;
  }

  export interface AuthService {
    login: (email: string, password: string) => Promise<AuthUser>;
    signUp: (
      email: string,
      password: string,
      name: string
    ) => Promise<AuthUser>;
    logout: () => Promise<void>;
    getCurrentUser: () => Promise<AuthUser | null>;
    refreshSession: () => Promise<void>;
    updateUserClaims: (
      userId: string,
      claims: Partial<UserClaims>
    ) => Promise<void>;
  }

  export interface LoginCredentials {
    email: string;
    password: string;
  }

  export interface SignUpCredentials {
    email: string;
    password: string;
    name: string;
  }

  export interface AuthError {
    message: string;
    code?: string;
    status?: number;
  }

  export class AuthService {
    constructor(baseUrl?: string);
    login(email: string, password: string): Promise<AuthUser>;
    signUp(email: string, password: string, name: string): Promise<AuthUser>;
    logout(): Promise<void>;
    getCurrentUser(): Promise<AuthUser | null>;
    refreshSession(): Promise<void>;
    updateUserClaims(
      userId: string,
      claims: Partial<UserClaims>
    ): Promise<void>;
  }

  export class JWTService {
    static extractClaimsFromToken(token: string): UserClaims | null;
    static hasRole(claims: UserClaims | null, role: string): boolean;
    static hasGroup(claims: UserClaims | null, group: string): boolean;
    static hasPermission(
      claims: UserClaims | null,
      permission: string
    ): boolean;
    static hasAnyRole(claims: UserClaims | null, roles: string[]): boolean;
    static hasAnyGroup(claims: UserClaims | null, groups: string[]): boolean;
    static hasAnyPermission(
      claims: UserClaims | null,
      permissions: string[]
    ): boolean;
    static isTokenExpired(token: string): boolean;
    static getTokenExpiration(token: string): Date | null;
  }

  export const AuthProvider: React.ComponentType<{
    children: React.ReactNode;
    baseUrl?: string;
    redirectPath?: string;
    onAuthChange?: (user: AuthUser | null) => void;
  }>;

  export const AuthContext: React.Context<AuthContextType | undefined>;

  export function useAuth(): AuthContextType;
  export function useAuthState(baseUrl?: string): {
    user: AuthUser | null;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<AuthUser>;
    signUp: (
      email: string,
      password: string,
      name: string
    ) => Promise<AuthUser>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
    isAuthenticated: boolean;
  };

  export const AUTH_CONSTANTS: {
    readonly DEFAULT_ROLES: readonly ['basic'];
    readonly DEFAULT_GROUPS: readonly ['free'];
    readonly DEFAULT_PERMISSIONS: readonly ['read:profile'];
  };

  // Utils exports
  export const DEFAULT_CLAIMS: UserClaims;
  export const ROLE_HIERARCHY: Record<string, number>;
  export const GROUP_PERMISSIONS: Record<string, readonly string[]>;
  export const ROLE_PERMISSIONS: Record<string, readonly string[]>;
  export function getRoleLevel(role: string): number;
  export function hasRoleLevel(
    claims: UserClaims | null,
    requiredRole: string
  ): boolean;
  export function getEffectivePermissions(claims: UserClaims | null): string[];
  export function hasPermission(
    claims: UserClaims | null,
    permission: string
  ): boolean;
  export function hasAnyPermission(
    claims: UserClaims | null,
    permissions: string[]
  ): boolean;

  // Permissions exports
  export const PERMISSIONS: Record<string, string>;
  export type Permission = keyof typeof PERMISSIONS;
  export function getPermissionDescription(permission: string): string;
  export function validatePermission(
    permission: string
  ): permission is Permission;
  export function getRequiredPermissions(permissions: string[]): string[];
  export function checkPermission(
    claims: UserClaims | null,
    permission: Permission
  ): boolean;
  export function checkAnyPermission(
    claims: UserClaims | null,
    permissions: Permission[]
  ): boolean;
  export function checkAllPermissions(
    claims: UserClaims | null,
    permissions: Permission[]
  ): boolean;
}
