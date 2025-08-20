# Routines Feature - Feature Overview

## Overview

The Routines feature is a comprehensive workout management system that allows users to create, manage, and track various types of workout routines. It supports both strength training and cardio/running workouts with advanced features like trail running planning, AI-powered recommendations, progressive overload tracking, and wearable device integration.

## 🏗️ Architecture ✅ **RESOLVED**

**Decision**: **Maintain current progressive disclosure design with tiered feature access**

### Feature Structure

```
features/routines/
├── features/                    # Sub-features
│   ├── routine-creation/       # Routine creation and editing (tiered by subscription)
│   ├── routine-detail/         # Routine viewing and management
│   ├── routine-list/           # Routine listing and browsing
│   ├── trail-running/          # Specialized trail running workouts
│   └── workout-management/     # Workout section and exercise management
├── hooks/                      # Custom React hooks
├── types/                      # TypeScript type definitions
├── utils/                      # Utility functions
└── index.ts                    # Main exports
```

### Core Components

#### 1. **Routine Creation** (`routine-creation/`)

- **RoutineCreation**: Main component for creating/editing routines
- **RoutineHeader**: Header with save/cancel actions
- **RoutineDetailsForm**: Basic routine metadata form
- **StrengthWorkoutsSection**: Strength workout management
- **RunningWorkoutsSection**: Running workout management
- **RoutineModals**: Exercise selection and notes modals
- **AIRecommendationPanel**: AI-powered routine suggestions based on user goals and history
- **TemplateGallery**: Curated and AI-recommended templates for quick routine creation

#### 2. **Routine Detail** (`routine-detail/`)

- **RoutineDetail**: Main routine viewing component
- **RoutineDetailHeader**: Header with actions (favorite, share, etc.)
- **RoutineOverviewCards**: Key metrics display
- **RoutineProgress**: Progress tracking visualization
- **WeeklySchedule**: Weekly schedule display
- **WorkoutDaysList**: List of workout days
- **ExerciseList**: Exercise details display
- **ProgressiveOverloadTracker**: Visual tracking of strength progression over time
- **PerformanceInsights**: AI-powered analysis of routine effectiveness and suggestions

#### 3. **Routine List** (`routine-list/`)

- **Routines**: Main routines listing page
- **RoutinesList**: List management with search/filter
- **RoutineCard**: Individual routine card display
- **ActiveRoutineCard**: Special display for active routine
- **WorkoutCard**: Workout management within routines
- **SmartFilters**: AI-powered filtering based on user preferences and history
- **RecommendedRoutines**: Personalized routine recommendations section

#### 4. **Trail Running** (`trail-running/`)

- **TrailRunningWorkout**: Specialized trail running workout creator
- **IntensityTargetConfiguration**: Intensity target setup
- **RepeatIntervalsForm**: Interval repetition management
- **SectionForm**: Trail running section configuration
- **SectionsList**: Trail running sections display
- **TerrainAnalysis**: Elevation and terrain difficulty visualization
- **WearableIntegration**: Heart rate zone and GPS tracking integration
- **IntervalOptimizer**: AI-powered interval suggestions based on fitness level

#### 5. **Workout Management** (`workout-management/`)

- **WorkoutHeader**: Workout header with actions
- **WorkoutDetails**: Workout metadata management
- **WorkoutSection**: Section management component
- **ExerciseManagement**: Exercise-level management
- **ProgressiveOverloadControls**: Tools for managing weight, reps, and sets progression
- **RestTimerIntegration**: Smart rest timer with adaptive recommendations
- **FormAnalysis**: Integration with device cameras for form checking (future)

#### 6. **AI & Personalization** (`ai-personalization/`)

- **AICoach**: Virtual coaching with real-time feedback during workouts
- **AdaptiveProgression**: Smart adjustment of workout difficulty based on performance
- **PersonalizedGoals**: Goal setting with AI-assisted target recommendations
- **UserInsights**: Performance analytics and progress visualization
- **SmartScheduling**: Workout scheduling based on recovery and availability

#### 7. **Wearable Integration** (`wearable-integration/`)

- **DeviceConnector**: Interface for connecting various wearable devices
- **MetricsDisplay**: Real-time display of heart rate, calories, and other metrics
- **WorkoutSync**: Synchronization of completed workouts with wearable data
- **BiometricFeedback**: Integration of biometric data for workout optimization
- **RecoveryAnalysis**: Recovery tracking based on sleep and HRV data

## 📊 Data Models

### Core Types

#### **Routine**

