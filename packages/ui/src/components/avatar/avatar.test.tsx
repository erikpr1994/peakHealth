import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar, AvatarImage, AvatarFallback } from './avatar';

describe('Avatar', () => {
  it('renders with default size', () => {
    render(<Avatar data-testid="avatar" />);
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveClass('peakhealth-avatar');
    expect(avatar).toHaveClass('peakhealth-avatar--size-md');
  });

  it('renders with small size', () => {
    render(<Avatar size="sm" data-testid="avatar" />);
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveClass('peakhealth-avatar--size-sm');
  });

  it('renders with large size', () => {
    render(<Avatar size="lg" data-testid="avatar" />);
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveClass('peakhealth-avatar--size-lg');
  });

  it('applies additional className', () => {
    render(<Avatar className="custom-class" data-testid="avatar" />);
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveClass('custom-class');
  });
});

describe('AvatarImage', () => {
  it('renders correctly', () => {
    render(
      <AvatarImage src="/test.jpg" alt="Test" data-testid="avatar-image" />
    );
    const image = screen.getByTestId('avatar-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass('peakhealth-avatar__image');
    expect(image).toHaveAttribute('src', '/test.jpg');
    expect(image).toHaveAttribute('alt', 'Test');
  });

  it('applies additional className', () => {
    render(
      <AvatarImage
        src="/test.jpg"
        className="custom-class"
        data-testid="avatar-image"
      />
    );
    const image = screen.getByTestId('avatar-image');
    expect(image).toHaveClass('custom-class');
  });

  it('provides a default empty alt if none is provided', () => {
    render(<AvatarImage src="/test.jpg" data-testid="avatar-image" />);
    const image = screen.getByTestId('avatar-image');
    expect(image).toHaveAttribute('alt', '');
  });
});

describe('AvatarFallback', () => {
  it('renders correctly', () => {
    render(<AvatarFallback data-testid="avatar-fallback">JD</AvatarFallback>);
    const fallback = screen.getByTestId('avatar-fallback');
    expect(fallback).toBeInTheDocument();
    expect(fallback).toHaveClass('peakhealth-avatar__fallback');
    expect(fallback).toHaveTextContent('JD');
  });

  it('applies additional className', () => {
    render(
      <AvatarFallback className="custom-class" data-testid="avatar-fallback">
        JD
      </AvatarFallback>
    );
    const fallback = screen.getByTestId('avatar-fallback');
    expect(fallback).toHaveClass('custom-class');
  });
});

describe('Avatar composition', () => {
  it('renders a complete avatar with image', () => {
    render(
      <Avatar data-testid="avatar">
        <AvatarImage src="/test.jpg" alt="Test" data-testid="avatar-image" />
      </Avatar>
    );

    expect(screen.getByTestId('avatar')).toBeInTheDocument();
    expect(screen.getByTestId('avatar-image')).toBeInTheDocument();
  });

  it('renders a complete avatar with fallback', () => {
    render(
      <Avatar data-testid="avatar">
        <AvatarFallback data-testid="avatar-fallback">JD</AvatarFallback>
      </Avatar>
    );

    expect(screen.getByTestId('avatar')).toBeInTheDocument();
    expect(screen.getByTestId('avatar-fallback')).toBeInTheDocument();
  });

  it('renders a complete avatar with image and fallback', () => {
    render(
      <Avatar data-testid="avatar">
        <AvatarImage src="/test.jpg" alt="Test" data-testid="avatar-image" />
        <AvatarFallback data-testid="avatar-fallback">JD</AvatarFallback>
      </Avatar>
    );

    expect(screen.getByTestId('avatar')).toBeInTheDocument();
    expect(screen.getByTestId('avatar-image')).toBeInTheDocument();
    expect(screen.getByTestId('avatar-fallback')).toBeInTheDocument();
  });
});
