// Types
export * from './types';

// Context and Hooks
export { AuthProvider, AuthContext } from './context/AuthContext';
export { useAuth } from './hooks/useAuth';
export { useAuthState } from './hooks/useAuthState';

// Services
export { AuthService } from './services/authService';
export { JWTService } from './services/jwtService';

// Utils
export * from './utils/claims';
export * from './utils/permissions';

// Constants
export const AUTH_CONSTANTS = {
  DEFAULT_ROLES: ['basic'],
  DEFAULT_GROUPS: ['free'],
  DEFAULT_PERMISSIONS: ['read:profile'],
} as const;
