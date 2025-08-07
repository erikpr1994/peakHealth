# PeakHealth Auth App

Centralized authentication service for the PeakHealth platform.

## Features

- **User Registration**: Sign up with email, password, and profile information
- **User Login**: Secure authentication with email and password
- **App Selection**: Multi-role users can choose which app to access
- **Cross-Domain Sessions**: Shared authentication across subdomains
- **Role-Based Access**: Different user types (user, admin, trainer)

## Setup

### 1. Port Configuration

The apps are configured to run on specific ports:

- **Auth App**: `http://localhost:3000` (auth.peakhealth.es in production)
- **Web App**: `http://localhost:3001` (peakhealth.es in production)
- **Admin App**: `http://localhost:3002` (admin.peakhealth.es in production)
- **Pro App**: `http://localhost:3003` (pro.peakhealth.es in production)

### 2. Environment Variables

Create a `.env.local` file in the `apps/auth` directory:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# App URLs (optional - will use localhost defaults in development)
NEXT_PUBLIC_WEB_APP_URL=http://localhost:3001
NEXT_PUBLIC_ADMIN_APP_URL=http://localhost:3002
NEXT_PUBLIC_PRO_APP_URL=http://localhost:3003

# Production URLs (example)
# NEXT_PUBLIC_WEB_APP_URL=https://peakhealth.es
# NEXT_PUBLIC_ADMIN_APP_URL=https://admin.peakhealth.es
# NEXT_PUBLIC_PRO_APP_URL=https://pro.peakhealth.es
```

### 2. Supabase Setup

1. Create a new Supabase project
2. Enable Email authentication in Authentication > Settings
3. Configure email templates in Authentication > Email Templates
4. Set up Row Level Security (RLS) policies for user data

### 3. Development

```bash
# Install dependencies
pnpm install

# Start auth app (port 3000)
cd apps/auth && pnpm dev

# Start web app (port 3001)
cd apps/web && pnpm dev

# Start admin app (port 3002)
cd apps/admin && pnpm dev

# Or run all apps from root using Turbo
pnpm dev
```

### 4. Production Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/session` - Get current session
- `GET /api/auth/apps` - Get user's accessible apps

### Pages

- `/` - Redirects to login
- `/login` - Login page
- `/signup` - Registration page
- `/apps` - App selection page

## App Configuration

The auth system supports multiple apps with different access levels:

- **Web App** (`peakhealth.es`) - Regular users
- **Admin App** (`admin.peakhealth.es`) - Administrators
- **Pro App** (`pro.peakhealth.es`) - Trainers and professionals

## User Roles

- `user` - Regular user (access to web app)
- `admin` - Administrator (access to admin app)
- `trainer` - Trainer/Professional (access to pro app)

## Development Notes

- Uses CSS Modules for styling
- Strict ESLint configuration
- TypeScript for type safety
- Shared packages for common functionality
- Cross-domain cookie management
