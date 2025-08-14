// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import {
  captureRouterTransitionStart,
  init,
  replayIntegration,
} from '@sentry/nextjs';

// Determine if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

// Only initialize Sentry if DSN is available or in production
if (process.env.NEXT_PUBLIC_SENTRY_DSN || !isDevelopment) {
  init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

    // Add optional integrations for additional features
    // Disable replay in development to reduce bundle size and compilation overhead
    integrations: isDevelopment ? [] : [replayIntegration()],

    // Reduce trace sampling in development to improve performance
    tracesSampleRate: isDevelopment ? 0.1 : 1,
    
    // Disable logs in development to reduce overhead
    enableLogs: !isDevelopment,

    // Define how likely Replay events are sampled.
    // Disable replay completely in development
    replaysSessionSampleRate: isDevelopment ? 0 : 0.1,

    // Define how likely Replay events are sampled when an error occurs.
    replaysOnErrorSampleRate: isDevelopment ? 0 : 1.0,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
  });
}

export const onRouterTransitionStart = captureRouterTransitionStart;
