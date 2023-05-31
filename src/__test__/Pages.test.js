import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import Pages from '../leftPanel/Pages';

describe('Pages', () => {
  it('renders the page names', () => {
    const document = {
      pageIds: ['pageId1', 'pageId2'],
    };
    render(
      <RecoilRoot>
        <Pages />
      </RecoilRoot>,
      { initialState: { documentState: document } }
    );

    expect(screen.getByText('Pages')).toBeInTheDocument();
    expect(screen.getByText('Page 1')).toBeInTheDocument();
    expect(screen.getByText('Page 2')).toBeInTheDocument();
  });
});
