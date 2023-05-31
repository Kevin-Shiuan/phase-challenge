import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import NumberInputWithSlider from '../rightPanel/NumberInputWithSlider';

describe('NumberInputWithSlider', () => {
  it('renders the label and input elements', () => {
    const { getByText, getByRole, getByLabelText } = render(<NumberInputWithSlider labelName="Test Label" propertyKey="testKey" />);

    expect(getByText('Test Label')).toBeInTheDocument();
    const input = getByLabelText('Test Label');
    expect(input).toBeInTheDocument();
    expect(getByRole('slider')).toBeInTheDocument();
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
    const {  getByLabelText } = render(
      <NumberInputWithSlider labelName="Test Label" propertyKey="testKey" handleChange={handleChange} />
    );

    fireEvent.keyDown(getByLabelText('Test Label'), { key: 'Enter', target: { value: '50' } });
    expect(handleChange).toHaveBeenCalledWith({ key: 'testKey', value: '0.50' });
  });

  it('calls the handleChange function when slider value changes', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(
      <NumberInputWithSlider labelName="Test Label" propertyKey="testKey" handleChange={handleChange} />
    );

    fireEvent.change(getByRole('slider'), { target: { value: '50' } });
    expect(handleChange).toHaveBeenCalledWith({ key: 'testKey', value: '0.50' });
  });
});
