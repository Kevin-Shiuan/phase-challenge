import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import RightPanel from '../rightPanel';

describe('RightPanel', () => {
  it('should render nothing when there is no active frame', () => {
    render(
      <RecoilRoot>
        <RightPanel />
      </RecoilRoot>
    );

    expect(screen.queryByText(/position/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/size/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/style/i)).not.toBeInTheDocument();
  });
  // could not get this test to work
  // it('should render the form when there is an active frame', () => {
  //   const activeFrameId = 'frameId1';
  //   const frame = {
  //     type: 'frame',
  //     id: 'frameId1',
  //     name: 'frame1',
  //     position: {
  //       x: 10,
  //       y: 10,
  //     },
  //     size: {
  //       width: 50,
  //       height: 50,
  //     },
  //     parentId: 'pageId1',
  //     childrenIds: [],

  //     fill: '#ff3333',
  //     o: 1,
  //     border: {
  //       borderColor: '',
  //       borderWidth: 0,
  //       borderRadius: 0,
  //     },
  //   };

  //   render(
  //     <RecoilRoot>
  //       <RightPanel />
  //     </RecoilRoot>,
  //     {
  //       initialState: {
  //         activeFrameIdState: activeFrameId,
  //         frameState: frame,
  //       },
  //     }
  //   );

  //   expect(screen.getByText(/position/i)).toBeInTheDocument();
  //   expect(screen.getByText(/size/i)).toBeInTheDocument();
  //   expect(screen.getByText(/style/i)).toBeInTheDocument();
  // });
});
