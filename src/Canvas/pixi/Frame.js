import { Sprite } from '@pixi/react';
import { Texture } from 'pixi.js';

const Frame = ({ frame }) => {
  console.log('frame refreshed');

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
