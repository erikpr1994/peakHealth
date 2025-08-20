import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

// Type for mock headers - we need to cast to any for testing purposes

type MockHeaders = Headers;

// Mock next/navigation
vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

// Mock next/headers
vi.mock('next/headers', () => ({
  headers: vi.fn(),
}));

// Import the component
import RootPage from './page';

describe('RootPage', () => {
  it('should redirect to English for English browser language', async () => {
    const { redirect } = await import('next/navigation');
    const { headers } = await import('next/headers');

    // Mock English language preference
    const mockHeaders = {
      get: vi.fn().mockReturnValue('en-US,en;q=0.9'),
    };
    vi.mocked(headers).mockResolvedValue(mockHeaders as unknown as MockHeaders);

    // Render the component (this should trigger the redirect)
    render(<RootPage />);

    // Wait for async operations
    await new Promise(resolve => setTimeout(resolve, 0));

    // Verify that redirect was called with '/en'
    expect(redirect).toHaveBeenCalledWith('/en');
  });

  it('should redirect to Spanish for Spanish browser language', async () => {
    const { redirect } = await import('next/navigation');
    const { headers } = await import('next/headers');

    // Mock Spanish language preference
    const mockHeaders = {
      get: vi.fn().mockReturnValue('es-ES,es;q=0.9,en;q=0.8'),
    };

    vi.mocked(headers).mockResolvedValue(mockHeaders as unknown as MockHeaders);

    // Render the component (this should trigger the redirect)
    render(<RootPage />);

    // Wait for async operations
    await new Promise(resolve => setTimeout(resolve, 0));

    // Verify that redirect was called with '/es'
    expect(redirect).toHaveBeenCalledWith('/es');
  });

  it('should redirect to English when English is preferred over Spanish', async () => {
    const { redirect } = await import('next/navigation');
    const { headers } = await import('next/headers');

    // Mock English preferred over Spanish
    const mockHeaders = {
      get: vi.fn().mockReturnValue('en-US,en;q=0.9,es;q=0.8'),
    };

    vi.mocked(headers).mockResolvedValue(mockHeaders as unknown as MockHeaders);

    // Render the component (this should trigger the redirect)
    render(<RootPage />);

    // Wait for async operations
    await new Promise(resolve => setTimeout(resolve, 0));

    // Verify that redirect was called with '/en' (English preferred)
    expect(redirect).toHaveBeenCalledWith('/en');
  });

  it('should redirect to Spanish when Spanish is preferred over English', async () => {
    const { redirect } = await import('next/navigation');
    const { headers } = await import('next/headers');

    // Mock Spanish preferred over English
    const mockHeaders = {
      get: vi.fn().mockReturnValue('es-ES,es;q=0.9,en;q=0.8'),
    };

    vi.mocked(headers).mockResolvedValue(mockHeaders as unknown as MockHeaders);

    // Render the component (this should trigger the redirect)
    render(<RootPage />);

    // Wait for async operations
    await new Promise(resolve => setTimeout(resolve, 0));

    // Verify that redirect was called with '/es' (Spanish preferred)
    expect(redirect).toHaveBeenCalledWith('/es');
  });

  it('should redirect to English for unsupported language', async () => {
    const { redirect } = await import('next/navigation');
    const { headers } = await import('next/headers');

    // Mock French language preference (unsupported)
    const mockHeaders = {
      get: vi.fn().mockReturnValue('fr-FR,fr;q=0.9'),
    };

    vi.mocked(headers).mockResolvedValue(mockHeaders as unknown as MockHeaders);

    // Render the component (this should trigger the redirect)
    render(<RootPage />);

    // Wait for async operations
    await new Promise(resolve => setTimeout(resolve, 0));

    // Verify that redirect was called with '/en' (fallback)
    expect(redirect).toHaveBeenCalledWith('/en');
  });

  it('should redirect to English when no Accept-Language header is present', async () => {
    const { redirect } = await import('next/navigation');
    const { headers } = await import('next/headers');

    // Mock no Accept-Language header
    const mockHeaders = {
      get: vi.fn().mockReturnValue(null),
    };

    vi.mocked(headers).mockResolvedValue(mockHeaders as unknown as MockHeaders);

    // Render the component (this should trigger the redirect)
    render(<RootPage />);

    // Wait for async operations
    await new Promise(resolve => setTimeout(resolve, 0));

    // Verify that redirect was called with '/en' (default)
    expect(redirect).toHaveBeenCalledWith('/en');
  });
});
