/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
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
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormControl,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import API from '../../../api'
import {
  forgetPassPending,
  forgetPassSuccess,
  forgetPassFail,
  updatePassSuccess,
} from '../../../store/reducers/forgetPassReducer'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const ForgetPassword = (props) => {
  const [isRevealPwd, setIsRevealPwd] = useState(false)
  const [isRevealCPwd, setIsRevealCPwd] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [forgetPassUse, setForgetPassUse] = useState()
  const [error, setError] = useState(false)
  const dispatch = useDispatch()
  const initialValues = {
    user_login: '',
    new_password: '',
    confirm_password: '',
  }

  const forgetPassSchema = Yup.object().shape({
    user_login: Yup.string().required('Username required'),

    new_password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('New password is required')
      .matches(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
        'One Uppercase, One Lowercase, One Number and one special case Character',
      ),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('new_password'), null], 'Password must match')
      .required('Repeat Password is required'),
  })

  const forgetPassSubmit = (forgetData) => {
    dispatch(forgetPassPending())
    API.post('/wp-jwt/v1/forgot-password', forgetData)
      .then((response) => {
        setError('')
        setSubmitted(true)
        const forgetPassData = response.data
        console.log('forgetPassData', forgetPassData)
        dispatch(forgetPassSuccess())
        setForgetPassUse(forgetPassData)
        // eslint-disable-next-line react/prop-types
        props.history.push('/login')
        // if (forgetPassData.status === 1) {
        //   // eslint-disable-next-line react/prop-types
        //   props.history.push('/login')
        // }

        // if (status === 403) {
        //   setError(data.message)
        // }
      })
      .catch((error) => {
        console.log(error.response)
        setError('')
        setSubmitted(false)
        dispatch(forgetPassFail(error.response))
      })
  }

  // const forgetPassSubmit = async (forgetData) => {
  //   dispatch(forgetPassPending())
  //   // console.log(props)
  //   try {
  //     const forgetPass = await API.post('/wp-jwt/v1/forgot-password', forgetData)
  //     setError('')
  //     setSubmitted(true)
  //     dispatch(forgetPassSuccess())
  //     const forgetPassData = forgetPass.data
  //     console.log('forgetPassData', forgetPassData)
  //     setForgetPassUse(forgetPassData)
  //     // eslint-disable-next-line react/prop-types
  //     props.history.push('/login')
  //   } catch (error) {
  //     setSubmitted(false)
  //     dispatch(forgetPassFail(error.message))
  //   }
  // }
  const onSubmit = async (data, submitProps) => {
    // console.log('submitProps', submitProps)
    forgetPassSubmit(data)
    await sleep(500)
    // submitProps.resetForm()
  }
  return (
    <>
      <Formik initialValues={initialValues} validationSchema={forgetPassSchema} onSubmit={onSubmit}>
        {(formik) => {
          // console.log('formik', formik.values)
          const { errors, touched, isValid, dirty } = formik

          return (
            <>
              <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
                <CContainer>
                  <CRow className="justify-content-center">
                    <CCol md="8">
                      <CCardGroup>
                        <CCard className="p-4">
                          <CCardBody>
                            <Form id="login" name="login">
                              {forgetPassUse && (
                                <CAlert color={forgetPassUse.status === 0 ? 'danger' : 'success'}>
                                  {forgetPassUse.status === 0 ? 'Error! ' : 'Success! '}
                                  {forgetPassUse.message}
                                </CAlert>
                              )}
                              {/* {submitted && (
                                <CAlert color="danger">Error! Failed submission</CAlert>
                              )} */}
                              {error && <CAlert color="danger">Error! Failed submission</CAlert>}
                              <h1>Forget Password</h1>
                              <p className="text-medium-emphasis">Verify account</p>
                              <CInputGroup className="mb-2">
                                <CInputGroupText>
                                  <CIcon name="cil-envelope-closed" />
                                </CInputGroupText>
                                <Field
                                  type="text"
                                  name="user_login"
                                  id="user_login"
                                  placeholder="Enter username or email"
                                  autoComplete="on"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.user_login && touched.user_login ? 'input-error' : null)
                                  }
                                />
                              </CInputGroup>
                              <ErrorMessage
                                name="user_login"
                                style={{ color: 'red', marginBottom: '4px' }}
                                component="div"
                                className="error"
                              />
                              <CInputGroup className="mb-3 mt-2 pwd-container">
                                <CInputGroupText>
                                  <CIcon name="cil-lock-locked" />
                                </CInputGroupText>
                                <Field
                                  type={isRevealPwd ? 'text' : 'password'}
                                  name="new_password"
                                  id="new_password"
                                  placeholder="Enter new password"
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
                                  placeholder="Repeat password"
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
                                <CCol xs="5">
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
                                <CCol xs="7" className="text-right">
                                  &nbsp;
                                  <p className="account-css text-right">Have an account &nbsp;</p>
                                  <CButton color="link" className="px-2 text-right">
                                    <Link to="/login">Login</Link>
                                  </CButton>
                                </CCol>
                              </CRow>
                            </Form>
                          </CCardBody>
                        </CCard>
                        <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                          <CCardBody className="text-center">
                            <div>
                              <h2>Sign up</h2>
                              <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                              </p>
                              <Link to="/register">
                                <CButton color="primary" className="mt-3" active tabIndex={-1}>
                                  Register Now!
                                </CButton>
                              </Link>
                            </div>
                          </CCardBody>
                        </CCard>
                      </CCardGroup>
                    </CCol>
                  </CRow>
                </CContainer>
              </div>
            </>
          )
        }}
      </Formik>
      <style>{eyeToggle}</style>
    </>
  )
}

export default ForgetPassword

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
