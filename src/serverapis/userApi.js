/* eslint-disable prettier/prettier */
import API from '../api'
import axios from 'axios'

export const userRegistration = (frmData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post('/wp-jwt/v1/create-new-user', frmData)
      console.log('res-Regis->', res);
      resolve(res.data)

      // if (res.data.status === 'success') {
      //   resolve(res.data)
      // }
    } catch (error) {
      reject(error)
    }
  })
}

export const userLogin = (frmData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post('/jwt-auth/v1/token', frmData)
      console.log('res-login->', res);
      resolve(res.data)

      // if (res.data.status === 'success') {
      //   sessionStorage.setItem('accessJWT', res.data.accessJWT)
      //   localStorage.setItem('lMuserDataToken', JSON.stringify({ refreshJWT: res.data.refreshJWT }))
      //   window.location.reload()
      // }
    } catch (error) {
      reject(error)
    }
  })
}
