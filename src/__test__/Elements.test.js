import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import Elements from '../leftPanel/Elements';

describe('Elements', () => {
  it('renders the list of frames', () => {
    const activePage = {
      children: ['frame1', 'frame2'],
    };
    render(
      <RecoilRoot>
        <Elements />
      </RecoilRoot>,
      { initialState: { activePageState: activePage } }
    );

    expect(screen.getByText('Elements')).toBeInTheDocument();
    expect(screen.getByText('frame1')).toBeInTheDocument();
    expect(screen.getByText('frame2')).toBeInTheDocument();
  });
});
