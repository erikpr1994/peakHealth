import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { setTimeout as wait } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';

import { test, expect } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runNode(scriptRelPath: string): Promise<void> {
  const scriptPath = path.resolve(__dirname, '../../..', scriptRelPath);
  await new Promise<void>((resolve, reject) => {
    const repoRoot = path.resolve(__dirname, '../../..');
    const p = spawn(process.execPath, [scriptPath], {
      stdio: 'inherit',
      cwd: repoRoot,
      env: { ...process.env, SKIP_DB_RESET: '1' },
    });
    p.on('exit', (code: number | null) =>
      code === 0
        ? resolve()
        : reject(new Error(`${scriptRelPath} exited with ${code}`))
    );
  });
}

test('seed dev DB and create storage states', async ({ browser }) => {
  test.setTimeout(300_000);
  await wait(2000);

  await runNode('scripts/setup-dev-db.mjs');

  const email = 'erikpastorrios1994@gmail.com';
  const password = 'password123';
  await mkdir('storage-states', { recursive: true });

  // Create storageState for the web app (3001) via App Selector
  {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('http://localhost:3000/login');
    await page.getByPlaceholder('Enter your email').fill(email);
    await page.getByPlaceholder('Enter your password').fill(password);
    await page.getByRole('button', { name: /sign in|log in/i }).click();
    // Wait for app selector to render
    await page.waitForURL('**/app-selector', { timeout: 60_000 });
    await expect(page.getByText(/Choose\s*Your\s*App/i)).toBeVisible();
    // Click Web app card via test id
    await page.getByTestId('app-card-web').click();
    await page.waitForURL('http://localhost:3001/**', { timeout: 60_000 });
    await expect(page).toHaveURL(/localhost:3001/);
    await context.storageState({ path: 'storage-states/web.json' });
    await context.close();
  }

  // Create storageState for the admin app (3002) via App Selector
  {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('http://localhost:3000/login');
    await page.getByPlaceholder('Enter your email').fill(email);
    await page.getByPlaceholder('Enter your password').fill(password);
    await page.getByRole('button', { name: /sign in|log in/i }).click();
    await page.waitForURL('**/app-selector', { timeout: 60_000 });
    await expect(page.getByText(/Choose\s*Your\s*App/i)).toBeVisible();
    // Click Admin app card via test id
    await page.getByTestId('app-card-admin').click();
    await page.waitForURL('http://localhost:3002/**', { timeout: 60_000 });
    await expect(page).toHaveURL(/localhost:3002/);
    await context.storageState({ path: 'storage-states/admin.json' });
    await context.close();
  }
});
