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
  background: rgba(${(props) => props.r}, ${(props) => props.g}, ${(props) => props.b}, ${(props) => props.o});
  outline: ${(props) => (props.selected ? 2 : 0)}px solid #0274ff;
`;

const Frame = ({ id }) => {
  // recoil
  // get the state of the desire frame
  const frame = useRecoilValue(frameState(id));
  // update function to update the active frame
  const updateSlectedFrame = useSetRecoilState(frameSelector(id));

  return (
    <Block {...frame} {...hexToRgb(frame.fill)} onClick={() => updateSlectedFrame()}>
      {frame.childrenIds.length ? frame.childrenIds.map((childId) => <Frame key={childId} id={childId} />) : null}
    </Block>
  );
};

export default Frame;

function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  // var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  // hex = hex.replace(shorthandRegex, function(m, r, g, b) {
  //   return r + r + g + g + b + b;
  // });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}
