import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './input';

describe('Input', () => {
  it('renders a basic input element', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('peakhealth-input');
  });

  it('applies additional className', () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });

  it('renders with placeholder text', () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
  });

  it('renders in disabled state', () => {
    render(<Input disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('renders with error state', () => {
    render(<Input error />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('peakhealth-input--error');
  });

  it('renders with different types', () => {
    const { rerender } = render(<Input type="email" />);
    let input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');

    rerender(<Input type="password" />);
    input = screen.getByLabelText('');
    expect(input).toHaveAttribute('type', 'password');

    rerender(<Input type="number" />);
    input = screen.getByLabelText('');
    expect(input).toHaveAttribute('type', 'number');
  });

  it('handles value changes', async () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'test input');
    
    expect(handleChange).toHaveBeenCalledTimes(10); // One call per character
  });

  it('does not allow typing when disabled', async () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} disabled />);
    
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'test input');
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('renders with default value', () => {
    render(<Input defaultValue="Default text" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Default text');
  });

  it('renders with controlled value', () => {
    render(<Input value="Controlled text" onChange={() => {}} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Controlled text');
  });

  it('renders with required attribute', () => {
    render(<Input required />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('required');
  });

  it('renders with name attribute', () => {
    render(<Input name="test-input" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('name', 'test-input');
  });
});

