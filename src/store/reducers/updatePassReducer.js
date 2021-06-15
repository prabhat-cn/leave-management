/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  status: '',
  message: '',
  // email: '',
}

const updatePassReducer = createSlice({
  name: 'updatePassword',
  initialState,
  reducers: {
    updatePassPending: (state) => {
      state.isLoading = true
    },
    updatePassSuccess: (state, { payload }) => {
      state.isLoading = false
      state.status = 'success'
      state.message = payload.message
      // state.email = payload.email
    },
    updatePassFail: (state, { payload }) => {
      state.isLoading = false
      state.status = 'error'
      state.message = payload
    },
  },
})

export const { 
  updatePassPending, 
  updatePassSuccess, 
  updatePassFail
} = updatePassReducer.actions

export default updatePassReducer.reducer
