import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { selectFrame } from '../recoil';
// recoil's state
import Elements from './Elements';
// components
import Pages from './Pages';

const LeftPanelWrapper = styled.div`
  padding: 8px;
`;
const LeftPanel = () => {
  const unSelect = useSetRecoilState(selectFrame(''));
  return (
    <LeftPanelWrapper onMouseDown={(e) => e.currentTarget === e.target && unSelect()}>
      <Pages />
      <Elements />
    </LeftPanelWrapper>
  );
};

export default LeftPanel;
