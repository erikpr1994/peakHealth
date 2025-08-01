import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

export class SupabaseManager {
  private static instance: SupabaseManager;
  private isRunning = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static getInstance(): SupabaseManager {
    if (!SupabaseManager.instance) {
      SupabaseManager.instance = new SupabaseManager();
    }
    return SupabaseManager.instance;
  }

  async start(): Promise<void> {
    if (this.isRunning) {
      console.log('Supabase is already running');
      return;
    }

    try {
      console.log('Starting Supabase...');

      // Check if supabase CLI is installed
      try {
        execSync('supabase --version', { stdio: 'pipe' });
      } catch {
        throw new Error(
          'Supabase CLI is not installed. Please install it first: https://supabase.com/docs/guides/cli'
        );
      }

      // Check if we're in a Supabase project
      const supabaseConfigPath = join(process.cwd(), 'supabase', 'config.toml');
      if (!existsSync(supabaseConfigPath)) {
        throw new Error(
          'Not in a Supabase project. Please run "supabase init" first.'
        );
      }

      // Start Supabase
      execSync('supabase start', {
        stdio: 'inherit',
        cwd: process.cwd(),
      });

      this.isRunning = true;
      // eslint-disable-next-line no-console
      console.log('Supabase started successfully');

      // Wait a bit for services to be ready
      await this.waitForServices();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to start Supabase:', error);
      throw error;
    }
  }

  async stop(): Promise<void> {
    if (!this.isRunning) {
      console.log('Supabase is not running');
      return;
    }

    try {
      // eslint-disable-next-line no-console
      console.log('Stopping Supabase...');

      execSync('supabase stop', {
        stdio: 'inherit',
        cwd: process.cwd(),
      });

      this.isRunning = false;
      // eslint-disable-next-line no-console
      console.log('Supabase stopped successfully');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to stop Supabase:', error);
      throw error;
    }
  }

  private async waitForServices(): Promise<void> {
    // eslint-disable-next-line no-console
    console.log('Waiting for Supabase services to be ready...');

    // Wait for 10 seconds to ensure all services are up
    await new Promise(resolve => setTimeout(resolve, 10000));

    // eslint-disable-next-line no-console
    console.log('Supabase services are ready');
  }

  getStatus(): boolean {
    return this.isRunning;
  }
}

// Global setup and teardown functions
export const globalSetup = async (): Promise<void> => {
  const supabase = SupabaseManager.getInstance();
  await supabase.start();
};

export const globalTeardown = async (): Promise<void> => {
  const supabase = SupabaseManager.getInstance();
  await supabase.stop();
};
