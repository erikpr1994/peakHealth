import type {
  AppConfig,
  User,
  AppSelection,
  CookieOptions,
  RedirectOptions,
  Session,
} from '@peakhealth/auth-types';

// App configuration
const getAppConfigs = (): Record<string, AppConfig> => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Use environment variables for domains, fallback to localhost for development
  const webDomain =
    process.env.NEXT_PUBLIC_WEB_APP_URL ??
    (isDevelopment ? 'localhost:3001' : 'peakhealth.es');
  const adminDomain =
    process.env.NEXT_PUBLIC_ADMIN_APP_URL ??
    (isDevelopment ? 'localhost:3002' : 'admin.peakhealth.es');
  const proDomain =
    process.env.NEXT_PUBLIC_PRO_APP_URL ??
    (isDevelopment ? 'localhost:3003' : 'pro.peakhealth.es');

  return {
    web: {
      name: 'PeakHealth',
      domain: webDomain,
      path: '/dashboard',
      roles: ['user', 'premium', 'regular'],
      groups: ['free', 'premium'],
      description: 'Main fitness platform for users',
      icon: '🏃‍♂️',
    },
    admin: {
      name: 'Admin Panel',
      domain: adminDomain,
      path: '/dashboard',
      roles: ['admin', 'super_admin'],
      groups: ['admin'],
      description: 'Administrative dashboard',
      icon: '⚙️',
    },
    pro: {
      name: 'Pro Platform',
      domain: proDomain,
      path: '/dashboard',
      roles: ['trainer', 'gym_owner'],
      groups: ['pro', 'enterprise'],
      description: 'Professional trainer platform',
      icon: '💪',
    },
  } as const;
};

export const APP_CONFIGS = getAppConfigs();

// Cookie utilities
export const setCrossDomainCookie = (
  name: string,
  value: string,
  options: CookieOptions = {}
): string => {
  const isDevelopment =
    typeof process !== 'undefined' && process.env.NODE_ENV === 'development';
  const cookieOptions = {
    domain: isDevelopment ? 'localhost' : '.peakhealth.es', // Shared domain for all subdomains
    path: '/',
    secure:
      typeof process !== 'undefined' && process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    ...options,
  };

  // Build cookie string with proper formatting
  const cookieParts = [`${name}=${value}`];

  // Add cookie options with proper formatting
  if (cookieOptions.domain) {
    cookieParts.push(`Domain=${cookieOptions.domain}`);
  }

  if (cookieOptions.path) {
    cookieParts.push(`Path=${cookieOptions.path}`);
  }

  if (cookieOptions.maxAge !== undefined) {
    cookieParts.push(`Max-Age=${cookieOptions.maxAge}`);
  }

  if (cookieOptions.sameSite) {
    cookieParts.push(`SameSite=${cookieOptions.sameSite}`);
  }

  if (cookieOptions.secure) {
    cookieParts.push('Secure');
  }

  if (cookieOptions.httpOnly) {
    cookieParts.push('HttpOnly');
  }

  const cookieString = cookieParts.join('; ');

  if (typeof document !== 'undefined') {
    document.cookie = cookieString;
  }

  return cookieString;
};

export const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null;
  return null;
};

export const deleteCookie = (
  name: string,
  options: CookieOptions = {}
): void => {
  const isDevelopment =
    typeof process !== 'undefined' && process.env.NODE_ENV === 'development';
  const cookieOptions = {
    domain: isDevelopment ? 'localhost' : '.peakhealth.es',
    path: '/',
    ...options,
    maxAge: -1, // Expire immediately
  };

  setCrossDomainCookie(name, '', cookieOptions);
};

// App selection utilities
export const getUserAccessibleApps = (user: User | null): AppSelection[] => {
  if (!user) return [];

  const userTypes: string[] = Array.isArray(user.app_metadata?.user_types)
    ? (user.app_metadata.user_types as string[])
    : [];
  const primaryUserType: string =
    (user.app_metadata?.primary_user_type as string) ?? 'regular';
  const userGroups: string[] = Array.isArray(user.app_metadata?.groups)
    ? (user.app_metadata.groups as string[])
    : [];

  // Combine user types and primary user type
  const allUserRoles = [...userTypes, primaryUserType];

  return Object.entries(APP_CONFIGS).map(([appKey, config]) => {
    const hasRequiredRole = config.roles.some(role =>
      allUserRoles.includes(role)
    );
    const hasRequiredGroup = config.groups.some(group =>
      userGroups.includes(group)
    );
    const accessible = hasRequiredRole || hasRequiredGroup;

    return {
      appKey,
      appConfig: config,
      accessible,
      reason: accessible ? undefined : 'Insufficient permissions',
    };
  });
};

