import { atom, atomFamily, selector, selectorFamily } from 'recoil';

import document, { documentPages } from '../_mockData/document/index.js';
import { activeFrameIdState, frameState } from './Frame.js';

// setup atoms for each page
export const pageState = atomFamily({
  key: "pageState",
  default: (id) => {
    const page = documentPages.find((page) => page.id === id);
    return { ...page, isSelected: false, isRenaming: false };
  },
});

// atom for selected frameId and pageId
export const activePageIdState = atom({
  key: 'activePageId',
  default: document.pageIds[0], // default to the first page
});

// return state of selected page
export const activePageState = selector({
  key: "activePageState",
  get: ({ get }) => get(pageState(get(activePageIdState))),
});

// functions to update the selected page
export const selectPage = selectorFamily({
  key: "selectPage",
  get:
    (pageId) =>
    ({ get }) => ({
      ...get(pageState(pageId)),
      isSelected: pageId === get(activePageIdState),
    }),
  set:
    (pageId) =>
    ({ set, get }) => {
      const activePageId = get(activePageIdState);
      // if the page is already selected, do nothing
      if (activePageId === pageId) return;
      // unselect the previous selected page
      if (activePageId)
        set(pageState(activePageId), (page) => ({
          ...page,
          isSelected: false,
          isRenaming: false,
        }));
      // select the new page
      set(pageState(pageId), (page) => ({ ...page, isSelected: true }));
      // update the active page id
      set(activePageIdState, pageId);
      const activeFrameId = get(activeFrameIdState);
      // unselect the frame
      if (activeFrameId) set(frameState(activeFrameId), (frame) => ({ ...frame, isSelected: false }));
      set(activeFrameIdState, "");
    },
});
