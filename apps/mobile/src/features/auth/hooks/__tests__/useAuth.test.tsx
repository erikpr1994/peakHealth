import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from '../useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../../../utils/storage';

// Mock API calls
jest.mock('../../../../api/auth', () => ({
  loginUser: jest.fn(() => Promise.resolve({ 
    token: 'test-token', 
    user: { id: '1', email: 'test@example.com', name: 'Test User' } 
  })),
  registerUser: jest.fn(() => Promise.resolve({ 
    token: 'new-token', 
    user: { id: '2', email: 'new@example.com', name: 'New User' } 
  })),
  logoutUser: jest.fn(() => Promise.resolve()),
}));

describe('useAuth Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    AsyncStorage.getItem.mockClear();
    AsyncStorage.setItem.mockClear();
    AsyncStorage.removeItem.mockClear();
  });

  it('provides initial authentication state', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), { wrapper });
    
    // Initial state should be loading
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    
    // Wait for initial loading to complete
    await waitForNextUpdate();
    
    // After loading, should still be unauthenticated
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it('handles login successfully', async () => {
    // Mock AsyncStorage to return null for initial check
    AsyncStorage.getItem.mockImplementation(() => Promise.resolve(null));
    
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), { wrapper });
    
    // Wait for initial loading
    await waitForNextUpdate();
    
    // Perform login
    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });
    
    // Should be authenticated after login
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual({ 
      id: '1', 
      email: 'test@example.com', 
      name: 'Test User' 
    });
    
    // Should store token and user data
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      STORAGE_KEYS.AUTH_TOKEN,
      JSON.stringify('test-token')
    );
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      STORAGE_KEYS.USER_DATA,
      JSON.stringify({ id: '1', email: 'test@example.com', name: 'Test User' })
    );
  });

  it('handles logout correctly', async () => {
    // Mock AsyncStorage to return token and user data for initial check
    AsyncStorage.getItem.mockImplementation((key) => {
      if (key === STORAGE_KEYS.AUTH_TOKEN) {
        return Promise.resolve(JSON.stringify('existing-token'));
      }
      if (key === STORAGE_KEYS.USER_DATA) {
        return Promise.resolve(JSON.stringify({ 
          id: '1', 
          email: 'test@example.com', 
          name: 'Test User' 
        }));
      }
      return Promise.resolve(null);
    });
    
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), { wrapper });
    
    // Wait for initial loading
    await waitForNextUpdate();
    
    // Should be authenticated initially
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual({ 
      id: '1', 
      email: 'test@example.com', 
      name: 'Test User' 
    });
    
    // Perform logout
    await act(async () => {
      await result.current.logout();
    });
    
    // Should be unauthenticated after logout
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    
    // Should remove token and user data
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(STORAGE_KEYS.AUTH_TOKEN);
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(STORAGE_KEYS.USER_DATA);
  });
});

