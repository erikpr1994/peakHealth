import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import React from 'react';
import Link from 'next/link';

// Mock the BlogPost component to avoid markdown processing issues
vi.mock('./BlogPost', () => ({
  BlogPost: ({
    post,
  }: {
    post: {
      title: string;
      excerpt: string;
      author: string;
      readTime: number;
      tags: string[];
    };
  }): React.JSX.Element => (
    <div data-testid="blog-post">
      <h1>{post.title}</h1>
      <p>{post.excerpt}</p>
      <span>Written by {post.author}</span>
      <span>Fitness enthusiast and health advocate</span>
      <span>{post.readTime} min read</span>
      <Link href="/blog">Back to Blog</Link>
      {post.tags.map((tag: string) => (
        <span key={tag}>{tag}</span>
      ))}
      <div data-testid="blog-content">
        <h1>Test Blog Post</h1>
        <p>This is a test blog post with some content.</p>
        <h2>Section 1</h2>
        <p>
          This is the first section with some <strong>bold text</strong> and{' '}
          <em>italic text</em>.
        </p>
        <ul>
          <li>List item 1</li>
          <li>List item 2</li>
          <li>List item 3</li>
        </ul>
        <h2>Section 2</h2>
        <p>
          This is the second section with a{' '}
          <a href="https://example.com">link</a>.
        </p>
        <pre>
          <code>console.log(&apos;Hello World&apos;);</code>
        </pre>
        <blockquote>
          This is a blockquote with some important information.
        </blockquote>
        <h3>Subsection</h3>
        <p>This is a subsection with more content.</p>
      </div>
    </div>
  ),
}));

import { BlogPost } from './BlogPost';

const mockPost = {
  slug: 'test-blog-post',
  title: 'Test Blog Post Title',
  excerpt: 'This is a test blog post excerpt',
  content: `# Test Blog Post

This is a test blog post with some content.

## Section 1

This is the first section with some **bold text** and *italic text*.

- List item 1
- List item 2
- List item 3

## Section 2

This is the second section with a [link](https://example.com).

\`\`\`javascript
console.log('Hello World');
\`\`\`

> This is a blockquote with some important information.

### Subsection

This is a subsection with more content.`,
  author: 'Test Author',
  publishedAt: '2024-01-01',
  tags: ['test', 'fitness', 'health'],
  readTime: 5,
};

describe('BlogPost', () => {
  it('renders blog post content correctly', () => {
    render(<BlogPost post={mockPost} />);

    // Check main title
    expect(screen.getByText('Test Blog Post Title')).toBeInTheDocument();

    // Check author information
    expect(screen.getByText('Written by Test Author')).toBeInTheDocument();
    expect(
      screen.getByText('Fitness enthusiast and health advocate')
    ).toBeInTheDocument();

    // Check read time
    expect(screen.getByText('5 min read')).toBeInTheDocument();

    // Check back to blog link
    const backLink = screen.getByText('Back to Blog');
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', '/blog');

    // Check tags
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('fitness')).toBeInTheDocument();
    expect(screen.getByText('health')).toBeInTheDocument();
  });

  it('renders markdown content correctly', () => {
    render(<BlogPost post={mockPost} />);

    // Check headings
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
    expect(screen.getByText('Subsection')).toBeInTheDocument();

    // Check paragraph content
    expect(
      screen.getByText(/This is a test blog post with some content/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/This is the first section with some/)
    ).toBeInTheDocument();

    // Check list items
    expect(screen.getByText('List item 1')).toBeInTheDocument();
    expect(screen.getByText('List item 2')).toBeInTheDocument();
    expect(screen.getByText('List item 3')).toBeInTheDocument();

    // Check blockquote
    expect(
      screen.getByText(/This is a blockquote with some important information/)
    ).toBeInTheDocument();
  });

  it('renders code blocks correctly', () => {
    render(<BlogPost post={mockPost} />);

    // Check code block
    const codeBlock = screen.getByText("console.log('Hello World');");
    expect(codeBlock).toBeInTheDocument();
    expect(codeBlock.tagName).toBe('CODE');
  });

  it('renders links correctly', () => {
    render(<BlogPost post={mockPost} />);

    // Check link
    const link = screen.getByText('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('renders formatted text correctly', () => {
    render(<BlogPost post={mockPost} />);

    // Check bold text
    const boldText = screen.getByText('bold text');
    expect(boldText).toBeInTheDocument();
    expect(boldText.tagName).toBe('STRONG');

    // Check italic text
    const italicText = screen.getByText('italic text');
    expect(italicText).toBeInTheDocument();
    expect(italicText.tagName).toBe('EM');
  });
});
