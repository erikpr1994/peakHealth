# Routines Feature Documentation

This folder contains all documentation for the Routines feature, which provides comprehensive workout management and routine creation capabilities for all PeakHealth platforms.

## Documentation Structure

The documentation is organized into four main areas:

### 1. 🧠 [Common Concepts](./common/)

This is the best place to start. It explains the core business logic and data models that are shared between the frontend and backend.

- **Concepts**: The building blocks of a workout plan (Routines, Workouts, Sections, etc.).
- **Data Models**: The TypeScript interfaces that define our data structures.

### 2. 🖥️ [Frontend Documentation](./frontend/)

Contains all documentation related to the frontend implementation of the feature.

- **[Technical Specification](./frontend/technical-spec.md)**: The architectural blueprint for the frontend.
- **[Design Decisions](./frontend/design-decisions.md)**: The rationale behind key UX and architectural choices.
- **[User App](./frontend/user-app/)**: Detailed documentation for the user-facing application, including page and component breakdowns.

### 3. ⚙️ [Backend Documentation](./backend/)

Contains all documentation related to the backend API and database.

- **[API Conventions](./backend/api-conventions.md)**: Standards for errors, pagination, and rate limiting.
- **[Database Schema](./backend/database-schema/)**: The concrete MongoDB collection schemas.
- **[Endpoints](./backend/endpoints.md)**: A complete reference for all API endpoints.
- **[Design Decisions](./backend/design-decisions.md)**: The rationale behind key data architecture choices.

### 4. ✅ [User Happy Path](./user-happy-path.md)

A step-by-step description of the primary user journey, from discovery to execution. This serves as a guide for E2E and manual testing.
