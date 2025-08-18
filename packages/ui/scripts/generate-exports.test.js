import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

describe('Generate Exports Script', () => {
  it('should generate exports.json file', () => {
    const exportsPath = resolve(__dirname, '../exports.json');
    expect(existsSync(exportsPath)).toBe(true);
  });

  it('should have valid JSON structure', () => {
    const exportsPath = resolve(__dirname, '../exports.json');
    const exportsContent = readFileSync(exportsPath, 'utf8');
    const exports = JSON.parse(exportsContent);

    expect(typeof exports).toBe('object');
    expect(exports).toHaveProperty('.');
  });
});
