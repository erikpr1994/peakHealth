// Integration test setup file for Vitest
import { beforeAll, afterAll } from 'vitest';
import { connectToDatabase, closeDatabase } from '../../src/config/database';

// Global integration test setup
beforeAll(async () => {
  // Set test environment
  process.env.NODE_ENV = 'test';
  process.env.SUPABASE_JWT_SECRET = 'test-secret';

  // Use separate test database for integration tests
  process.env.MONGODB_URI =
    'mongodb://localhost:27017/peakhealth_routines_integration_test';
  process.env.MONGODB_DATABASE = 'peakhealth_routines_integration_test';
  process.env.CORS_ORIGIN = 'http://localhost:3000';
  process.env.LOG_LEVEL = 'info';

  // Check if MongoDB is available before running integration tests
  const isMongoAvailable = process.env.MONGODB_AVAILABLE !== 'false';

  if (!isMongoAvailable) {
    console.log('⚠️  MongoDB not available, skipping integration tests');
    process.env.MONGODB_AVAILABLE = 'false';
    return;
  }

  // Connect to test database
  try {
    await connectToDatabase();
    console.log('✅ Integration test database connected');
  } catch (error) {
    console.error('❌ Failed to connect to integration test database:', error);
    console.log(
      '⚠️  Skipping integration tests due to database connection failure'
    );
    // Don't throw error, just skip integration tests
    return;
  }
});

// Global integration test cleanup
afterAll(async () => {
  // Close database connection
  try {
    await closeDatabase();
    console.log('✅ Integration test database connection closed');
  } catch (error) {
    console.error(
      '❌ Error closing integration test database connection:',
      error
    );
  }
});
