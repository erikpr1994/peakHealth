import React, {createContext, useContext, useState} from 'react';
import {WorkoutRoutine} from '@/types/workout';

// Mock data - in a real app, this would come from an API
import {mockRoutine} from '@/features/workout-tracking/data/mockWorkout';

type WorkoutContextType = {
  currentWorkout: WorkoutRoutine | null;
  isWorkoutInProgress: boolean;
  startWorkout: (workout: WorkoutRoutine) => void;
  completeWorkout: () => void;
  cancelWorkout: () => void;
};

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [currentWorkout, setCurrentWorkout] = useState<WorkoutRoutine | null>(
    null,
  );
  const [isWorkoutInProgress, setIsWorkoutInProgress] = useState(false);

  const startWorkout = (workout: WorkoutRoutine) => {
    setCurrentWorkout(workout);
    setIsWorkoutInProgress(true);
  };

  const completeWorkout = () => {
    // In a real app, you would save the workout data
    setCurrentWorkout(null);
    setIsWorkoutInProgress(false);
  };

  const cancelWorkout = () => {
    setCurrentWorkout(null);
    setIsWorkoutInProgress(false);
  };

  return (
    <WorkoutContext.Provider
      value={{
        currentWorkout: currentWorkout || mockRoutine, // Use mock data for now
        isWorkoutInProgress,
        startWorkout,
        completeWorkout,
        cancelWorkout,
      }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (context === undefined) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
};

