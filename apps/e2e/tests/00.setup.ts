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

test('seed dev DB', async () => {
  test.setTimeout(300_000);
  await wait(2000);

  await runNode('scripts/setup-dev-db.mjs');
  await mkdir('storage-states', { recursive: true });
});
