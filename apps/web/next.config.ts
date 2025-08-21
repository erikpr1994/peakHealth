import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';
import { withMicrofrontends } from '@vercel/microfrontends/next/config';

const isDevelopment = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // typedRoutes: true, // Temporarily disabled due to dynamic route issues
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Optimize for development performance
  ...(isDevelopment && {
    // Enable SWC minification for faster builds
    swcMinify: true,
    // Optimize chunk splitting for development
    webpack: (config, { dev, isServer }): typeof config => {
      if (dev && !isServer) {
        // Reduce chunk splitting overhead in development
        config.optimization = {
          ...config.optimization,
          splitChunks: {
            chunks: 'async',
            cacheGroups: {
              default: false,
              vendors: false,
              // Combine vendor chunks to reduce bundle splitting overhead
              vendor: {
                name: 'vendor',
                chunks: 'all',
                test: /node_modules/,
                priority: 20,
              },
              // Combine common chunks
              common: {
                name: 'common',
                chunks: 'all',
                minChunks: 2,
                priority: 10,
                reuseExistingChunk: true,
              },
            },
          },
        };
      }
      return config;
    },
  }),
};

export default withSentryConfig(withMicrofrontends(nextConfig), {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: 'peak-health',

  project: 'web-app',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  // Disable in development to improve performance
  widenClientFileUpload: !isDevelopment,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // Disable tunnel route in development to reduce overhead
  tunnelRoute: isDevelopment ? undefined : '/monitoring',

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  // Disable in development to reduce overhead
  automaticVercelMonitors: !isDevelopment,

  // Disable sourcemap upload in development to improve build performance
  sourcemaps: {
    disable: isDevelopment,
  },
});
