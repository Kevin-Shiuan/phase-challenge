import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import ColorPicker from './ColorPicker';
import { useRecoilState, useRecoilValue } from 'recoil';
import { activeFrameIdState, frameState } from '../recoil';
const RightPanelWrapper = styled.div`
  padding: 8px;
`;
const Label = styled.label`
  display: grid;
  grid-template-columns: 16px auto minmax(0, 1fr);
  grid-gap: 8px;
`;

const RightPanel = () => {
  const activeFrameId = useRecoilValue(activeFrameIdState);
  return !!activeFrameId ? <RightPanelForm id={activeFrameId} /> : null;
};

const RightPanelForm = ({ id }) => {
  const [frame, setFrame] = useRecoilState(frameState(id));

  // set ref to the input in order to update the value
  const XRef = useRef();
  const YRef = useRef();
  // update the value of the input either when the frame position changes or another frame is selected
  useEffect(() => {
    XRef.current.value = frame.position.x;
    YRef.current.value = frame.position.y;
  }, [frame]);

  const handleChange = (properties) => {
    Object.entries(properties).forEach(([key, value]) => {
      console.log(frame[key]);
      // value !=='' cant validate for empty position.x or position.y
      // improve: should use other method to check
      if (frame[key] !== value && value !== '') {
        // improve: should validate the value
        setFrame({ ...frame, ...properties });
      }
    });
  };

  return (
    <RightPanelWrapper>
      <Label>
        X{' '}
        <input
          type="number"
          ref={XRef}
          min={0}
          max={999}
          defaultValue={0}
          onBlur={(e) => handleChange({ position: { x: e.target.value, y: YRef.current.value } })}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleChange({ position: { x: e.target.value, y: YRef.current.value } });
          }}
        />
      </Label>
      <Label>
        Y{' '}
        <input
          type="number"
          ref={YRef}
          min={0}
          max={999}
          defaultValue={0}
          onBlur={(e) => handleChange({ position: { x: XRef.current.value, y: e.target.value } })}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleChange({ position: { x: XRef.current.value, y: e.target.value } });
          }}
        />
      </Label>
      <Opacity value={frame.o} handleChange={handleChange} />
      <Label>
        B <ColorPicker value={frame.fill} handleChange={handleChange} /> {frame.fill}
      </Label>
    </RightPanelWrapper>
  );
};

const Opacity = ({ value, handleChange }) => {
  const handleChangeOpacity = (e) => {
    handleChange({ o: (e.target.value / 100).toFixed(2) });
  };
  return (
    <Label>
      O{' '}
      <input
        type="number"
        min={0}
        max={100}
        value={value * 100}
        onChange={(e) => {
          handleChangeOpacity(e);
        }}
      />
      <input
        type="range"
        min={0}
        max={100}
        value={value * 100}
        onChange={(e) => {
          handleChangeOpacity(e);
        }}
      />
    </Label>
  );
};

export default RightPanel;
