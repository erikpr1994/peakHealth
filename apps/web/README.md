# Peak Health Web App

The main user-facing application for Peak Health, built with Next.js and CSS Modules.

## Features

- **User Dashboard**: Personalized fitness tracking and progress monitoring
- **Workout Management**: Create, edit, and track workout routines
- **Exercise Library**: Comprehensive exercise database with instructions
- **Progress Tracking**: Visual progress charts and statistics
- **Social Features**: Connect with trainers and other users
- **Responsive Design**: Optimized for all devices

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: CSS Modules (no Tailwind)
- **State Management**: React Context + SWR for data fetching
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **TypeScript**: Full TypeScript support

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Install dependencies:

```bash
pnpm install
```

2. Set up environment variables:

```bash
cp .env.local.example .env.local
# Edit .env.local with your configuration
```

3. Run the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3024](http://localhost:3024) in your browser.

### Build for Production

```bash
pnpm build
pnpm start
```

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

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (app)/             # Protected app routes
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Layout components
│   └── shared/            # Shared components
├── features/              # Feature-based organization
│   ├── auth/              # Authentication
│   ├── workout/           # Workout management
│   ├── exercises/         # Exercise library
│   └── profile/           # User profile
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and configurations
└── types/                 # TypeScript type definitions
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

This project is part of the Peak Health platform.
