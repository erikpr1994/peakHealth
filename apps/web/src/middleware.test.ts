import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';

// Mock the dependencies that cause module resolution issues
vi.mock('next-intl/middleware', () => ({
  default: vi.fn(() => vi.fn(() => null)), // Return a function that returns null
}));

vi.mock('./lib/hypertune/getHypertune', () => ({
  default: vi.fn(() => ({
    roadmap: vi.fn(),
    flushLogs: vi.fn(),
  })),
}));

vi.mock('@peakhealth/auth-utils', () => ({
  parseAcceptLanguage: vi.fn(() => 'en'),
  extractLocaleFromPathname: vi.fn(() => 'en'),
}));

// Mock environment variables
vi.stubEnv('NEXT_PUBLIC_WEB_APP_URL', 'http://localhost:3024');

// Import the middleware function directly
import { middleware } from './middleware';

describe('Middleware', () => {
  let mockRequest: NextRequest;
  let mockUrl: URL;

  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks();

    // Create a mock URL with proper base
    mockUrl = new URL('http://localhost:3000');

    // Create proper Headers instance
    const mockHeaders = new Headers();
    mockHeaders.set('accept-language', 'en-US,en;q=0.9');

    // Create a mock request with proper types
    mockRequest = {
      nextUrl: mockUrl,
      url: 'http://localhost:3000', // Add the url property that middleware needs
      cookies: {
        getAll: vi.fn(() => []),
        get: vi.fn(() => undefined),
      },
      headers: mockHeaders,
    } as unknown as NextRequest;
  });

  it('should skip internationalization for API routes', async () => {
    mockUrl.pathname = '/api/test';

    const response = await middleware(mockRequest);

    expect(response).toBeInstanceOf(NextResponse);
  });

  it('should redirect authenticated users from root to dashboard', async () => {
    mockUrl.pathname = '/';
    mockRequest.cookies.getAll = vi.fn(() => [
      { name: 'sb-test-auth-token.0', value: 'test-token' },
    ]);

    const response = await middleware(mockRequest);

    expect(response).toBeInstanceOf(NextResponse);
    expect(response?.status).toBe(307); // NextResponse.redirect() returns 307 by default
  });

  it('should redirect unauthenticated users from root to landing app', async () => {
    mockUrl.pathname = '/';
    mockRequest.cookies.getAll = vi.fn(() => []);

    const response = await middleware(mockRequest);

    expect(response).toBeInstanceOf(NextResponse);
    expect(response?.status).toBe(307); // NextResponse.redirect() returns 307 by default
  });

  it('should redirect unauthenticated users from protected routes to landing', async () => {
    mockUrl.pathname = '/dashboard';
    mockRequest.cookies.getAll = vi.fn(() => []);

    const response = await middleware(mockRequest);

    expect(response).toBeInstanceOf(NextResponse);
    expect(response?.status).toBe(307); // NextResponse.redirect() returns 307 by default
  });

  it('should allow authenticated users to access protected routes', async () => {
    mockUrl.pathname = '/dashboard';
    mockRequest.cookies.getAll = vi.fn(() => [
      { name: 'sb-test-auth-token.0', value: 'test-token' },
    ]);

    const response = await middleware(mockRequest);

    expect(response).toBeInstanceOf(NextResponse);
    expect(response?.status).toBe(200); // Next response
  });

  it('should handle locale-prefixed protected routes', async () => {
    mockUrl.pathname = '/es/dashboard';
    mockRequest.cookies.getAll = vi.fn(() => []);

    const response = await middleware(mockRequest);

    expect(response).toBeInstanceOf(NextResponse);
    expect(response?.status).toBe(307); // NextResponse.redirect() returns 307 by default
  });
});
