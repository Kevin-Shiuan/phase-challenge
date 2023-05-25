import { createSlice } from '@reduxjs/toolkit';

export const activePageSlice = createSlice({
  name: 'frame',
  initialState: {
    id: '',
  },
  reducers: {
    selectPage: (state, action) => {
      state.id = action.payload.id;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectPage } = activePageSlice.actions;

export default activePageSlice.reducer;
