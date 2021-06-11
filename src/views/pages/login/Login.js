/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
import { useDispatch, useSelector } from 'react-redux'
import { loginPending, loginSuccess, loginFail } from '../../../store/reducers/loginReducer'
import { userLogin } from '../../../serverApis/userApi'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const Login = () => {
  const [isRevealPwd, setIsRevealPwd] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [user, setUser] = useState()
  const initialValues = {
    username: '',
    password: '',
  }

  const loginSchema = Yup.object().shape({
    // email: Yup.string().required('Email is required').email('Email is invalid'),
    username: Yup.string().required('Username required'),

    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required')
      .matches(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
        'One Uppercase, One Lowercase, One Number and one special case Character',
      ),
  })

  const loginSubmit = (loginData) => {
    API.post('/jwt-auth/v1/token', loginData)
      .then((response) => {
        setError('')
        setSubmitted(true)
        const userData = response.data
        console.log('userData', userData)
        // set the state of the user
        setUser(userData)
        localStorage.setItem('lMuserDataToken', JSON.stringify(userData))
        // sessionStorage.setItem('accessDataToken', userData.token)
        window.location.reload()
      })
      .catch((err) => {
        console.log(err.response)
        const { status, data } = err.response
        setSubmitted(false)
        if (status === 403) {
          setError(data.message)
        }
      })
  }

  // const loginSubmit = async (loginData) => {
  //   dispatch(loginPending())
  //   // userLogin(loginData)
  //   //   .then((response) => {
  //   //     setError('')
  //   //     setSubmitted(true)
  //   //     const userData = response.data
  //   //     console.log('userData', userData)
  //   //     dispatch(loginSuccess())
  //   //     // localStorage.setItem('lMuserDataToken', JSON.stringify(userData))
  //   //     // window.location.reload()
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log(err.response)
  //   //     const { status, data } = err.response
  //   //     setSubmitted(false)
  //   //     if (status === 403) {
  //   //       setError(data.message)
  //   //     }
  //   //   })
  //   try {
  //     const isAuth = await userLogin(loginData)
  //     console.log('login-isAuth->', isAuth)
  //     then((response) => {
  //       setSubmitted(true)
  //       const userData = response.data
  //       console.log('userData', userData)
  //     })
  //   } catch (error) {
  //     console.log(error.response)
  //     dispatch(loginFail(error.message))
  //   }
  // }
  const onSubmit = async (data, submitProps) => {
    loginSubmit(data)
    await sleep(500)
    // submitProps.resetForm()
  }
  return (
    <>
      <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={onSubmit}>
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
                              {submitted && (
                                <CAlert color="success">Success! Login Successfully</CAlert>
                              )}
                              {error !== '' && <CAlert color="danger">Error! Login failed</CAlert>}
                              <h1>Login</h1>
                              <p className="text-medium-emphasis">Sign In to your account</p>
                              <CInputGroup className="mb-2">
                                <CInputGroupText>
                                  <CIcon name="cil-envelope-closed" />
                                </CInputGroupText>
                                <Field
                                  type="text"
                                  name="username"
                                  id="email"
                                  placeholder="Enter username or email"
                                  autoComplete="on"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.username && touched.username ? 'input-error' : null)
                                  }
                                />
                              </CInputGroup>
                              <ErrorMessage
                                name="username"
                                style={{ color: 'red', marginBottom: '4px' }}
                                component="div"
                                className="error"
                              />
                              <CInputGroup className="mb-2 mt-4 pwd-container">
                                <CInputGroupText>
                                  <CIcon name="cil-lock-locked" />
                                </CInputGroupText>
                                <Field
                                  type={isRevealPwd ? 'text' : 'password'}
                                  name="password"
                                  id="password"
                                  placeholder="Enter password"
                                  autoComplete="on"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.password && touched.password ? 'input-error' : null)
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
                                name="password"
                                style={{ color: 'red', marginBottom: '6px' }}
                                component="span"
                                className="error"
                              />
                              <CRow className="mt-3">
                                <CCol xs="6">
                                  <button
                                    type="submit"
                                    color="primary"
                                    className={
                                      'btn btn-primary px-4' +
                                      ' ' +
                                      (!(dirty && isValid) ? 'disabled' : '')
                                    }
                                    disabled={!(dirty && isValid)}
                                  >
                                    Login
                                  </button>
                                </CCol>
                                <CCol xs="6" className="text-right">
                                  <CButton color="link" className="px-0">
                                    <Link to="/forgetpassword">Forgot password?</Link>
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

export default Login

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
