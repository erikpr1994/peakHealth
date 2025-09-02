/**
 * Simple logger utility that respects test environment
 */

const isTestEnvironment = () => {
  return (
    process.env.NODE_ENV === 'test' ||
    process.env.VITEST === 'true' ||
    (typeof global !== 'undefined' && 'expect' in global)
  );
};

const shouldSuppressLogs = () => {
  return isTestEnvironment() && !process.env.DEBUG_TESTS;
};

/**
 * Logger that respects test environment
 */
export const logger = {
  info: (...args: any[]) => {
    if (!shouldSuppressLogs()) {
      console.log(...args);
    }
  },

  warn: (...args: any[]) => {
    if (!shouldSuppressLogs()) {
      console.warn(...args);
    }
  },

  error: (...args: any[]) => {
    if (!shouldSuppressLogs()) {
      console.error(...args);
    }
  },

  debug: (...args: any[]) => {
    if (
      process.env.DEBUG_TESTS ||
      (!isTestEnvironment() && process.env.NODE_ENV === 'development')
    ) {
      console.log('[DEBUG]', ...args);
    }
  },

  // Force logging even in tests (for critical errors)
  forceLog: (...args: any[]) => {
    console.log(...args);
  },

  forceError: (...args: any[]) => {
    console.error(...args);
  },
};

/**
 * Helper to conditionally log in tests
 */
export const testLog = (...args: any[]) => {
  if (process.env.DEBUG_TESTS) {
    console.log('[TEST]', ...args);
  }
};
