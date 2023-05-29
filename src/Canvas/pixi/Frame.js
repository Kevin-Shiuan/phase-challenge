import React, { useEffect, useMemo, useState } from 'react';
import { Stage, Container, Sprite, Text, useTick } from '@pixi/react';
import { Texture } from 'pixi.js';
import { useSetRecoilState, useRecoilValue, RecoilRoot } from 'recoil';
import { frameSelector, frameState } from '../../recoil';
// import { useApp } from '@pixi/react';
let i = 0;

const Frame = ({ frame }) => {
  //   const app = useApp();
//   const [rotation, setRotation] = useState(0);

  // recoil
  // get the state of the desire frame
  // const frame = useRecoilValue(frameState(id));
  console.log('frame refreshed');
  // update function to update the active frame
  // const updateSlectedFrame = useSetRecoilState(frameSelector(id));
//   useTick((delta) => {
//     i += 0.05 * delta;
//     setRotation(-10 + Math.sin(i / 10 + Math.PI * 2) * 10);
//   });
  return (
    <Sprite
      texture={Texture.WHITE}
      tint={frame.fill}
      x={frame.position.x}
      y={frame.position.y}
      anchor={{ x: 0.5, y: 0.5 }}
      width={frame.size.width}
      height={frame.size.height}
    //   rotation={rotation}
    />
  );
};

export default Frame;
