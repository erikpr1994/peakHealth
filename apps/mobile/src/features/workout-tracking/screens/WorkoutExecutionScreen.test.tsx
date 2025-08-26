import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { WorkoutExecutionScreen } from '../WorkoutExecutionScreen';
import { NavigationContainer } from '@react-navigation/native';

// Mock hooks
jest.mock('../../hooks/useOfflineWorkouts', () => ({
  useOfflineWorkouts: () => ({
    isOnline: true,
    saveWorkoutExecution: jest.fn(() => Promise.resolve()),
    offlineWorkouts: [
      {
        id: 'workout-1',
        name: 'Test Workout',
        exercises: [
          {
            id: 'exercise-1',
            name: 'Squat',
            sets: 3,
            reps: 10,
            weight: 100,
            restTime: 60,
          },
        ],
      },
    ],
  }),
}));

jest.mock('../../../auth/hooks/useAuth', () => ({
  useAuth: () => ({
    user: { id: 'user-1', name: 'Test User' },
    isAuthenticated: true,
  }),
}));

// Mock navigation
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

const mockRoute = {
  params: {
    workoutId: 'workout-1',
  },
};

describe('WorkoutExecutionScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders workout details correctly', async () => {
    const { getByText, getAllByText } = render(
      <NavigationContainer>
        <WorkoutExecutionScreen 
          navigation={mockNavigation as any} 
          route={mockRoute as any} 
        />
      </NavigationContainer>
    );

    // Wait for workout to load
    await waitFor(() => {
      expect(getByText('Test Workout')).toBeTruthy();
    });

    // Should show exercise details
    expect(getByText('Squat')).toBeTruthy();
    expect(getAllByText('3 sets × 10 reps')).toBeTruthy();
    expect(getByText('100 kg')).toBeTruthy();
  });

  it('handles set completion correctly', async () => {
    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <WorkoutExecutionScreen 
          navigation={mockNavigation as any} 
          route={mockRoute as any} 
        />
      </NavigationContainer>
    );

    // Wait for workout to load
    await waitFor(() => {
      expect(getByText('Test Workout')).toBeTruthy();
    });

    // Complete a set
    const completeButton = getByTestId('complete-set-button-0-0');
    fireEvent.press(completeButton);

    // Should show rest timer
    expect(getByText(/Rest Timer/)).toBeTruthy();
  });

  it('navigates back when workout is completed', async () => {
    const { getByText, getAllByTestId } = render(
      <NavigationContainer>
        <WorkoutExecutionScreen 
          navigation={mockNavigation as any} 
          route={mockRoute as any} 
        />
      </NavigationContainer>
    );

    // Wait for workout to load
    await waitFor(() => {
      expect(getByText('Test Workout')).toBeTruthy();
    });

    // Complete all sets
    const completeButtons = getAllByTestId(/complete-set-button-0-/);
    
    for (const button of completeButtons) {
      fireEvent.press(button);
      
      // Skip rest timer
      const skipButton = getByText('Skip');
      if (skipButton) {
        fireEvent.press(skipButton);
      }
    }

    // Complete workout
    const finishButton = getByText('Finish Workout');
    fireEvent.press(finishButton);

    // Should navigate back
    expect(mockNavigation.navigate).toHaveBeenCalledWith('WorkoutComplete', {
      workoutId: 'workout-1',
    });
  });
});

