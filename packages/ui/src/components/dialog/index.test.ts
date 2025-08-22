import { describe, it, expect } from 'vitest';
import { Dialog, DialogFooter } from './dialog';

describe('Dialog exports', () => {
  it('exports Dialog component', () => {
    expect(Dialog).toBeDefined();
    expect(typeof Dialog).toBe('object');
  });

  it('exports DialogFooter component', () => {
    expect(DialogFooter).toBeDefined();
    expect(typeof DialogFooter).toBe('object');
  });
});
