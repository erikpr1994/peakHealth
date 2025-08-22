#!/usr/bin/env node

import { spawn } from 'child_process';

// Set the ESLint feature flag
process.env.ESLINT_FLAGS = 'v10_config_lookup_from_file';

// Get the arguments passed to this script
const args = process.argv.slice(2);

// Run ESLint with the provided arguments using spawn to avoid shell interpretation issues
const eslintProcess = spawn('pnpm', ['exec', 'eslint', ...args], {
  stdio: 'inherit',
  env: process.env,
  shell: false, // Don't use shell to avoid special character interpretation
});

eslintProcess.on('close', code => {
  process.exit(code || 0);
});

eslintProcess.on('error', error => {
  process.stderr.write(`Failed to start ESLint process: ${error.message}\n`);
  process.exit(1);
});
