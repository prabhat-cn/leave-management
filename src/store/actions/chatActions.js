/* eslint-disable prettier/prettier */
// to call api data
import { createAsyncThunk } from '@reduxjs/toolkit'
import API from 'src/api'

// to get user data by id
export const getChats = createAsyncThunk('chats', async (id) => {
  const response = await API.get(`/wp-jwt/v1/get-comment/${id}`)
  // inside of ** data kept result users data
  return response.data.data
})
