// storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to store data
export const storeData = async (key: string, value: any): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
    console.warn(value)
  } catch (error) {
    console.error('Error storing data:', error);
  }
};

// Function to retrieve data
export const getData = async (key: string): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? value : null;
  } catch (error) {
    console.error('Error retrieving data:', error);
    return null;
  }
};

// Function to remove data
export const removeData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing data:', error);
  }
};

// Function to clear all data
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing all data:', error);
  }
};
