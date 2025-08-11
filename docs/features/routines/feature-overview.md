# Routines Feature - Feature Overview

## Overview

The Routines feature is a comprehensive workout management system that allows users to create, manage, and track various types of workout routines. It supports both strength training and cardio/running workouts with advanced features like trail running planning.

## 🏗️ Architecture

### Feature Structure

```
features/routines/
├── features/                    # Sub-features
│   ├── routine-creation/       # Routine creation and editing
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

#### 2. **Routine Detail** (`routine-detail/`)

- **RoutineDetail**: Main routine viewing component
- **RoutineDetailHeader**: Header with actions (favorite, share, etc.)
- **RoutineOverviewCards**: Key metrics display
- **RoutineProgress**: Progress tracking visualization
- **WeeklySchedule**: Weekly schedule display
- **WorkoutDaysList**: List of workout days
- **ExerciseList**: Exercise details display

#### 3. **Routine List** (`routine-list/`)

- **Routines**: Main routines listing page
- **RoutinesList**: List management with search/filter
- **RoutineCard**: Individual routine card display
- **ActiveRoutineCard**: Special display for active routine
- **WorkoutCard**: Workout management within routines

#### 4. **Trail Running** (`trail-running/`)

- **TrailRunningWorkout**: Specialized trail running workout creator
- **IntensityTargetConfiguration**: Intensity target setup
- **RepeatIntervalsForm**: Interval repetition management
- **SectionForm**: Trail running section configuration
- **SectionsList**: Trail running sections display

#### 5. **Workout Management** (`workout-management/`)

- **WorkoutHeader**: Workout header with actions
- **WorkoutDetails**: Workout metadata management
- **WorkoutSection**: Section management component
- **ExerciseManagement**: Exercise-level management

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
  goal: 'Strength' | 'Hypertrophy' | 'Endurance' | 'Weight Loss';
  isActive: boolean;
  isFavorite: boolean;
  schedule: boolean[]; // [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
  progress: { current: number; total: number };
  lastUsed?: string;
  objectives?: string[];
  totalWorkouts?: number;
  completedWorkouts?: number;
  estimatedDuration?: string;
}
```

#### **Workout Types**

- **StrengthWorkout**: Traditional strength training workouts
- **RunningWorkout**: Cardio/running workouts
- **TrailRunningWorkoutData**: Specialized trail running data

#### **Exercise & Section Structure**

- **Exercise**: Individual exercises with sets, reps, weights
- **WorkoutSection**: Sections (warmup, basic, cooldown, emom, tabata)
- **WorkoutSet**: Individual sets with reps, weight, duration, rest

### Advanced Features

#### **Progression Methods**

- Linear, Dual, Inverse Pyramid, Myo-Reps, Widowmaker, AMRAP

#### **Trail Running Features**

- **Interval Types**: Run, Uphill, Downhill, Sprint, Recovery, Rest, Walk
- **Intensity Targets**: Heart rate, Speed, Power, Cadence, RPE
- **Section Types**: Warm-up, Cool-down, Run, Walk, Uphill-repeat, etc.

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

## 🎯 Current Functionality

### ✅ **Implemented Features**

#### **Routine Creation**

- ✅ Create new routines with metadata
- ✅ Add strength workouts with sections and exercises
- ✅ Add running workouts with sections and exercises
- ✅ Advanced trail running workout creation
- ✅ Exercise selection from library
- ✅ Notes and progression method management
- ✅ Workout scheduling and objectives

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
- ✅ Interval-based workout planning
- ✅ Intensity target configuration
- ✅ Elevation and distance tracking
- ✅ Repeat interval management
- ✅ Smart defaults for common patterns

#### **User Interface**

- ✅ Responsive design for mobile and desktop
- ✅ Search and filtering capabilities
- ✅ Grid and list view modes
- ✅ Collapsible workout sections
- ✅ Progress tracking visualization
- ✅ Weekly schedule display

### 🔄 **Current State**

#### **Data Management**

- 🔄 **Mock Data**: Currently using hardcoded mock data
- 🔄 **No Persistence**: Changes are not saved to database
- 🔄 **No API Integration**: No backend API calls implemented

#### **Navigation**

- ✅ **Routing**: Proper Next.js routing implemented
- ✅ **Page Structure**: All pages properly structured
- 🔄 **Deep Linking**: Some deep linking not fully implemented

#### **Integration**

- 🔄 **Workout Tracker**: Referenced but not integrated
- 🔄 **Exercise Library**: Referenced but not implemented
- 🔄 **User Authentication**: Not integrated with user system

## 🚧 **Remaining Work**

### **High Priority**

#### **1. Data Persistence**

- [ ] **Database Schema**: Design and implement database tables
- [ ] **API Endpoints**: Create CRUD API endpoints for routines
- [ ] **Data Integration**: Replace mock data with real API calls
- [ ] **User Association**: Link routines to authenticated users

#### **2. Exercise Library Integration**

- [ ] **Exercise Database**: Create exercise library system
- [ ] **Exercise Search**: Implement exercise search and filtering
- [ ] **Exercise Categories**: Organize exercises by muscle groups
- [ ] **Exercise Details**: Add exercise descriptions and instructions

#### **3. Workout Tracker Integration**

- [ ] **Workout Execution**: Connect routines to workout tracker
- [ ] **Progress Tracking**: Track actual workout completion
- [ ] **Performance Metrics**: Record and display performance data
- [ ] **Workout History**: Maintain workout history

### **Medium Priority**

#### **4. Enhanced Features**

- [ ] **Routine Templates**: Pre-built routine templates
- [ ] **Routine Sharing**: Implement routine sharing functionality
- [ ] **Routine Import/Export**: Import/export routine data
- [ ] **Advanced Scheduling**: More flexible scheduling options

#### **5. User Experience**

- [ ] **Onboarding**: Routine creation onboarding flow
- [ ] **Validation**: Enhanced form validation and error handling
- [ ] **Loading States**: Proper loading and error states
- [ ] **Offline Support**: Basic offline functionality

### **Low Priority**

#### **6. Advanced Features**

- [ ] **AI Recommendations**: Smart routine recommendations
- [ ] **Social Features**: Community routine sharing
- [ ] **Analytics**: Advanced routine analytics
- [ ] **Integration**: Third-party platform integration

## 🔗 **Dependencies**

### **Internal Dependencies**

- **Workout Feature**: For workout execution and tracking
- **Exercise Feature**: For exercise library and management
- **User System**: For user authentication and data association
- **Dashboard**: For routine overview and quick access

### **External Dependencies**

- **Supabase**: Database and authentication
- **Next.js**: Routing and page structure
- **React**: Component framework
- **TypeScript**: Type safety

## 🎯 **MVP Goals**

### **Phase 1: Core Functionality**

- [ ] Complete database schema and API implementation
- [ ] Integrate with user authentication system
- [ ] Implement exercise library integration
- [ ] Connect with workout tracker for execution

### **Phase 2: Enhanced UX**

- [ ] Add routine templates and guided creation
- [ ] Implement proper validation and error handling
- [ ] Add routine sharing and collaboration features
- [ ] Optimize performance and loading states

### **Phase 3: Advanced Features**

- [ ] Add AI-powered routine recommendations
- [ ] Implement advanced analytics and insights
- [ ] Add social features and community sharing
- [ ] Integrate with third-party platforms

## 📚 **Related Documentation**

- [User App MVP Scope](../../app-overview/user-app/mvp-scope.md)
- [Premium Routine Management](../premium-routine-management/README.md)
- [Workout Feature](../workout/README.md)
- [Exercise Feature](../exercises/README.md)
- [Project TODO](../../todo.md)
