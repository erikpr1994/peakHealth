# Peak Health Mobile App

This is the mobile app implementation for Peak Health, built with React Native. The app provides a mobile interface for the Peak Health platform, allowing users to track their workouts and manage their fitness goals on the go.

## Features

- **Authentication**: Login screen with email and password authentication
- **Workout Tracking**: Track your workouts with detailed exercise instructions, rest timers, and progression tracking
- **Cross-Platform**: Works on both iOS and Android devices

## Project Structure

The mobile app follows the same feature-based organization as the web app:

```
apps/mobile/
├── src/
│   ├── components/       # Reusable UI components
│   ├── context/          # React Context for state management
│   ├── features/         # Feature-based organization
│   │   ├── auth/         # Authentication feature
│   │   └── workout-tracking/ # Workout tracking feature
│   ├── navigation/       # React Navigation setup
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   └── App.tsx           # Main app component
├── android/              # Android-specific files
└── ios/                  # iOS-specific files
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development)

### Installation

1. Install dependencies:
   ```
   pnpm install
   ```

2. Start the Metro bundler:
   ```
   pnpm start
   ```

3. Run on Android:
   ```
   pnpm android
   ```

4. Run on iOS:
   ```
   pnpm ios
   ```

## Implementation Details

### Native vs React Native

This implementation uses React Native for the mobile app development, which provides several advantages:

1. **Code Sharing**: Ability to share business logic, types, and utilities with the web app
2. **Faster Development**: Leverage existing React knowledge and components
3. **Cross-Platform**: Single codebase for both iOS and Android
4. **Consistency**: Maintain consistent user experience across platforms

### State Management

The app uses React Context for state management, following the project's state management guidelines:

- **AuthContext**: Manages authentication state
- **WorkoutContext**: Manages workout tracking state

### UI Components

The app includes a set of reusable UI components that follow the design system guidelines:

- **Button**: Customizable button component with different variants and sizes
- **Input**: Text input component with label and error handling
- **Card**: Card component for content organization
- **Badge**: Badge component for displaying tags and status indicators

### Navigation

The app uses React Navigation for navigation:

- **AppNavigator**: Main navigator that handles authentication flow
- **AuthNavigator**: Navigator for authentication screens
- **MainNavigator**: Bottom tab navigator for the main app screens

### Features

#### Authentication

The authentication feature includes:

- **LoginScreen**: Login screen with email and password authentication
- **AuthContext**: Context for managing authentication state

#### Workout Tracking

The workout tracking feature includes:

- **WorkoutExecutionScreen**: Main screen for tracking workouts
- **RestTimer**: Component for tracking rest periods between sets
- **ProgressionMethodInfo**: Component for displaying progression method information
- **ExerciseInstructions**: Component for displaying detailed exercise instructions

## Future Improvements

- Add offline support for workout tracking
- Implement push notifications for workout reminders
- Add support for workout scheduling
- Implement social features for sharing workouts
- Add support for tracking progress over time with charts and statistics

