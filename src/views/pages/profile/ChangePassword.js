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
  CCardHeader,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const ChangePassword = () => {
  const [isRevealPwd, setIsRevealPwd] = useState(false)
  const [isRevealCPwd, setIsRevealCPwd] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const initialValues = {
    password: '',
    repeatPassword: '',
  }
  const changePasswordSchema = Yup.object().shape({
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
      <Formik
        initialValues={initialValues}
        validationSchema={changePasswordSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          // console.log('formik', formik.values)
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
                              {submitted && (
                                <CAlert color="success">
                                  Success! Account Created Successfully
                                </CAlert>
                              )}
                              <CInputGroup className="mb-3 mt-2 pwd-container">
                                <CInputGroupText>
                                  <CIcon name="cil-lock-locked" />
                                </CInputGroupText>
                                <Field
                                  type={isRevealPwd ? 'text' : 'password'}
                                  name="password"
                                  id="password"
                                  placeholder="New password"
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
                              <CInputGroup className="mb-4 mt-2 pwd-container">
                                <CInputGroupText>
                                  <CIcon name="cil-lock-locked" />
                                </CInputGroupText>
                                <Field
                                  type={isRevealCPwd ? 'text' : 'password'}
                                  name="repeatPassword"
                                  id="repeatPassword"
                                  placeholder="Repeat new password"
                                  autoComplete="on"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.repeatPassword && touched.repeatPassword
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
                                name="repeatPassword"
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
                                    Create Account
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
