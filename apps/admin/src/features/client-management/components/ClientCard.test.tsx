import React, { JSX } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { ClientCard } from './ClientCard';
import type { Client } from '../types';

// Mock the UI components
vi.mock('../../../components/ui/avatar', () => ({
  Avatar: ({ children }: { children: React.ReactNode }): JSX.Element => (
    <div data-testid="avatar">{children}</div>
  ),
  AvatarFallback: ({
    children,
  }: {
    children: React.ReactNode;
  }): JSX.Element => <div data-testid="avatar-fallback">{children}</div>,
}));

vi.mock('../../../components/ui/badge', () => ({
  Badge: ({
    children,
    variant,
  }: {
    children: React.ReactNode;
    variant?: string;
  }): JSX.Element => (
    <div data-testid={`badge-${variant || 'default'}`}>{children}</div>
  ),
}));

vi.mock('../../../components/ui/button', () => ({
  Button: ({
    children,
    onClick,
    size,
    variant,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    size?: string;
    variant?: string;
  }): JSX.Element => (
    <button data-testid={`button-${variant || 'default'}`} onClick={onClick}>
      {children}
    </button>
  ),
}));

vi.mock('../../../components/ui/card', () => ({
  Card: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }): JSX.Element => (
    <div data-testid="card" className={className}>
      {children}
    </div>
  ),
  CardContent: ({ children }: { children: React.ReactNode }): JSX.Element => (
    <div data-testid="card-content">{children}</div>
  ),
  CardHeader: ({ children }: { children: React.ReactNode }): JSX.Element => (
    <div data-testid="card-header">{children}</div>
  ),
}));

vi.mock('../../../components/ui/progress', () => ({
  Progress: ({ value }: { value: number }): JSX.Element => (
    <div data-testid="progress" data-value={value} />
  ),
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Activity: (): JSX.Element => <div data-testid="activity-icon" />,
  AlertCircle: (): JSX.Element => <div data-testid="alert-circle-icon" />,
  Eye: (): JSX.Element => <div data-testid="eye-icon" />,
  MessageCircle: (): JSX.Element => <div data-testid="message-circle-icon" />,
  Target: (): JSX.Element => <div data-testid="target-icon" />,
  Zap: (): JSX.Element => <div data-testid="zap-icon" />,
}));

