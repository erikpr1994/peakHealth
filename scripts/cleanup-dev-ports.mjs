#!/usr/bin/env node

import { execSync } from 'child_process';

/**
 * Cleans up development ports before starting the development servers
 * This script can be run manually or as part of the dev startup process
 */
async function cleanupDevPorts() {
  const killedProcesses = [];

  try {
    console.log('🧹 Cleaning up development ports before starting servers...');

    // Kill any processes on our known development ports
    const knownDevPorts = [3000, 3001, 3002, 3003, 3024];
    for (const port of knownDevPorts) {
      try {
        const pids = execSync(`lsof -ti:${port}`, {
          encoding: 'utf8',
          stdio: ['pipe', 'pipe', 'ignore'],
        }).trim();

        if (pids) {
          const pidList = pids.split('\n').filter(pid => pid.trim());
          for (const pid of pidList) {
            try {
              // Get process info to verify it's a development server
              const processInfo = execSync(`ps -p ${pid} -o command=`, {
                encoding: 'utf8',
              }).trim();

              // Only kill if it's a development-related process
              if (
                processInfo.includes('next') ||
                processInfo.includes('node') ||
                processInfo.includes('pnpm')
              ) {
                execSync(`kill -9 ${pid}`, { stdio: 'ignore' });
                killedProcesses.push(`PID ${pid} (port ${port})`);
                console.log(`✅ Killed process ${pid} on port ${port}`);
              }
            } catch {
              // Process might have already been killed
            }
          }
        }
      } catch {
        // Port might not be in use, which is fine
      }
    }

    // Also clean up any remaining pnpm dev processes
    try {
      const pnpmProcesses = execSync('pgrep -f "pnpm.*dev"', {
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'ignore'],
      }).trim();

      if (pnpmProcesses) {
        const pidList = pnpmProcesses.split('\n').filter(pid => pid.trim());

        for (const pid of pidList) {
          try {
            // Get process info to verify it's our dev process
            const processInfo = execSync(`ps -p ${pid} -o command=`, {
              encoding: 'utf8',
            }).trim();

            // Only kill if it's a pnpm dev process from our project
            if (processInfo.includes('pnpm') && processInfo.includes('dev')) {
              execSync(`kill -9 ${pid}`, { stdio: 'ignore' });
              killedProcesses.push(`pnpm dev PID ${pid}`);
              console.log(`✅ Killed pnpm dev process ${pid}`);
            }
          } catch {
            // Process might have already been killed
          }
        }
      }
    } catch {
      // No pnpm dev processes found, which is fine
    }

    if (killedProcesses.length > 0) {
      console.log(
        `✅ Cleanup complete. Killed ${killedProcesses.length} processes:`,
        killedProcesses
      );
    } else {
      console.log('✅ No development processes found to clean up');
    }
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    throw error;
  }
}

// Run the cleanup if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  cleanupDevPorts();
}

export default cleanupDevPorts;
