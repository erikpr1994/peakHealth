import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './select';

describe('Select', () => {
  it('renders a basic select element', () => {
    render(
      <Select>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </Select>
    );
    
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveClass('peakhealth-select');
    
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(2);
    expect(options[0]).toHaveTextContent('Option 1');
    expect(options[1]).toHaveTextContent('Option 2');
  });

  it('applies additional className', () => {
    render(
      <Select className="custom-class">
        <option value="option1">Option 1</option>
      </Select>
    );
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('custom-class');
  });

  it('renders with placeholder', () => {
    render(
      <Select placeholder="Select an option">
        <option value="option1">Option 1</option>
      </Select>
    );
    
    const select = screen.getByRole('combobox');
    const placeholderOption = screen.getByText('Select an option');
    
    expect(placeholderOption).toBeInTheDocument();
    expect(placeholderOption).toHaveAttribute('value', '');
    expect(placeholderOption).toHaveAttribute('disabled');
    expect(placeholderOption).toHaveAttribute('selected');
  });

  it('renders in disabled state', () => {
    render(
      <Select disabled>
        <option value="option1">Option 1</option>
      </Select>
    );
    
    const select = screen.getByRole('combobox');
    expect(select).toBeDisabled();
  });

  it('renders with error state', () => {
    render(
      <Select error>
        <option value="option1">Option 1</option>
      </Select>
    );
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('peakhealth-select--error');
  });

  it('handles value changes', async () => {
    const handleChange = vi.fn();
    render(
      <Select onChange={handleChange}>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </Select>
    );
    
    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, 'option2');
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(select).toHaveValue('option2');
  });

  it('does not allow selection when disabled', async () => {
    const handleChange = vi.fn();
    render(
      <Select onChange={handleChange} disabled>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </Select>
    );
    
    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, 'option2');
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('renders with default value', () => {
    render(
      <Select defaultValue="option2">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </Select>
    );
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('option2');
  });

  it('renders with controlled value', () => {
    render(
      <Select value="option2" onChange={() => {}}>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </Select>
    );
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('option2');
  });

  it('renders with required attribute', () => {
    render(
      <Select required>
        <option value="option1">Option 1</option>
      </Select>
    );
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('required');
  });

  it('renders with name attribute', () => {
    render(
      <Select name="test-select">
        <option value="option1">Option 1</option>
      </Select>
    );
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('name', 'test-select');
  });

  it('renders with option groups', () => {
    render(
      <Select>
        <optgroup label="Group 1">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </optgroup>
        <optgroup label="Group 2">
          <option value="option3">Option 3</option>
          <option value="option4">Option 4</option>
        </optgroup>
      </Select>
    );
    
    const optgroups = screen.getAllByRole('group');
    expect(optgroups).toHaveLength(2);
    expect(optgroups[0]).toHaveAttribute('label', 'Group 1');
    expect(optgroups[1]).toHaveAttribute('label', 'Group 2');
    
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(4);
  });
});

