import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  WORKOUTS: 'workouts',
  WORKOUT_HISTORY: 'workout_history',
  OFFLINE_QUEUE: 'offline_queue',
  LAST_SYNC: 'last_sync',
};

/**
 * Save data to AsyncStorage
 * @param key Storage key
 * @param value Data to store
 */
export const storeData = async (key: string, value: any): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('Error storing data:', error);
    throw error;
  }
};

/**
 * Retrieve data from AsyncStorage
 * @param key Storage key
 * @returns Stored data or null if not found
 */
export const getData = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error retrieving data:', error);
    throw error;
  }
};

/**
 * Remove data from AsyncStorage
 * @param key Storage key
 */
export const removeData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing data:', error);
    throw error;
  }
};

/**
 * Clear all data from AsyncStorage
 */
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing data:', error);
    throw error;
  }
};

/**
 * Add an item to a stored array
 * @param key Storage key
 * @param item Item to add
 */
export const addToArray = async <T>(key: string, item: T): Promise<void> => {
  try {
    const existingData = await getData<T[]>(key) || [];
    const newData = [...existingData, item];
    await storeData(key, newData);
  } catch (error) {
    console.error('Error adding to array:', error);
    throw error;
  }
};

/**
 * Update an item in a stored array
 * @param key Storage key
 * @param itemId ID of the item to update
 * @param updateFn Function to update the item
 */
export const updateArrayItem = async <T extends { id: string }>(
  key: string,
  itemId: string,
  updateFn: (item: T) => T,
): Promise<void> => {
  try {
    const existingData = await getData<T[]>(key) || [];
    const newData = existingData.map(item => 
      item.id === itemId ? updateFn(item) : item
    );
    await storeData(key, newData);
  } catch (error) {
    console.error('Error updating array item:', error);
    throw error;
  }
};

/**
 * Remove an item from a stored array
 * @param key Storage key
 * @param itemId ID of the item to remove
 */
export const removeFromArray = async <T extends { id: string }>(
  key: string,
  itemId: string,
): Promise<void> => {
  try {
    const existingData = await getData<T[]>(key) || [];
    const newData = existingData.filter(item => item.id !== itemId);
    await storeData(key, newData);
  } catch (error) {
    console.error('Error removing from array:', error);
    throw error;
  }
};

