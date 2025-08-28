# Routines Feature - Feature Overview

## Overview

The Routines feature is a comprehensive workout management system that allows users to create, manage, and track various types of workout routines. It supports both strength training and cardio/running workouts with advanced features like trail running planning. This document outlines the designed features for the Minimum Viable Product (MVP).

## 🏗️ Architecture ✅ **DESIGNED**

**Decision**: **The architecture is based on a decoupled frontend and backend, with a clearly defined data model and API contract.** The backend uses MongoDB on Railway, with Supabase for authentication. The frontend is built with Next.js and follows a domain-driven structure with a dedicated services layer.

### Feature Structure (Frontend)

The frontend follows a domain-driven structure for clear separation of concerns, as defined in the technical specification.

```
features/routines/
├── api/                # API client layer for routines (e.g., SWR hooks)
├── components/         # SHARED components used across the routines feature
├── contexts/           # Feature-scoped context providers (e.g., RoutineBuilder)
├── domain/             # Core, pure business logic (no UI, no API calls)
├── pages/              # Page-level components that orchestrate features
├── services/           # Higher-level services that orchestrate domain logic and API calls
├── types/              # SHARED type definitions for the feature
└── index.ts            # Public API of the routines feature
```

### Core Pages (User App)

- **Routines Dashboard** (`/routines`): The main landing page, showing the user's active routine, their other routines, and recommended templates.
- **Routine Detail** (`/routines/:id`): A detailed, tabbed view of a single routine, including an overview, weekly schedule, and full workout breakdown.
- **Explore Templates** (`/routines/explore`): A gallery for browsing and filtering all available public routine templates.
- **Create/Edit Routine** (`/routines/new`, `/routines/:id/edit`): The main routine builder interface for creating and modifying user-owned routines.
- **Workout Player** (`/workout/:sessionId`): The in-workout experience for performing and logging a scheduled workout session.

## 📊 Data Models ✅ **DESIGNED**

The data model is built on MongoDB and separates **The Plan** (the structure of routines) from **The Action** (the execution of workouts).

### Core Concepts

- **Template vs. User-Created**: Routines are either versioned, read-only `TemplateRoutine`s (from trainers/company) or mutable `UserCreatedRoutine`s.
- **Versioning & Immutability**: Templates are versioned to allow updates without affecting assigned users. A user is always assigned to a specific, immutable version.
- **Snapshots for History**: When a workout is scheduled, an immutable `workoutSnapshot` is created in the `WorkoutSession`. This guarantees the user's historical record is never altered by future changes to a template.

### MongoDB Collections

- **`sections`**: Reusable, version-controlled section templates.
- **`workouts`**: Reusable, version-controlled workout templates.
- **`routines`**: Stores all `TemplateRoutine` and `UserCreatedRoutine` documents.
- **`routine_assignments`**: Links a user to a specific version of a `TemplateRoutine`.
- **`workout_sessions`**: Contains every scheduled workout, including the immutable `workoutSnapshot` and the user's `performanceLog`.

_Note: The master Exercise Library and User data are managed in Supabase._

## 🔧 Hooks & State Management ✅ **DESIGNED**

The frontend employs a sophisticated state management strategy to handle the complexity of the feature while keeping components clean.

### **Page-Level Hooks**

For standard pages (Dashboard, Detail, Explore), a single page-level hook (e.g., `useRoutinesDashboard`) acts as the source of truth, fetching data via SWR and managing UI state.

### **Routine Builder Context**

For the deeply nested Routine Builder UI, a dedicated, feature-scoped React Context (`RoutineBuilderContext`) is used to avoid prop drilling.

- **`useRoutineBuilder`**: A `useReducer`-based hook that manages the entire state of the routine being built. It is called once at the page level.
- **`RoutineBuilderProvider`**: Wraps the builder UI, making the state and dispatch function available to all children.
- **Selector Hooks** (e.g., `useSection`, `useExercise`): Small, memoized hooks that consume the context and select a specific slice of state for a component. This keeps components simple and performant.

## 🎯 MVP Scope

This section outlines the scope of the features that have been designed for the MVP. The design phase is complete, and this represents the blueprint for implementation.

#### **Backend & Database**

- **Database Schema**: A complete MongoDB schema has been designed for all 5 core collections (`sections`, `workouts`, `routines`, `routine_assignments`, `workout_sessions`).
- **API Endpoints**: A full API contract has been defined for all CRUD operations, including library versioning and user-facing endpoints.
- **Authentication**: The authentication strategy will use Supabase JWTs with the Railway backend.
- **Data Models**: Comprehensive TypeScript data models have been defined for all core concepts.

