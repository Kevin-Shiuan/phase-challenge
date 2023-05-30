import { useEffect, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Stage, Container, Sprite, Text } from '@pixi/react';
import { Texture } from 'pixi.js';

import { documentState, activePageState, frameSelector } from '../../recoil';
import Frame from './Frame';
import BackgroundSprite from './BackgroundSprite';

const Pixi = () => {
  const document = useRecoilValue(documentState);
  const page = useRecoilValue(activePageState);
  const stageSize = { width: 880, height: 750 };

  // import all the frame state --------------------
  // method before using recoil-nexus, this is not the best way to do it
  // const frameStates = {};
  // for (let frame of frameStateArr) {
  //   frameStates[frame.id] = useRecoilValue(frame.atom);
  // }
  // -----------------------------------------------

  useEffect(() => {
    console.log('pixi refreshed');
  });

  return (
    // options.hello is used to check if pixi is working
    <Stage
      options={{
        hello: true,
        forceCanvas: false,
        backgroundColor: parseInt(document.backgroundColor.slice(1), 16),
      }}
      width={stageSize.width}
      height={stageSize.height}
    >
      {/* render a sprite to detect is user click on background */}
      <BackgroundSprite />
      {page.children.map((frame) => (
        <Frame key={frame} id={frame} />
      ))}
    </Stage>
  );
};

export default Pixi;
