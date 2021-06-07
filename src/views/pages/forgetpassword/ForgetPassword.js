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
const ForgetPassword = () => {
  const [isRevealPwd, setIsRevealPwd] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const initialValues = {
    email: '',
  }

  const loginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
  })
  const onSubmit = async (values, submitProps) => {
    console.log('form-values', JSON.stringify(values, null, 2))
    // console.log('submitProps', submitProps)
    await sleep(500)
    setSubmitted(true)
    submitProps.resetForm()
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
                              {submitted && <CAlert color="success">You will get a mail</CAlert>}
                              <h1>Forget Password</h1>
                              <p className="text-medium-emphasis">Verify account</p>
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
