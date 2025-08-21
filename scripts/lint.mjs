#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

// Set the ESLint feature flag for flat config
process.env.ESLINT_FLAGS = 'v10_config_lookup_from_file';

// Get the arguments passed to this script
const args = process.argv.slice(2);

// Check if we're linting a Next.js app
const isNextApp = (path) => {
  if (!path) return false;
  
  // If the path is a file, check if it's in a Next.js app
  if (path.includes('/')) {
    const appPath = path.split('/')[0];
    if (appPath.startsWith('apps/')) {
      const packageJsonPath = join(process.cwd(), appPath, 'package.json');
      if (existsSync(packageJsonPath)) {
        try {
          const packageJson = JSON.parse(readFileSync(packageJsonPath).toString());
          return !!packageJson.dependencies?.next;
        } catch (error) {
          return false;
        }
      }
    }
  }
  
  return false;
};

// Run ESLint with the provided arguments
try {
  execSync(`pnpm exec eslint ${args.join(' ')}`, {
    stdio: 'inherit',
    env: process.env,
  });
} catch (error) {
  process.exit(error.status || 1);
}

