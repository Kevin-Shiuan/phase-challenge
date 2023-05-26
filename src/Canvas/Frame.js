import React from 'react';
import styled from 'styled-components';
import {  useSetRecoilState, useRecoilValue } from 'recoil';
import { frameStates, frameSelectorState } from '../recoil';

const Block = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  left: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
  opacity: ${(props) => props.o};
  background: green;
  outline: ${(props) => (props.active ? 1 : 0)}px solid #0274ff;
`;

const Frame = ({ id }) => {
  // recoil
  // get the state of the desire frame
  const frame = useRecoilValue(frameStates.find((frame) => frame.id === id).atom);
  // update function to update the active frame
  const updateSlectedFrame = useSetRecoilState(frameSelectorState(id));

  return (
    <Block
      {...frame}
      onClick={(e) => {
        // setNewActiveFrame(id);
        updateSlectedFrame();
      }}
    >
      {frame.childrenIds.length
        ? frame.childrenIds.map((childId) => <Frame key={childId} id={childId} />)
        : null}
    </Block>
  );
};

export default Frame;
