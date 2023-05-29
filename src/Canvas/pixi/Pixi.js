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
  // const updateSlectedFrame = (id)=>useSetRecoilState(frameSelector(id));

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

  const stageSize = { width: 800, height: 750 };

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
      // raf={true}
      // renderOnComponentChange={true}
      // onClick={(e) => {
      //   console.log(e.currentTarget, e.target);
      // }} 
    >
      {/* render a sprite to detect is user click on background */}
      <BackgroundSprite />
      {/* <Container eventMode="static" onclick={(e)=>{
        console.log(e.currentTarget, e.target);
        handleFrameSelect('')}}> */}
        {/* <Sprite image="https://pixijs.io/pixi-react/img/bunny.png" x={400} y={270} anchor={{ x: 0.5, y: 0.5 }} /> */}
        {/* <Sprite texture={Texture.WHITE} x={400} y={270} anchor={{ x: 0.5, y: 0.5 }} /> */}
        {/* <Sprite texture={Texture.WHITE} tint={'#00FF00'} x={0} y={0} width={app.screen.width} height={app.screen.height}/> */}
        {page.children.map((frame) => (
          <Frame key={frame} id={frame} />
        ))}

        <Container x={40} y={30}>
          <Text text="Hello World" anchor={{ x: 0.5, y: 0.5 }} />
        </Container>
      {/* </Container> */}
    </Stage>
  );
};

export default Pixi;
