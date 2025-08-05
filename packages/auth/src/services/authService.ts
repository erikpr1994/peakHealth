import { AuthUser, UserClaims } from '../types';

export class AuthService {
  private baseUrl: string;

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
  }

  async login(email: string, password: string): Promise<AuthUser> {
    const response = await fetch(`${this.baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    return data.user;
  }

  async signUp(
    email: string,
    password: string,
    name: string
  ): Promise<AuthUser> {
    const response = await fetch(`${this.baseUrl}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Sign up failed');
    }

    return data.user;
  }

  async logout(): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/auth/logout`, {
      method: 'POST',
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Logout failed');
    }
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const response = await fetch(`${this.baseUrl}/api/auth/user`);

      if (!response.ok) {
        if (response.status === 401) {
          return null;
        }
        throw new Error('Failed to fetch user');
      }

      const data = await response.json();
      return data.user || null;
    } catch {
      // Silently handle errors for user fetching
      return null;
    }
  }

  async refreshSession(): Promise<void> {
    // This would typically refresh the JWT token
    // For now, we'll just re-fetch the user
    await this.getCurrentUser();
  }

  async updateUserClaims(
    userId: string,
    claims: Partial<UserClaims>
  ): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/auth/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ claims }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to update user claims');
    }
  }
}
