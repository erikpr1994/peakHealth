import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { setTimeout as wait } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';

import { test } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runNode(scriptRelPath: string): Promise<void> {
  const scriptPath = path.resolve(__dirname, '../../..', scriptRelPath);
  await new Promise<void>((resolve, reject) => {
    const p = spawn(process.execPath, [scriptPath], { stdio: 'inherit' });
    p.on('exit', (code: number | null) =>
      code === 0
        ? resolve()
        : reject(new Error(`${scriptRelPath} exited with ${code}`))
    );
  });
}

test('seed dev DB and create storage states', async ({ browser }) => {
  await wait(2000);

  await runNode('scripts/setup-dev-db.mjs');

  const email = 'erikpastorrios1994@gmail.com';
  const password = 'password123';
  await mkdir('storage-states', { recursive: true });

  // Create storageState for the web app (3001)
  {
    const context = await browser.newContext();
    const page = await context.newPage();
    const webRedirect =
      'http://localhost:3000/login?redirect=http://localhost:3001';
    await page.goto(webRedirect);
    await page.getByPlaceholder('Enter your email').fill(email);
    await page.getByPlaceholder('Enter your password').fill(password);
    await page.getByRole('button', { name: /sign in|log in/i }).click();
    await page.waitForLoadState('networkidle');
    await page.goto('http://localhost:3001/dashboard');
    await context.storageState({ path: 'storage-states/web.json' });
    await context.close();
  }

  // Create storageState for the admin app (3002)
  {
    const context = await browser.newContext();
    const page = await context.newPage();
    const adminRedirect =
      'http://localhost:3000/login?redirect=http://localhost:3002';
    await page.goto(adminRedirect);
    await page.getByPlaceholder('Enter your email').fill(email);
    await page.getByPlaceholder('Enter your password').fill(password);
    await page.getByRole('button', { name: /sign in|log in/i }).click();
    await page.waitForLoadState('networkidle');
    await page.goto('http://localhost:3002/dashboard');
    await context.storageState({ path: 'storage-states/admin.json' });
    await context.close();
  }
});
