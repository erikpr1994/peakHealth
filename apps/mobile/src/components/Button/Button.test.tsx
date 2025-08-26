import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(<Button>Test Button</Button>);
    
    const buttonText = getByText('Test Button');
    expect(buttonText).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button onPress={onPressMock}>Press Me</Button>
    );
    
    const button = getByText('Press Me');
    fireEvent.press(button);
    
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('renders disabled state correctly', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button onPress={onPressMock} disabled>Disabled Button</Button>
    );
    
    const button = getByText('Disabled Button');
    fireEvent.press(button);
    
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('renders loading state correctly', () => {
    const { getByTestId, queryByText } = render(
      <Button loading>Loading Button</Button>
    );
    
    expect(getByTestId('button-loading-indicator')).toBeTruthy();
    expect(queryByText('Loading Button')).toBeNull();
  });

  it('applies variant styles correctly', () => {
    const { getByText, rerender } = render(
      <Button variant="primary">Primary Button</Button>
    );
    
    let button = getByText('Primary Button').parent;
    expect(button).toHaveStyle({ backgroundColor: '#3B82F6' });
    
    rerender(<Button variant="secondary">Secondary Button</Button>);
    button = getByText('Secondary Button').parent;
    expect(button).toHaveStyle({ backgroundColor: '#6B7280' });
    
    rerender(<Button variant="success">Success Button</Button>);
    button = getByText('Success Button').parent;
    expect(button).toHaveStyle({ backgroundColor: '#10B981' });
  });
});

