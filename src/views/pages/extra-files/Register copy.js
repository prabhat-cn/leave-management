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
const Register = () => {
  const [isRevealPwd, setIsRevealPwd] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const initialValues = {
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  }
  const registerSchema = Yup.object().shape({
    name: Yup.string()
      .required('Username required')
      .min(3, 'Must be 3 letters')
      .max(20, 'Can be 20 letters or less')
      .matches(/^[A-Za-z]+$/i, 'Username should be letter'),

    email: Yup.string().required('Email is required').email('Email is invalid'),

    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required')
      .matches(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
        'One Uppercase, One Lowercase, One Number and one special case Character',
      ),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Repeat Password is required'),
  })
  const onSubmit = async (values, submitProps) => {
    console.log('form-values', JSON.stringify(values, null, 2))
    console.log('submitProps', submitProps)
    await sleep(500)
    setSubmitted(true)
    submitProps.resetForm()
  }
  return (
    <>
      <Formik initialValues={initialValues} validationSchema={registerSchema} onSubmit={onSubmit}>
        {(formik) => {
          // console.log('formik', formik.values)
          const { errors, touched, isValid, dirty } = formik

          return (
            <>
              <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
                <CContainer>
                  <CRow className="justify-content-center">
                    <CCol md="9" lg="7" xl="6">
                      <CCard className="mx-4">
                        <CCardBody className="p-4">
                          <Form id="register" name="register">
                            {submitted && (
                              <CAlert color="success">Success! Account Created Successfully</CAlert>
                            )}
                            <h1>Register</h1>
                            <p className="text-medium-emphasis">Create your account</p>
                            <CInputGroup className="mb-3">
                              <CInputGroupText>
                                <CIcon name="cil-user" />
                              </CInputGroupText>
                              <CFormControl placeholder="Username" autoComplete="username" />
                            </CInputGroup>
                            <CInputGroup className="mb-3">
                              <CInputGroupText>@</CInputGroupText>
                              <CFormControl placeholder="Email" autoComplete="email" />
                            </CInputGroup>
                            <CInputGroup className="mb-3">
                              <CInputGroupText>
                                <CIcon name="cil-lock-locked" />
                              </CInputGroupText>
                              <CFormControl
                                type="password"
                                placeholder="Password"
                                autoComplete="new-password"
                              />
                            </CInputGroup>
                            <CInputGroup className="mb-4">
                              <CInputGroupText>
                                <CIcon name="cil-lock-locked" />
                              </CInputGroupText>
                              <CFormControl
                                type="password"
                                placeholder="Repeat password"
                                autoComplete="new-password"
                              />
                            </CInputGroup>
                            <CButton color="success" block>
                              Create Account
                            </CButton>
                            &nbsp;
                            <p className="account-css text-right">Already have an account &nbsp;</p>
                            <CButton color="link" className="px-2 text-right">
                              <Link to="/login">Sign in</Link>
                            </CButton>
                          </Form>
                        </CCardBody>
                      </CCard>
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

export default Register

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
