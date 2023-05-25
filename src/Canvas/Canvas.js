import React from "react";
import styled from "styled-components";

const CanvasWrapper = styled.div`
  position: relative;
  background: white;
  overflow: hidden;
`;

const Block = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  opacity: ${(props) => props.o};
  background: green;
  outline: ${(props) => (props.active ? 1 : 0)}px solid #0274ff;
`;

const Canvas = () => {
  return (
    <CanvasWrapper>
      <Block x={10} y={10} o={1} active />
      <Block x={60} y={60} o={0.5} />
      <Block x={110} y={110} o={1} />
    </CanvasWrapper>
  );
};

export default Canvas;
