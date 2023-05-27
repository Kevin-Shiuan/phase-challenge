import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { frameSelector, frameState } from '../recoil';

const Block = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  left: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
  opacity: ${(props) => props.o};
  background: green;
  outline: ${(props) => (props.selected ? 1 : 0)}px solid #0274ff;
`;

const Frame = ({ id }) => {
  // recoil
  // get the state of the desire frame
  const frame = useRecoilValue(frameState(id));
  // update function to update the active frame
  const updateSlectedFrame = useSetRecoilState(frameSelector(id));

  return (
    <Block {...frame} onClick={() => updateSlectedFrame()}>
      {frame.childrenIds.length ? frame.childrenIds.map((childId) => <Frame key={childId} id={childId} />) : null}
    </Block>
  );
};

export default Frame;
