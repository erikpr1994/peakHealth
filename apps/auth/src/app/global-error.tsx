'use client';

import { captureException } from '@sentry/nextjs';
import NextError from 'next/error';
import { useEffect } from 'react';

import { routing } from '@/i18n/routing';

const GlobalError = ({
  error,
}: {
  error: Error & { digest?: string };
}): React.ReactElement => {
  useEffect(() => {
    captureException(error);
  }, [error]);

  return (
    <html lang={routing.defaultLocale}>
      <body>
        {/* `NextError` is the default Next.js error page component. Its type
        definition requires a `statusCode` prop. However, since the App Router
        does not expose status codes for errors, we simply pass 0 to render a
        generic error message. */}
        <NextError statusCode={0} />
      </body>
    </html>
  );
};

export default GlobalError;
