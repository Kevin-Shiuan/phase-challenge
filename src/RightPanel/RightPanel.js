import { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { activeFrameIdState, frameState } from '../recoil';
import ColorPicker from './ColorPicker';
import NumberInput from './NumberInput';
import NumberInputWithSlider from './NumberInputWithSlider';

const RightPanelWrapper = styled.div`
  padding: 0.25rem;
`;

const RightPanelSection = styled.div`
  margin-bottom: 1rem;
`;

const SectionName = styled.h4`
  margin-left: 0.25rem;
  margin-bottom: 0.25rem;
`;

const RightPanel = () => {
  const activeFrameId = useRecoilValue(activeFrameIdState);
  return activeFrameId ? <RightPanelForm id={activeFrameId} /> : null;
};

const RightPanelForm = ({ id }) => {
  const [frame, setFrame] = useRecoilState(frameState(id));

  // set ref to the input in order to update the value
  const XRef = useRef();
  const YRef = useRef();
  const ORef = useRef();
  const WRef = useRef();
  const HRef = useRef();

  // update the value of the input either when the frame position changes or another frame is selected
  useEffect(() => {
    XRef.current.value = frame.position.x;
    YRef.current.value = frame.position.y;
    ORef.current.value = Math.round(frame.o * 100);
    WRef.current.value = frame.size.width;
    HRef.current.value = frame.size.height;
  }, [frame]);

  const handlePropertyChange = ({ key, value }) => {
    // improve: should validate the value
    if (frame[key] !== value) setFrame({ ...frame, [key]: value });
  };

  const handlePositionChange = ({ x, y }) => {
    if (frame.position.x !== x && !isNaN(x)) {
      setFrame({ ...frame, position: { ...frame.position, x: x } });
    }
    if (frame.position.y !== y && !isNaN(y)) {
      setFrame({ ...frame, position: { ...frame.position, y: y } });
    }
  };

  const handleSizeChange = ({ width, height }) => {
    if (frame.size.width !== width && !isNaN(width)) {
      setFrame({ ...frame, size: { ...frame.size, width: width } });
    }
    if (frame.size.height !== height && !isNaN(height)) {
      setFrame({ ...frame, size: { ...frame.size, height: height } });
    }
  };

  return (
    <RightPanelWrapper>
      <RightPanelSection>
        <SectionName>position</SectionName>
        <NumberInput labelName="X" propertyKey="x" handleChange={handlePositionChange} ref={XRef} />
        <NumberInput labelName="Y" propertyKey="y" handleChange={handlePositionChange} ref={YRef} />
      </RightPanelSection>
      <RightPanelSection>
        <SectionName>size</SectionName>
        <NumberInput labelName="W" propertyKey="width" handleChange={handleSizeChange} ref={WRef} />
        <NumberInput labelName="H" propertyKey="height" handleChange={handleSizeChange} ref={HRef} />
      </RightPanelSection>
      <RightPanelSection>
        <SectionName>style</SectionName>
        <NumberInputWithSlider
          labelName="O"
          propertyKey="o"
          handleChange={handlePropertyChange}
          value={frame.o}
          ref={ORef}
          min={0}
          max={100}
        />
        <ColorPicker labelName={'B'} value={frame.fill} handleChange={handlePropertyChange} />
      </RightPanelSection>
    </RightPanelWrapper>
  );
};

export default RightPanel;
