This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Development Performance Optimization

### Preventing Connection Timeout Issues

This app is optimized to prevent development server connection timeouts:

1. **Disable Sentry in Development**: For optimal development performance, leave `NEXT_PUBLIC_SENTRY_DSN` empty in your `.env.local` file. This prevents Sentry from loading heavy monitoring bundles during development.

2. **Enable Sentry Only When Needed**: Only set the `NEXT_PUBLIC_SENTRY_DSN` environment variable when you specifically need to test Sentry integration.

3. **Optimized Configuration**: The application automatically:
   - Disables Sentry replay and extensive tracing in development
   - Reduces bundle splitting overhead with optimized webpack configuration
   - Skips sourcemap uploads in development
   - Uses conditional Sentry initialization

### Troubleshooting Connection Issues

If you experience "Connection closed" errors:

1. Ensure `NEXT_PUBLIC_SENTRY_DSN` is not set in `.env.local`
2. Clear browser cache and restart the development server
3. Check system memory allocation for Node.js
