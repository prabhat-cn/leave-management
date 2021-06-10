/* eslint-disable prettier/prettier */
import API from '../../src/api'

export const userRegistration = (frmData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await API.post('/wp-jwt/v1/create-new-user', frmData)

      resolve(res.data)

      if (res.data.status === 'success') {
        resolve(res.data)
      }
    } catch (error) {
      reject(error)
    }
  })
}

export const userLogin = (frmData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await API.post('/jwt-auth/v1/token', frmData)

      resolve(res.data)

      if (res.data.status === 'success') {
        sessionStorage.setItem('accessJWT', res.data.accessJWT)
        localStorage.setItem('userToken', JSON.stringify({ refreshJWT: res.data.refreshJWT }))
        window.location.reload()
      }
    } catch (error) {
      reject(error)
    }
  })
}
