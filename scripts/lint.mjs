#!/usr/bin/env node

import { execSync } from 'child_process';

// Set the ESLint feature flag
process.env.ESLINT_FLAGS = 'v10_config_lookup_from_file';

// Get the arguments passed to this script
const args = process.argv.slice(2);

// Run ESLint with the provided arguments
try {
  execSync(`pnpm exec eslint ${args.join(' ')}`, {
    stdio: 'inherit',
    env: process.env,
  });
} catch (error) {
  process.exit(error.status || 1);
}
