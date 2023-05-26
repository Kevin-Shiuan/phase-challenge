import React from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { frameStates, frameSelectorState } from '../recoil';

const Element = ({ id }) => {
  // recoil
  // get the state of the desire frame
  const frame = useRecoilValue(frameStates.find((frame) => frame.id === id).atom);
  // update function to update the active frame
  const updateSlectedFrame = useSetRecoilState(frameSelectorState(id));

  return (
    <div key={frame.id} id={frame.id}>
      {frame.active ? <strong>{frame.name}</strong> : frame.name}
    </div>
  );
};

export default Element;
