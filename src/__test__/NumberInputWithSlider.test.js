import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import NumberInputWithSlider from '../rightPanel/NumberInputWithSlider';

describe('NumberInputWithSlider', () => {
  it('renders the label and input elements', () => {
    render(<NumberInputWithSlider labelName="Test Label" propertyKey="testKey" />);

    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('calls the handleChange function when input value changes', () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(
      <NumberInputWithSlider labelName="Test Label" propertyKey="testKey" handleChange={handleChange} />
    );

    fireEvent.blur(getByLabelText('Test Label'), { target: { value: '50' } });
    expect(handleChange).toHaveBeenCalledWith({ key: 'testKey', value: '0.50' });
  });

  it('calls the handleChange function when enter keydown', () => {
    const handleChange = jest.fn();
    render(<NumberInputWithSlider labelName="Test Label" propertyKey="testKey" handleChange={handleChange} />);

    fireEvent.keyDown(screen.getByLabelText('Test Label'), { key: 'Enter', target: { value: '50' } });
    expect(handleChange).toHaveBeenCalledWith({ key: 'testKey', value: '0.50' });
  });

  it('calls the handleChange function when slider value changes', () => {
    const handleChange = jest.fn();
    render(<NumberInputWithSlider labelName="Test Label" propertyKey="testKey" handleChange={handleChange} />);

    fireEvent.change(screen.getByRole('slider'), { target: { value: '50' } });
    expect(handleChange).toHaveBeenCalledWith({ key: 'testKey', value: '0.50' });
  });
});
