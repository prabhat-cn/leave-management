/* eslint-disable prettier/prettier */
import axios from 'axios'
import axiosRetry from 'axios-retry'
import { apiHost } from './constant'

const API = axios.create({
  baseURL: apiHost,
})

axiosRetry(API, { retries: 3 })

export { API as default }
