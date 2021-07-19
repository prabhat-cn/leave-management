/* eslint-disable prettier/prettier */
import axios from 'axios'
import axiosRetry from 'axios-retry'
import { toast } from 'react-toastify'
import { apiHost } from './constant'

const API = axios.create({
  baseURL: apiHost,
})

axiosRetry(API, { retries: 3 })

// Add a request interceptor here global function added
API.interceptors.request.use((config) => {

  const userData = localStorage.getItem('lMuserDataToken')
  const currentUser = JSON.parse(userData)

  config.headers.Authorization =  userData ? `Bearer ${currentUser.token}` : '';

  return config;
});


// after invalid token logout
API.interceptors.response.use((config) => {
  // console.log('config', config);
  return config;
}, (err) => {
  // console.log('err', err.response, err.data, err.message)
  // console.log('err', err.response.data.code)
  if( err.response.data.code === 'jwt_auth_invalid_token' && err.response.status === 403 ){
    toast.error('Error! Token Missmatched')
    localStorage.removeItem('lMuserDataToken')
    window.location.reload()
    window.location.href = '/'
  }
});

export { API as default };