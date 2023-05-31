// this file contains utility functions for Pixi.js to use Recoil
import { getRecoil, setRecoil } from 'recoil-nexus';

import { activeFrameIdState, frameState } from '../index';

export const handleFrameSelect = (id) => {
  const activeFrameId = getRecoil(activeFrameIdState);
  if (activeFrameId === id) return;
  if (activeFrameId)
    setRecoil(frameState(activeFrameId), (frame) => ({
      ...frame,
      isSelected: false,
    }));
  if (id)
    setRecoil(frameState(id), (frame) => ({
      ...frame,
      isSelected: true,
    }));
  setRecoil(activeFrameIdState, id);
};

export const handleFrameUpdate = (id, newValue) => {
  setRecoil(frameState(id), (frame) => ({
    ...frame,
    ...newValue,
  }));
};
