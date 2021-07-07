/* eslint-disable prettier/prettier */
import React from 'react'
import {
    CAvatar,
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CProgress,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
  } from '@coreui/react'

  
const UserViews = () => {
  return (
    <>
      <CCardFooter>
        <CRow className="text-center">
          <CCol md sm="12" className="mb-sm-2 mb-0">
            <div className="text-medium-emphasis">Visits</div>
            <strong>29.703 Users (40%)</strong>
            <CProgress thin className="mt-2" precision={1} color="success" value={40} />
          </CCol>
          <CCol md sm="12" className="mb-sm-2 mb-0">
            <div className="text-medium-emphasis">Unique</div>
            <strong>24.093 Users (20%)</strong>
            <CProgress thin className="mt-2" precision={1} color="info" value={40} />
          </CCol>
          <CCol md sm="12" className="mb-sm-2 mb-0">
            <div className="text-medium-emphasis">Pageviews</div>
            <strong>78.706 Views (60%)</strong>
            <CProgress thin className="mt-2" precision={1} color="warning" value={40} />
          </CCol>
          <CCol md sm="12" className="mb-sm-2 mb-0">
            <div className="text-medium-emphasis">New Users</div>
            <strong>22.123 Users (80%)</strong>
            <CProgress thin className="mt-2" precision={1} color="danger" value={40} />
          </CCol>
          <CCol md sm="12" className="mb-sm-2 mb-0">
            <div className="text-medium-emphasis">Bounce Rate</div>
            <strong>Average Rate (40.15%)</strong>
            <CProgress thin className="mt-2" precision={1} value={40} />
          </CCol>
        </CRow>
      </CCardFooter>
    </>
  )
}

export default UserViews
