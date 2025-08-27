import { useState, useCallback } from 'react';
import type { RoutineCreationData } from '../types';
import { routineService } from '../services/routineService';

const initialRoutineData: RoutineCreationData = {
  name: '',
  difficulty: 'Beginner',
  goal: 'Strength',
  description: '',
  objectives: [],
  duration: 12, // Default 12 weeks
};

export const useRoutineCreationState = (): {
  routineData: RoutineCreationData;
  updateRoutineData: (updates: Partial<RoutineCreationData>) => void;
  resetRoutineData: () => void;
  loadRoutineDataForEditing: (routineId: string) => Promise<void>;
} => {
  const [routineData, setRoutineData] =
    useState<RoutineCreationData>(initialRoutineData);

  const updateRoutineData = useCallback(
    (updates: Partial<RoutineCreationData>) => {
      setRoutineData(prev => ({ ...prev, ...updates }));
    },
    []
  );

  const resetRoutineData = useCallback(() => {
    setRoutineData(initialRoutineData);
  }, []);

  const loadRoutineDataForEditing = useCallback(async (routineId: string) => {
    try {
      const data = await routineService.getRoutineById(routineId);
      if (data) {
        setRoutineData({
          name: data.name,
          difficulty: data.difficulty as RoutineCreationData['difficulty'],
          goal: data.goal as RoutineCreationData['goal'],
          description: data.description,
          objectives: data.objectives || [],
          duration: data.duration || 12,
        });
      }
    } catch {
      // Silently handle error - could be logged to error service in production
    }
  }, []);

  return {
    routineData,
    updateRoutineData,
    resetRoutineData,
    loadRoutineDataForEditing,
  };
};
