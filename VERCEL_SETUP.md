# Vercel Monorepo Setup Guide

This guide explains how to set up your Vercel projects to work with this monorepo configuration.

## Prerequisites

1. Install the Vercel CLI:

   ```bash
   npm install -g vercel
   ```

2. Log in to Vercel:
   ```bash
   vercel login
   ```

## Setup Steps

### 1. Create Vercel Projects

For each app in the monorepo, create a separate Vercel project in the Vercel dashboard:

- peak-health-web (for apps/web)
- peak-health-landing (for apps/landing)
- peak-health-auth (for apps/auth)
- peak-health-admin (for apps/admin)

### 2. Link Local Directories to Vercel Projects

Run the following commands to link each app directory to its corresponding Vercel project:

```bash
# Link web app
cd apps/web
vercel link --project peak-health-web

# Link landing app
cd ../landing
vercel link --project peak-health-landing

# Link auth app
cd ../auth
vercel link --project peak-health-auth

# Link admin app
cd ../admin
vercel link --project peak-health-admin
```

### 3. Configure Environment Variables

Make sure to set up the necessary environment variables for each project in the Vercel dashboard.

### 4. Deploy

After linking all projects, you can deploy them individually or together:

```bash
# Deploy all projects
vercel

# Deploy a specific project
cd apps/web
vercel
```

## How It Works

The configuration in this monorepo uses Vercel's monorepo support to only build the apps that have changed:

1. The root `vercel.json` file defines the monorepo structure and build commands for each project.
2. The `turbo-ignore` script in `package.json` helps Vercel determine if a build is necessary.
3. Each app has its own `vercel.json` file with app-specific configurations.

When you push changes to your repository, Vercel will only build the apps that have been modified, saving build time and resources.
