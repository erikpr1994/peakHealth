import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '../../../test/test-utils';
import React from 'react';

// Mock the BlogList component to avoid async issues
vi.mock('@/components/blog/BlogList', () => ({
  BlogList: (): React.JSX.Element => (
    <div data-testid="blog-list">Blog List Component</div>
  ),
}));

// Mock the BlogHeader component
vi.mock('@/components/blog/BlogHeader', () => ({
  BlogHeader: ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }): React.JSX.Element => (
    <div data-testid="blog-header">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  ),
}));

import BlogPage from './page';

describe('BlogPage', () => {
  it('renders the blog page with correct content', () => {
    render(<BlogPage />);

    // Check for main title
    expect(screen.getByText('Peak Health Blog')).toBeInTheDocument();

    // Check for description
    expect(
      screen.getByText(
        /Fitness tips, workout guides, and health insights from our experts/
      )
    ).toBeInTheDocument();

    // Check that components are rendered
    expect(screen.getByTestId('blog-header')).toBeInTheDocument();
    expect(screen.getByTestId('blog-list')).toBeInTheDocument();
  });
});
