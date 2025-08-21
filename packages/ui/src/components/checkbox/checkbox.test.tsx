import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './checkbox';

describe('Checkbox', () => {
  it('renders unchecked by default', () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    expect(checkbox).toHaveClass('peakhealth-checkbox');
  });

  it('renders with label when children are provided', () => {
    render(<Checkbox>Checkbox Label</Checkbox>);
    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByText('Checkbox Label');
    
    expect(checkbox).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(label.parentElement).toHaveClass('peakhealth-checkbox__container');
  });

  it('renders in checked state when defaultChecked is true', () => {
    render(<Checkbox defaultChecked />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('renders in checked state when checked prop is true', () => {
    render(<Checkbox checked />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('renders in disabled state', () => {
    render(<Checkbox disabled />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('applies additional className', () => {
    render(<Checkbox className="custom-class" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass('custom-class');
  });

  it('calls onChange handler when clicked', async () => {
    const handleChange = vi.fn();
    render(<Checkbox onChange={handleChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('does not call onChange when disabled', async () => {
    const handleChange = vi.fn();
    render(<Checkbox onChange={handleChange} disabled />);
    
    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('toggles checked state when clicked (uncontrolled)', async () => {
    render(<Checkbox />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    
    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('renders with required attribute', () => {
    render(<Checkbox required />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('required');
  });

  it('renders with name attribute', () => {
    render(<Checkbox name="test-checkbox" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('name', 'test-checkbox');
  });
});

