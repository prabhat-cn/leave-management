/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
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
  CSpinner,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CWidgetDropdown,
} from '@coreui/react'

import { useForm } from 'react-hook-form'

import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import 'draft-js/dist/Draft.css'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
// if get data
import htmlToDraft from 'html-to-draftjs'

import API from '../../../api'
import { leavePending, leaveSuccess, leaveFail } from '../../../store/reducers/leaveReducer'

const LeaveApplication = (props) => {
  // role based auth start
  console.log(localStorage.getItem('lMuserDataToken'))
  if (localStorage.getItem('lMuserDataToken') !== null) {
    const userData = JSON.parse(localStorage.getItem('lMuserDataToken'))
    if (userData.user_role === 'project_manager') {
      if (props) {
        // eslint-disable-next-line react/prop-types
        props.history.push('/dashboard')
      }
    }
  }
  // role based auth end

  const [submitted, setSubmitted] = useState(false)
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const [profileData, setProfileData] = useState([])
  const [superior, setSuperior] = useState([])
  const [empLeave, setEmpLeave] = useState([])
  const [error, setError] = useState('')
  const dispatch = useDispatch()

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

  const getEmployeeLeave = async () => {
    try {
      const earnedLeave = await API.get('/wp-jwt/v1/employee-leave-list')
      const earnedLeaveData = earnedLeave.data.data
      console.log('earnedLeaveData', earnedLeaveData)
      setEmpLeave(earnedLeaveData)
    } catch (err) {
      console.log(err.message)
    }
  }

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm()

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

  const onSubmit = async (values) => {
    const modifyData = {
      ...values,
      ...{ reason: draftToHtml(convertToRaw(editorState.getCurrentContent())) },
    }
    leaveApplicationSubmit(modifyData)
    reset()
  }
  console.log(watch('example'))

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getEmployeeLeave()
    getProfileValues()
    getSuperior()
  }, [])

  // solved by Draftjs: TypeError: TypeError: this.getImmutable(…) is undefined
  const onEditorStateChange = (editorState) => {
    draftToHtml(convertToRaw(editorState.getCurrentContent()))
    console.log('editorState', draftToHtml(convertToRaw(editorState.getCurrentContent())))
    setEditorState(editorState)
  }

  return (
    <>
      <CContainer className="overflow-hidden">
        <CRow xs={{ gutterY: 5 }}>
          <CCol xs={{ span: 12 }}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Number of Leaves</strong>
              </CCardHeader>
              <CCardBody>
                {/* Card start */}
                {!empLeave ? (
                  <CSpinner color="primary" />
                ) : (
                  <>
                    {empLeave && empLeave.length === 0 ? (
                      <p className="d-flex justify-content-center"><CSpinner color="primary" /></p>
                    ) : (
                <>
                  {empLeave &&
                    empLeave.map((post, index) => (
                      <CRow key={post.id}>
                        <CCol sm="6" lg="4">
                          <CWidgetDropdown
                            className="mb-4"
                            color="primary"
                            value={post.casual_leave}
                            title="Members online"
                          />
                        </CCol>
                        <CCol sm="6" lg="4">
                          <CWidgetDropdown
                            className="mb-4"
                            color="info"
                            value={post.sick_leave}
                            title="Members online"
                          />
                        </CCol>
                        <CCol sm="6" lg="4">
                          <CWidgetDropdown
                            className="mb-4"
                            color="warning"
                            value={post.earn_leave}
                            title="Members online"
                          />
                        </CCol>
                      </CRow>
                  ))}
                </>
                    )}
                    </>
                  )}
                {/* Card end */}
                {/* Table Start */}
                {/* {!empLeave ? (
                  <CSpinner color="primary" />
                ) : (
                  <>
                    {empLeave && empLeave.length === 0 ? (
                      <p className="d-flex justify-content-center">No leaves found!</p>
                    ) : (
                      <>
                        <CTable striped>
                          <CTableHead>
                            <CTableRow>
                              <CTableHeaderCell scope="col">Casual Leave</CTableHeaderCell>
                              <CTableHeaderCell scope="col">Sick Leave</CTableHeaderCell>
                              <CTableHeaderCell scope="col">Earn Leave</CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            {empLeave &&
                              empLeave.map((post, index) => (
                                <CTableRow key={post.id}>
                                  <CTableHeaderCell>{post.casual_leave}</CTableHeaderCell>
                                  <CTableDataCell>{post.sick_leave}</CTableDataCell>
                                  <CTableDataCell>{post.earn_leave}</CTableDataCell>
                                </CTableRow>
                              ))}
                          </CTableBody>
                        </CTable>
                      </>
                    )}
                  </>
                )} */}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>

      <CContainer className="overflow-hidden">
        <CRow xs={{ gutterY: 5 }}>
          <CCol xs={{ span: 12 }}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>
                  Leave Application of {profileData.first_name}&nbsp;{profileData.last_name}
                </strong>
              </CCardHeader>
              <CCardBody>
                <CForm
                  id="leaveApplication"
                  name="leaveApplication"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {submitted && <CAlert color="success">Success! Leave applied</CAlert>}
                  {error !== '' && <CAlert color="danger">Error! Application failed</CAlert>}

                  <CRow xs={{ gutterX: 6 }}>
                    <CCol>
                      <div className="mb-3">
                        <CFormLabel htmlFor="start_date">Start Date</CFormLabel>
                        <CFormControl
                          type="date"
                          data-date-format="dd-mm-YYYY"
                          name="start_date"
                          id="start_date"
                          {...register('start_date', { required: true })}
                        />
                        {errors.start_date?.type === 'required' && (
                          <span style={{ color: 'red' }}>Start date required</span>
                        )}
                      </div>
                    </CCol>
                    <CCol>
                      <div className="mb-3">
                        <CFormLabel htmlFor="end_date">End Date</CFormLabel>
                        <CFormControl
                          type="date"
                          data-date-format="dd-mm-YYYY"
                          id="end_date"
                          name="end_date"
                          {...register('end_date', { required: true })}
                        />
                        {errors.end_date?.type === 'required' && (
                          <span style={{ color: 'red' }}>End date required</span>
                        )}
                      </div>
                    </CCol>
                    <CCol>
                      <div className="mb-3">
                        <CFormLabel htmlFor="superior_user_id">
                          Project Manager/ Superior
                        </CFormLabel>
                        <CFormSelect
                          name="superior_user_id"
                          id="superior_user_id"
                          {...register('superior_user_id', { required: true })}
                        >
                          <option value="">Select option</option>
                          {superior &&
                            superior.map((manager) => (
                              // eslint-disable-next-line react/jsx-key
                              <option key={manager.id} value={manager.id}>
                                {manager.name}
                              </option>
                            ))}
                        </CFormSelect>
                        {errors.superior_user_id && (
                          <span style={{ color: 'red' }}>Select any one</span>
                        )}
                      </div>
                    </CCol>
                  </CRow>
                  <CRow xs={{ gutterX: 6 }}>
                    <CCol>
                      <div className="mb-3">
                        <CFormLabel htmlFor="reason">Reason to Leave</CFormLabel>
                        {/* <CFormControl component="textarea" name="reason" id="reason" {...register("reason", { required: true, minLength: 8})} placeholder="Type reason here"></CFormControl> */}

                        <Editor
                          editorState={editorState}
                          toolbarClassName="toolbarClassName"
                          wrapperClassName="wrapperClassName"
                          editorClassName="form-control"
                          onEditorStateChange={onEditorStateChange}
                          name="reason"
                          id="reason"
                          placeholder="Type reason here"
                          toolbar={{
                            inline: { inDropdown: true },
                            list: { inDropdown: true },
                            textAlign: { inDropdown: true },
                            link: { inDropdown: true },
                            history: { inDropdown: true },
                          }}
                        />
                        {/* <textarea disabled name="reason" id="reason" 
                        value={editorState && draftToHtml(convertToRaw(editorState.getCurrentContent()))}></textarea> */}

                        {errors.reason?.type === 'required' && (
                          <span style={{ color: 'red' }}>Reason required</span>
                        )}
                        {errors.reason?.type === 'minLength' && (
                          <span style={{ color: 'red' }}>Minimum length is 8 characters</span>
                        )}
                      </div>
                    </CCol>
                  </CRow>
                  <CRow className="mt-3">
                    <CCol lg="9">
                      <CButton
                        type="submit"
                        // disabled={!isValid}
                      >
                        Submit
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <style>{userCss}</style>
      </CContainer>
    </>
  )
}

export default LeaveApplication

const userCss = `
.react-date-picker__wrapper {
  border: none !important;
}
`
