/* eslint-disable prettier/prettier */
import {
  registrationPending,
  registrationSuccess,
  registrationError,
} from '../reducers/userRegReducer'

import { userRegistration } from '../../serverapis/userApi'

export const newUserRegistration = (formData) => async (dispatch) => {
  try {
    dispatch(registrationPending())

    const result = await userRegistration(formData)
    result.status === 'success'
      ? dispatch(registrationSuccess(result.message))
      : dispatch(registrationError(result.message))

    console.log(result)
  } catch (error) {
    dispatch(registrationError(error.message))
  }
}