describe('ClientCard', () => {
  const mockOnViewClient = vi.fn();
  const mockOnAssignProgram = vi.fn();

  const createMockClient = (overrides: Partial<Client> = {}): Client => ({
    id: '1',
    email: 'test@example.com',
    created_at: '2024-01-01',
    ...overrides,
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders client information correctly', () => {
    const client = createMockClient({
      primary_user_type: 'Premium',
      subscription_tier: 'Pro',
    });

    render(
      <ClientCard
        client={client}
        onViewClient={mockOnViewClient}
        onAssignProgram={mockOnAssignProgram}
      />
    );

    expect(screen.getByText('test@example.com')).toBeDefined();
    expect(screen.getByText('Premium')).toBeDefined();
    expect(screen.getByText('Pro')).toBeDefined();
  });

  it('shows inactive status when onboarding not completed', () => {
    const client = createMockClient({
      profile: {
        id: '1',
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
      },
    });

    render(
      <ClientCard
        client={client}
        onViewClient={mockOnViewClient}
        onAssignProgram={mockOnAssignProgram}
      />
    );

    expect(screen.getByText('Inactive')).toBeDefined();
    expect(screen.getByText('No Program')).toBeDefined();
    expect(screen.getByTestId('target-icon')).toBeDefined();
  });

  it('shows active status when onboarding completed', () => {
    const client = createMockClient({
      profile: {
        id: '1',
        onboarding_completed_at: '2024-01-01',
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
      },
    });

    render(
      <ClientCard
        client={client}
        onViewClient={mockOnViewClient}
        onAssignProgram={mockOnAssignProgram}
      />
    );

    // Use getAllByText to handle multiple "Active" elements
    const activeElements = screen.getAllByText('Active');
    expect(activeElements.length).toBeGreaterThan(0);
    expect(screen.getByTestId('activity-icon')).toBeDefined();
  });

  it('shows at risk status when no workouts completed', () => {
    const client = createMockClient({
      profile: {
        id: '1',
        onboarding_completed_at: '2024-01-01',
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
      },
      stats: {
        user_id: '1',
        total_workouts: 0,
        days_active: 0,
        hours_trained: 0,
        achievements_count: 0,
        last_updated: '2024-01-01',
      },
    });

    render(
      <ClientCard
        client={client}
        onViewClient={mockOnViewClient}
        onAssignProgram={mockOnAssignProgram}
      />
    );

    expect(screen.getByText('At Risk')).toBeDefined();
    expect(screen.getByTestId('alert-circle-icon')).toBeDefined();
  });

  it('displays client stats correctly', () => {
    const client = createMockClient({
      stats: {
        user_id: '1',
        total_workouts: 25,
        days_active: 15,
        hours_trained: 30,
        achievements_count: 5,
        last_updated: '2024-01-01',
      },
    });

    render(
      <ClientCard
        client={client}
        onViewClient={mockOnViewClient}
        onAssignProgram={mockOnAssignProgram}
      />
    );

    expect(screen.getByText('25 workouts')).toBeDefined();
    expect(screen.getByText('15')).toBeDefined();
    expect(screen.getByText('30')).toBeDefined();
    expect(screen.getByText('5')).toBeDefined();
  });

  it('displays client goals when available', () => {
    const client = createMockClient({
      profile: {
        id: '1',
        goals: ['Lose weight', 'Build muscle'],
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
      },
    });

    render(
      <ClientCard
        client={client}
        onViewClient={mockOnViewClient}
        onAssignProgram={mockOnAssignProgram}
      />
    );

    expect(screen.getByText('Goals')).toBeDefined();
    expect(screen.getByText('Lose weight')).toBeDefined();
    expect(screen.getByText('Build muscle')).toBeDefined();
  });

  it('does not display goals section when no goals', () => {
    const client = createMockClient({
      profile: {
        id: '1',
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
      },
    });

    render(
      <ClientCard
        client={client}
        onViewClient={mockOnViewClient}
        onAssignProgram={mockOnAssignProgram}
      />
    );

    expect(screen.queryByText('Goals')).toBeNull();
  });

  it('calls onViewClient when view button is clicked', () => {
    const client = createMockClient();

    render(
      <ClientCard
        client={client}
        onViewClient={mockOnViewClient}
        onAssignProgram={mockOnAssignProgram}
      />
    );

    // Find the view button by looking for the one with "View" text
    const viewButton = screen.getByText('View').closest('button');
    expect(viewButton).toBeDefined();
    if (viewButton) {
      fireEvent.click(viewButton);
    }

    expect(mockOnViewClient).toHaveBeenCalledWith(client);
  });

  it('calls onAssignProgram when assign button is clicked', () => {
    const client = createMockClient();

    render(
      <ClientCard
        client={client}
        onViewClient={mockOnViewClient}
        onAssignProgram={mockOnAssignProgram}
      />
    );

    // Find the assign button by looking for the one with "Assign" text
    const assignButton = screen.getByText('Assign').closest('button');
    expect(assignButton).toBeDefined();
    if (assignButton) {
      fireEvent.click(assignButton);
    }

    expect(mockOnAssignProgram).toHaveBeenCalledWith(client);
  });

  it('shows default values when stats are not available', () => {
    const client = createMockClient();

    render(
      <ClientCard
        client={client}
        onViewClient={mockOnViewClient}
        onAssignProgram={mockOnAssignProgram}
      />
    );

    // Use getAllByText to handle multiple "0" elements
    const zeroElements = screen.getAllByText('0');
    expect(zeroElements.length).toBeGreaterThanOrEqual(3); // Days active, hours trained, achievements
  });

  it('shows free subscription when no tier is assigned', () => {
    const client = createMockClient();

    render(
      <ClientCard
        client={client}
        onViewClient={mockOnViewClient}
        onAssignProgram={mockOnAssignProgram}
      />
    );

    expect(screen.getByText('Free')).toBeDefined();
  });

  it('shows no type assigned when primary_user_type is not set', () => {
    const client = createMockClient();

    render(
      <ClientCard
        client={client}
        onViewClient={mockOnViewClient}
        onAssignProgram={mockOnAssignProgram}
      />
    );

    expect(screen.getByText('No type assigned')).toBeDefined();
  });

  it('calculates progress correctly', () => {
    const client = createMockClient({
      stats: {
        user_id: '1',
        total_workouts: 25,
        days_active: 15,
        hours_trained: 30,
        achievements_count: 5,
        last_updated: '2024-01-01',
      },
    });

    render(
      <ClientCard
        client={client}
        onViewClient={mockOnViewClient}
        onAssignProgram={mockOnAssignProgram}
      />
    );

    const progress = screen.getByTestId('progress');
    expect(progress.getAttribute('data-value')).toBe('50'); // 25/50 * 100 = 50
  });

  it('caps progress at 100%', () => {
    const client = createMockClient({
      stats: {
        user_id: '1',
        total_workouts: 100,
        days_active: 15,
        hours_trained: 30,
        achievements_count: 5,
        last_updated: '2024-01-01',
      },
    });

    render(
      <ClientCard
        client={client}
        onViewClient={mockOnViewClient}
        onAssignProgram={mockOnAssignProgram}
      />
    );

    const progress = screen.getByTestId('progress');
    expect(progress.getAttribute('data-value')).toBe('100');
  });
});
