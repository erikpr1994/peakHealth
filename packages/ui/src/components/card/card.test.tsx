import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';

describe('Card', () => {
  it('renders the Card component with content', () => {
    render(
      <Card>
        <div>Card Content</div>
      </Card>
    );
    expect(screen.getByText('Card Content')).toBeInTheDocument();
    expect(screen.getByText('Card Content').parentElement).toHaveClass('peakhealth-card');
  });

  it('applies additional className to Card', () => {
    render(
      <Card className="custom-class">
        <div>Card Content</div>
      </Card>
    );
    expect(screen.getByText('Card Content').parentElement).toHaveClass('custom-class');
  });

  it('renders CardHeader component', () => {
    render(
      <Card>
        <CardHeader>
          <div>Header Content</div>
        </CardHeader>
      </Card>
    );
    expect(screen.getByText('Header Content')).toBeInTheDocument();
    expect(screen.getByText('Header Content').parentElement).toHaveClass('peakhealth-card__header');
  });

  it('renders CardTitle component', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
      </Card>
    );
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Title')).toHaveClass('peakhealth-card__title');
  });

  it('renders CardDescription component', () => {
    render(
      <Card>
        <CardHeader>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
      </Card>
    );
    expect(screen.getByText('Card Description')).toBeInTheDocument();
    expect(screen.getByText('Card Description')).toHaveClass('peakhealth-card__description');
  });

  it('renders CardContent component', () => {
    render(
      <Card>
        <CardContent>
          <div>Content Area</div>
        </CardContent>
      </Card>
    );
    expect(screen.getByText('Content Area')).toBeInTheDocument();
    expect(screen.getByText('Content Area').parentElement).toHaveClass('peakhealth-card__content');
  });

  it('renders CardFooter component', () => {
    render(
      <Card>
        <CardFooter>
          <div>Footer Content</div>
        </CardFooter>
      </Card>
    );
    expect(screen.getByText('Footer Content')).toBeInTheDocument();
    expect(screen.getByText('Footer Content').parentElement).toHaveClass('peakhealth-card__footer');
  });

  it('renders a complete card with all components', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Complete Card</CardTitle>
          <CardDescription>This is a complete card example</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Main content goes here</p>
        </CardContent>
        <CardFooter>
          <button>Action Button</button>
        </CardFooter>
      </Card>
    );
    
    expect(screen.getByText('Complete Card')).toBeInTheDocument();
    expect(screen.getByText('This is a complete card example')).toBeInTheDocument();
    expect(screen.getByText('Main content goes here')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action Button' })).toBeInTheDocument();
  });
});

