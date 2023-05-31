// this file contains utility functions for Pixi.js to use Recoil
import { getRecoil, setRecoil } from 'recoil-nexus';
import { activeFrameIdState, frameStateArr } from '../../recoil';

export const handleFrameSelect = (id) => {
  const activeFrameId = getRecoil(activeFrameIdState);
  if (activeFrameId === id) return;
  if (activeFrameId)
    setRecoil(frameStateArr.find((frameState) => frameState.id === activeFrameId).atom, (frame) => ({
      ...frame,
      selected: false,
    }));
  if (id)
    setRecoil(frameStateArr.find((frameState) => frameState.id === id).atom, (frame) => ({
      ...frame,
      selected: true,
    }));
  setRecoil(activeFrameIdState, id);
};

export const handleFrameUpdate = (id, newValue) => {
  setRecoil(frameStateArr.find((frameState) => frameState.id === id).atom, (frame) => ({
    ...frame,
    ...newValue,
  }));
};
