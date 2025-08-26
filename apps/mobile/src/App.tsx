import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from '@/context/AuthContext';
import {WorkoutProvider} from '@/context/WorkoutContext';
import AppNavigator from '@/navigation/AppNavigator';

const App = (): React.ReactElement => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <WorkoutProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </WorkoutProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;

