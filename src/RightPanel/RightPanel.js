import React, { useRef } from 'react';
import styled from 'styled-components';
import ColorPicker from './ColorPicker';
import { useRecoilState, useRecoilValue } from 'recoil';
import { activeFrameState, frameStates } from '../recoil';
const RightPanelWrapper = styled.div`
  padding: 8px;
`;
const Label = styled.label`
  display: grid;
  grid-template-columns: 16px auto minmax(0, 1fr);
  grid-gap: 8px;
`;

const RightPanelControl = () => {
  const activeFrameId = useRecoilValue(activeFrameState);
  return !!activeFrameId ? <RightPanel id={activeFrameId} /> : null;
};

const RightPanel = ({ id }) => {
  const [frame, setFrame] = useRecoilState(frameStates.find((frame) => frame.id === id)?.atom);

  // const X = useRef();
  // const Y = useRef();
  // const OText = useRef();
  // const OSlider = useRef();
  // const B = useRef();

  const handleChange = () => {
    // better to validate before updating
    // setFrame({ ...frame, position: { x: X.current.value, y: Y.current.value }, o: OText.current.value / 100 });
    console.log();
  };

  return (
    <RightPanelWrapper>
      <Label>
        X{' '}
        <input
          type="number"
          min={0}
          max={999}
          defaultValue={frame.position.x}
          onBlur={handleChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleChange();
          }}
        />
      </Label>
      <Label>
        Y{' '}
        <input
          type="number"
          min={0}
          max={999}
          defaultValue={frame.position.y}
          onBlur={handleChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleChange();
          }}
        />
      </Label>
      <Label>
        O{' '}
        <input
          type="number"
          min={0}
          max={100}
          defaultValue={frame.o}
          onBlur={handleChange}
        />
        <input type="range" min={0} max={100} defaultValue={frame.o} />
      </Label>
      <Label>
        B <ColorPicker value={frame.fill} /> {frame.fill}
      </Label>
    </RightPanelWrapper>
  );
};

export default RightPanelControl;
