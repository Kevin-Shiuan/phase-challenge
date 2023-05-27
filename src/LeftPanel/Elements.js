import React from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
// import styled from 'styled-components';
import { frameState, frameSelector, activePageState } from '../recoil';

// const ElementsWrapper = styled.div``;
const Elements = () => {
  const page = useRecoilValue(activePageState);

  return (
    <div>
      <h4>Elements</h4>
      {page.children.map((frame) => (
        <Element key={frame} id={frame} />
      ))}
    </div>
  );
};

const Element = ({ id }) => {
  // recoil
  // get the state of the desire frame
  const frame = useRecoilValue(frameState(id));

  // update function to update the selected frame
  const updateSlectedFrame = useSetRecoilState(frameSelector(id));

  return (
    <div onClick={() => updateSlectedFrame()} style={{ padding: '0.5rem' }}>
      {frame.selected ? <strong>{frame.name}</strong> : frame.name}
    </div>
  );
};

export default Elements;
