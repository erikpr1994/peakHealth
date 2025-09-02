#!/usr/bin/env node
/* eslint-disable no-console */
/* global console */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration: List of dependencies to remove by package
const dependenciesToRemove = {
  // Low-risk dependencies (Phase 1)
  '@peakhealth/web': ['@tanstack/react-table', 'clsx', 'swr'],
  '@peakhealth/admin': ['clsx', 'swr', 'zod'],
  '@peakhealth/landing': ['clsx'],
  '@peakhealth/routines-ui': ['clsx', 'swr'],
  '@peakhealth/ui': ['clsx'],

  // Medium-risk dependencies (Phase 2)
  // Uncomment when ready to proceed with phase 2
  /*
  '@peakhealth/admin': [
    '@flags-sdk/hypertune',
    'hypertune',
    '@vercel/flags',
    'flags',
    'recharts',
    'lucide-react',
    'sonner'
  ],
  '@peakhealth/landing': [
    '@flags-sdk/hypertune',
    'hypertune',
    '@vercel/flags',
    'flags',
    'recharts',
    'lucide-react',
    'sonner'
  ],
  '@peakhealth/web': [
    '@vercel/flags',
    'flags',
    'hypertune',
    'recharts',
    'lucide-react',
    'sonner'
  ],
  */

  // High-risk dependencies (Phase 3)
  // Uncomment when ready to proceed with phase 3
  /*
  '@peakhealth/admin': [
    'cmdk',
    'embla-carousel-react',
    'input-otp',
    'vaul'
  ],
  '@peakhealth/web': [
    'cmdk',
    'embla-carousel-react',
    'input-otp',
    'vaul'
  ],
  '@peakhealth/routines-api': [
    'express',
    'express-rate-limit',
    'jsonwebtoken'
  ],
  'peak-health': [
    'dotenv',
    'es-file-traverse'
  ]
  */
};

// Get all package.json files
const packageJsonFiles = execSync(
  'find . -name "package.json" | grep -v "node_modules"'
)
  .toString()
  .trim()
  .split('\n');

// Track changes for documentation
const changes = [];

// Process each package.json file
packageJsonFiles.forEach(filePath => {
  try {
    const packageJson = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const packageName = packageJson.name;

    // Skip if no dependencies to remove for this package
    if (!dependenciesToRemove[packageName]) {
      return;
    }

    // Track removed dependencies for this package
    const removedDeps = {
      packageName,
      filePath,
      dependencies: [],
      devDependencies: [],
    };

    let hasChanges = false;

    // Process dependencies
    if (packageJson.dependencies) {
      for (const depName of dependenciesToRemove[packageName]) {
        if (packageJson.dependencies[depName]) {
          removedDeps.dependencies.push({
            name: depName,
            version: packageJson.dependencies[depName],
          });
          delete packageJson.dependencies[depName];
          hasChanges = true;
        }
      }
    }

    // Process devDependencies
    if (packageJson.devDependencies) {
      for (const depName of dependenciesToRemove[packageName]) {
        if (packageJson.devDependencies[depName]) {
          removedDeps.devDependencies.push({
            name: depName,
            version: packageJson.devDependencies[depName],
          });
          delete packageJson.devDependencies[depName];
          hasChanges = true;
        }
      }
    }

    // Save changes if any dependencies were removed
    if (hasChanges) {
      // Create backup
      const backupPath = `${filePath}.backup`;
      fs.copyFileSync(filePath, backupPath);
      console.log(`Created backup: ${backupPath}`);

      // Write updated package.json
      fs.writeFileSync(filePath, `${JSON.stringify(packageJson, null, 2)}\n`);
      console.log(`Updated: ${filePath}`);

      // Add to changes log
      changes.push(removedDeps);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
});

// Generate documentation
if (changes.length > 0) {
  const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const docContent = `# Dependency Cleanup - ${timestamp}

## Removed Dependencies

${changes
  .map(
    pkg => `
### ${pkg.packageName} (${pkg.filePath})

${
  pkg.dependencies.length > 0
    ? `
#### Dependencies
${pkg.dependencies.map(dep => `- ${dep.name}@${dep.version}`).join('\n')}
`
    : ''
}

${
  pkg.devDependencies.length > 0
    ? `
#### DevDependencies
${pkg.devDependencies.map(dep => `- ${dep.name}@${dep.version}`).join('\n')}
`
    : ''
}
`
  )
  .join('\n')}

## Restoration Instructions

If you need to restore any of these dependencies, you can:

1. Use the backup files created during the removal process:
   \`\`\`
   cp package.json.backup package.json
   \`\`\`

2. Or reinstall specific dependencies:
   \`\`\`
   pnpm add <dependency-name>@<version>
   # or for dev dependencies
   pnpm add -D <dependency-name>@<version>
   \`\`\`
`;

  fs.writeFileSync('DEPENDENCY_CLEANUP.md', docContent);
  console.log('Generated documentation: DEPENDENCY_CLEANUP.md');
}

console.log('Dependency cleanup complete!');
console.log(`Processed ${packageJsonFiles.length} package.json files`);
console.log(`Made changes to ${changes.length} packages`);
console.log('Remember to run "pnpm install" to update your node_modules!');
