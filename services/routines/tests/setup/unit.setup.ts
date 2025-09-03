// Unit test setup file for Vitest
import { beforeAll } from 'vitest';

// Global unit test setup
beforeAll(async () => {
  // Set test environment
  process.env.NODE_ENV = 'test';
  process.env.SUPABASE_JWT_SECRET = 'test-secret';

  // Mock environment variables for unit tests
  process.env.MONGODB_URI =
    'mongodb://localhost:27017/peakhealth_routines_test';
  process.env.MONGODB_DATABASE = 'peakhealth_routines_test';
  process.env.CORS_ORIGIN = 'http://localhost:3000';
  process.env.LOG_LEVEL = 'error'; // Reduce noise in unit tests
});
