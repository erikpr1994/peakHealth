import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useOfflineWorkouts } from '../useOfflineWorkouts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { STORAGE_KEYS } from '../../../../utils/storage';

// Mock AuthProvider
jest.mock('../../../auth/hooks/useAuth', () => ({
  useAuth: () => ({
    user: { id: 'user-1', name: 'Test User' },
    isAuthenticated: true,
  }),
}));

describe('useOfflineWorkouts Hook', () => {
  let netInfoCallback: (state: { isConnected: boolean | null }) => void;
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock NetInfo
    (NetInfo.addEventListener as jest.Mock).mockImplementation((callback) => {
      netInfoCallback = callback;
      return jest.fn(); // unsubscribe function
    });
    
    // Mock AsyncStorage
    AsyncStorage.getItem.mockImplementation((key) => {
      if (key === STORAGE_KEYS.WORKOUTS) {
        return Promise.resolve(JSON.stringify([
          { id: 'workout-1', name: 'Test Workout', exercises: [] }
        ]));
      }
      if (key === STORAGE_KEYS.WORKOUT_HISTORY) {
        return Promise.resolve(JSON.stringify([
          { id: 'execution-1', workoutId: 'workout-1', date: '2023-01-01' }
        ]));
      }
      if (key === STORAGE_KEYS.OFFLINE_QUEUE) {
        return Promise.resolve(JSON.stringify([]));
      }
      return Promise.resolve(null);
    });
  });

  it('loads offline data on mount', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useOfflineWorkouts());
    
    // Wait for initial data loading
    await waitForNextUpdate();
    
    // Should have loaded workouts and executions
    expect(result.current.offlineWorkouts).toEqual([
      { id: 'workout-1', name: 'Test Workout', exercises: [] }
    ]);
    expect(result.current.offlineExecutions).toEqual([
      { id: 'execution-1', workoutId: 'workout-1', date: '2023-01-01' }
    ]);
  });

  it('saves workout to offline storage', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useOfflineWorkouts());
    
    // Wait for initial data loading
    await waitForNextUpdate();
    
    // Save a new workout
    const newWorkout = { 
      id: 'workout-2', 
      name: 'New Workout', 
      exercises: [] 
    };
    
    await act(async () => {
      await result.current.saveWorkout(newWorkout);
    });
    
    // Should add to state
    expect(result.current.offlineWorkouts).toEqual([
      { id: 'workout-1', name: 'Test Workout', exercises: [] },
      { id: 'workout-2', name: 'New Workout', exercises: [] }
    ]);
    
    // Should save to storage
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      STORAGE_KEYS.WORKOUTS,
      expect.any(String)
    );
  });

  it('saves workout execution to offline storage', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useOfflineWorkouts());
    
    // Wait for initial data loading
    await waitForNextUpdate();
    
    // Save a new execution
    const newExecution = { 
      id: 'execution-2', 
      workoutId: 'workout-1', 
      date: '2023-01-02' 
    };
    
    await act(async () => {
      await result.current.saveWorkoutExecution(newExecution);
    });
    
    // Should add to state
    expect(result.current.offlineExecutions).toEqual([
      { id: 'execution-1', workoutId: 'workout-1', date: '2023-01-01' },
      { id: 'execution-2', workoutId: 'workout-1', date: '2023-01-02' }
    ]);
    
    // Should save to storage
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      STORAGE_KEYS.WORKOUT_HISTORY,
      expect.any(String)
    );
  });

  it('triggers sync when coming back online', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useOfflineWorkouts());
    
    // Wait for initial data loading
    await waitForNextUpdate();
    
    // Mock being offline initially
    act(() => {
      netInfoCallback({ isConnected: false });
    });
    
    expect(result.current.isOnline).toBe(false);
    
    // Mock coming back online
    act(() => {
      netInfoCallback({ isConnected: true });
    });
    
    expect(result.current.isOnline).toBe(true);
    
    // Should have attempted to sync
    expect(AsyncStorage.getItem).toHaveBeenCalledWith(STORAGE_KEYS.OFFLINE_QUEUE);
  });
});

