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

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  user: AuthUser;
}
