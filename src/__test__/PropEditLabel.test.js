import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react';

import { PropEditLabel } from '../components/PropEditLabel';

test('PropEditLabel', () => {
  render(
    <PropEditLabel>
      Label Name
      <input type="number" data-testid="input" />
    </PropEditLabel>
  );

  const labelName = screen.getByText('Label Name');
  const input = screen.getByTestId('input');
  expect(input).toBeInTheDocument();

  expect(labelName).toBeInTheDocument();
  expect(input.parentElement).toHaveStyle(`
      display: grid;
      grid-template-columns: 16px 3rem minmax(0,1fr);
      gap: 0.25rem;
      margin: 0.25rem;
    `);
});