export const canAccessApp = (user: User | null, appKey: string): boolean => {
  const accessibleApps = getUserAccessibleApps(user);
  return accessibleApps.some(app => app.appKey === appKey && app.accessible);
};

// Redirect utilities
export const buildAppRedirectUrl = (
  appKey: string,
  options: Omit<RedirectOptions, 'appKey'> = {}
): string => {
  const appConfig = APP_CONFIGS[appKey];
  if (!appConfig) {
    throw new Error(`Unknown app key: ${appKey}`);
  }

  const protocol =
    typeof process !== 'undefined' && process.env.NODE_ENV === 'production'
      ? 'https'
      : 'http';
  const baseUrl = `${protocol}://${appConfig.domain}`;

  // Validate returnUrl if provided
  let path = appConfig.path;
  if (options.returnUrl) {
    // Get all allowed domains from app configs
    const allowedDomains = Object.values(APP_CONFIGS).map(
      config => config.domain
    );

    if (validateReturnUrl(options.returnUrl, allowedDomains)) {
      path = options.returnUrl;
    } else {
      // If returnUrl is invalid, fall back to default path
      // eslint-disable-next-line no-console
      console.warn(
        `Invalid returnUrl: ${options.returnUrl}, using default path`
      );
    }
  }

  return `${baseUrl}${path}`;
};

export const getReturnUrl = (searchParams: URLSearchParams): string | null => {
  return searchParams.get('returnUrl') ?? searchParams.get('redirect') ?? null;
};

// URL validation utilities
export const validateReturnUrl = (
  url: string,
  allowedDomains: string[]
): boolean => {
  try {
    const parsedUrl = new URL(url);

    // Check if the URL is relative (starts with /)
    if (url.startsWith('/')) {
      return true;
    }

    // Check if the domain is in the allowed list
    return allowedDomains.some(domain => {
      // Handle both exact domain matches and subdomain matches
      return (
        parsedUrl.hostname === domain ||
        parsedUrl.hostname.endsWith(`.${domain}`)
      );
    });
  } catch {
    // Invalid URL format
    return false;
  }
};

// Validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (
  password: string
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Role and permission utilities
export const hasRole = (user: User | null, role: string): boolean => {
  if (!user?.app_metadata) return false;

  const userTypes = user.app_metadata.user_types as string[] | undefined;
  const primaryUserType = user.app_metadata.primary_user_type as
    | string
    | undefined;

  if (Array.isArray(userTypes) && userTypes.includes(role)) {
    return true;
  }

  if (primaryUserType === role) {
    return true;
  }

  return false;
};

export const hasGroup = (user: User | null, group: string): boolean => {
  return !!(
    user?.app_metadata?.groups &&
    Array.isArray(user.app_metadata.groups) &&
    (user.app_metadata.groups as string[]).includes(group)
  );
};

export const hasAnyRole = (
  user: User | null,
  roles: readonly string[]
): boolean => {
  return roles.some(role => hasRole(user, role));
};

export const hasAnyGroup = (
  user: User | null,
  groups: readonly string[]
): boolean => {
  return groups.some(group => hasGroup(user, group));
};

// Session utilities
export const isSessionValid = (session: Session | null): boolean => {
  if (!session?.access_token) return false;

  if (session.expires_at !== undefined) {
    return Date.now() < session.expires_at * 1000;
  }

  return true;
};

// Error handling utilities
export const formatAuthError = (error: Error | string | unknown): string => {
  if (typeof error === 'string') return error;

  if (error instanceof Error && error.message) {
    // Handle common Supabase auth errors
    const message = error.message.toLowerCase();

    if (message.includes('invalid login credentials')) {
      return 'Invalid email or password';
    }

    if (message.includes('email not confirmed')) {
      return 'Please check your email and confirm your account';
    }

    if (message.includes('user already registered')) {
      return 'An account with this email already exists';
    }

    return error.message;
  }

  return 'An unexpected error occurred';
};
