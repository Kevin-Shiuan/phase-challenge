import { Sprite, useTick } from '@pixi/react';
import { Texture } from 'pixi.js';
import { getRecoil, setRecoil } from 'recoil-nexus';
import { frameState } from '../../recoil';
import { useState } from 'react';

export const Frame = ({ id }) => {
  const [frame, setFrame] = useState(getRecoil(frameState(id)));
  // continuously check for changes in frame
  useTick(() => {
    setFrame(getRecoil(frameState(id)));
  });

  return (
    <Sprite
      texture={Texture.WHITE}
      tint={frame.fill}
      x={frame.position.x}
      y={frame.position.y}
      anchor={{ x: 0.5, y: 0.5 }}
      width={frame.size.width}
      height={frame.size.height}
    />
  );
};

export default Frame;
