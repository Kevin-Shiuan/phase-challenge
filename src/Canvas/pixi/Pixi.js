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
  const stageSize = { width: 800, height: 750 };

  // import all the frame state --------------------
  // method before using recoil-nexus
  // this is not the best way to do it
  // but it works for now
  // because React don't let us propagate parent contexts into child components from a custom renderers.
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
        antialias: true,

      }}
      width={stageSize.width}
      height={stageSize.height}
    >
      {/* render a sprite to detect is user click on background */}
      <BackgroundSprite />
        {page.children.map((frame) => (
          <Frame key={frame} id={frame} />
        ))}
{/* 
        <Container x={40} y={30}>
          <Text text="Hello World" anchor={{ x: 0.5, y: 0.5 }} />
        </Container> */}
    </Stage>
  );
};

export default Pixi;
