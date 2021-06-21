/* eslint-disable prettier/prettier */
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
  CFormSelect,
  CCardTitle,
  CCardText,
  CCardImage,
} from '@coreui/react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import {Editor, EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css'
import API from '../../../api'
import { leavePending, leaveSuccess, leaveFail } from '../../../store/reducers/leaveReducer'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const LeaveApplication = () => {
  const [submitted, setSubmitted] = useState(false)
  const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty(),
  );

  const [profileData, setProfileData] = useState([])
  const [superior, setSuperior] = useState([])
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const initialValues = {
    start_date: '',
    end_date: '',
    superior_user_id: '',
    reason: '',
  }
  const userProfileSchema = Yup.object().shape({

    start_date: Yup.string().required('Start date required'),

    end_date: Yup.string().required('End date required'),
  
    superior_user_id: Yup.string()
      .required("Select any one"),

    reason: Yup.string()
        .required("Reason is required")
        .min(8, "Must be 8 characters or more"),
  })

  const getProfileValues = async () => {
    try {
      const proData = await API.get('/wp-jwt/v1/get-user-info')
      const bulkData = proData.data.data
      setProfileData(bulkData)
    } catch (err) {
      console.log(err.message)
    }
  }
  

  const getSuperior = async () => {
    try {
      const superiors = await API.get('/wp-jwt/v1/employee-projectmanager-relation')
      const superiorData = superiors.data.data
      console.log('superiors', superiorData)
      setSuperior(superiorData)
    } catch (err) {
      console.log(err.message)
    }
  }

  const leaveApplicationSubmit = (addData) => {
    dispatch(leavePending())
    API.post('/wp-jwt/v1/apply-leave', addData)
      .then((response) => {
        setError('')
        setSubmitted(true)
        setTimeout(() => {
          setSubmitted(false)
        }, 2000)
        const leaveData = response.data
        console.log('leaveData', leaveData)
        dispatch(leaveSuccess(leaveData))

        if (leaveData.status === 0) {
          setError(leaveData.message)
        }
      })
      .catch((error) => {
        console.log(error.response)
        const { status, data } = error.response
        setSubmitted(false)
        dispatch(leaveFail(error.response))
        if (status === 403) {
          setError(data.message)
        }
      })
  }

  const onSubmit = async (values, submitProps) => {
    leaveApplicationSubmit(values)
    await sleep(500)
    submitProps.resetForm()
  }
  

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getProfileValues()
    getSuperior()
  }, [])

  const editor = React.useRef(null);
  function focusEditor() {
    editor.current.focus();
  }
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
          const { errors, touched, isValid, dirty } = formik
          return (
            <>
              <CContainer className="overflow-hidden">
                <CRow xs={{ gutterY: 5 }}>
                  <CCol xs={{ span: 12 }}>
                    <CCard className="mb-4">
                      <CCardHeader>
                        <strong>Leave Application of {profileData.first_name}&nbsp;{profileData.last_name}</strong>
                      </CCardHeader>
                      <CCardBody>
                        <Form id="leaveApplication" name="leaveApplication">
                          {submitted && <CAlert color="success">Success! Leave applied</CAlert>}
                          {error !== '' && <CAlert color="danger">Error! Application failed</CAlert>}

                          <CRow xs={{ gutterX: 6 }}>
                            <CCol>
                              <div className="mb-3">
                                <CFormLabel htmlFor="start_date">Start Date</CFormLabel>
                                <Field
                                  type="date"
                                  data-date-format="dd-mm-YYYY"
                                  name="start_date"
                                  id="start_date"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.start_date && touched.start_date
                                      ? 'input-error'
                                      : null)
                                  }
                                />
                                <ErrorMessage
                                  name="start_date"
                                  style={{ color: 'red', marginBottom: '4px' }}
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </CCol>
                            <CCol>
                              <div className="mb-3">
                                <CFormLabel htmlFor="end_date">End Date</CFormLabel>
                                <Field
                                  type="date"
                                  data-date-format="dd-mm-YYYY"
                                  id="end_date"
                                  name="end_date"
                                  className={
                                    'form-control' +
                                    ' ' +
                                    (errors.end_date && touched.end_date
                                      ? 'input-error'
                                      : null)
                                  }
                                />
                                <ErrorMessage
                                  name="end_date"
                                  style={{ color: 'red', marginBottom: '4px' }}
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </CCol>
                            <CCol>
                              <div className="mb-3">
                                <CFormLabel htmlFor="superior_user_id">Project Manager/ Superior</CFormLabel>
                                <Field as="select" name="superior_user_id" id="superior_user_id"
                                  className={
                                    'form-select form-control' +
                                    ' ' +
                                    (errors.superior_user_id && touched.superior_user_id
                                      ? 'input-error'
                                      : null)
                                  }>
                                    <option value=''>Select option</option>
                                    {superior && superior.map((manager) => (
                                        // eslint-disable-next-line react/jsx-key
                                        <option key={manager.id} value={manager.id}>{manager.name}</option>
                                    ))}
                                </Field>
                                <ErrorMessage
                                  name="superior_user_id"
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
                                <CFormLabel htmlFor="start_date">Reason to Leave</CFormLabel>
                                <Field as="textarea" name="reason" 
                                className={'form-control'+ ' ' + (errors.reason && touched.reason ? "input-error" : null)} id="reason" placeholder="Reason to Leave"></Field>
                                {/* <Field component={Editor} name="reason" editorState={editorState} onChange={setEditorState} /> */}
                                {/* <div
                                style={{ border: "1px solid black", minHeight: "6em", cursor: "text" }}
                                onClick={focusEditor}
                                >
                                <Editor
                                ref={editor}
                                editorState={editorState}
                                onChange={setEditorState}
                                placeholder="Write something!"
                                />
                                </div> */}
                                <ErrorMessage
                                  name="reason"
                                  style={{ color: 'red', marginBottom: '4px' }}
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </CCol>
                          </CRow>
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
                          </CRow>
                        </Form>
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

export default LeaveApplication

const userCss = `
.react-date-picker__wrapper {
  border: none !important;
}
`
