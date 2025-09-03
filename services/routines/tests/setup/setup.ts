// Test setup file for Vitest
import { beforeAll, afterAll } from 'vitest';

// Global test setup
beforeAll(async () => {
  // Set test environment
  process.env.NODE_ENV = 'test';
  process.env.MONGODB_URI =
    'mongodb://localhost:27017/peakhealth_routines_test';
  process.env.MONGODB_DATABASE = 'peakhealth_routines_test';
  process.env.SUPABASE_JWT_SECRET = 'test-secret';
});

// Global test cleanup
afterAll(async () => {
  // Cleanup any test resources
});
