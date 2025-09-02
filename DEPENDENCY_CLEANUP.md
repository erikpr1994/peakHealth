# Dependency Cleanup

This document outlines the process for identifying and removing unused dependencies in the Peak Health project.

## Overview

The Peak Health project has accumulated dependencies over time that may no longer be in use. This cleanup process aims to:

1. Identify potentially unused dependencies
2. Verify that they are truly unused
3. Remove them safely
4. Document the changes for future reference

## Identification Process

We've created a script (`analyze-dependencies.js`) that analyzes the project's dependencies and identifies those that appear to be unused. The script:

1. Parses all package.json files in the project
2. Collects all dependencies, devDependencies, and peerDependencies
3. Categorizes dependencies by type (UI components, build tools, testing, etc.)
4. Identifies dependencies that don't appear to be imported or used in the codebase

## Removal Process

The removal process is phased to minimize risk:

### Phase 1: Low-Risk Dependencies

These dependencies are unlikely to break the application if removed:

- `@tanstack/react-table` from @peakhealth/web
- `clsx` from all packages
- `swr` from all packages
- `zod` from @peakhealth/admin

### Phase 2: Medium-Risk Dependencies

These dependencies might be used indirectly or through configuration:

- `@flags-sdk/hypertune` and `hypertune` (feature flag libraries)
- `@vercel/flags` and `flags` (feature flag libraries)
- `recharts` (charting library)
- `lucide-react` (icon library)
- `sonner` (toast notification library)

### Phase 3: High-Risk Dependencies

These dependencies require careful verification before removal:

- UI component libraries like `cmdk`, `embla-carousel-react`, `input-otp`, `vaul`
- Build tools like `autoprefixer`, `dotenv`, `es-file-traverse`
- Authentication and API libraries like `express`, `express-rate-limit`, `jsonwebtoken`

## Verification Steps

Before removing any dependency, we verify it's truly unused by:

1. Checking for direct imports in the codebase
2. Looking for dynamic imports or requires
3. Examining configuration files for references
4. Checking for component usage patterns in JSX/TSX files
5. Verifying it's not required by other dependencies

## Restoration Instructions

If a dependency needs to be restored after removal:

1. Use the backup files created during the removal process:

   ```
   cp package.json.backup package.json
   ```

2. Or reinstall specific dependencies:
   ```
   pnpm add <dependency-name>@<version>
   # or for dev dependencies
   pnpm add -D <dependency-name>@<version>
   ```

## Testing After Removal

After removing dependencies, we test the application by:

1. Running the build process for all packages
2. Running the test suites
3. Starting the development server and manually testing key functionality
4. Checking for any console errors or warnings

## Removed Dependencies Log

As dependencies are removed, they will be documented here with:

- The name and version of each dependency
- The packages it was removed from
- The date of removal
- Any notes about potential future needs for these dependencies
