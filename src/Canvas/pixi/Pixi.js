import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Stage, Container, Sprite, Text } from '@pixi/react';
import { Texture } from 'pixi.js';

import {
  documentState,
  activePageState,
  frameStateArr,
} from '../../recoil';
import Frame from './Frame';

const Pixi = () => {
  const document = useRecoilValue(documentState);
  const page = useRecoilValue(activePageState);

  // import all the frame state
  // this is not the best way to do it
  // but it works for now
  // because React don't let us propagate parent contexts into child components from a custom renderers.
  const frameStates = {};
  for (let frame of frameStateArr) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    frameStates[frame.id] = useRecoilValue(frame.atom);
  }

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
      width={800}
      height={750}
      raf={false}
      renderOnComponentChange={true}
    >
      <Container interactive={true}>
        {/* <Sprite image="https://pixijs.io/pixi-react/img/bunny.png" x={400} y={270} anchor={{ x: 0.5, y: 0.5 }} /> */}
        {/* <Sprite texture={Texture.WHITE} x={400} y={270} anchor={{ x: 0.5, y: 0.5 }} /> */}
        <Sprite texture={Texture.WHITE} tint={'#00FF00'} x={100} y={100} anchor={{ x: 0.5, y: 0.5 }} />
        {page.children.map((frame, index) => (
          <Frame key={frame} frame={frameStates[frame]} />
        ))}

        <Container x={40} y={30}>
          <Text text="Hello World" anchor={{ x: 0.5, y: 0.5 }} />
        </Container>
      </Container>
    </Stage>
  );
};

export default Pixi;
