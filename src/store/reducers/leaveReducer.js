/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  status: '',
  message: '',
}

const leaveReducer = createSlice({
  name: 'leave',
  initialState,
  reducers: {
    leavePending: (state) => {
      state.isLoading = true
    },
    leaveSuccess: (state, { payload }) => {
      state.isLoading = false
      state.status = 'success'
      state.message = payload.message
    },
    leaveFail: (state, { payload }) => {
      state.isLoading = false
      state.status = 'error'
      state.message = payload.message
    },
  },
})

export const { 
  leavePending, 
  leaveSuccess,
  leaveFail 
} = leaveReducer.actions

export default leaveReducer.reducer
