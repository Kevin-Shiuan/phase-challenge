import { Container, Sprite, useTick } from '@pixi/react';
import { Texture } from 'pixi.js';
import { getRecoil } from 'recoil-nexus';
import { frameState } from '../../recoil';
import { useRef, useState } from 'react';
import { handleFrameSelect, handleFrameUpdate } from '../../recoil/pixiUtils';

export const Frame = ({ id }) => {
  // set frame state, as we can't use recoil directly in pixi
  // React don't let us propagate parent contexts in child components from a custom renderers (ReactPixi use custom renderer)
  // pls refer to https://pixijs.io/pixi-react/context-bridge/
  const [frameProp, setFrameProp] = useState(null);

  let dragging = useRef(false); // store dragging state
  let dragEvent = useRef(null); // store drag event to calculate total drag distance
  let dragOffset = useRef({ x: 0, y: 0 }); // store offset between mouse and frame position, as anchor is default to(0,0)
  let parentId = useRef(null); // store parent id
  let parentPos = useRef({ x: 0, y: 0 }); // store parent position

  // continuously check for changes in frame state from React
  useTick(() => {
    const raw = getRecoil(frameState(id));
    const rawParentId = raw?.parentId || null;
    const rawParentPos = parentId.current ? getRecoil(frameState(rawParentId)).position : { x: 0, y: 0 };
    parentPos.current = { x: parseInt(rawParentPos.x), y: parseInt(rawParentPos.y) };
    const newFrameProp = {
      ...raw,
      position: { x: parseInt(raw.position.x) + parentPos.current.x, y: parseInt(raw.position.y) + parentPos.current.y },
    };
    setFrameProp(newFrameProp);
    parentId.current = rawParentId.includes('frame') ? rawParentId : null;
  });
  const onDragStart = (e) => {
    handleFrameSelect(id);
    if (!dragging.current) {
      dragging.current = true;
      dragEvent.current = e;
      dragOffset.current = {
        x: e.getLocalPosition(e.currentTarget.parent).x - frameProp.position.x,
        y: e.getLocalPosition(e.currentTarget.parent).y - frameProp.position.y,
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
      // const newPosition = {
      //   x: Math.round(newRawPosition.x - dragOffset.current.x - parentPos.current.x),
      //   y: Math.round(newRawPosition.y - dragOffset.current.y - parentPos.current.y),
      // };
      const newPosition = {
        x: Math.round(newRawPosition.x - dragOffset.current.x - parentPos.current.x),
        y: Math.round(newRawPosition.y - dragOffset.current.y - parentPos.current.y),
      };
      // console.log('newPosition', newPosition);
      handleFrameUpdate(id, { position: newPosition });
    }
  };

  return !frameProp ? null : (
    <Container
      // setting position in container will cause weird behavior, so we set it in sprite instead
      eventMode="passive"
    >
      <Sprite
        x={frameProp.position.x}
        y={frameProp.position.y}
        texture={Texture.WHITE}
        tint={frameProp.fill}
        alpha={frameProp.o}
        width={frameProp.size.width}
        height={frameProp.size.height}
        eventMode="static"
        onclick={(e) => {
          handleFrameSelect(id);
          console.log(parentPos);
        }}
        onmousedown={(e) => onDragStart(e)}
        onmouseup={onDragEnd}
        onmouseupoutside={onDragEnd}
        onglobalmousemove={(e) => onDragging(e)}
      />
      {frameProp.childrenIds.map((childId) => (
        <Frame key={childId} id={childId} />
      ))}
    </Container>
  );
};

export default Frame;

// function useIteration(incr = 0.1){
//   const [i, setI] = useState(0);

//   useTick((delta) => {
//     setI(i => i + incr * delta);
//   });

//   return i;
// };