```typescript
interface Routine {
  id: string;
  name: string;
  description: string;
  daysPerWeek: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  goal:
    | 'Strength'
    | 'Hypertrophy'
    | 'Endurance'
    | 'Weight Loss'
    | 'Power'
    | 'Sport-Specific';
  isActive: boolean;
  isFavorite: boolean;
  schedule: boolean[]; // [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
  progress: { current: number; total: number };
  lastUsed?: string;
  objectives?: string[];
  totalWorkouts?: number;
  completedWorkouts?: number;
  estimatedDuration?: string;
  createdBy: 'user' | 'ai' | 'template';
  tags?: string[];
  aiRecommended?: boolean;
  adaptiveProgression?: boolean;
  recoveryTracking?: boolean;
}
```

#### **Workout Types**

- **StrengthWorkout**: Traditional strength training workouts
- **RunningWorkout**: Cardio/running workouts
- **TrailRunningWorkoutData**: Specialized trail running data
- **IntervalWorkout**: High-intensity interval training workouts
- **CircuitWorkout**: Circuit-based training with minimal rest
- **SupersetWorkout**: Workouts with supersets and compound movements

#### **Exercise & Section Structure**

- **Exercise**: Individual exercises with sets, reps, weights
- **WorkoutSection**: Sections (warmup, basic, cooldown, emom, tabata)
- **WorkoutSet**: Individual sets with reps, weight, duration, rest
- **ProgressionHistory**: Historical tracking of weight, reps, and sets for progressive overload
- **FormFeedback**: Form quality feedback from AI analysis
- **RestPeriod**: Configurable rest periods with adaptive recommendations

### Advanced Features

#### **Progression Methods**

- Linear, Dual, Inverse Pyramid, Myo-Reps, Widowmaker, AMRAP
- **Progressive Overload Tracking**:

```typescript
interface ProgressiveOverloadData {
  exerciseId: string;
  history: {
    date: string;
    weight: number;
    reps: number;
    sets: number;
    volume: number; // calculated as weight * reps * sets
    oneRepMax: number; // estimated 1RM
    notes?: string;
  }[];
  trends: {
    weeklyGrowth: number;
    monthlyGrowth: number;
    plateauDetected: boolean;
    recommendedIncrease?: number;
  };
}
```

#### **Trail Running Features**

- **Interval Types**: Run, Uphill, Downhill, Sprint, Recovery, Rest, Walk
- **Intensity Targets**: Heart rate, Speed, Power, Cadence, RPE
- **Section Types**: Warm-up, Cool-down, Run, Walk, Uphill-repeat, etc.
- **Terrain Analysis**:

```typescript
interface TerrainData {
  elevationGain: number;
  elevationLoss: number;
  maxGradient: number;
  terrainType: 'road' | 'trail' | 'track' | 'mixed';
  difficulty: 'easy' | 'moderate' | 'challenging' | 'difficult';
  surfaceTypes: ('paved' | 'gravel' | 'dirt' | 'rocky' | 'rooty' | 'sandy')[];
  recommendedFootwear?: string;
  weatherImpact?: 'low' | 'medium' | 'high';
}
```

#### **AI & Personalization Features**

```typescript
interface AIRecommendation {
  type: 'routine' | 'exercise' | 'progression' | 'recovery';
  confidence: number; // 0-100
  recommendation: string;
  reasoning: string;
  dataPoints: string[]; // what data was used to make this recommendation
  userFeedback?: 'accepted' | 'rejected' | 'modified';
}

interface PersonalizationProfile {
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced' | 'elite';
  preferences: {
    workoutDuration: number; // preferred minutes
    exerciseTypes: string[];
    avoidedExercises: string[];
    preferredDays: boolean[]; // [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
    preferredTimeOfDay: 'morning' | 'afternoon' | 'evening';
  };
  limitations: {
    injuries: string[];
    equipmentAccess: string[];
    timeConstraints: number; // max minutes available
  };
  goals: {
    primary: string;
    secondary: string[];
    targetDate?: string;
  };
}
```

#### **Wearable Integration**

```typescript
interface WearableData {
  deviceType:
    | 'smartwatch'
    | 'fitness_tracker'
    | 'heart_rate_monitor'
    | 'smart_clothing';
  deviceModel?: string;
  metrics: {
    heartRate?: {
      current: number;
      average: number;
      max: number;
      zones: {
        zone1: number; // time spent in zone 1 (seconds)
        zone2: number;
        zone3: number;
        zone4: number;
        zone5: number;
      };
    };
    steps?: number;
    calories?: number;
    distance?: number;
    pace?: number;
    cadence?: number;
    power?: number;
    elevation?: {
      gain: number;
      loss: number;
      current: number;
    };
    recovery?: {
      hrv: number;
      sleepQuality: number;
      readiness: number;
    };
  };
  lastSynced: string;
}
```

