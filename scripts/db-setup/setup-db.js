// MongoDB Database Setup Script for Routines Feature
// This script sets up the collections and indexes for the Routines feature

// Connect to MongoDB
const { MongoClient } = require('mongodb');
const { createSampleDocuments } = require('./sample-data');

async function setupDatabase() {
  // Connection URL
  const url = 'mongodb://localhost:27017';
  const client = new MongoClient(url);
  const dbName = 'peakHealth';

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB server');

    // Get database reference
    const db = client.db(dbName);
    console.log(`Using database: ${dbName}`);

    // Create collections
    console.log('Creating collections...');
    
    // 1. sections collection
    await db.createCollection('sections');
    console.log('Created sections collection');
    
    // 2. workouts collection
    await db.createCollection('workouts');
    console.log('Created workouts collection');
    
    // 3. routines collection
    await db.createCollection('routines');
    console.log('Created routines collection');
    
    // 4. routine_assignments collection
    await db.createCollection('routine_assignments');
    console.log('Created routine_assignments collection');
    
    // 5. workout_sessions collection
    await db.createCollection('workout_sessions');
    console.log('Created workout_sessions collection');

    // Create indexes for each collection
    await createIndexes(db);
    
    // Create sample documents
    await createSampleDocuments(db);
    
    // List all collections to verify
    const collections = await db.listCollections().toArray();
    console.log('Available collections:');
    collections.forEach(collection => {
      console.log(`- ${collection.name}`);
    });

  } catch (err) {
    console.error('Error setting up database:', err);
  } finally {
    // Close the connection
    await client.close();
    console.log('Disconnected from MongoDB server');
  }
}

async function createIndexes(db) {
  console.log('Creating indexes...');

  // Indexes for sections collection
  await db.collection('sections').createIndexes([
    { key: { parentSectionId: 1, isLatest: 1 } },
    { key: { isPublic: 1, type: 1, tags: 1 } },
    { key: { createdBy: 1 } }
  ]);
  console.log('Created indexes for sections collection');

  // Indexes for workouts collection
  await db.collection('workouts').createIndexes([
    { key: { parentWorkoutId: 1, isLatest: 1 } },
    { key: { isPublic: 1, type: 1, tags: 1 } },
    { key: { createdBy: 1 } }
  ]);
  console.log('Created indexes for workouts collection');

  // Indexes for routines collection
  await db.collection('routines').createIndexes([
    { key: { userId: 1, isActive: 1 } },
    { key: { userId: 1, isFavorite: 1 } },
    { key: { parentRoutineId: 1, isLatest: 1 } },
    { key: { isPublic: 1, templateType: 1, tags: 1 } }
  ]);
  console.log('Created indexes for routines collection');

  // Indexes for routine_assignments collection
  await db.collection('routine_assignments').createIndexes([
    { key: { userId: 1, status: 1 } },
    { key: { trainerId: 1 } },
    { key: { routineVersionId: 1, userId: 1 } }
  ]);
  console.log('Created indexes for routine_assignments collection');

  // Indexes for workout_sessions collection
  await db.collection('workout_sessions').createIndexes([
    { key: { userId: 1, scheduledDate: 1 } },
    { key: { routineAssignmentId: 1, status: 1 } },
    { key: { parentRoutineId: 1, completedAt: 1 } }
  ]);
  console.log('Created indexes for workout_sessions collection');

  console.log('All indexes created successfully!');
}

// Run the setup function
setupDatabase().catch(console.error);
