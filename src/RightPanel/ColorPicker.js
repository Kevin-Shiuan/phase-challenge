import React, { useRef, useEffect } from "react";
import styled from "styled-components";

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
  type: "color"
};
const ColorPicker = () => {
  const ref = useRef();
  const inputRef = useRef();
  useEffect(() => {
    ref.current.style.background = inputRef.current.value;
  }, []);
  return (
    <ColorPickerWrapper ref={ref}>
      <ColorInput value="#00FF00" ref={inputRef} />
    </ColorPickerWrapper>
  );
};

export default ColorPicker;
