import { Sprite, useApp } from '@pixi/react';
import { Texture } from 'pixi.js';
import { handleFrameSelect } from '../../recoil/pixiUtils';


export const BackgroundSprite = ({ id }) => {
  const app = useApp();

  return (
    <Sprite texture={Texture.WHITE} x={0} y={0} width={app.screen.width} height={app.screen.height} 
    eventMode='static'
    onclick={(e)=>{
      handleFrameSelect('')
    }}/>
  );
};

export default BackgroundSprite;
