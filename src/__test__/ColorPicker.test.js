import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import ColorPicker from '../rightPanel/ColorPicker';

describe('ColorPicker', () => {
  it('should render the label and initial color value', () => {
    render(<ColorPicker labelName="B" value="#ff0000" handleChange={() => {}} />);
    expect(screen.getByText(/B/)).toBeInTheDocument();
    expect(screen.getByDisplayValue('#ff0000')).toBeInTheDocument();
  });

  it('should update the color value when changed', () => {
    const handleChange = jest.fn();
    render(<ColorPicker labelName="Color" value="#ff0000" handleChange={handleChange} />);

    fireEvent.change(screen.getByDisplayValue('#ff0000'), { target: { value: '#00ff00' } });

    expect(handleChange).toHaveBeenCalledWith({ key: 'fill', value: '#00ff00' });
  });
});
