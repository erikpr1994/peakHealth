import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, Platform, View } from 'react-native';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';
import { useAuth } from '../features/auth/hooks/useAuth';
import { LoadingScreen } from '../screens/LoadingScreen';
import { isIOS, platformSelect } from '../utils/platform';

const Stack = createNativeStackNavigator();

export const AppNavigator: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Platform-specific status bar configuration
    if (isIOS) {
      StatusBar.setBarStyle('dark-content');
    } else {
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
      StatusBar.setBarStyle('dark-content');
    }
  }, []);

  // Platform-specific navigation theme
  const navigationTheme = {
    dark: false,
    colors: {
      primary: '#3B82F6',
      background: '#FFFFFF',
      card: '#FFFFFF',
      text: '#1F2937',
      border: '#E5E7EB',
      notification: '#EF4444',
    },
  };

  // Platform-specific screen options
  const screenOptions = platformSelect(
    {
      // iOS-specific options
      headerShadowVisible: false,
      headerBackTitle: 'Back',
    },
    {
      // Android-specific options
      headerShadowVisible: true,
      animation: 'slide_from_right',
    }
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator screenOptions={screenOptions}>
        {isAuthenticated ? (
          <Stack.Screen
            name="Main"
            component={MainNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Auth"
            component={AuthNavigator}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

