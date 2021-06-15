/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  status: '',
  message: '',
  // email: '',
}

const profileReducer = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    profilePending: (state) => {
      state.isLoading = true
    },
    profileSuccess: (state, { payload }) => {
      state.isLoading = false
      state.status = 'success'
      state.message = payload.message
      // state.email = payload.email
    },
    profileFail: (state, { payload }) => {
      state.isLoading = false
      state.status = 'error'
      state.message = payload
    },
  },
})

export const { 
  profilePending, 
  profileSuccess,
  profileFail 
} = profileReducer.actions

export default profileReducer.reducer
