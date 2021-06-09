/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormControl,
  CFormLabel,
  CRow,
  CContainer,
  CAvatar,
  CCardTitle,
  CCardText,
  CCardImage,
} from '@coreui/react'
import DatePicker from 'react-date-picker'
import CreatableSelect from 'react-select/creatable'
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik'
import * as Yup from 'yup'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const User = () => {
  const [changeSkill, handleChangeSkill] = useState()
  const [submitted, setSubmitted] = useState(false)
  const handleChange = (newValue, actionMeta) => {
    console.group('Value Changed')
    console.log(newValue)
    console.log(`action: ${actionMeta.action}`)
    console.groupEnd()
    handleChangeSkill()
  }
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    employeeId: '',
    personalEmail: '',
    dob: '',
    doj: '',
    bloodGroup: '',
    UAN: '',
    aadhar: '',
    pan: '',
    salaryBank: '',
    experience: '',
    address: '',
    emargencyContact: '',
    cv: '',
    skill: '',
  }
  const skillOptions = [
    { label: 'Node', value: 'Node' },
    { label: 'React', value: 'React' },
    { label: 'Angular', value: 'Angular' },
    { label: 'Vue', value: 'Vue' },
  ]

  const userProfileSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('Firstname required')
      .min(3, 'Must be 3 letters')
      .max(20, 'Can be 20 letters or less')
      .matches(/^[A-Za-z]+$/i, 'Firstname should be letter'),

    lastName: Yup.string()
      .required('Lastname required')
      .min(3, 'Must be 3 letters')
      .max(20, 'Can be 20 letters or less')
      .matches(/^[A-Za-z]+$/i, 'Lastname should be letter'),

    email: Yup.string().required('Email is required').email('Email is invalid'),

    department: Yup.string().required('Department required'),

    employeeId: Yup.string().required('Employee Id required'),

    personalEmail: Yup.string().required('Personal Email is required').email('Email is invalid'),

    dob: Yup.string().required('Date of birth required'),

    doj: Yup.string().required('Date of join required'),

    bloodGroup: Yup.string().required('Blood group required'),

    UAN: Yup.string().required('UAN required'),

    aadhar: Yup.string().required('Aadhar number required'),

    pan: Yup.string().required('PAN required'),

    salaryBank: Yup.string().required('Salary Bank Account required'),

    experience: Yup.string().required('Experience required'),

    address: Yup.string().required('Address required'),

    emargencyContact: Yup.string()
      .required('Emargency contact required')
      .matches(/^[0-9]{10}$/, 'Should be 10 digit number'),

    cv: Yup.string().required('Cv required'),

    skill: Yup.string().required('Select your skill'),
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
        validationSchema={userProfileSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          // console.log('formik', formik.values)
          const { errors, touched, isValid, dirty } = formik

          return (
            <>
              <CContainer className="overflow-hidden">
                <CRow xs={{ gutterY: 5 }}>
                  <CCol xs={{ span: 8 }}>
                    <CCard className="mb-4">
                      <CCardHeader>
                        <strong>User Profile</strong>
                      </CCardHeader>
                      <CCardBody>
                        <Form id="userProfile" name="userProfile">
                          <CRow xs={{ gutterX: 6 }}>
                            <CCol>
                              <div className="mb-3">
                                <CFormLabel htmlFor="firstName">First Name</CFormLabel>
                                <Field
                                  type="text"
                                  name="firstName"
                                  id="firstName"
                                  placeholder="First Name"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.firstName && touched.firstName ? 'input-error' : null)
                                  }
                                />
                                <ErrorMessage
                                  name="firstName"
                                  style={{ color: 'red', marginBottom: '4px' }}
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </CCol>
                            <CCol>
                              <div className="mb-3">
                                <CFormLabel htmlFor="lastName">Last Name</CFormLabel>
                                <Field
                                  type="text"
                                  name="lastName"
                                  id="lastName"
                                  placeholder="Last Name"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.lastName && touched.lastName ? 'input-error' : null)
                                  }
                                />
                                <ErrorMessage
                                  name="lastName"
                                  style={{ color: 'red', marginBottom: '4px' }}
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </CCol>
                          </CRow>
                          <CRow xs={{ gutterX: 6 }}>
                            <CCol>
                              <div className="mb-3">
                                <CFormLabel htmlFor="department">Department</CFormLabel>
                                <Field
                                  type="text"
                                  id="department"
                                  name="department"
                                  placeholder="Department"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.department && touched.department ? 'input-error' : null)
                                  }
                                />
                                <ErrorMessage
                                  name="department"
                                  style={{ color: 'red', marginBottom: '4px' }}
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </CCol>
                            <CCol>
                              <div className="mb-3">
                                <CFormLabel htmlFor="employeeId">Employee ID</CFormLabel>
                                <Field
                                  type="text"
                                  name="employeeId"
                                  id="employeeId"
                                  placeholder="Type Employee ID"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.employeeId && touched.employeeId ? 'input-error' : null)
                                  }
                                />
                                <ErrorMessage
                                  name="employeeId"
                                  style={{ color: 'red', marginBottom: '4px' }}
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </CCol>
                          </CRow>
                          <CRow xs={{ gutterX: 6 }}>
                            <CCol>
                              <div className="mb-3">
                                <CFormLabel htmlFor="email">Email address</CFormLabel>
                                <Field
                                  type="email"
                                  id="email"
                                  name="email"
                                  placeholder="name@example.com"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.email && touched.email ? 'input-error' : null)
                                  }
                                />
                                <ErrorMessage
                                  name="email"
                                  style={{ color: 'red', marginBottom: '4px' }}
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </CCol>
                            <CCol>
                              <div className="mb-3">
                                <CFormLabel htmlFor="personalEmail">
                                  Personal Email address
                                </CFormLabel>
                                <Field
                                  type="email"
                                  id="personalEmail"
                                  name="personalEmail"
                                  placeholder="name@example.com"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.personalEmail && touched.personalEmail
                                      ? 'input-error'
                                      : null)
                                  }
                                />
                                <ErrorMessage
                                  name="personalEmail"
                                  style={{ color: 'red', marginBottom: '4px' }}
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </CCol>
                          </CRow>
                          <CRow xs={{ gutterX: 6 }}>
                            <CCol>
                              <div className="mb-3">
                                <CFormLabel htmlFor="dob">Date of Birth</CFormLabel>
                                {/* <CFormControl type="text" name="dob" id="dob" placeholder="Date of Birth" /> */}
                                <Field
                                  type="date"
                                  name="dob"
                                  id="dob"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.dob && touched.dob ? 'input-error' : null)
                                  }
                                />
                                <ErrorMessage
                                  name="dob"
                                  style={{ color: 'red', marginBottom: '4px' }}
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </CCol>
                            <CCol>
                              <div className="mb-3">
                                <CFormLabel htmlFor="doj">Date of Joining</CFormLabel>
                                <Field
                                  type="date"
                                  id="doj"
                                  name="doj"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.doj && touched.doj ? 'input-error' : null)
                                  }
                                />
                                <ErrorMessage
                                  name="doj"
                                  style={{ color: 'red', marginBottom: '4px' }}
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </CCol>
                            <CCol>
                              <div className="mb-3">
                                <CFormLabel htmlFor="bloodGroup">Blood group</CFormLabel>
                                <Field
                                  type="text"
                                  id="bloodGroup"
                                  name="bloodGroup"
                                  placeholder="Blood group"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.bloodGroup && touched.bloodGroup ? 'input-error' : null)
                                  }
                                />
                                <ErrorMessage
                                  name="bloodGroup"
                                  style={{ color: 'red', marginBottom: '4px' }}
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </CCol>
                          </CRow>
                          <CRow xs={{ gutterX: 6 }}>
                            <CCol>
                              <div className="mb-3">
                                <CFormLabel htmlFor="UAN">UAN No.</CFormLabel>
                                <Field
                                  type="text"
                                  name="UAN"
                                  id="UAN"
                                  placeholder="UAN No"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.UAN && touched.UAN ? 'input-error' : null)
                                  }
                                />
                                <ErrorMessage
                                  name="UAN"
                                  style={{ color: 'red', marginBottom: '4px' }}
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </CCol>
                            <CCol>
                              <div className="mb-3">
                                <CFormLabel htmlFor="aadhar">Aadher No.</CFormLabel>
                                <Field
                                  type="text"
                                  name="aadhar"
                                  id="aadhar"
                                  placeholder="Aadhar Number"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.aadhar && touched.aadhar ? 'input-error' : null)
                                  }
                                />
                                <ErrorMessage
                                  name="aadhar"
                                  style={{ color: 'red', marginBottom: '4px' }}
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </CCol>
                          </CRow>
                          <CRow xs={{ gutterX: 6 }}>
                            <CCol>
                              <div className="mb-3">
                                <CFormLabel htmlFor="pan">Pan No</CFormLabel>
                                <Field
                                  type="text"
                                  id="pan"
                                  name="pan"
                                  placeholder="Pan No"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.pan && touched.pan ? 'input-error' : null)
                                  }
                                />
                                <ErrorMessage
                                  name="pan"
                                  style={{ color: 'red', marginBottom: '4px' }}
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </CCol>
                            <CCol>
                              <div className="mb-3">
                                <CFormLabel htmlFor="salaryBank">Salary Bank No.</CFormLabel>
                                <Field
                                  type="text"
                                  name="salaryBank"
                                  id="salaryBank"
                                  placeholder="Salary Bank No"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.salaryBank && touched.salaryBank ? 'input-error' : null)
                                  }
                                />
                                <ErrorMessage
                                  name="salaryBank"
                                  style={{ color: 'red', marginBottom: '4px' }}
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </CCol>
                          </CRow>
                          <CRow xs={{ gutterX: 6 }}>
                            <CCol>
                              <div className="mb-3">
                                <CFormLabel htmlFor="experience">Experience</CFormLabel>
                                <Field
                                  type="text"
                                  id="experience"
                                  name="experience"
                                  placeholder="Experience"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.experience && touched.experience ? 'input-error' : null)
                                  }
                                />
                                <ErrorMessage
                                  name="experience"
                                  style={{ color: 'red', marginBottom: '4px' }}
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </CCol>
                            <CCol>
                              <div className="mb-3">
                                <CFormLabel htmlFor="address">Address</CFormLabel>
                                <Field
                                  type="text"
                                  name="address"
                                  id="address"
                                  placeholder="Address"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.address && touched.address ? 'input-error' : null)
                                  }
                                />
                                <ErrorMessage
                                  name="address"
                                  style={{ color: 'red', marginBottom: '4px' }}
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </CCol>
                          </CRow>
                          <CRow xs={{ gutterX: 6 }}>
                            <CCol>
                              <div className="mb-3">
                                <CFormLabel htmlFor="emargencyContact">
                                  Emargency contact number
                                </CFormLabel>
                                <Field
                                  type="text"
                                  name="emargencyContact"
                                  id="emargencyContact"
                                  placeholder="Emargency contact number"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.emargencyContact && touched.emargencyContact
                                      ? 'input-error'
                                      : null)
                                  }
                                />
                                <ErrorMessage
                                  name="emargencyContact"
                                  style={{ color: 'red', marginBottom: '4px' }}
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </CCol>
                            <CCol>
                              <div className="mb-3">
                                <CFormLabel htmlFor="cv">Resume(CV)</CFormLabel>
                                <Field
                                  type="file"
                                  id="cv"
                                  name="cv"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.cv && touched.cv ? 'input-error' : null)
                                  }
                                />
                                <ErrorMessage
                                  name="cv"
                                  style={{ color: 'red', marginBottom: '4px' }}
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </CCol>
                          </CRow>
                          <div className="mb-3">
                            <CFormLabel htmlFor="skill">Your Skill</CFormLabel>
                            <CreatableSelect
                              isMulti
                              placeholder="Add your skill"
                              id="skill"
                              name="skill"
                              onChange={handleChange}
                              options={skillOptions}
                              value={formik.values.skill}
                              onChange={formik.handleChange}
                            />
                          </div>

                          <CRow className="mt-3">
                            <CCol lg="9">
                              <CButton color="primary">Primary</CButton>
                            </CCol>
                            <CCol lg="3">
                              <CButton
                                color="link"
                                href="/profile/change-password"
                                className="px-0 text-right"
                              >
                                Change Password
                              </CButton>
                            </CCol>
                          </CRow>
                        </Form>
                      </CCardBody>
                    </CCard>
                  </CCol>
                  <CCol xs={{ span: 4 }}>
                    <CCard className="mb-4">
                      <CCardBody>
                        <div className="col mb-3 text-center av-img">
                          <CAvatar
                            src="avatars/5.jpg"
                            className="av-imgs"
                            color="secondary"
                            size="xl"
                          />
                        </div>
                        <CForm>
                          <div className="mb-3 text-center">
                            <CCardTitle>
                              <h3>Alec Thompson</h3>
                            </CCardTitle>
                            <CCardTitle>
                              <h5>Software Engineer</h5>
                            </CCardTitle>
                            <CCardTitle>
                              <h6>Capital Numbers Infotech</h6>
                            </CCardTitle>
                          </div>
                        </CForm>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>
                <style>{userCss}</style>
              </CContainer>
            </>
          )
        }}
      </Formik>
      <style>{userCss}</style>
    </>
  )
}

export default User

const userCss = `
.react-date-picker__wrapper {
  border: none !important;
}
`