#### **Frontend**

- **Architecture**: A robust frontend architecture has been specified, including a domain-driven folder structure, a services layer, and advanced hook patterns.
- **Page Structure**: All primary user-facing pages and their component breakdowns have been fully defined.
- **State Management**: A clear strategy has been defined for both simple pages (using page-level hooks) and complex UIs (using a feature-scoped context).
- **Component Design**: A library of shared, granular components has been designed to build the UI.
- **UI Logic**: Core frontend logic for features like Trail Running, progression methods, and workout calculations has been documented.

## 🚧 **Remaining Work**

The design phase is complete. The primary remaining work is the implementation of the frontend and backend based on these designs.

### **High Priority (MVP Implementation)**

#### **1. Backend Implementation**

- [ ] **Build API**: Implement all API endpoints as defined in the documentation.
- [ ] **Database Setup**: Set up the MongoDB collections on Railway.
- [ ] **Implement Auth**: Integrate the Supabase JWT verification middleware.

#### **2. Frontend Implementation & API Integration**

- [ ] **Build UI Components**: Implement the shared and page-specific components as designed.
- [ ] **Implement Services**: Write the frontend services layer to handle API communication.
- [ ] **Integrate API Calls**: Replace mock data with live data from the backend by integrating the SWR hooks with the services layer.
- [ ] **Connect to Auth**: Link the frontend to the Supabase authentication system to get user context and JWTs for API calls.
- [ ] **Workout Player Persistence**: Implement local storage (IndexedDB) for the offline-first workout player.

#### **3. Exercise Library Integration**

- [ ] **Connect to Library**: The frontend `ExerciseLibraryModal` needs to be connected to the real exercise data source (Supabase).
- [ ] **Implement Search**: Implement the frontend logic for searching and filtering the exercise library.

#### **4. Workout Tracker Integration**

- [ ] **Connect Player to API**: The Workout Player needs to be connected to the `workout-sessions` endpoints to fetch session data and save performance logs.
- [ ] **Track Progress**: Implement the logic to track and display workout completion progress.

### **Medium Priority**

#### **4. Enhanced Features**

- [ ] **Routine Templates**: Implement UI for browsing and copying pre-built routine templates.
- [ ] **Routine Sharing**: Implement routine sharing functionality.
- [ ] **Advanced Scheduling**: More flexible scheduling options.

#### **5. User Experience**

- [ ] **Onboarding**: Routine creation onboarding flow.
- [ ] **Validation**: Enhanced form validation and error handling.
- [ ] **Loading States**: Proper loading and error states for all data-fetching operations.
- [ ] **Offline Support**: Background sync for the Workout Player.

## 🔗 **Dependencies**

### **Internal Dependencies**

- **Workout Feature**: For workout execution and tracking
- **Exercise Feature**: For exercise library and management
- **User System**: For user authentication and data association
- **Dashboard**: For routine overview and quick access

### **External Dependencies**

- **MongoDB**: Database
- **Railway**: Backend Deployment
- **Supabase**: Authentication (JWTs)
- **Next.js**: Routing and page structure
- **React**: Component framework
- **TypeScript**: Type safety

## 🎯 **MVP Goals**

### **Phase 1: Core Functionality (Implementation)**

- [ ] Complete frontend implementation based on the existing designs and architecture.
- [ ] Integrate frontend with the designed backend API, replacing all mock data.
- [ ] Integrate with the user authentication system.
- [ ] Implement the connection to the Exercise Library.
- [ ] Connect the Workout Player to the backend for workout execution and logging.

### **Phase 2: Enhanced UX**

- [ ] Add routine templates and guided creation.
- [ ] Implement proper validation and error handling throughout the UI.
- [ ] Add routine sharing and collaboration features.
- [ ] Optimize performance and loading states.

## 📚 **Related Documentation**

- [Routines Feature Hub](./README.md): Main entry point for all feature documentation.
- [Backend Documentation](./backend/README.md): API endpoints, database schema, and architecture.
- [Frontend Documentation](./frontend/README.md): Component breakdowns, state management, and technical specs.
- [Common Data Models](./common/data-models/README.md): Shared TypeScript interfaces for core concepts.
- [Future Enhancements](./future-enhancements.md): A list of post-MVP features and ideas.
