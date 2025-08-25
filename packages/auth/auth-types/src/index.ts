// App configuration types
export interface AppConfig {
  name: string;
  domain: string;
  path: string;
  roles: readonly string[];
  groups: readonly string[];
  description?: string;
  icon?: string;
}

// User types
export interface User {
  id: string;
  email?: string;
  user_metadata?: Record<string, unknown>;
  app_metadata?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
}

export interface Session {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at?: number;
  token_type: string;
  user: User;
}

// Auth state types
export interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
}

// Auth context types
export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;

  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;

  selectApp: (appKey: string) => Promise<void>;
  refreshSession: () => Promise<void>;

  hasRole: (role: string) => boolean;

  hasGroup: (group: string) => boolean;

  hasAnyRole: (roles: readonly string[]) => boolean;

  hasAnyGroup: (groups: readonly string[]) => boolean;
}

// API response types
export interface AuthResponse {
  user: User;
  session: Session;
}

export interface ErrorResponse {
  error: string;
  code?: string;
  shouldRedirect?: boolean;
}

// App selection types
export interface AppSelection {
  appKey: string;
  appConfig: AppConfig;
  accessible: boolean;
  reason?: string;
}

// Cookie types
export interface CookieOptions {
  domain?: string;
  path?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  maxAge?: number;
  httpOnly?: boolean;
}

// Redirect types
export interface RedirectOptions {
  appKey: string;
  returnUrl?: string;
  preserveQuery?: boolean;
  locale?: string;
}
