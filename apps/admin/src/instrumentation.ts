import * as Sentry from '@sentry/nextjs';

export async function register(): Promise<void> {
  // Skip Sentry initialization in development if DSN is not set
  if (
    process.env.NODE_ENV === 'development' &&
    !process.env.NEXT_PUBLIC_SENTRY_DSN
  ) {
    return;
  }

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('../sentry.server.config');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('../sentry.edge.config');
  }
}

export const onRequestError = Sentry.captureRequestError;
