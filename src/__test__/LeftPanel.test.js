import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import LeftPanel from '../LeftPanel';

describe('LeftPanel', () => {
  it('renders Pages and Elements components', () => {
    
    render(
      <RecoilRoot>
        <LeftPanel />
      </RecoilRoot>
    );

    expect(screen.getByText('Pages')).toBeInTheDocument();
    expect(screen.getByText('Elements')).toBeInTheDocument();
  });
});
