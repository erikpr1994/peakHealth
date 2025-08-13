import { execSync } from 'child_process';

async function globalTeardown(): Promise<void> {
  const killedProcesses: string[] = [];

  try {
    console.log('🧹 Starting cleanup of development servers...');

    // Find all Node.js processes that might be our development servers
    try {
      // More comprehensive search for Next.js processes
      const nodeProcesses = execSync('pgrep -f "node.*next"', {
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'ignore'],
      }).trim();

      if (nodeProcesses) {
        const pidList = nodeProcesses.split('\n').filter(pid => pid.trim());

        for (const pid of pidList) {
          try {
            // Get detailed process info
            const processInfo = execSync(`ps -p ${pid} -o pid,ppid,command=`, {
              encoding: 'utf8',
            }).trim();

            // Check if this is a Next.js development server (more comprehensive check)
            if (
              processInfo.includes('next dev') ||
              processInfo.includes('next-server') ||
              processInfo.includes('next') // Catch any Next.js related process
            ) {
              // Get the port this process is using
              try {
                const portInfo = execSync(
                  `lsof -p ${pid} -i -P | grep LISTEN`,
                  {
                    encoding: 'utf8',
                    stdio: ['pipe', 'pipe', 'ignore'],
                  }
                ).trim();

                if (portInfo) {
                  // Extract port from the output (format: *:PORT)
                  const portMatch = portInfo.match(/\*:(\d+)/);
                  if (portMatch) {
                    const port = portMatch[1];

                    // Skip Supabase port (54323)
                    if (port === '54323') {
                      console.log(
                        `ℹ️  Skipping Supabase process ${pid} on port ${port}`
                      );
                      continue;
                    }

                    // Kill the process
                    execSync(`kill -9 ${pid}`, { stdio: 'ignore' });
                    killedProcesses.push(`PID ${pid} (port ${port})`);
                    console.log(
                      `✅ Killed Next.js process ${pid} on port ${port}`
                    );
                  }
                }
              } catch {
                // Process might not be listening on any port
                console.log(`⚠️  Process ${pid} not listening on any port`);
              }
            }
          } catch {
            // Process might have already been killed
            console.log(`⚠️  Process ${pid} already terminated`);
          }
        }
      }
    } catch {
      // No Node.js processes found, which is fine
      console.log('ℹ️  No Node.js processes found');
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

    // Additional cleanup: Kill any processes on our known development ports
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

export default globalTeardown;
