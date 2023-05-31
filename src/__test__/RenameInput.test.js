import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { RenameInput } from '../components/RenameInput';

test('RenameInput', () => {
  render(<RenameInput />);
  const input = screen.getByRole('textbox');
  expect(input).toBeInTheDocument();
  expect(input).toHaveStyle(`
        background-color: transparent;
        border-radius: 0.25rem;
        outline: 2px solid;
        outline-offset: 0.25rem;
        font-size: 1rem;
        font-family: inherit;
        color: inherit;
        width: 100%;
        box-sizing: border-box;
    `);
});
