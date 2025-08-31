import { expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with testing-library matchers
expect.extend(matchers);

// Add TypeScript declarations
declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElement {}
}

declare module 'vitest' {
  interface Assertion<T> {
    toBeInTheDocument(): T;
    toHaveValue(value: string | number | string[]): T;
    toBeVisible(): T;
    toBeChecked(): T;
    toBeDisabled(): T;
    toBeEnabled(): T;
    toBeEmpty(): T;
    toBeEmptyDOMElement(): T;
    toBeInvalid(): T;
    toBeRequired(): T;
    toBeValid(): T;
    toContainElement(element: Element | null): T;
    toContainHTML(html: string): T;
    toHaveAttribute(attr: string, value?: string): T;
    toHaveClass(...classNames: string[]): T;
    toHaveFocus(): T;
    toHaveFormValues(values: Record<string, string>): T;
    toHaveStyle(css: Record<string, string>): T;
    toHaveTextContent(text: string | RegExp, options?: { normalizeWhitespace: boolean }): T;
  }
}

