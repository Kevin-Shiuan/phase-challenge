import React from 'react';
import styled from 'styled-components';
import { documentStructure } from '../_mockData/document';
import Element from './Element';

const ElementsWrapper = styled.div``;
const Elements = () => {
  let pageId = 'pageId1';
  const frames = documentStructure.pages.find((page) => pageId === page.id).frames.flat(Infinity);
  console.log(frames);

  return (
    <ElementsWrapper>
      <h4>Elements</h4>
      {frames.map((frame) => (
        <Element key={frame.id} id={frame.id} />
      ))}
    </ElementsWrapper>
  );
};

export default Elements;
