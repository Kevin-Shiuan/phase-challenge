import { atom, selectorFamily } from 'recoil';
import { documentPages, documentFrames } from '../_mockData/document/index.js';

export const activeFrameState = atom({
  key: 'activeFrame',
  default: '',
});

export const activePageState = atom({
  key: 'activePage',
  default: '',
});

export const pageStates = documentPages.map((page) => {
  return {
    id: page.id,
    atom: atom({
      key: page.id,
      default: { ...page, active: false },
    }),
  };
});

export const frameStates = documentFrames.map((frame) => {
  return {
    id: frame.id,
    atom: atom({
      key: frame.id,
      default: { ...frame, active: false },
    }),
  };
});

export const frameSelectorState = selectorFamily({
  key: 'frameSelect',
  get:
    (frameId) =>
    ({ get }) => {
      // return get(frameStates.find((frameState) => frameState.id === frameId).atom).id === get(activeFrameState);
      return {
        ...get(frameStates.find((frameState) => frameState.id === frameId).atom),
        active: frameId === get(activeFrameState),
      };
    },
  set:
    (frameId) =>
    ({ set, get }, newValue) => {
      if (!!get(activeFrameState))
        set(frameStates.find((frameState) => frameState.id === get(activeFrameState)).atom, {
          ...get(frameStates.find((frameState) => frameState.id === get(activeFrameState)).atom),
          active: false,
        });
      set(frameStates.find((frameState) => frameState.id === frameId).atom, {
        ...get(frameStates.find((frameState) => frameState.id === frameId).atom),
        active: true,
      });
      set(activeFrameState, frameId);
    },
});
