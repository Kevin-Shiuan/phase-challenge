import { atom } from 'recoil';

import document from '../_mockData/document/index.js';

// setup atoms for documents
export const documentState = atom({
  key: 'document',
  default: document,
});