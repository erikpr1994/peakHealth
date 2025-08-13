# Vercel Microfrontends Setup

This project uses Vercel microfrontends to provide a single domain experience for the PeakHealth platform.

## Architecture

### Apps in Microfrontends

- **Landing App** (`apps/landing`): Marketing pages and blog
- **Web App** (`apps/web`): User dashboard and application features

### Apps Outside Microfrontends

- **Admin App** (`apps/admin`): Admin panel (separate subdomain: `admin.peakhealth.es`)
- **Auth App** (`apps/auth`): Authentication service (separate subdomain: `auth.peakhealth.es`)

## Routing

### Production URLs

- **Marketing**: `peakhealth.es/` (landing app)
- **User App**: `peakhealth.es/dashboard` (web app)
- **Admin**: `admin.peakhealth.es` (admin app)

- **Auth**: `auth.peakhealth.es` (auth app)

### Development URLs

- **Marketing**: `localhost:3000/` (landing app via microfrontends proxy)
- **User App**: `localhost:3000/dashboard` (web app via microfrontends proxy)
- **Admin**: `localhost:3002` (admin app)
- **Auth**: `localhost:3000` (auth app)

## Development

### Running with Microfrontends (Recommended)

```bash
# Start the microfrontends proxy with landing and web apps
pnpm dev:microfrontends


# In another terminal, start the individual apps
pnpm dev
```

### Running Individual Apps

```bash
# Landing app (marketing)
cd apps/landing && pnpm dev

# Web app (user dashboard)
cd apps/web && pnpm dev

# Admin app
cd apps/admin && pnpm dev

# Auth app

cd apps/auth && pnpm dev
```

## Configuration Files

### microfrontends.json

Located in the root directory (`microfrontends.json`), this file defines the routing rules for the microfrontends.

### Next.js Config

Both `apps/landing/next.config.ts` and `apps/web/next.config.ts` are wrapped with `withMicrofrontends()`.

## Benefits

1. **Single Domain Experience**: All user-facing content under `peakhealth.es`
2. **Better SEO**: Marketing and app content share domain authority
3. **Simplified Authentication**: No cross-domain cookie issues
4. **Development Experience**: No port-based routing in development
5. **Team Independence**: Each team can work on their app independently

## Deployment

1. Create a microfrontends group in Vercel dashboard
2. Add the landing and web projects to the group
3. Set the landing app as the default application
4. Deploy the `microfrontends.json` configuration
5. Deploy each app to Vercel

## Notes

- The admin app remains separate for security and team independence
- The auth app remains separate to handle cross-domain authentication
- The middleware in the web app handles authentication and routing logic
- Marketing content stays in the landing app, user content stays in the web app
