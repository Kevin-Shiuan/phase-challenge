import { configureStore } from '@reduxjs/toolkit'
import activeFrameReducer from './activeFrameSlice'
import activePageReducer from './activePageSlice'

export default configureStore({
  reducer: {
    activeFrame: activeFrameReducer,
    activePage: activePageReducer,
  }
})