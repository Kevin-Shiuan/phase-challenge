import { Stage } from '@pixi/react';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { activePageState, documentState } from '../../recoil';
import BackgroundSprite from './BackgroundSprite';
import Frame from './Frame';

const PixiWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Pixi = () => {
  const document = useRecoilValue(documentState);
  const page = useRecoilValue(activePageState);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 }); // default stage size
  const sizeRef = useRef();

  // import all the frame state --------------------
  // method before using recoil-nexus, this is not the best way to do it
  // but this could reduce the re-rendering inside the Pixi canvas
  // const frameStates = {};
  // for (let frame of frameStateArr) {
  //   frameStates[frame.id] = useRecoilValue(frame.atom);
  // }
  // -----------------------------------------------

  // useEffect(() => {
  //   console.log('pixi loadeds');
  //   if (sizeRef?.current) {
  //     const sizeRefObserver = new ResizeObserver(() => {
  //       setStageSize({
  //         width: sizeRef.current.offsetWidth,
  //         height: sizeRef.current.offsetHeight,
  //       });
  //     });

  //     sizeRefObserver.observe(sizeRef.current);
  //     return () => {
  //       // Cleanup the observer by unobserving all elements
  //       sizeRefObserver.disconnect();
  //     };
  //   }
  // }, [sizeRef.current]);

  useEffect(() => {
    if (sizeRef?.current) {
      setStageSize({
        width: sizeRef.current.offsetWidth,
        height: sizeRef.current.offsetHeight,
      });
    }
  }, []);

  return (
    <PixiWrapper ref={sizeRef}>
      <Stage
        options={{
          hello: true, // options.hello is used to check if pixi is working
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
    </PixiWrapper>
  );
};

export default Pixi;
