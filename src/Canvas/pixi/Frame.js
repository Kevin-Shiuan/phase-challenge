import { Sprite, useTick } from '@pixi/react';
import { Texture } from 'pixi.js';
import { getRecoil } from 'recoil-nexus';
import { frameState } from '../../recoil';
import { useRef, useState } from 'react';
import { handleFrameSelect, handleFrameUpdate } from '../../recoil/pixiUtils';

export const Frame = ({ id }) => {
  // get initial frame state
  const initialFrame = getRecoil(frameState(id));
  const [frame, setFrame] = useState(initialFrame);
  // setup refs
  let dragging = useRef(false);
  let dragEvent = useRef(null);
  let dragOffset = useRef({ x: 0, y: 0 });

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
      // anchor={{ x: 0.5, y: 0.5 }}
      width={frame.size.width}
      height={frame.size.height}
      eventMode="static"
      onclick={(e) => {
        // console.log('frame clicked');
        handleFrameSelect(id);
      }}
      onmousedown={(e) => {
        handleFrameSelect(id);
        if (!dragging.current) {
          dragging.current = true;
          dragEvent.current = e;
          dragOffset.current = {
            x: e.getLocalPosition(e.currentTarget.parent).x - frame.position.x,
            y: e.getLocalPosition(e.currentTarget.parent).y - frame.position.y,
          };
        }
        console.log('mouse is down');
        // console.log('posBeforeDrag', posBeforeDrag.current);
      }}
      onmouseup={() => {
        dragging.current = false;
        dragEvent.current = null;
      }}
      onmouseupoutside={() => {
        dragging.current = false;
        dragEvent.current = null;
      }}
      // mouse might leave the frame as refresh rate is not fast enough
      // so we use onmouseupoutside instead
      // onmouseleave={() => {
      //   dragging.current = false;
      // }}
      onglobalmousemove={(e) => {
        if (dragging.current) {
          //update frame position
          const newRawPosition = dragEvent.current.getLocalPosition(e.currentTarget.parent);
          const newPosition = {
            x: Math.round(newRawPosition.x - dragOffset.current.x),
            y: Math.round(newRawPosition.y - dragOffset.current.y),
          };
          handleFrameUpdate(id, { position: newPosition });
        }
      }}
    />
  );
};

export default Frame;
