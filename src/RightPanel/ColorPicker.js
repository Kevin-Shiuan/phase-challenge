import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { PropEditLabel } from '../components/PropEditLabel';

const ColorPickerWrapper = styled.div`
  width: 16px;
  height: 16px;
  align-self: center;
  overflow: hidden;
`;
const ColorInput = styled.input`
  opacity: 0;
  display: block;
  width: 32px;
  height: 32px;
  border: none;
`;
// overide the style
const ColorPickerLabel = styled(PropEditLabel)`
  grid-template-columns: 16px auto minmax(0, 1fr);
`;

ColorInput.defaultProps = {
  type: 'color',
};
const ColorPicker = ({ labelName, value, handleChange }) => {
  const ref = useRef();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.value = value;
    ref.current.style.background = inputRef.current.value;
  }, [value]);

  return (
    <ColorPickerLabel>
      {labelName}
      <ColorPickerWrapper ref={ref}>
        <ColorInput
          defaultValue={value}
          ref={inputRef}
          onChange={(e) => handleChange({ key: 'fill', value: e.target.value })}
        />
      </ColorPickerWrapper>
      {value}
    </ColorPickerLabel>
  );
};

export default ColorPicker;
