/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react'
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

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const Login = () => {
  const [isRevealPwd, setIsRevealPwd] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const initialValues = {
    email: '',
    password: '',
  }

  const loginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),

    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required')
      .matches(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
        'One Uppercase, One Lowercase, One Number and one special case Character',
      ),
  })
  const onSubmit = async (values, submitProps) => {
    console.log('form-values', JSON.stringify(values, null, 2))
    // console.log('submitProps', submitProps)
    await sleep(500)
    setSubmitted(true)
    submitProps.resetForm()
    // alert(JSON.stringify(values, null, 2));
  }
  return (
    <>
      <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={onSubmit}>
        {(formik) => {
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
                            {submitted && (
                              <CAlert color="success">Success! Thank you for your response!</CAlert>
                            )}
                            <CForm id="login" name="login">
                              <h1>Login</h1>
                              <p className="text-medium-emphasis">Sign In to your account</p>
                              <CInputGroup className="mb-2">
                                <CInputGroupText>
                                  <CIcon name="cil-envelope-closed" />
                                </CInputGroupText>
                                <Field
                                  type="text"
                                  name="email"
                                  id="email"
                                  placeholder="Enter email"
                                  autoComplete="on"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.email && touched.email ? 'input-error' : null)
                                  }
                                />
                              </CInputGroup>
                              <ErrorMessage
                                name="email"
                                style={{ color: 'red', marginBottom: '4px' }}
                                component="div"
                                className="error"
                              />
                              <CInputGroup className="mb-4 pwd-container">
                                <CInputGroupText>
                                  <CIcon name="cil-lock-locked" />
                                </CInputGroupText>
                                {/* <CFormControl
                                  type="password"
                                  placeholder="Password"
                                  autoComplete="current-password"
                                /> */}
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
                                style={{ color: 'red', marginBottom: '4px' }}
                                component="span"
                                className="error"
                              />
                              <CRow>
                                <CCol xs="6">
                                  <CButton color="primary" className="px-4">
                                    Login
                                  </CButton>
                                </CCol>
                                <CCol xs="6" className="text-right">
                                  <CButton color="link" className="px-0">
                                    Forgot password?
                                  </CButton>
                                </CCol>
                              </CRow>
                            </CForm>
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
