import { execSync } from 'child_process';

async function globalTeardown(): Promise<void> {
  try {
    // Kill all development processes
    execSync('pkill -f "pnpm dev" || true', { stdio: 'inherit' });
    execSync('pkill -f "next dev" || true', { stdio: 'inherit' });
    execSync('pkill -f "microfrontends" || true', { stdio: 'inherit' });

    // Kill processes on specific ports
    execSync(
      'lsof -ti:3000,3001,3002,3024 | xargs kill -9 2>/dev/null || true',
      { stdio: 'inherit' }
    );

    console.log('✅ Cleaned up development servers');
  } catch {
    console.log('⚠️  Some cleanup commands failed, but this is usually okay');
  }
}

export default globalTeardown;
