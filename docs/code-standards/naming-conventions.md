# PeakHealth Naming Conventions

This document outlines the standard naming conventions for the PeakHealth codebase. Following these conventions ensures consistency and improves code readability and maintainability.

## File Naming Conventions

### React Components

- **Component Files**: Use PascalCase for component files
  - ✅ `Button.tsx`, `Header.tsx`, `ExerciseDetail.tsx`
  - ❌ `button.tsx`, `header.tsx`, `exerciseDetail.tsx`

- **Component CSS Modules**: Use PascalCase matching the component name
  - ✅ `Button.module.css`, `Header.module.css`
  - ❌ `button.module.css`, `header.module.css`

- **Component Stories**: Use PascalCase matching the component name
  - ✅ `Button.stories.tsx`, `Header.stories.tsx`
  - ❌ `button.stories.tsx`, `header.stories.tsx`

- **Component Tests**: Use PascalCase matching the component name
  - ✅ `Button.test.tsx`, `Header.test.tsx`
  - ❌ `button.test.tsx`, `header.test.tsx`

### Utility Files

- **Utility Files**: Use camelCase for utility files
  - ✅ `utils.ts`, `hooks.ts`, `constants.ts`
  - ❌ `Utils.ts`, `Hooks.ts`, `Constants.ts`

- **Utility Tests**: Use camelCase matching the utility file name
  - ✅ `utils.test.ts`, `hooks.test.ts`
  - ❌ `Utils.test.ts`, `Hooks.test.ts`

### Directory Names

- **Feature Directories**: Use kebab-case for feature directories
  - ✅ `feature-flags`, `user-profile`
  - ❌ `featureFlags`, `userProfile`

- **Component Directories**: Use kebab-case for component directories
  - ✅ `button`, `date-picker`
  - ❌ `Button`, `DatePicker`

### Barrel Files

- Use `index.ts` for barrel exports in directories
- Keep barrel files focused on exporting only what's needed

## Code Naming Conventions

### React Components

- **Component Names**: Use PascalCase for component names
  - ✅ `Button`, `Header`, `ExerciseDetail`
  - ❌ `button`, `header`, `exerciseDetail`

- **Component Props Interfaces**: Use PascalCase with `Props` suffix
  - ✅ `ButtonProps`, `HeaderProps`
  - ❌ `buttonProps`, `HeaderInterface`

### Hooks

- **Custom Hooks**: Use camelCase with `use` prefix
  - ✅ `useAuth`, `useExercises`
  - ❌ `UseAuth`, `getExercises`

### Context

- **Context Objects**: Use PascalCase with `Context` suffix
  - ✅ `AuthContext`, `ExerciseContext`
  - ❌ `authContext`, `exerciseCtx`

- **Context Providers**: Use PascalCase with `Provider` suffix
  - ✅ `AuthProvider`, `ExerciseProvider`
  - ❌ `authProvider`, `ExerciseContextProvider`

### CSS Classes

- **CSS Class Names**: Use kebab-case for CSS class names
  - ✅ `button-primary`, `header-container`
  - ❌ `buttonPrimary`, `HeaderContainer`

- **CSS Module Class Names**: Use camelCase for CSS module class names in JavaScript
  - ✅ `styles.buttonPrimary`, `styles.headerContainer`
  - ❌ `styles['button-primary']`, `styles['header-container']`

### TypeScript Types and Interfaces

- **Interfaces**: Use PascalCase for interfaces
  - ✅ `User`, `Exercise`, `AuthState`
  - ❌ `user`, `exercise`, `authState`

- **Types**: Use PascalCase for type aliases
  - ✅ `ButtonVariant`, `ExerciseType`
  - ❌ `buttonVariant`, `exerciseType`

- **Enums**: Use PascalCase for enum names, UPPER_CASE for enum values
  - ✅ `enum ButtonSize { SMALL = 'small', MEDIUM = 'medium' }`
  - ❌ `enum buttonSize { small = 'small', medium = 'medium' }`

### Constants

- **Constants**: Use UPPER_CASE for constants
  - ✅ `MAX_ITEMS`, `API_URL`
  - ❌ `maxItems`, `apiUrl`

- **Constant Objects**: Use UPPER_CASE for constant objects, UPPER_CASE for keys
  - ✅ `const ROUTES = { HOME: '/home', PROFILE: '/profile' }`
  - ❌ `const routes = { home: '/home', profile: '/profile' }`

## Implementation Plan

We will gradually update the codebase to follow these conventions, starting with the shared UI package and then moving to the application features. Each PR will focus on a specific area to minimize disruption.
