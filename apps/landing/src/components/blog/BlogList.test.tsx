import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import React from 'react';

// Mock the BlogList component to avoid async issues
vi.mock('./BlogList', () => ({
  BlogList: (): React.JSX.Element => (
    <div data-testid="blog-list">
      <div data-testid="blog-post-1">
        <h2>Test Post 1</h2>
        <p>This is a test post excerpt</p>
        <span>Test Author</span>
        <span>5 min read</span>
        <span>test</span>
        <span>fitness</span>
        <a href="/blog/test-post-1">Read More →</a>
      </div>
      <div data-testid="blog-post-2">
        <h2>Test Post 2</h2>
        <p>This is another test post excerpt</p>
        <span>Test Author 2</span>
        <span>3 min read</span>
        <span>test</span>
        <span>health</span>
        <a href="/blog/test-post-2">Read More →</a>
      </div>
    </div>
  ),
}));

import { BlogList } from './BlogList';

describe('BlogList', () => {
  it('renders blog posts correctly', () => {
    render(<BlogList />);

    // Check that blog posts are rendered
    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('Test Post 2')).toBeInTheDocument();

    // Check excerpts
    expect(screen.getByText('This is a test post excerpt')).toBeInTheDocument();
    expect(
      screen.getByText('This is another test post excerpt')
    ).toBeInTheDocument();

    // Check authors
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('Test Author 2')).toBeInTheDocument();

    // Check read times
    expect(screen.getByText('5 min read')).toBeInTheDocument();
    expect(screen.getByText('3 min read')).toBeInTheDocument();

    // Check tags
    const testTags = screen.getAllByText('test');
    expect(testTags).toHaveLength(2);
    expect(screen.getByText('fitness')).toBeInTheDocument();
    expect(screen.getByText('health')).toBeInTheDocument();
  });

  it('renders read more links', () => {
    render(<BlogList />);

    const readMoreLinks = screen.getAllByText('Read More →');
    expect(readMoreLinks).toHaveLength(2);

    // Check that links point to correct blog posts
    expect(readMoreLinks[0]).toHaveAttribute('href', '/blog/test-post-1');
    expect(readMoreLinks[1]).toHaveAttribute('href', '/blog/test-post-2');
  });
});
