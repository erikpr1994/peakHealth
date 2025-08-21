import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useRouter } from 'next/navigation';

import { Sidebar } from './Sidebar';

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(() => '/dashboard'),
}));

// Mock auth context
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: vi.fn(() => ({
    logout: vi.fn(),
    user: {
      email: 'test@example.com',
      user_metadata: {
        display_name: 'Test User',
      },
      app_metadata: {
        primary_user_type: 'Admin',
      },
    },
  })),
}));

// Mock navigation config
vi.mock('../../lib/navigation-config', () => ({
  navigationSections: [
    {
      id: 'test-section',
      title: 'Test Section',
      items: [
        {
          id: 'test-item',
          label: 'Test Item',
          path: '/test',
          icon: () => <span>Test Icon</span>,
        },
      ],
    },
  ],
}));

describe('Sidebar', () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    (useRouter as any).mockReturnValue({
      push: mockPush,
    });
  });

  it('renders sidebar with Peak Health branding', () => {
    render(<Sidebar />);

    expect(screen.getByText('Peak Health')).toBeInTheDocument();
    expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
  });

  it('renders user information', () => {
    render(<Sidebar />);

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

  it('renders navigation items', () => {
    render(<Sidebar />);

    expect(screen.getByText('Test Section')).toBeInTheDocument();
    expect(screen.getByText('Test Item')).toBeInTheDocument();
  });
});