## 🔧 Hooks & State Management

### **useWorkoutOperations**

Comprehensive hook for managing workout state:

- Strength and running workout CRUD operations
- Section and exercise management
- Workout reordering and scheduling
- Exercise progression and rest management

### **useTrailRunningWorkout**

Specialized hook for trail running workouts:

- Section management with intervals
- Intensity target configuration
- Repeat interval handling
- Validation and save state

### **useRoutineOperations**

Utility hook for routine-level operations:

- Set generation for progression methods
- Workout duration calculations
- Approach sets management

### **useProgressiveOverload**

Advanced hook for tracking strength progression:

- Weight and rep progression tracking
- Performance trend analysis
- Plateau detection and recommendations
- One-rep max estimation and tracking
- Volume calculation and visualization

### **useWearableIntegration**

Hook for integrating with wearable devices:

- Device connection and data synchronization
- Real-time metrics monitoring
- Workout data recording and analysis
- Recovery metrics integration

### **useAIRecommendations**

Hook for AI-powered recommendations:

- Personalized routine suggestions
- Exercise selection optimization
- Progressive overload recommendations
- Recovery and deload suggestions
- Performance analysis and insights

## 🎯 Current Functionality

### ✅ **Implemented Features**

#### **Routine Creation**

- ✅ Create new routines with metadata
- ✅ Add strength workouts with sections and exercises
- ✅ Add running workouts with sections and exercises
- ✅ Advanced trail running workout creation with intervals
- ✅ Exercise selection from library
- ✅ Notes and progression method management
- ✅ Workout scheduling and objectives
- ✅ Complete form validation and state management

#### **Routine Management**

- ✅ View routine details and progress
- ✅ Edit existing routines
- ✅ Favorite/unfavorite routines
- ✅ Share routines (UI ready)
- ✅ Duplicate routines (UI ready)
- ✅ Delete routines (UI ready)

#### **Workout Management**

- ✅ Add/remove workouts and sections
- ✅ Reorder workouts and sections
- ✅ Manage exercises within sections
- ✅ Configure rest times and progression
- ✅ EMOM and Tabata workout types
- ✅ Approach sets for strength training

#### **Trail Running**

- ✅ Specialized trail running workout creation
- ✅ Complex interval-based workout planning
- ✅ Advanced intensity target configuration (HR, speed, power, cadence, RPE)
- ✅ Elevation and distance tracking with calculations
- ✅ Repeat interval management with smart defaults
- ✅ Multiple section types (warm-up, cool-down, run, walk, uphill-repeat, etc.)
- ✅ Complete trail running data model and UI

#### **User Interface**

- ✅ Responsive design for mobile and desktop
- ✅ Search and filtering capabilities
- ✅ Grid and list view modes
- ✅ Collapsible workout sections
- ✅ Progress tracking visualization
- ✅ Weekly schedule display
- ✅ Complete form validation and error handling
- ✅ Modal dialogs for exercise selection and notes
- ✅ Drag-and-drop reordering (UI ready)

### 🔄 **Current State**

#### **Data Management**

- ✅ **Frontend State**: Complete state management with React hooks
- 🔄 **Mock Data**: Currently using hardcoded mock data for display
- 🔄 **No Persistence**: Changes are not saved to database (TODO: API integration)
- 🔄 **No API Integration**: Backend API calls not yet implemented

#### **Navigation**

- ✅ **Routing**: Proper Next.js routing implemented
- ✅ **Page Structure**: All pages properly structured
- 🔄 **Deep Linking**: Some deep linking not fully implemented

#### **Integration**

- 🔄 **Workout Tracker**: Referenced but not integrated
- 🔄 **Exercise Library**: Referenced but not implemented
- 🔄 **User Authentication**: Not integrated with user system
- 🔄 **Wearable Devices**: UI ready but not connected to actual devices
- 🔄 **AI Features**: UI components ready but not connected to AI backend

## 🚧 **Remaining Work**

### **High Priority**

#### **1. Data Persistence & API Integration**

- [ ] **Database Schema**: Design and implement database tables
- [ ] **API Endpoints**: Create CRUD API endpoints for routines
- [ ] **Data Integration**: Replace mock data with real API calls
- [ ] **User Association**: Link routines to authenticated users
- [ ] **Save Functionality**: Implement actual save/update operations

#### **2. Exercise Library Integration**

