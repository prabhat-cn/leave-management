import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CAlert,
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
import makeAnimated from 'react-select/animated'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import API from '../../../api'
import { profilePending, profileSuccess, profileFail } from '../../../store/reducers/profileReducer'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const User = () => {
  const [changeSkill, handleChangeSkill] = useState()
  const [submitted, setSubmitted] = useState(false)

  const [profile, setProfile] = useState({})
  const [profileData, setProfileData] = useState([])
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const handleChange = (newValue, actionMeta) => {
    console.group('Value Changed')
    console.log(newValue)
    console.log(`action: ${actionMeta.action}`)
    console.groupEnd()
    handleChangeSkill()
  }
  const initialValues = {
    first_name: '',
    last_name: '',
    department: '',
    employee_id: '',
    user_email: '',
    personal_email_address: '',
    date_of_birth: '',
    date_of_joining: '',
    blood_group: '',
    uan_no: '',
    aadhaar_no: '',
    pan_no: '',
    salary_bank_no: '',
    experience: '',
    address: '',
    emargency_contact_number: '',
    cv: '',
    skill: '',
  }
  const userProfileSchema = Yup.object().shape({
    first_name: Yup.string()
      .required('First name required')
      .min(3, 'Must be 3 letters')
      .max(20, 'Can be 20 letters or less')
      .matches(/^[A-Za-z]+$/i, 'Name should be letter'),

    last_name: Yup.string()
      .required('Lastname required')
      .min(3, 'Must be 3 letters')
      .max(20, 'Can be 20 letters or less')
      .matches(/^[A-Za-z]+$/i, 'Name should be letter'),

    user_email: Yup.string().required('Email is required').email('Email is invalid'),

    // department: Yup.string().required('Department required'),

    // employee_id: Yup.string().required('Employee Id required'),

    personal_email_address: Yup.string()
      .required('Personal Email is required')
      .email('Email is invalid'),

    date_of_birth: Yup.string().required('Date of birth required'),

    // date_of_joining: Yup.string().required('Date of join required'),

    blood_group: Yup.string().required('Blood group required'),

    uan_no: Yup.string().required('UAN required'),

    aadhaar_no: Yup.string().required('Aadhar number required'),

    pan_no: Yup.string().required('PAN required'),

    // salary_bank_no: Yup.string().required('Salary Bank Account required'),

    experience: Yup.string().required('Experience required'),

    address: Yup.string().required('Address required'),

    emargency_contact_number: Yup.string()
      .required('Emargency contact required')
      .min(10, 'Should be 10 digit number')
      .matches(/^([+]\d{2})?\d{10}$/, 'Invalid contact'),

    // cv: Yup.string().required('Cv required'),

    // skill: Yup.string().required('Select your skill'),
  })

  const updateUserSubmit = (updateData) => {
    dispatch(profilePending())
    API.post('/wp-jwt/v1/profile', updateData)
      .then((response) => {
        setError('')
        setSubmitted(true)
        const updateUserData = response.data
        console.log('updateUserData', updateUserData)
        // response is the payload for redux
        dispatch(profileSuccess(updateUserData))
        // setProfile(updateUserData)
      })
      .catch((error) => {
        console.log(error.response)
        // const { status, data } = error.response
        setSubmitted(false)
        // dispatch(profileFail(error.response))
        // if (status === 403) {
        //   setError(data.message)
        // }
      })
  }

  const onSubmit = async (values, submitProps) => {
    // console.log('form-values', values)
    // console.log('submitProps', submitProps)
    updateUserSubmit(values)
    // getProfile()
    await sleep(500)
    setSubmitted(true)
  }

  const animatedComponents = makeAnimated()
  const skillOptions = [
    { label: 'Node', value: 'Node' },
    { label: 'React', value: 'React' },
    { label: 'Angular', value: 'Angular' },
    { label: 'Vue', value: 'Vue' },
    { label: 'Java', value: 'Java' },
  ]
  // const getProfile = async (profData) => {
  //   try {
  //     const proData = await API.get('/wp-jwt/v1/get-user-info')
  //     console.log('proData', proData.data.data)
  //     // const bulkData = {
  //     //   first_name: proData.data.data.first_name,
  //     // }
  //     setProfileData(proData.data.data)
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }
  // // eslint-disable-next-line react-hooks/rules-of-hooks
  // useEffect(() => {
  //   getProfile()
  // }, [])
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={userProfileSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          // console.log('formik', formik.values)
          const { errors, touched, isValid, dirty, setFieldValue } = formik
          const getProfile = async (profData) => {
            try {
              const proData = await API.get('/wp-jwt/v1/get-user-info')
              console.log('proData', proData)
              const bulkData = proData.data.data
              console.log('bulkData', bulkData)
              const fields = [
                'first_name',
                'last_name',
                'department',
                'employee_id',
                'user_email',
                'personal_email_address',
                'date_of_birth',
                'date_of_joining',
                'blood_group',
                'uan_no',
                'aadhaar_no',
                'pan_no',
                'salary_bank_no',
                'experience',
                'address',
                'emargency_contact_number',
                'skill',
              ]
              fields.forEach((field) => setFieldValue(field, bulkData[field], false))
              setProfileData(proData.data.data)
            } catch (error) {
              console.log(error.message)
            }
          }
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useEffect(() => {
            getProfile()
          }, [])
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
                          {submitted && <CAlert color="success">Profile seved</CAlert>}

                          <CRow xs={{ gutterX: 6 }}>
                            <CCol>
                              <div className="mb-3">
                                <CFormLabel htmlFor="first_name">First Name</CFormLabel>
                                <Field
                                  type="text"
                                  name="first_name"
                                  id="first_name"
                                  placeholder="First Name"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.first_name && touched.first_name ? 'input-error' : null)
                                  }
                                />
                                <ErrorMessage
                                  name="first_name"
                                  style={{ color: 'red', marginBottom: '4px' }}
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </CCol>
                            <CCol>
                              <div className="mb-3">
                                <CFormLabel htmlFor="last_name">Last Name</CFormLabel>
                                <Field
                                  type="text"
                                  name="last_name"
                                  id="last_name"
                                  placeholder="Last Name"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.last_name && touched.last_name ? 'input-error' : null)
                                  }
                                />
                                <ErrorMessage
                                  name="last_name"
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
                                <CFormLabel htmlFor="employee_id">Employee ID</CFormLabel>
                                <Field
                                  type="text"
                                  name="employee_id"
                                  id="employee_id"
                                  placeholder="Type Employee ID"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.employee_id && touched.employee_id
                                      ? 'input-error'
                                      : null)
                                  }
                                />
                                <ErrorMessage
                                  name="employee_id"
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
                                <CFormLabel htmlFor="user_email">Email address</CFormLabel>
                                <Field
                                  type="email"
                                  id="user_email"
                                  name="user_email"
                                  placeholder="name@example.com"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.user_email && touched.user_email ? 'input-error' : null)
                                  }
                                />
                                <ErrorMessage
                                  name="user_email"
                                  style={{ color: 'red', marginBottom: '4px' }}
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </CCol>
                            <CCol>
                              <div className="mb-3">
                                <CFormLabel htmlFor="personal_email_address">
                                  Personal Email address
                                </CFormLabel>
                                <Field
                                  type="email"
                                  id="personal_email_address"
                                  name="personal_email_address"
                                  placeholder="name@example.com"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.personal_email_address && touched.personal_email_address
                                      ? 'input-error'
                                      : null)
                                  }
                                />
                                <ErrorMessage
                                  name="personal_email_address"
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
                                <CFormLabel htmlFor="date_of_birth">Date of Birth</CFormLabel>
                                <Field
                                  type="text"
                                  name="date_of_birth"
                                  id="date_of_birth"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.date_of_birth && touched.date_of_birth
                                      ? 'input-error'
                                      : null)
                                  }
                                />
                                <ErrorMessage
                                  name="date_of_birth"
                                  style={{ color: 'red', marginBottom: '4px' }}
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </CCol>
                            <CCol>
                              <div className="mb-3">
                                <CFormLabel htmlFor="date_of_joining">Date of Joining</CFormLabel>
                                <Field
                                  type="text"
                                  id="date_of_joining"
                                  name="date_of_joining"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.date_of_joining && touched.date_of_joining
                                      ? 'input-error'
                                      : null)
                                  }
                                />
                                <ErrorMessage
                                  name="date_of_joining"
                                  style={{ color: 'red', marginBottom: '4px' }}
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </CCol>
                            <CCol>
                              <div className="mb-3">
                                <CFormLabel htmlFor="blood_group">Blood group</CFormLabel>
                                <Field
                                  type="text"
                                  id="blood_group"
                                  name="blood_group"
                                  placeholder="Blood group"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.blood_group && touched.blood_group
                                      ? 'input-error'
                                      : null)
                                  }
                                />
                                <ErrorMessage
                                  name="blood_group"
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
                                <CFormLabel htmlFor="uan_no">UAN No.</CFormLabel>
                                <Field
                                  type="text"
                                  name="uan_no"
                                  id="uan_no"
                                  placeholder="UAN No"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.uan_no && touched.uan_no ? 'input-error' : null)
                                  }
                                />
                                <ErrorMessage
                                  name="uan_no"
                                  style={{ color: 'red', marginBottom: '4px' }}
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </CCol>
                            <CCol>
                              <div className="mb-3">
                                <CFormLabel htmlFor="aadhaar_no">Aadher No.</CFormLabel>
                                <Field
                                  type="text"
                                  name="aadhaar_no"
                                  id="aadhaar_no"
                                  placeholder="Aadhar Number"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.aadhaar_no && touched.aadhaar_no ? 'input-error' : null)
                                  }
                                />
                                <ErrorMessage
                                  name="aadhaar_no"
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
                                <CFormLabel htmlFor="pan_no">Pan No</CFormLabel>
                                <Field
                                  type="text"
                                  id="pan_no"
                                  name="pan_no"
                                  placeholder="Pan No"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.pan_no && touched.pan_no ? 'input-error' : null)
                                  }
                                />
                                <ErrorMessage
                                  name="pan_no"
                                  style={{ color: 'red', marginBottom: '4px' }}
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </CCol>
                            <CCol>
                              <div className="mb-3">
                                <CFormLabel htmlFor="salary_bank_no">Salary Bank No.</CFormLabel>
                                <Field
                                  type="text"
                                  name="salary_bank_no"
                                  id="salary_bank_no"
                                  placeholder="Salary Bank No"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.salary_bank_no && touched.salary_bank_no
                                      ? 'input-error'
                                      : null)
                                  }
                                />
                                <ErrorMessage
                                  name="salary_bank_no"
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
                                <CFormLabel htmlFor="emargency_contact_number">
                                  Emargency contact number
                                </CFormLabel>
                                <Field
                                  type="text"
                                  name="emargency_contact_number"
                                  id="emargency_contact_number"
                                  placeholder="Emargency contact number"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.emargency_contact_number &&
                                    touched.emargency_contact_number
                                      ? 'input-error'
                                      : null)
                                  }
                                />
                                <ErrorMessage
                                  name="emargency_contact_number"
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
                            <Field
                              component={CreatableSelect}
                              components={animatedComponents}
                              isMulti
                              placeholder="Add your skill"
                              id="skill"
                              name="skill"
                              onChange={handleChange}
                              options={skillOptions}
                            />
                          </div>

                          <CRow className="mt-3">
                            <CCol lg="9">
                              <button type="submit" className="btn btn-primary">
                                Submit
                              </button>
                              {/* <button
                                type="submit"
                                className={
                                  'btn btn-primary' + ' ' + (!(dirty && isValid) ? 'disabled' : '')
                                }
                                disabled={!(dirty && isValid)}
                              >
                                Submit
                              </button> */}
                            </CCol>
                            <CCol lg="3">
                              <CButton
                                color="link"
                                href="/change-password"
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
