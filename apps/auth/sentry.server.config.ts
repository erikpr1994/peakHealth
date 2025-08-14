// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

// Determine if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

// Only initialize Sentry if DSN is available or in production
if (process.env.NEXT_PUBLIC_SENTRY_DSN || !isDevelopment) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

    // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
    // Reduce sampling in development to improve performance
    tracesSampleRate: isDevelopment ? 0.1 : 1,

    // Disable logs in development to reduce overhead
    enableLogs: !isDevelopment,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
  });
}
