/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from 'react'
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
  CFormSelect
} from '@coreui/react'
import { useForm } from 'react-hook-form'
import JoditEditor from "jodit-react";
import API from '../../../api'
import { leavePending, leaveSuccess, leaveFail } from '../../../store/reducers/leaveReducer'

const LeaveApplication = () => {
  const [submitted, setSubmitted] = useState(false)
  const editor = useRef(null)
  console.log('editor-ref', editor)
	const [content, setContent] = useState('')
  const config = {
		readonly: false
	}

  const [profileData, setProfileData] = useState([])
  const [superior, setSuperior] = useState([])
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

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors, isSubmitting, isValid }
  } = useForm({mode: "onChange"})

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
    leaveApplicationSubmit(values)
    reset()
  }
  console.log(watch('example'))

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getProfileValues()
    getSuperior()
  }, [])
  return (
    <>
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
                        {/* <CFormControl component="textarea" name="reason" id="reason" {...register("reason", { required: true, minLength: 8})} placeholder="Type reason here"></CFormControl>  */}
                        <JoditEditor
                        ref={editor}
                        value={''}
                        config={config}
                        tabIndex={1}
                        // onBlur={newContent => setContent(newContent)}
                        onChange={newContent => {}}
                        name="reason" id="reason" {...register("reason", { required: true, minLength: 8})} placeholder="Type reason here"
                        />

                        {errors.reason?.type === "required" && <span style={{color: 'red'}}>Reason required</span>}
                        {errors.reason?.type === "minLength" && <span style={{color: 'red'}}>Minimum length is 8 characters</span>}
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
