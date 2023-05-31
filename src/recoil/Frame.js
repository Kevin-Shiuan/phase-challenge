import { atom, atomFamily, selectorFamily } from 'recoil';

import { documentFrames } from '../_mockData/document/index.js';

// setup atomFamily for each frame
export const frameState = atomFamily({
  key: 'frameState',
  default: (id) => {
    const frame = documentFrames.find((frame) => frame.id === id);
    return { ...frame, isSelected: false, isRenaming: false };
  },
});

// atom for selected frameId
export const activeFrameIdState = atom({
  key: 'activeFrameId',
  default: '',
});

// functions to update the selected frame
export const selectFrame = selectorFamily({
  key: "selectFrame",
  get:
    (frameId) =>
    ({ get }) => ({
      ...get(frameState(frameId)),
      isSelected: frameId === get(activeFrameIdState),
    }),
  set:
    (frameId) =>
    ({ set, get }) => {
      const activeFrameId = get(activeFrameIdState);
      // if the frame is already selected, do nothing
      if (activeFrameId === frameId) return;
      // unselect the previous selected frame
      if (activeFrameId)
        set(frameState(activeFrameId), (frame) => ({
          ...frame,
          isSelected: false,
          isRenaming: false,
        }));
      // select the new frame
      if (frameId) set(frameState(frameId), (frame) => ({ ...frame, isSelected: true }));
      // update the active frame id
      set(activeFrameIdState, frameId);
    },
});

