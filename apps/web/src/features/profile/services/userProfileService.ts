import {
  ProfileApiResponse,
  ProfileUpdateData,
  ProfileUpdateResponse,
} from '../types/profile';

class UserProfileService {
  private baseUrl = '/api/profile';

  async getUserProfile(): Promise<ProfileApiResponse> {
    const response = await fetch(this.baseUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.statusText}`);
    }

    return response.json();
  }

  async updateUserProfile(
    data: ProfileUpdateData
  ): Promise<ProfileUpdateResponse> {
    const response = await fetch(this.baseUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `Failed to update profile: ${response.statusText}`
      );
    }

    return response.json();
  }

  async updateUserMetadata(metadata: Record<string, unknown>): Promise<void> {
    const response = await fetch('/api/auth/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_metadata: metadata }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error ||
          `Failed to update user metadata: ${response.statusText}`
      );
    }
  }
}

export const userProfileService = new UserProfileService();
