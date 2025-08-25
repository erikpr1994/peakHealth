import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { AuthCard, Button, Input, FormGroup, Divider, Link } from './AuthCard';

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations:
    (): ((key: string) => string) =>
    (key: string): string =>
      key,
  useLocale: (): string => 'en',
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: (): { push: ReturnType<typeof vi.fn> } => ({
    push: vi.fn(),
  }),
  useSearchParams: (): URLSearchParams => new URLSearchParams(),
}));

describe('AuthCard Components', (): void => {
  describe('AuthCard', (): void => {
    it('renders with title and subtitle', (): void => {
      render(
        <AuthCard title="Test Title" subtitle="Test Subtitle">
          <div>Test content</div>
        </AuthCard>
      );

      expect(screen.getByText('Test Title')).toBeDefined();
      expect(screen.getByText('Test Subtitle')).toBeDefined();
      expect(screen.getByText('Test content')).toBeDefined();
    });

    it('renders without subtitle', (): void => {
      render(
        <AuthCard title="Test Title">
          <div>Test content</div>
        </AuthCard>
      );

      expect(screen.getByText('Test Title')).toBeDefined();
      expect(screen.getByText('Test content')).toBeDefined();
    });

    it('renders with full-width variant', (): void => {
      render(
        <AuthCard title="Test Title" variant="full-width">
          <div>Test content</div>
        </AuthCard>
      );

      expect(screen.getByText('Test Title')).toBeDefined();
      expect(screen.getByText('Test content')).toBeDefined();
    });
  });

  describe('Button', (): void => {
    it('renders button with default props', (): void => {
      render(<Button>Test Button</Button>);

      const button = screen.getByRole('button', { name: 'Test Button' });
      expect(button).toBeDefined();
    });

    it('renders button with custom variant and size', (): void => {
      render(
        <Button variant="secondary" size="lg">
          Test Button
        </Button>
      );

      const button = screen.getByRole('button', { name: 'Test Button' });
      expect(button).toBeDefined();
    });

    it('renders disabled button', (): void => {
      render(<Button disabled>Disabled Button</Button>);

      const button = screen.getByRole('button', { name: 'Disabled Button' });
      expect(button).toBeDefined();
    });
  });

  describe('Input', (): void => {
    it('renders input with default props', (): void => {
      render(<Input placeholder="Test input" />);

      const input = screen.getByPlaceholderText('Test input');
      expect(input).toBeDefined();
    });

    it('renders input with error state', (): void => {
      render(<Input placeholder="Test input" error />);

      const input = screen.getByPlaceholderText('Test input');
      expect(input).toBeDefined();
    });
  });

  describe('FormGroup', (): void => {
    it('renders form group with label and children', (): void => {
      render(
        <FormGroup label="Test Label">
          <input placeholder="Test input" />
        </FormGroup>
      );

      expect(screen.getByText('Test Label')).toBeDefined();
      expect(screen.getByPlaceholderText('Test input')).toBeDefined();
    });

    it('renders form group with error', (): void => {
      render(
        <FormGroup label="Test Label" error="Test error">
          <input placeholder="Test input" />
        </FormGroup>
      );

      expect(screen.getByText('Test Label')).toBeDefined();
      expect(screen.getByText('Test error')).toBeDefined();
      expect(screen.getByPlaceholderText('Test input')).toBeDefined();
    });
  });

  describe('Divider', (): void => {
    it('renders divider with default text', (): void => {
      render(<Divider />);

      expect(screen.getByText('or')).toBeDefined();
    });

    it('renders divider with custom text', (): void => {
      render(<Divider text="Custom Divider" />);

      expect(screen.getByText('Custom Divider')).toBeDefined();
    });
  });

  describe('Link', (): void => {
    it('renders link with href and children', (): void => {
      render(<Link href="/test">Test Link</Link>);

      const link = screen.getByRole('link', { name: 'Test Link' });
      expect(link).toBeDefined();
    });

    it('renders link with custom className', (): void => {
      render(
        <Link href="/test" className="custom-class">
          Test Link
        </Link>
      );

      const link = screen.getByRole('link', { name: 'Test Link' });
      expect(link).toBeDefined();
    });
  });
});
