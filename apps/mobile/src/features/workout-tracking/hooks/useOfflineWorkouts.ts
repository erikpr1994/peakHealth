import { useCallback, useEffect, useState } from 'react';
import { NetInfo } from '@react-native-community/netinfo';
import { 
  storeData, 
  getData, 
  addToArray, 
  updateArrayItem, 
  removeFromArray,
  STORAGE_KEYS 
} from '../../../utils/storage';
import { Workout, WorkoutExecution } from '../types';
import { useAuth } from '../../auth/hooks/useAuth';

interface OfflineQueueItem {
  id: string;
  type: 'create' | 'update' | 'delete';
  entity: 'workout' | 'workout_execution';
  data: any;
  timestamp: number;
}

export const useOfflineWorkouts = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [offlineWorkouts, setOfflineWorkouts] = useState<Workout[]>([]);
  const [offlineExecutions, setOfflineExecutions] = useState<WorkoutExecution[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const { user } = useAuth();

  // Monitor network connectivity
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected ?? false);
      
      // Trigger sync when coming back online
      if (state.isConnected) {
        syncOfflineData();
      }
    });

    return () => unsubscribe();
  }, []);

  // Load offline data on mount
  useEffect(() => {
    loadOfflineData();
  }, []);

  const loadOfflineData = useCallback(async () => {
    try {
      const workouts = await getData<Workout[]>(STORAGE_KEYS.WORKOUTS) || [];
      const history = await getData<WorkoutExecution[]>(STORAGE_KEYS.WORKOUT_HISTORY) || [];
      
      setOfflineWorkouts(workouts);
      setOfflineExecutions(history);
    } catch (error) {
      console.error('Failed to load offline data:', error);
    }
  }, []);

  // Save a workout to offline storage
  const saveWorkout = useCallback(async (workout: Workout) => {
    try {
      // Add to local storage
      await addToArray<Workout>(STORAGE_KEYS.WORKOUTS, workout);
      
      // Add to offline queue for syncing later
      if (!isOnline) {
        const queueItem: OfflineQueueItem = {
          id: Date.now().toString(),
          type: 'create',
          entity: 'workout',
          data: workout,
          timestamp: Date.now(),
        };
        await addToArray<OfflineQueueItem>(STORAGE_KEYS.OFFLINE_QUEUE, queueItem);
      }
      
      // Update state
      setOfflineWorkouts(prev => [...prev, workout]);
      
      return workout;
    } catch (error) {
      console.error('Failed to save workout offline:', error);
      throw error;
    }
  }, [isOnline]);

  // Update a workout in offline storage
  const updateWorkout = useCallback(async (workoutId: string, updates: Partial<Workout>) => {
    try {
      await updateArrayItem<Workout>(
        STORAGE_KEYS.WORKOUTS,
        workoutId,
        (workout) => ({ ...workout, ...updates })
      );
      
      // Add to offline queue for syncing later
      if (!isOnline) {
        const queueItem: OfflineQueueItem = {
          id: Date.now().toString(),
          type: 'update',
          entity: 'workout',
          data: { id: workoutId, ...updates },
          timestamp: Date.now(),
        };
        await addToArray<OfflineQueueItem>(STORAGE_KEYS.OFFLINE_QUEUE, queueItem);
      }
      
      // Update state
      setOfflineWorkouts(prev => 
        prev.map(w => w.id === workoutId ? { ...w, ...updates } : w)
      );
    } catch (error) {
      console.error('Failed to update workout offline:', error);
      throw error;
    }
  }, [isOnline]);

  // Save workout execution to offline storage
  const saveWorkoutExecution = useCallback(async (execution: WorkoutExecution) => {
    try {
      // Add to local storage
      await addToArray<WorkoutExecution>(STORAGE_KEYS.WORKOUT_HISTORY, execution);
      
      // Add to offline queue for syncing later
      if (!isOnline) {
        const queueItem: OfflineQueueItem = {
          id: Date.now().toString(),
          type: 'create',
          entity: 'workout_execution',
          data: execution,
          timestamp: Date.now(),
        };
        await addToArray<OfflineQueueItem>(STORAGE_KEYS.OFFLINE_QUEUE, queueItem);
      }
      
      // Update state
      setOfflineExecutions(prev => [...prev, execution]);
      
      return execution;
    } catch (error) {
      console.error('Failed to save workout execution offline:', error);
      throw error;
    }
  }, [isOnline]);

  // Sync offline data with the server
  const syncOfflineData = useCallback(async () => {
    if (!isOnline || !user || isSyncing) return;
    
    try {
      setIsSyncing(true);
      
      // Get offline queue
      const queue = await getData<OfflineQueueItem[]>(STORAGE_KEYS.OFFLINE_QUEUE) || [];
      
      if (queue.length === 0) {
        setIsSyncing(false);
        return;
      }
      
      // Sort by timestamp to maintain order
      const sortedQueue = [...queue].sort((a, b) => a.timestamp - b.timestamp);
      
      // Process each item in the queue
      for (const item of sortedQueue) {
        try {
          // Here you would make API calls to sync with the server
          // For now, we'll just simulate successful syncing
          console.log(`Syncing ${item.entity} with action ${item.type}`);
          
          // Remove from queue after successful sync
          await removeFromArray<OfflineQueueItem>(STORAGE_KEYS.OFFLINE_QUEUE, item.id);
        } catch (error) {
          console.error(`Failed to sync item ${item.id}:`, error);
          // Keep item in queue to retry later
        }
      }
      
      // Update last sync timestamp
      await storeData(STORAGE_KEYS.LAST_SYNC, Date.now());
      
      // Reload offline data to ensure state is up to date
      await loadOfflineData();
    } catch (error) {
      console.error('Failed to sync offline data:', error);
    } finally {
      setIsSyncing(false);
    }
  }, [isOnline, user, isSyncing, loadOfflineData]);

  return {
    isOnline,
    isSyncing,
    offlineWorkouts,
    offlineExecutions,
    saveWorkout,
    updateWorkout,
    saveWorkoutExecution,
    syncOfflineData,
    loadOfflineData,
  };
};

