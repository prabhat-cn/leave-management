// import { createStore } from 'redux'
import { createSlice } from '@reduxjs/toolkit'

const sidePanelReducer = createSlice({
  name: 'sidePanelReducer',
  initialState: {
    sidebarShow: false,
  },

  // normal actions create here
  reducers: {
    // actions here
    changeState: (state, { type, ...rest }) => {
      // state.sidebarShow = true
      switch (type) {
        case 'set':
          return { ...state, ...rest }
        default:
          return state
      }
    },
  },
})

export const { changeState } = sidePanelReducer.actions

export default sidePanelReducer.reducer
