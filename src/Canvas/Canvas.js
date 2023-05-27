import React from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
// recoil's state
import { activePageState, frameSelector } from '../recoil';
// components
import Frame from './Frame';

const CanvasWrapper = styled.div`
  position: relative;
  background: white;
  overflow: hidden;
`;

const Canvas = () => {
  const page = useRecoilValue(activePageState);
  const unSelect = useSetRecoilState(frameSelector(''));
  return (
    <CanvasWrapper onMouseDown={(e) => e.currentTarget === e.target && unSelect()}>
      {/* <Frame id={'frameId1'}></Frame> */}
      {page.children.map((frame) => (
        <Frame key={frame} id={frame} />
      ))}
      {/* <Block x={10} y={10} o={1} selected />
      <Block x={60} y={60} o={0.5} />
      <Block x={110} y={110} o={1} /> */}
    </CanvasWrapper>
  );
};

export default Canvas;
