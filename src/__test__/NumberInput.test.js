import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import NumberInput from '../rightPanel/NumberInput';

describe('NumberInput', () => {
  it('renders with default value', () => {
    const { getByLabelText } = render(<NumberInput labelName="Test Label" propertyKey="testKey" />);
    const input = getByLabelText('Test Label');
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('0');
  });

  it('renders with min and max values', () => {
    const { getByLabelText } = render(<NumberInput labelName="Test Label" propertyKey="testKey" min={1} max={10} />);
    const input = getByLabelText('Test Label');
    expect(input).toBeInTheDocument();
    expect(input.min).toBe('1');
    expect(input.max).toBe('10');
  });

  it('calls handleChange on blur', () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(
      <NumberInput labelName="Test Label" propertyKey="testKey" handleChange={handleChange} />
    );
    fireEvent.blur(getByLabelText('Test Label'), { target: { value: '5' } });
    expect(handleChange).toHaveBeenCalledWith({ testKey: '5' });
  });

  it('calls handleChange on enter keydown', () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(
      <NumberInput labelName="Test Label" propertyKey="testKey" handleChange={handleChange} />
    );
    fireEvent.keyDown(getByLabelText('Test Label'), { key: 'Enter', target: { value: '5' } });
    expect(handleChange).toHaveBeenCalledWith({ testKey: '5' });
  });
});
