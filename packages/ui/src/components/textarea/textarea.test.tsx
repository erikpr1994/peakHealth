import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from './textarea';

describe('Textarea', () => {
  it('renders a basic textarea element', () => {
    render(<Textarea />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveClass('peakhealth-textarea');
  });

  it('applies additional className', () => {
    render(<Textarea className="custom-class" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('custom-class');
  });

  it('renders with placeholder text', () => {
    render(<Textarea placeholder="Enter text" />);
    const textarea = screen.getByPlaceholderText('Enter text');
    expect(textarea).toBeInTheDocument();
  });

  it('renders in disabled state', () => {
    render(<Textarea disabled />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
  });

  it('renders with error state', () => {
    render(<Textarea error />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('peakhealth-textarea--error');
  });

  it('renders with specified number of rows', () => {
    render(<Textarea rows={10} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '10');
  });

  it('handles value changes', async () => {
    const handleChange = vi.fn();
    render(<Textarea onChange={handleChange} />);
    
    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, 'test input');
    
    expect(handleChange).toHaveBeenCalledTimes(10); // One call per character
  });

  it('does not allow typing when disabled', async () => {
    const handleChange = vi.fn();
    render(<Textarea onChange={handleChange} disabled />);
    
    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, 'test input');
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('renders with default value', () => {
    render(<Textarea defaultValue="Default text" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('Default text');
  });

  it('renders with controlled value', () => {
    render(<Textarea value="Controlled text" onChange={() => {}} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('Controlled text');
  });

  it('renders with required attribute', () => {
    render(<Textarea required />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('required');
  });

  it('renders with name attribute', () => {
    render(<Textarea name="test-textarea" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('name', 'test-textarea');
  });

  it('renders with maxLength attribute', () => {
    render(<Textarea maxLength={100} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('maxLength', '100');
  });

  it('renders with minLength attribute', () => {
    render(<Textarea minLength={10} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('minLength', '10');
  });

  it('renders with resize attribute', () => {
    render(<Textarea resize="none" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveStyle('resize: none');
  });

  it('handles onFocus and onBlur events', async () => {
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();
    
    render(<Textarea onFocus={handleFocus} onBlur={handleBlur} />);
    
    const textarea = screen.getByRole('textbox');
    await userEvent.click(textarea);
    expect(handleFocus).toHaveBeenCalledTimes(1);
    
    await userEvent.tab();
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });
});

