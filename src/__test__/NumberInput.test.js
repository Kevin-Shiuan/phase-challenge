import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import NumberInput from '../rightPanel/NumberInput';

describe('NumberInput', () => {
  it('renders with default value', () => {
    render(<NumberInput labelName="Test Label" propertyKey="testKey" />);
    const input = screen.getByLabelText('Test Label');
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('0');
  });

  it('renders with min and max values', () => {
    render(<NumberInput labelName="Test Label" propertyKey="testKey" min={1} max={10} />);
    const input = screen.getByLabelText('Test Label');
    expect(input).toBeInTheDocument();
    expect(input.min).toBe('1');
    expect(input.max).toBe('10');
  });

  it('calls handleChange on blur', () => {
    const handleChange = jest.fn();
    render(<NumberInput labelName="Test Label" propertyKey="testKey" handleChange={handleChange} />);
    fireEvent.blur(screen.getByLabelText('Test Label'), { target: { value: '5' } });
    expect(handleChange).toHaveBeenCalledWith({ testKey: '5' });
  });

  it('calls handleChange on enter keydown', () => {
    const handleChange = jest.fn();
    render(<NumberInput labelName="Test Label" propertyKey="testKey" handleChange={handleChange} />);
    fireEvent.keyDown(screen.getByLabelText('Test Label'), { key: 'Enter', target: { value: '5' } });
    expect(handleChange).toHaveBeenCalledWith({ testKey: '5' });
  });
});
