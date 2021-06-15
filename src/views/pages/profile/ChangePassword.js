import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import showPwdImg from '../../../assets/icons/eye-slash-solid.svg'
import hidePwdImg from '../../../assets/icons/eye-solid.svg'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import {
  CButton,
  CCard,
  CAlert,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormControl,
  CCardHeader,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import API from '../../../api'
import {
  updatePassPending,
  updatePassSuccess,
  updatePassFail,
} from '../../../store/reducers/updatePassReducer'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const ChangePassword = (props) => {
  const [isRevealPwd, setIsRevealPwd] = useState(false)
  const [isRevealCPwd, setIsRevealCPwd] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [updatePassUse, setUpdatePassUse] = useState()
  const dispatch = useDispatch()
  const initialValues = {
    new_password: '',
    confirm_password: '',
  }
  const changePasswordSchema = Yup.object().shape({
    new_password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required')
      .matches(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
        'One Uppercase, One Lowercase, One Number and one special case Character',
      ),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
      .required('Repeat Password is required'),
  })
  const updatePassSubmit = (updateData) => {
    dispatch(updatePassPending())
    API.post('/wp-jwt/v1/update-employee-password', updateData)
      .then((response) => {
        // const updateToken = localStorage.getItem('lMuserDataToken')
        // console.log('updateToken', updateToken)
        setError('')
        setSubmitted(true)
        const updatePassData = response.data
        console.log('updatePassData', updatePassData)
        // response is the payload for redux
        dispatch(updatePassSuccess(response))
        setUpdatePassUse(updatePassData)
      })
      .catch((error) => {
        console.log(error.response)
        const { status, data } = error.response
        setSubmitted(false)
        dispatch(updatePassFail(error.response))
        if (status === 403) {
          setError(data.message)
        }
      })
  }
  const onSubmit = async (values, submitProps) => {
    updatePassSubmit()
    await sleep(500)
    setSubmitted(true)
    submitProps.resetForm()
  }
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={changePasswordSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          const { errors, touched, isValid, dirty } = formik

          return (
            <>
              <CRow>
                <CCol xs={12}>
                  <CCard className="mb-4">
                    <CCardHeader>
                      <strong>Change Password</strong>
                    </CCardHeader>

                    <CRow className="justify-content-center my-4">
                      <CCol md="9" lg="7" xl="6">
                        <CCard className="mx-4">
                          <CCardBody className="p-4">
                            <Form id="register" name="register">
                              {updatePassUse && (
                                <CAlert color={updatePassUse.status === 0 ? 'danger' : 'success'}>
                                  {updatePassUse.status === 0 ? 'Error! ' : 'Success! '}
                                  {updatePassUse.message}
                                </CAlert>
                              )}
                              {/* {submitted && (
                                <CAlert color="success">
                                  Success! Account Created Successfully
                                </CAlert>
                              )} */}
                              {error !== '' && <CAlert color="danger">Error! Update failed</CAlert>}
                              <CInputGroup className="mb-3 mt-2 pwd-container">
                                <CInputGroupText>
                                  <CIcon name="cil-lock-locked" />
                                </CInputGroupText>
                                <Field
                                  type={isRevealPwd ? 'text' : 'password'}
                                  name="new_password"
                                  id="new_password"
                                  placeholder="New password"
                                  autoComplete="on"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.new_password && touched.new_password
                                      ? 'input-error'
                                      : null)
                                  }
                                />
                                <img
                                  className="toggle-image"
                                  title={isRevealPwd ? 'Hide password' : 'Show password'}
                                  src={isRevealPwd ? hidePwdImg : showPwdImg}
                                  onClick={() => setIsRevealPwd((prevState) => !prevState)}
                                />
                              </CInputGroup>
                              <ErrorMessage
                                name="new_password"
                                style={{ color: 'red', marginBottom: '6px' }}
                                component="span"
                                className="error"
                              />
                              <CInputGroup className="mb-4 mt-2 pwd-container">
                                <CInputGroupText>
                                  <CIcon name="cil-lock-locked" />
                                </CInputGroupText>
                                <Field
                                  type={isRevealCPwd ? 'text' : 'password'}
                                  name="confirm_password"
                                  id="confirm_password"
                                  placeholder="Repeat new password"
                                  autoComplete="on"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.confirm_password && touched.confirm_password
                                      ? 'input-error'
                                      : null)
                                  }
                                />
                                <img
                                  className="toggle-image"
                                  title={isRevealCPwd ? 'Hide password' : 'Show password'}
                                  src={isRevealCPwd ? hidePwdImg : showPwdImg}
                                  onClick={() => setIsRevealCPwd((prevState) => !prevState)}
                                />
                              </CInputGroup>
                              <ErrorMessage
                                name="confirm_password"
                                style={{ color: 'red', marginBottom: '4px' }}
                                component="span"
                                className="error"
                              />
                              <CRow className="mt-3">
                                <CCol xs="6">
                                  <button
                                    color="success"
                                    className={
                                      'btn btn-success px-4' +
                                      ' ' +
                                      (!(dirty && isValid) ? 'disabled' : '')
                                    }
                                    disabled={!(dirty && isValid)}
                                  >
                                    Submit
                                  </button>
                                </CCol>
                              </CRow>
                            </Form>
                          </CCardBody>
                        </CCard>
                      </CCol>
                    </CRow>
                  </CCard>
                </CCol>
              </CRow>
            </>
          )
        }}
      </Formik>
      <style>{eyeToggle}</style>
    </>
  )
}

export default ChangePassword

const eyeToggle = `

.pwd-container {
    position: relative;
  }
   
  .pwd-container img {
    cursor: pointer;
    position: absolute;
    width: 20px;
    right: 8px;
    top: 8px;
  }

  
  input#password:active {
    background: #0000000d;
}
`
