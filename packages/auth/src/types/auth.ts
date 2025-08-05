import { AuthUser } from './user';

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
  signUp: (email: string, password: string, name: string) => Promise<AuthUser>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<AuthUser | null>;
  refreshSession: () => Promise<void>;
  updateUserClaims: (
    userId: string,
    claims: Partial<UserClaims>
  ) => Promise<void>;
}

export interface UserClaims {
  roles: string[];
  groups: string[];
  permissions: string[];
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
