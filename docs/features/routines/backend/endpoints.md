# API Endpoints

## Overview

This document provides a complete, developer-focused reference for all API endpoints. For API-wide standards on errors, pagination, or rate limiting, please see the **[API Conventions Guide](./api-conventions.md)**.

---

## 1. Reusable Component Libraries

These endpoints are for managing the versioned library of reusable workout components. For a detailed explanation of the workflow, see the **[Versioning and Cleanup Guide](./versioning-and-cleanup.md)**.

### **POST** `/api/library/sections`

Create a new reusable section template.

-   **Request Body**: `Section` object (see `data-models/sections/*.md`).
-   **Response (201 Created)**: The newly created `Section` document (`v1`).

### **POST** `/api/library/sections/:id/copy`

Create a new, independent section component by copying an existing one.

-   **Response (201 Created)**: The new `Section` document (which is now `v1` of its own version history).

### **PUT** `/api/library/sections/:id`

Create a new version of an existing section template.

-   **Request Body**: The updated `Section` object.
-   **Response (200 OK)**: The new `Section` document (e.g., `v2`).

### **PUT** `/api/library/sections/:id/archive`

Archive a specific version of a section template.

-   **Response (200 OK)**: `{ "success": true, "newLatestVersionId": "..." }`

---

## 2. Routines

### **POST** `/api/templates/routines`

Create a new `TemplateRoutine`.

-   **Request Body**: `TemplateRoutine` object. The `workouts` array can contain `ObjectId`s referencing the library.
-   **Response (201 Created)**: The newly created, fully-embedded `TemplateRoutine` (`v1`).

### **PUT** `/api/templates/routines/:id`

Create a new version of a `TemplateRoutine`.

-   **Request Body**: The updated `TemplateRoutine` object.
-   **Response (200 OK)**: The new, fully-embedded `TemplateRoutine` document (e.g., `v2`).

---

## 3. Execution Models

### **POST** `/api/routine-assignments`

Assign a `TemplateRoutine` to a user.

-   **Request Body**:
    ```json
    {
      "routineVersionId": "ObjectId",
      "userId": "SupabaseUserUUID",
      "trainerId": "SupabaseUserUUID",
      "startDate": "ISODateString"
    }
    ```
-   **Response (201 Created)**: The new `RoutineAssignment` document.

### **PUT** `/api/workout-sessions/:id`

Update a `WorkoutSession`, typically to log performance.

-   **Request Body**:
    ```json
    {
      "status": "completed",
      "durationMinutes": 45,
      "notes": "Felt strong today.",
      "performanceLog": { ... } // See data-models/workout-log.md
    }
    ```
-   **Response (200 OK)**: The updated `WorkoutSession` document.

---

*Note: `GET` and `DELETE` endpoints are also available as previously listed but are omitted here for brevity as their contracts are simpler.*
