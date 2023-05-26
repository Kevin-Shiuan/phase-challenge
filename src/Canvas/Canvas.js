import React from 'react';
import styled from 'styled-components';
// data
import { documentStructure } from '../_mockData/document';
// redux
// import { useSelector } from 'react-redux';
// components
import Frame from './Frame';
// import { selectPage } from '../redux/activePageSlice';

const CanvasWrapper = styled.div`
  position: relative;
  background: white;
  overflow: hidden;
`;

const Canvas = () => {
  let pageId = 'pageId1';
  const frames = documentStructure.pages.find((page) => pageId === page.id).frames.flat(Infinity);

  return (
    <CanvasWrapper>
      {/* <Frame id={'frameId1'}></Frame> */}
      {frames.map((frame) => (
        <Frame key={frame.id} id={frame.id} />
      ))}
      {/* <Block x={10} y={10} o={1} active />
      <Block x={60} y={60} o={0.5} />
      <Block x={110} y={110} o={1} /> */}
    </CanvasWrapper>
  );
};

export default Canvas;
