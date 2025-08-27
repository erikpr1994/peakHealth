# Versioning, Archiving, and Cleanup Strategy

## Overview

This document outlines the complete lifecycle for our versioned library components (`sections` and `workouts`). The strategy is designed to provide maximum flexibility for content creators while ensuring data integrity and providing a safe, intentional process for data cleanup.

The core principle is a **two-step deletion process**: components must be **Archived** before they can be **Purged**.

---

## The Component Lifecycle

### 1. Creation

-   **Endpoint**: `POST /api/library/sections` or `POST /api/library/workouts`
-   **Action**: A new component is created.
-   **Result**: A new document is created with a unique `parent...Id`, `version: 1`, and `isLatest: true`.

### 2. Creating a New Version

-   **Endpoint**: `PUT /api/library/sections/:id` or `PUT /api/library/workouts/:id`
-   **Action**: A user wants to update an existing component. The request is made to the ID of the version they wish to edit.
-   **Result**:
    1.  A **new** document is created with the updated data.
    2.  The `parent...Id` is copied from the original.
    3.  The `version` number is incremented (e.g., `v1` -> `v2`).
    4.  The new document is marked `isLatest: true`.
    5.  The original document (the one the `PUT` request was made to) has its `isLatest` flag set to `false`.

### 3. Copying a Component (Forking)

This action is for when a creator wants to use an existing component as a starting point for a **new, independent** component. It creates a completely separate version history.

-   **Endpoint**: `POST /api/library/sections/:id/copy`
-   **Action**: A user finds a section they like and wants to make their own variant of it without affecting the original.
-   **Result**:
    1.  A **new** document is created, copying the data from the source `:id`.
    2.  A **new, unique `parent...Id`** is generated for this document.
    3.  The new document is initialized with `version: 1` and `isLatest: true`.
    4.  The original component is completely unaffected.

### 4. Archiving a Version (Soft Deletion)

This is the first and required step for removing a version. It is a non-destructive, reversible action.

-   **Endpoint**: `PUT /api/library/sections/:id/archive` or `PUT /api/library/workouts/:id/archive`
-   **Action**: An administrator or creator decides a specific version is obsolete. When triggering this action, the user should be prompted to confirm and informed that the version will be permanently deleted after a set period (e.g., 90 days).
-   **Result**:
    1.  The target version has two new fields set:
        -   `isArchived: true`
        -   `purgeAt: <current_date + 90_days>`
    2.  The component is immediately hidden from all public lists and creator UIs.
    3.  **Crucially**, if the archived version had `isLatest: true`, the API automatically finds the next most recent version (that isn't archived) and sets its `isLatest` flag to `true`.

### 5. Purging Archived Versions (Hard Deletion)

This is the final, **destructive and irreversible** step to permanently delete data and save storage space. An endpoint can only purge a document that is already archived.

#### A. Granular Purge (Single Version)

-   **Endpoint**: `DELETE /api/library/sections/:id` or `DELETE /api/library/workouts/:id`
-   **Action**: An admin wants to permanently delete a single, specific version that has already been archived.
-   **Logic**:
    1.  The API first checks if the target document has `isArchived: true`.
    2.  If `true`, the document is permanently deleted.
    3.  If `false`, the request is **rejected** with an error to prevent accidental deletion of active content.

#### B. Bulk Purge (Automated Cleanup)

-   **Endpoint**: `DELETE /api/library/sections?status=archived&olderThan=6m` (example)
-   **Action**: An automated job or administrative tool cleans up old, archived data.
-   **Logic**: The API finds all documents in the collection that have `isArchived: true` and a `purgeAt` date that is in the past, and permanently deletes them.

### 6. Deleting an Entire Component History

-   **Endpoint**: `DELETE /api/library/sections/:parentId` or `DELETE /api/library/workouts/:parentId`
-   **Action**: An admin wants to delete an entire component and **all of its versions**, regardless of their status.
-   **Result**: Every document sharing the same `parent...Id` is permanently and irreversibly deleted. This is the "delete everything" escape hatch and should be used with extreme caution.

## Future Considerations: Automated Lifecycle

The `isArchived` and `purgeAt` fields allow for future automation.

-   **Auto-Archiving**: A background job could be implemented to automatically archive old, unused versions that are not marked `isLatest`.
-   **Auto-Purging**: A background job could run daily to find all documents where the `purgeAt` date is in the past and permanently delete them.
