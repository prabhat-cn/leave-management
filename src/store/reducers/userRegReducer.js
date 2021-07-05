/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  status: '',
  message: '',
}

const userRegReducer = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    registrationPending: (state) => {
      state.isLoading = true
    },
    registrationSuccess: (state, { payload }) => {
      state.isLoading = false
      state.status = 'success'
      state.message = payload.message
    },
    registrationError: (state, { payload }) => {
      state.isLoading = false
      state.status = 'error'
      state.message = payload
    },
  },
})

export const { 
    registrationPending, 
    registrationSuccess, 
    registrationError 
} = userRegReducer.actions

export default userRegReducer.reducer