- [ ] **Exercise Database**: Create exercise library system
- [ ] **Exercise Search**: Implement exercise search and filtering
- [ ] **Exercise Categories**: Organize exercises by muscle groups
- [ ] **Exercise Details**: Add exercise descriptions and instructions
- [ ] **Exercise Selection**: Connect to real exercise library data

#### **3. Workout Tracker Integration**

- [ ] **Workout Execution**: Connect routines to workout tracker
- [ ] **Progress Tracking**: Track actual workout completion
- [ ] **Performance Metrics**: Record and display performance data
- [ ] **Workout History**: Maintain workout history

#### **4. Progressive Overload Tracking**

- [ ] **Weight Progression**: Track weight increases over time
- [ ] **Volume Tracking**: Calculate and visualize workout volume
- [ ] **Performance Trends**: Analyze strength progression trends
- [ ] **Plateau Detection**: Identify and suggest solutions for plateaus
- [ ] **1RM Estimation**: Calculate and track estimated one-rep maxes

### **Medium Priority**

#### **5. Enhanced Features**

- [ ] **Routine Templates**: Pre-built routine templates (UI ready, needs data)
- [ ] **Routine Sharing**: Implement routine sharing functionality
- [ ] **Routine Import/Export**: Import/export routine data
- [ ] **Advanced Scheduling**: More flexible scheduling options

#### **6. Wearable Integration**

- [ ] **Device Connection**: Connect to various wearable devices
- [ ] **Metrics Display**: Show real-time metrics during workouts
- [ ] **Data Synchronization**: Sync workout data with wearables
- [ ] **Recovery Tracking**: Use sleep and HRV data for recovery analysis
- [ ] **Performance Insights**: Generate insights from wearable data

#### **7. User Experience**

- [ ] **Onboarding**: Routine creation onboarding flow
- [ ] **Validation**: Enhanced form validation and error handling
- [ ] **Loading States**: Proper loading and error states
- [ ] **Offline Support**: Basic offline functionality

### **Low Priority**

#### **8. AI & Personalization**

- [ ] **AI Recommendations**: Smart routine recommendations
- [ ] **Adaptive Progression**: Dynamic workout adjustments based on performance
- [ ] **Personalized Goals**: AI-assisted goal setting and tracking
- [ ] **Virtual Coaching**: Real-time feedback during workouts
- [ ] **Smart Scheduling**: Recovery-based workout scheduling

#### **9. Advanced Features**

- [ ] **Social Features**: Community routine sharing
- [ ] **Analytics**: Advanced routine analytics
- [ ] **Integration**: Third-party platform integration
- [ ] **Form Analysis**: Camera-based exercise form analysis
- [ ] **Voice Control**: Voice commands for hands-free workout control

## 🔗 **Dependencies**

### **Internal Dependencies**

- **Workout Feature**: For workout execution and tracking
- **Exercise Feature**: For exercise library and management
- **User System**: For user authentication and data association
- **Dashboard**: For routine overview and quick access
- **Wearable Integration**: For device connection and data synchronization
- **AI Services**: For personalized recommendations and insights

### **External Dependencies**

- **Supabase**: Database and authentication
- **Next.js**: Routing and page structure
- **React**: Component framework
- **TypeScript**: Type safety
- **Wearable APIs**: For device integration (Garmin, Fitbit, Apple Health, etc.)
- **AI/ML Services**: For recommendation engines and form analysis

## 🎯 **MVP Goals**

### **Phase 1: Core Functionality**

- [ ] Complete database schema and API implementation
- [ ] Integrate with user authentication system
- [ ] Implement exercise library integration
- [ ] Connect with workout tracker for execution
- [ ] Replace mock data with real API calls
- [ ] Implement basic progressive overload tracking

### **Phase 2: Enhanced UX**

- [ ] Add routine templates and guided creation
- [ ] Implement proper validation and error handling
- [ ] Add routine sharing and collaboration features
- [ ] Optimize performance and loading states
- [ ] Implement basic wearable integration
- [ ] Add comprehensive progressive overload tracking

### **Phase 3: Advanced Features**

- [ ] Add AI-powered routine recommendations
- [ ] Implement advanced analytics and insights
- [ ] Add social features and community sharing
- [ ] Integrate with third-party platforms
- [ ] Implement advanced wearable integration
- [ ] Add virtual coaching and form analysis

## 📚 **Related Documentation**

- [User App MVP Scope](../../app-overview/user-app/mvp-scope.md)
- [Premium Routine Management](../premium-routine-management/README.md)
- [Workout Feature](../workout/README.md)
- [Exercise Feature](../exercises/README.md)
- [Project TODO](../../todo.md)
- [Wearable Integration](../wearable-integration/README.md)
- [AI & Personalization](../ai-personalization/README.md)
