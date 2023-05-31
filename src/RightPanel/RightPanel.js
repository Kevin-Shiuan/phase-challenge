import { useEffect, useRef } from 'react';
import ColorPicker from './ColorPicker';
import { useRecoilState, useRecoilValue } from 'recoil';
import { activeFrameIdState, frameState } from '../recoil';
import NumberInput from './NumberInput';
import NumberInputWithSlider from './NumberInputWithSlider';

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
    // check if the value is different from the current value
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
    <div className='p-1'>
      <div className="mb-4">
        <p>position</p>
        <NumberInput labelName="X" propertyKey="x" handleChange={handlePositionChange} ref={XRef} />
        <NumberInput labelName="Y" propertyKey="y" handleChange={handlePositionChange} ref={YRef} />
      </div>
      <div className="mb-4">
        <p>size</p>
        <NumberInput labelName="W" propertyKey="width" handleChange={handleSizeChange} ref={WRef} />
        <NumberInput labelName="H" propertyKey="height" handleChange={handleSizeChange} ref={HRef} />
      </div>
      <div className="mb-4">
        <p>style</p>
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
      </div>
    </div>
  );
};

export default RightPanel;
