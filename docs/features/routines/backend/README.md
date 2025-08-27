# PeakHealth API Documentation

## Overview

This document describes the backend API for the PeakHealth platform. The architecture is built around a flexible MongoDB database to support complex, version-controlled workout programming and detailed user performance tracking. It is designed to replace a legacy Supabase implementation.

## Architecture

-   **Database**: MongoDB
-   **Deployment**: Railway
-   **Authentication**: Supabase-issued JWTs

## Documentation Structure

This API documentation is organized into the following sections:

1.  **[Data Models](./data-models/README.md)**: The conceptual foundation and TypeScript interfaces for our data. This is the best place to start to understand the "why" behind the schema.
2.  **[Database Schema](./database-schema/README.md)**: The concrete MongoDB collection schemas that implement the data models.
3.  **[API Endpoints](./endpoints.md)**: A complete reference for all API endpoints.
4.  **[API Conventions](./api-conventions.md)**: Standards for error handling, pagination, and rate limiting.
5.  **[Versioning, Archiving, and Cleanup](./versioning-and-cleanup.md)**: A detailed guide to the lifecycle of versioned library components.
6.  **[Authentication](./authentication-investigation.md)**: A detailed explanation of how Supabase JWTs are used to secure the API.

## Core Concepts

The API is designed around a few key principles:

-   **Reusability**: Trainers can create versioned libraries of reusable workout `sections` and `workouts`.
-   **Composition**: Routines are built by composing these reusable components.
-   **Immutability**: When a routine is versioned or a workout is scheduled, a "snapshot" of the data is taken to ensure the user's plan and history are never affected by future template changes.
