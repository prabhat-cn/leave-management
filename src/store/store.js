/* eslint-disable prettier/prettier */
import { configureStore } from '@reduxjs/toolkit'
import sidePanelReducer from './reducers/sidePanelReducer'

export default configureStore({
  reducer: {
    sideBar: sidePanelReducer,
  },
})
