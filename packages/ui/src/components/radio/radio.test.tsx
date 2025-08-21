import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Radio, RadioGroup } from './radio';

describe('Radio', () => {
  it('renders a basic radio input', () => {
    render(<Radio name="test" value="option1" />);
    const radio = screen.getByRole('radio');
    expect(radio).toBeInTheDocument();
    expect(radio).toHaveClass('peakhealth-radio');
    expect(radio).not.toBeChecked();
  });

  it('renders with label when children are provided', () => {
    render(<Radio name="test" value="option1">Radio Label</Radio>);
    const radio = screen.getByRole('radio');
    const label = screen.getByText('Radio Label');
    
    expect(radio).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(label.parentElement).toHaveClass('peakhealth-radio__container');
  });

  it('renders in checked state when defaultChecked is true', () => {
    render(<Radio name="test" value="option1" defaultChecked />);
    const radio = screen.getByRole('radio');
    expect(radio).toBeChecked();
  });

  it('renders in checked state when checked prop is true', () => {
    render(<Radio name="test" value="option1" checked />);
    const radio = screen.getByRole('radio');
    expect(radio).toBeChecked();
  });

  it('renders in disabled state', () => {
    render(<Radio name="test" value="option1" disabled />);
    const radio = screen.getByRole('radio');
    expect(radio).toBeDisabled();
  });

  it('applies additional className', () => {
    render(<Radio name="test" value="option1" className="custom-class" />);
    const radio = screen.getByRole('radio');
    expect(radio).toHaveClass('custom-class');
  });

  it('calls onChange handler when clicked', async () => {
    const handleChange = vi.fn();
    render(<Radio name="test" value="option1" onChange={handleChange} />);
    
    const radio = screen.getByRole('radio');
    await userEvent.click(radio);
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('does not call onChange when disabled', async () => {
    const handleChange = vi.fn();
    render(<Radio name="test" value="option1" onChange={handleChange} disabled />);
    
    const radio = screen.getByRole('radio');
    await userEvent.click(radio);
    
    expect(handleChange).not.toHaveBeenCalled();
  });
});

describe('RadioGroup', () => {
  it('renders a group of radio buttons', () => {
    render(
      <RadioGroup 
        name="test-group" 
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' }
        ]} 
      />
    );
    
    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons).toHaveLength(3);
    
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('sets the correct default value', () => {
    render(
      <RadioGroup 
        name="test-group" 
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' }
        ]}
        defaultValue="option2"
      />
    );
    
    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons[0]).not.toBeChecked();
    expect(radioButtons[1]).toBeChecked();
    expect(radioButtons[2]).not.toBeChecked();
  });

  it('calls onChange handler when selection changes', async () => {
    const handleChange = vi.fn();
    render(
      <RadioGroup 
        name="test-group" 
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' }
        ]}
        onChange={handleChange}
      />
    );
    
    const radioButtons = screen.getAllByRole('radio');
    await userEvent.click(radioButtons[1]);
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({ value: 'option2' })
    }));
  });

  it('renders with disabled state for all radios', () => {
    render(
      <RadioGroup 
        name="test-group" 
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' }
        ]}
        disabled
      />
    );
    
    const radioButtons = screen.getAllByRole('radio');
    radioButtons.forEach(radio => {
      expect(radio).toBeDisabled();
    });
  });

  it('renders with individual disabled options', () => {
    render(
      <RadioGroup 
        name="test-group" 
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2', disabled: true },
          { value: 'option3', label: 'Option 3' }
        ]}
      />
    );
    
    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons[0]).not.toBeDisabled();
    expect(radioButtons[1]).toBeDisabled();
    expect(radioButtons[2]).not.toBeDisabled();
  });
});

