import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
// recoil's state
import Elements from './Elements';
import { frameSelector } from '../recoil';
// components
import Pages from './Pages';

const LeftPanelWrapper = styled.div`
  padding: 8px;
`;
const LeftPanel = () => {
  const unSelect = useSetRecoilState(frameSelector(''));
  return (
    <LeftPanelWrapper onMouseDown={(e) => e.currentTarget === e.target && unSelect()}>
      <Pages />
      <Elements />
    </LeftPanelWrapper>
  );
};

export default LeftPanel;
