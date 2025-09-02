#!/usr/bin/env node
/* eslint-disable no-console */
/* global console */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all package.json files
const packageJsonFiles = execSync(
  'find . -name "package.json" | grep -v "node_modules"'
)
  .toString()
  .trim()
  .split('\n');

// Store all dependencies
const allDependencies = new Map();

// Parse each package.json and collect dependencies
packageJsonFiles.forEach(filePath => {
  try {
    const packageJson = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const packageName = packageJson.name || path.dirname(filePath);

    // Skip node_modules
    if (filePath.includes('node_modules')) return;

    // Process dependencies
    const dependencies = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
      ...packageJson.peerDependencies,
    };

    for (const [depName, version] of Object.entries(dependencies)) {
      // Skip workspace dependencies
      if (version === 'workspace:*') continue;

      if (!allDependencies.has(depName)) {
        allDependencies.set(depName, {
          usedIn: [packageName],
          isUsed: false,
          importCount: 0,
        });
      } else {
        const dep = allDependencies.get(depName);
        if (!dep.usedIn.includes(packageName)) {
          dep.usedIn.push(packageName);
        }
      }
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
});

// Special categories of dependencies that are likely used
const specialCategories = [
  // Build tools and configuration
  {
    pattern:
      /eslint|prettier|babel|webpack|vite|rollup|jest|vitest|typescript|config/,
    reason: 'Build/Config dependency',
  },
  // CSS and styling
  {
    pattern: /css|scss|style|tailwind|postcss/,
    reason: 'CSS/Style dependency',
  },
  // Type definitions
  { pattern: /^@types\//, reason: 'TypeScript type definition' },
  // UI component libraries
  {
    pattern: /^@radix-ui\/|ui-component|shadcn/,
    reason: 'UI component library',
  },
  // React and related
  {
    pattern: /^react$|^react-dom$|^react-|^next$|^next-/,
    reason: 'React/Next.js dependency',
  },
  // Testing libraries
  { pattern: /test|jest|vitest|playwright/, reason: 'Testing dependency' },
  // Storybook
  { pattern: /storybook/, reason: 'Storybook dependency' },
  // Supabase
  { pattern: /supabase/, reason: 'Supabase dependency' },
  // Sentry
  { pattern: /sentry/, reason: 'Sentry monitoring' },
  // Database
  { pattern: /mongodb|mongoose|prisma|sql/, reason: 'Database dependency' },
];

// Mark special categories as used
for (const [depName, info] of allDependencies.entries()) {
  for (const category of specialCategories) {
    if (category.pattern.test(depName)) {
      info.isUsed = true;
      info.importCount = 1;
      info.reason = category.reason;
      break;
    }
  }
}

// Generate report
console.log('# Dependency Analysis Report\n');

console.log('## Potentially Unused Dependencies\n');
const unusedDeps = Array.from(allDependencies.entries())
  .filter(([_, info]) => !info.isUsed)
  .sort((a, b) => a[0].localeCompare(b[0]));

if (unusedDeps.length === 0) {
  console.log('No unused dependencies found.');
} else {
  console.log('| Dependency | Used In |');
  console.log('|------------|---------|');
  unusedDeps.forEach(([depName, info]) => {
    console.log(`| ${depName} | ${info.usedIn.join(', ')} |`);
  });
}

console.log('\n## Used Dependencies by Category\n');
const usedDeps = Array.from(allDependencies.entries())
  .filter(([_, info]) => info.isUsed)
  .sort((a, b) => (a[1].reason || '').localeCompare(b[1].reason || ''));

// Group by reason
const groupedByReason = {};
usedDeps.forEach(([depName, info]) => {
  const reason = info.reason || 'Other';
  if (!groupedByReason[reason]) {
    groupedByReason[reason] = [];
  }
  groupedByReason[reason].push([depName, info]);
});

// Print each category
for (const [reason, deps] of Object.entries(groupedByReason)) {
  console.log(`### ${reason}\n`);
  console.log('| Dependency | Used In |');
  console.log('|------------|---------|');
  deps.forEach(([depName, info]) => {
    console.log(`| ${depName} | ${info.usedIn.join(', ')} |`);
  });
  console.log('');
}

console.log('## Summary\n');
console.log(`Total dependencies: ${allDependencies.size}`);
console.log(`Used dependencies: ${usedDeps.length}`);
console.log(`Potentially unused dependencies: ${unusedDeps.length}`);
console.log(
  '\nNote: This analysis is based on dependency categories and may have false positives. Please verify before removing any dependencies.'
);
