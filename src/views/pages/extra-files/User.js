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
  const handleChanged = (newValue, actionMeta) => {
    console.group('Value Changed')
    console.log(newValue)
    console.log(`action: ${actionMeta.action}`)
    console.groupEnd()
    handleChangeSkill()
  }
  const formik = useFormik({
    initialValues: {
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
    },
    validationSchema: Yup.object({
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
    }),
  })

  const skillOptions = [
    { label: 'Node', value: 'Node' },
    { label: 'React', value: 'React' },
    { label: 'Angular', value: 'Angular' },
    { label: 'Vue', value: 'Vue' },
  ]
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
                <form id="userProfile" name="userProfile">
                  <CRow xs={{ gutterX: 6 }}>
                    <CCol>
                      <div className="mb-3">
                        <CFormLabel htmlFor="firstName">First Name</CFormLabel>
                        <CFormControl
                          type="text"
                          name="firstName"
                          id="firstName"
                          placeholder="First Name"
                          value={formik.values.firstName}
                          onChange={formik.handleChange}
                        />

                        {formik.errors.firstName && formik.touched.firstName && (
                          <p>{formik.errors.firstName}</p>
                        )}
                      </div>
                    </CCol>
                    <CCol>
                      <div className="mb-3">
                        <CFormLabel htmlFor="lastName">Last Name</CFormLabel>
                        <CFormControl
                          type="text"
                          name="lastName"
                          id="lastName"
                          placeholder="Last Name"
                        />
                      </div>
                    </CCol>
                  </CRow>
                  <CRow xs={{ gutterX: 6 }}>
                    <CCol>
                      <div className="mb-3">
                        <CFormLabel htmlFor="department">Department</CFormLabel>
                        <CFormControl
                          type="text"
                          id="department"
                          name="department"
                          placeholder="Department"
                        />
                      </div>
                    </CCol>
                    <CCol>
                      <div className="mb-3">
                        <CFormLabel htmlFor="employeeId">Employee ID</CFormLabel>
                        <CFormControl
                          type="text"
                          name="employeeId"
                          id="employeeId"
                          placeholder="Type Employee ID"
                        />
                      </div>
                    </CCol>
                  </CRow>
                  <CRow xs={{ gutterX: 6 }}>
                    <CCol>
                      <div className="mb-3">
                        <CFormLabel htmlFor="email">Email address</CFormLabel>
                        <CFormControl
                          type="email"
                          id="email"
                          name="email"
                          placeholder="name@example.com"
                        />
                      </div>
                    </CCol>
                    <CCol>
                      <div className="mb-3">
                        <CFormLabel htmlFor="personalEmail">Personal Email address</CFormLabel>
                        <CFormControl
                          type="email"
                          id="personalEmail"
                          name="personalEmail"
                          placeholder="name@example.com"
                        />
                      </div>
                    </CCol>
                  </CRow>
                  <CRow xs={{ gutterX: 6 }}>
                    <CCol>
                      <div className="mb-3">
                        <CFormLabel htmlFor="dob">Date of Birth</CFormLabel>
                        <CFormControl type="date" name="dob" id="dob" />
                      </div>
                    </CCol>
                    <CCol>
                      <div className="mb-3">
                        <CFormLabel htmlFor="doj">Date of Joining</CFormLabel>
                        <CFormControl type="date" id="doj" name="doj" />
                      </div>
                    </CCol>
                    <CCol>
                      <div className="mb-3">
                        <CFormLabel htmlFor="bloodGroup">Blood group</CFormLabel>
                        <CFormControl
                          type="text"
                          id="bloodGroup"
                          name="bloodGroup"
                          placeholder="Blood group"
                        />
                      </div>
                    </CCol>
                  </CRow>
                  <CRow xs={{ gutterX: 6 }}>
                    <CCol>
                      <div className="mb-3">
                        <CFormLabel htmlFor="UAN">UAN No.</CFormLabel>
                        <CFormControl type="text" name="UAN" id="UAN" placeholder="UAN No" />
                      </div>
                    </CCol>
                    <CCol>
                      <div className="mb-3">
                        <CFormLabel htmlFor="aadhar">Aadher No.</CFormLabel>
                        <CFormControl
                          type="text"
                          name="aadhar"
                          id="aadhar"
                          placeholder="Aadhar Number"
                        />
                      </div>
                    </CCol>
                  </CRow>
                  <CRow xs={{ gutterX: 6 }}>
                    <CCol>
                      <div className="mb-3">
                        <CFormLabel htmlFor="pan">Pan No</CFormLabel>
                        <CFormControl type="text" id="pan" name="pan" placeholder="Pan No" />
                      </div>
                    </CCol>
                    <CCol>
                      <div className="mb-3">
                        <CFormLabel htmlFor="salaryBank">Salary Bank No.</CFormLabel>
                        <CFormControl
                          type="text"
                          name="salaryBank"
                          id="salaryBank"
                          placeholder="Salary Bank No"
                        />
                      </div>
                    </CCol>
                  </CRow>
                  <CRow xs={{ gutterX: 6 }}>
                    <CCol>
                      <div className="mb-3">
                        <CFormLabel htmlFor="experience">Experience</CFormLabel>
                        <CFormControl
                          type="text"
                          id="experience"
                          name="experience"
                          placeholder="Experience"
                        />
                      </div>
                    </CCol>
                    <CCol>
                      <div className="mb-3">
                        <CFormLabel htmlFor="address">Address</CFormLabel>
                        <CFormControl
                          type="text"
                          name="address"
                          id="address"
                          placeholder="Address"
                        />
                      </div>
                    </CCol>
                  </CRow>
                  <CRow xs={{ gutterX: 6 }}>
                    <CCol>
                      <div className="mb-3">
                        <CFormLabel htmlFor="emargencyContact">Emargency contact number</CFormLabel>
                        <CFormControl
                          type="text"
                          name="emargencyContact"
                          id="emargencyContact"
                          placeholder="Emargency contact number"
                        />
                      </div>
                    </CCol>
                    <CCol>
                      <div className="mb-3">
                        <CFormLabel htmlFor="cv">Resume(CV)</CFormLabel>
                        <CFormControl type="file" id="cv" name="cv" />
                      </div>
                    </CCol>
                  </CRow>
                  <div className="mb-3">
                    <CFormLabel htmlFor="skill">Your Skill</CFormLabel>
                    <CFormControl
                      component={CreatableSelect}
                      isMulti
                      placeholder="Add your skill"
                      id="skill"
                      name="skill"
                      onChange={handleChanged}
                      options={skillOptions}
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
                </form>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs={{ span: 4 }}>
            <CCard className="mb-4">
              <CCardBody>
                <div className="col mb-3 text-center av-img">
                  <CAvatar src="avatars/5.jpg" className="av-imgs" color="secondary" size="xl" />
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
