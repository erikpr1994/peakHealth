import { execSync } from 'child_process';

async function globalTeardown(): Promise<void> {
  const ports = [3000, 3001, 3002, 3024, 4450, 7524, 9009, 54323]; // Our app ports + Supabase
  const killedProcesses: string[] = [];

  try {
    console.log('🧹 Starting cleanup of development servers...');

    // Kill processes on specific ports using proper lsof syntax
    for (const port of ports) {
      try {
        // Get PIDs using processes on this port
        const pids = execSync(`lsof -ti:${port}`, {
          encoding: 'utf8',
          stdio: ['pipe', 'pipe', 'ignore'], // Suppress stderr for ports that might not be in use
        }).trim();

        if (pids) {
          const pidList = pids.split('\n').filter(pid => pid.trim());

          for (const pid of pidList) {
            try {
              // Get process info to verify it's a dev server
              const processInfo = execSync(`ps -p ${pid} -o command=`, {
                encoding: 'utf8',
              }).trim();

              // Only kill if it's a development server
              if (
                processInfo.includes('pnpm') ||
                processInfo.includes('next') ||
                processInfo.includes('node') ||
                processInfo.includes('supabase')
              ) {
                execSync(`kill -9 ${pid}`, { stdio: 'ignore' });
                killedProcesses.push(`PID ${pid} (port ${port})`);
                console.log(`✅ Killed process ${pid} on port ${port}`);
              }
            } catch {
              // Process might have already been killed
              console.log(
                `⚠️  Process ${pid} on port ${port} already terminated`
              );
            }
          }
        }
      } catch {
        // Port might not be in use, which is fine
        console.log(`ℹ️  No processes found on port ${port}`);
      }
    }

    // Additional cleanup for any remaining pnpm dev processes that might be orphaned
    try {
      const pnpmPids = execSync('pgrep -f "pnpm dev"', {
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'ignore'],
      }).trim();

      if (pnpmPids) {
        const pidList = pnpmPids.split('\n').filter(pid => pid.trim());
        for (const pid of pidList) {
          try {
            // Verify it's our dev process by checking if it's using our ports
            const portCheck = execSync(
              `lsof -p ${pid} -i :3000,:3001,:3002,:3024,:4450,:7524`,
              {
                encoding: 'utf8',
                stdio: ['pipe', 'pipe', 'ignore'],
              }
            );

            if (portCheck.trim()) {
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

export default globalTeardown;
