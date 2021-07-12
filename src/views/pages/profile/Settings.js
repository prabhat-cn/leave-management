/* eslint-disable prettier/prettier */
import React from 'react'
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
} from '@coreui/react'
import { DocsCallout, Example } from 'src/reusable'

const Settings = () => {
  return (
    <CRow>
      {/* <CCol xs={12}>
        <DocsCallout name="Form Control" href="forms/form-control" />
      </CCol> */}
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Settings</strong>
          </CCardHeader>
          <CCardBody>
            <h1>Settings</h1>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Settings
