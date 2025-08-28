# PeakHealth Routines Database Setup

This directory contains scripts to set up the MongoDB database schema for the PeakHealth Routines feature.

## Database Schema

The database consists of five primary collections:

1. **sections**: Stores reusable, version-controlled section templates (e.g., a specific warmup or EMOM block).
2. **workouts**: Stores reusable, version-controlled workout templates, which can be built from reusable sections.
3. **routines**: Stores all routine documents. `TemplateRoutine`s are built by referencing versioned workouts and sections, which are then snapshotted into an immutable, fully embedded document upon saving a new version.
4. **routine_assignments**: Links users to a specific, immutable version of a `TemplateRoutine`.
5. **workout_sessions**: Contains every scheduled workout, including an immutable `workoutSnapshot` taken from the assigned routine version.

## Setup Instructions

### Prerequisites

- MongoDB installed and running
- Node.js installed

### Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Run the setup script:
   ```
   npm run setup
   ```

This will:
- Create all required collections
- Set up the necessary indexes
- Create sample documents for testing

## Verification

After running the setup script, you can verify the database setup by connecting to MongoDB and checking the collections:

```
mongosh
use peakHealth
show collections
db.sections.find().pretty()
```

## Sample Data

The setup script creates sample documents in each collection to demonstrate the data structure and relationships. These include:

- A sample section (warmup)
- A sample workout that references the section
- A sample routine that references the workout
- A sample routine assignment linking a user to the routine
- A sample workout session scheduled for the user

## Schema Documentation

For detailed information about the database schema, refer to the documentation in the `docs/features/routines/backend/database-schema/` directory.

