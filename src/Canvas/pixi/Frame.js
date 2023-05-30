import { Container, Sprite, useTick } from '@pixi/react';
import { Texture } from 'pixi.js';
import { getRecoil } from 'recoil-nexus';
import { frameState } from '../../recoil';
import { useRef, useState, useEffect } from 'react';
import { handleFrameSelect, handleFrameUpdate } from '../../recoil/pixiUtils';

export const Frame = ({ id }) => {
  // set frame state, as we can't use recoil directly in pixi
  // React don't let us propagate parent contexts in child components from a custom renderers (ReactPixi use custom renderer)
  // pls refer to https://pixijs.io/pixi-react/context-bridge/
  const [frame, setFrame] = useState(null);

  let dragging = useRef(false); // store dragging state
  let dragEvent = useRef(null); // store drag event to calculate total drag distance
  let dragOffset = useRef({ x: 0, y: 0 }); // store offset between mouse and frame position, as anchor is default to(0,0)
  let parentPos = useRef({ x: 0, y: 0 }); // store parent position

  // continuously check for changes in frame state from React
  useTick(() => {
    const raw = getRecoil(frameState(id));
    const parentId = raw?.parentId || null;
    parentPos.current = parentId.includes('frame') ? getRecoil(frameState(parentId)).position : { x: 0, y: 0 };
    // set frame position relative to parent
    const frame = {
      ...raw,
      position: { x: raw.position.x + parentPos.current.x, y: raw.position.y + parentPos.current.y },
    };
    setFrame(frame);
  });

  const onDragStart = (e) => {
    handleFrameSelect(id);
    if (!dragging.current) {
      dragging.current = true;
      dragEvent.current = e;
      dragOffset.current = {
        x: e.getLocalPosition(e.currentTarget.parent).x - frame.position.x,
        y: e.getLocalPosition(e.currentTarget.parent).y - frame.position.y,
      };
    }
  };

  const onDragEnd = () => {
    dragging.current = false;
    dragEvent.current = null;
  };

  const onDragging = (e) => {
    if (dragging.current) {
      //update frame position
      const newRawPosition = dragEvent.current.getLocalPosition(e.currentTarget.parent);
      const newPosition = {
        x: Math.round(newRawPosition.x - dragOffset.current.x - parentPos.current.x),
        y: Math.round(newRawPosition.y - dragOffset.current.y - parentPos.current.y),
      };
      handleFrameUpdate(id, { position: newPosition });
    }
  };

  return !frame ? null : (
    <Container
      // setting position in container will cause weird behavior, so we set it in sprite instead
      eventMode="passive"
    >
      <Sprite
        x={frame.position.x}
        y={frame.position.y}
        texture={Texture.WHITE}
        tint={frame.fill}
        alpha={frame.o}
        width={frame.size.width}
        height={frame.size.height}
        eventMode="static"
        onclick={(e) => {
          handleFrameSelect(id);
          console.log('scale=', e.currentTarget.scale);
        }}
        onmousedown={(e) => onDragStart(e)}
        onmouseup={onDragEnd}
        onmouseupoutside={onDragEnd}
        onglobalmousemove={(e) => onDragging(e)}
      />
      {frame.childrenIds.map((childId) => (
        <Frame key={childId} id={childId} />
      ))}
    </Container>
  );
};

export default Frame;
