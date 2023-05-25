import { createSlice } from '@reduxjs/toolkit';

export const activeFrameSlice = createSlice({
  name: 'frame',
  initialState: {
    id: '',
  },
  reducers: {
    selectFrame: (state, action) => {
      state.id = action.payload.id;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectFrame } = activeFrameSlice.actions;

export default activeFrameSlice.reducer;
