import { NextRequest } from 'next/server';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock Supabase client
const mockSignUp = vi.fn();

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}));

vi.mock('@/lib/supabase/admin', () => ({
  createAdminClient: vi.fn(),
}));

import { POST } from '../route';

import { createClient } from '@/lib/supabase/server';

describe('POST /api/auth/signup', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(createClient).mockResolvedValue({
      auth: {
        signUp: mockSignUp,
      },
    } as any);
  });

  it('successfully creates user with correct user_metadata structure', async () => {
    const mockUser = {
      id: 'test-user-id',
      email: 'test@example.com',
      user_metadata: { name: 'John Doe' },
    };

    const mockSession = { access_token: 'test-token' };

    mockSignUp.mockResolvedValue({
      data: { user: mockUser, session: mockSession },
      error: null,
    });

    const requestBody = {
      email: 'test@example.com',
      password: 'Password123',
      user_metadata: { name: 'John Doe' },
    };

    const request = new NextRequest('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.user).toEqual(mockUser);
    expect(data.session).toEqual(mockSession);
    expect(mockSignUp).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'Password123',
      options: {
        data: { name: 'John Doe' },
      },
    });
  });

  it('returns error when user_metadata.name is missing', async () => {
    const requestBody = {
      email: 'test@example.com',
      password: 'Password123',
      user_metadata: {}, // Missing name
    };

    const request = new NextRequest('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Name is required in user_metadata');
    expect(mockSignUp).not.toHaveBeenCalled();
  });

  it('returns error when user_metadata.name is empty string', async () => {
    const requestBody = {
      email: 'test@example.com',
      password: 'Password123',
      user_metadata: { name: '' }, // Empty name
    };

    const request = new NextRequest('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Name is required in user_metadata');
    expect(mockSignUp).not.toHaveBeenCalled();
  });

  it('returns error when user_metadata.name is only whitespace', async () => {
    const requestBody = {
      email: 'test@example.com',
      password: 'Password123',
      user_metadata: { name: '   ' }, // Only whitespace
    };

    const request = new NextRequest('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Name is required in user_metadata');
    expect(mockSignUp).not.toHaveBeenCalled();
  });

  it('returns error when user_metadata is missing', async () => {
    const requestBody = {
      email: 'test@example.com',
      password: 'Password123',
      // Missing user_metadata entirely
    };

    const request = new NextRequest('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Name is required in user_metadata');
    expect(mockSignUp).not.toHaveBeenCalled();
  });

  it('returns error when email is missing', async () => {
    const requestBody = {
      password: 'Password123',
      user_metadata: { name: 'John Doe' },
    };

    const request = new NextRequest('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Email and password are required');
    expect(mockSignUp).not.toHaveBeenCalled();
  });

  it('returns error when password is missing', async () => {
    const requestBody = {
      email: 'test@example.com',
      user_metadata: { name: 'John Doe' },
    };

    const request = new NextRequest('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Email and password are required');
    expect(mockSignUp).not.toHaveBeenCalled();
  });

  it('handles Supabase signup errors', async () => {
    mockSignUp.mockResolvedValue({
      data: { user: null, session: null },
      error: { message: 'Email already exists' },
    });

    const requestBody = {
      email: 'existing@example.com',
      password: 'Password123',
      user_metadata: { name: 'John Doe' },
    };

    const request = new NextRequest('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Email already exists');
  });

  it('returns 503 when database connection is not available', async () => {
    vi.mocked(createClient).mockResolvedValue(null);

    const requestBody = {
      email: 'test@example.com',
      password: 'Password123',
      user_metadata: { name: 'John Doe' },
    };

    const request = new NextRequest('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(503);
    expect(data.error).toBe('Database connection not available');
  });
});
