import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

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
ColorInput.defaultProps = {
  type: 'color',
};
const ColorPicker = ({ value, handleChange }) => {
  const ref = useRef();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.value = value;
    ref.current.style.background = inputRef.current.value;
  }, [value]);

  return (
    <ColorPickerWrapper ref={ref}>
      <ColorInput defaultValue={value} ref={inputRef} onChange={(e) => handleChange({fill: e.target.value})} />
    </ColorPickerWrapper>
  );
};

export default ColorPicker;
