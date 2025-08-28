# Backend Technical Specification

## Overview

This document outlines the technical specification and architectural standards for the Routines feature's backend service. The primary goal is to maintain a clean, scalable, and domain-driven structure that is consistent with the principles outlined in the frontend architecture.

---

## Folder Structure

The backend service will follow a feature-based, domain-driven folder structure. All files related to the Routines API will be self-contained to ensure modularity.

```
src/
├── api/                // Express routes and controllers
│   ├── v1/
│   │   ├── routines.ts
│   │   └── library.ts
│   └── index.ts
├── config/             // Environment variables, database connections
│   └── db.ts
├── domain/             // Core business logic, entities, and interfaces
│   ├── calculations/
│   ├── transformers/
│   └── validators/
├── middleware/         // Shared Express middleware (e.g., auth, error handling)
│   └── auth.ts
├── services/           // Services that interact with the database or external APIs
│   └── RoutineService.ts
├── types/              // Shared TypeScript types and interfaces for the backend
│   └── routine.ts
└── app.ts              // Main Express application setup
```

### Directory Responsibilities

- **`api/`**: Contains all Express route definitions and handlers (controllers). This is the entry point for all HTTP requests.
- **`config/`**: Manages application configuration, including database connection setup and loading environment variables.
- **`domain/`**: Holds the core, pure business logic of the application. This code should be independent of the framework (Express) and the database.
  - `calculations/`: Pure functions for performing calculations (e.g., calculating workout volume).
  - `transformers/`: Functions for transforming data between different formats (e.g., from database models to API responses).
  - `validators/`: Functions for validating data structures.
- **`middleware/`**: Contains reusable Express middleware, such as the `verifySupabaseJWT` authentication middleware and global error handlers.
- **`services/`**: Acts as the bridge between the API layer and the database. Services contain the logic for fetching and manipulating data.
- **`types/`**: Contains all shared TypeScript interfaces and type definitions used throughout the backend service.
- **`app.ts`**: The main file that initializes the Express server, applies middleware, and starts listening for requests.
