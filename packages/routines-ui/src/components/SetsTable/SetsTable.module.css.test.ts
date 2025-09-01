import { describe, it, expect } from 'vitest';
import styles from './SetsTable.module.css';

describe('SetsTable.module.css', () => {
  it('exports expected CSS class names', () => {
    expect(styles).toBeDefined();
    expect(typeof styles.container).toBe('string');
    expect(typeof styles.header).toBe('string');
    expect(typeof styles.addButton).toBe('string');
    expect(typeof styles.table).toBe('string');
  });
});
