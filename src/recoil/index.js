import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import document, { documentPages, documentFrames } from '../_mockData/document/index.js';

// setup atoms for documents
export const documentState = atom({
  key: 'document',
  default: document,
});

// setup atoms for each frame and page
// this should be replaced by a atomFamily
const pageStateArr = documentPages.map((page, index) => {
  return {
    id: page.id,
    atom: atom({
      key: page.id,
      default: { ...page, selected: !index },
    }),
  };
});

export const frameStateArr = documentFrames.map((frame) => {
  return {
    id: frame.id,
    atom: atom({
      key: frame.id,
      default: { ...frame, selected: false },
    }),
  };
});

// export the state for selected frame and page
export const activeFrameIdState = atom({
  key: 'activeFrameId',
  default: '',
});

export const activePageIdState = atom({
  key: 'activePageId',
  default: document.pages[0],
});

export const activePageState = selector({
  key: 'activePageState',
  get: ({ get }) => {
    return get(pageStateArr.find((page) => page.id === get(activePageIdState)).atom);
  },
});

// functions to update the selected frame and page
export const frameSelector = selectorFamily({
  key: 'frameSelect',
  get:
    (frameId) =>
    ({ get }) => {
      return {
        ...get(frameStateArr.find((frameState) => frameState.id === frameId).atom),
        selected: frameId === get(activeFrameIdState),
      };
    },
  set:
    (frameId) =>
    ({ set, get }, newValue) => {
      const activeFrameId = get(activeFrameIdState);
      // if the frame is already selected, do nothing
      if (activeFrameId === frameId) return;
      // unselect the previous selected frame
      if (!!activeFrameId)
        set(frameStateArr.find((frameState) => frameState.id === activeFrameId).atom, (frame)=>({
          // ...get(frameStateArr.find((frameState) => frameState.id === activeFrameId).atom),
          ...frame,
          selected: false,
        }));
      // select the new frame
      if (!!frameId)
        set(frameStateArr.find((frameState) => frameState.id === frameId).atom, (frame)=>({
          // ...get(frameStateArr.find((frameState) => frameState.id === frameId).atom),
          ...frame,
          selected: true,
        }));
      // update the active frame id
      set(activeFrameIdState, frameId);
    },
});

export const pageSelector = selectorFamily({
  key: 'pageSelect',
  get:
    (pageId) =>
    ({ get }) => {
      return {
        ...get(pageStateArr.find((pageState) => pageState.id === pageId).atom),
        selected: pageId === get(activePageIdState),
      };
    },
  set: (pageId) => {
    return ({ set, get }, newValue) => {
      const activePageId = get(activePageIdState);
      // if the page is already selected, do nothing
      if (activePageId === pageId) return;
      // unselect the previous selected page
      if (!!activePageId)
        set(pageStateArr.find((pageState) => pageState.id === activePageId).atom, (page)=>({
          // ...get(pageStateArr.find((pageState) => pageState.id === activePageId).atom),
          ...page,
          selected: false,
        }));
      // select the new page
      set(pageStateArr.find((pageState) => pageState.id === pageId).atom, {
        ...get(pageStateArr.find((pageState) => pageState.id === pageId).atom),
        selected: true,
      });
      // update the active page id
      set(activePageIdState, pageId);
      const activeFrameId = get(activeFrameIdState);
      // unselect the frame
      if (!!activeFrameId)
        set(frameStateArr.find((frameState) => frameState.id === activeFrameId).atom, (page)=>({
          // ...get(frameStateArr.find((frameState) => frameState.id === activeFrameId).atom),
          ...page,
          selected: false,
        }));
      set(activeFrameIdState, '');
    };
  },
});

// temporary function for getting the frame state
// the follwing function shouldn't be in pratical use as frameStateArr is not a good approach to set the atom
export const frameState = selectorFamily({
  key: 'frameState',
  get:
    (frameId) =>
    ({ get }) => {
      return get(frameStateArr.find((frame) => frame.id === frameId).atom);
    },
  set:
    (frameId) =>
    ({ set, get }, newValue) => {
      const frameAtom = frameStateArr.find((frame) => frame.id === frameId).atom;
      set(frameAtom, { ...get(frameAtom), ...newValue });
    },
});

export const pageState = selectorFamily({
  key: 'pageState',
  get:
    (pageId) =>
    ({ get }) => {
      return get(pageStateArr.find((page) => page.id === pageId).atom);
    },
});
