import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import ColorPicker from '../rightPanel/ColorPicker';

describe('ColorPicker', () => {
  it('should render the label and initial color value', () => {
    const { getByText, getByDisplayValue } = render(
      <ColorPicker labelName="B" value="#ff0000" handleChange={() => {}} />
    );
    expect(getByText(/B/)).toBeInTheDocument();
    expect(getByDisplayValue('#ff0000')).toBeInTheDocument();
  });

  it('should update the color value when changed', () => {
    const handleChange = jest.fn();
    const { getByDisplayValue } = render(<ColorPicker labelName="Color" value="#ff0000" handleChange={handleChange} />);
    const input = getByDisplayValue('#ff0000');

    fireEvent.change(input, { target: { value: '#00ff00' } });

    expect(handleChange).toHaveBeenCalledWith({ key: 'fill', value: '#00ff00' });
  });
});
