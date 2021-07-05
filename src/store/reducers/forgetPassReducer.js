/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  status: '',
  message: '',
  // email: '',
}

const forgetPassReducer = createSlice({
  name: 'forgetPassword',
  initialState,
  reducers: {
    forgetPassPending: (state) => {
      state.isLoading = true
    },
    forgetPassSuccess: (state, { payload }) => {
      state.isLoading = false
      state.status = 'success'
      state.message = payload.message
      // state.email = payload.email
    },
    forgetPassFail: (state, { payload }) => {
      state.isLoading = false
      state.status = 'error'
      state.message = payload
    },
  },
})

export const { 
  forgetPassPending, 
  forgetPassSuccess,
  forgetPassFail 
} = forgetPassReducer.actions

export default forgetPassReducer.reducer
