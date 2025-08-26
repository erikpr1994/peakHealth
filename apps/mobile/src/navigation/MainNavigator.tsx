import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import WorkoutExecutionScreen from '@/features/workout-tracking/screens/WorkoutExecutionScreen';
import {Text, View} from 'react-native';

// Placeholder component for Dashboard
const DashboardScreen = (): React.ReactElement => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>Dashboard Screen</Text>
  </View>
);

// Placeholder component for Profile
const ProfileScreen = (): React.ReactElement => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>Profile Screen</Text>
  </View>
);

export type MainTabParamList = {
  Dashboard: undefined;
  Workout: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainNavigator = (): React.ReactElement => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0070f3',
        tabBarInactiveTintColor: '#6b7280',
      }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <View style={{width: 24, height: 24, backgroundColor: color, borderRadius: 12}} />
          ),
        }}
      />
      <Tab.Screen
        name="Workout"
        component={WorkoutExecutionScreen}
        options={{
          tabBarLabel: 'Workout',
          tabBarIcon: ({color}) => (
            <View style={{width: 24, height: 24, backgroundColor: color, borderRadius: 12}} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <View style={{width: 24, height: 24, backgroundColor: color, borderRadius: 12}} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;

