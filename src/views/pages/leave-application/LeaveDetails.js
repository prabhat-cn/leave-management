/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { DateTime } from 'luxon'
import DataTable, { createTheme } from 'react-data-table-component'
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CSpinner,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormLabel,
  CFormControl,
} from '@coreui/react'
import API from '../../../api'
import {ViewIcon} from '../../../constant/icons'

const LeaveDetails = () => {
  const [visible, setVisible] = useState(false)
  const [singleLeave, setSingleLeave] = useState({})
  const [posts, setPosts] = useState()
  const switchClasses = (type) => {
    switch (type) {
      case 0:
        return 'btn btn-warning'
      case 1:
        return 'btn btn-success'
      case 2:
        return 'btn btn-danger'
      case 3:
        return 'btn btn-dark'
      case 4:
        return 'btn btn-secondary'
      default:
        break
    }
  }

  const StatusCell = ({ row }) => (
    <p className={switchClasses(row?.status * 1)}>
      {row?.status * 1 === 0 && 'Pending'}
      {row?.status * 1 === 1 && 'Approved'}
      {row?.status * 1 === 2 && 'Rejected'}
      {row?.status * 1 === 3 && 'On Hold'}
      {row?.status * 1 === 4 && 'Modified'}
    </p>
  )

  const StartDate = ({ row }) => DateTime.fromISO(row.start_date).toFormat('dd / MM / yyyy')
  const EndDate = ({ row }) => DateTime.fromISO(row.end_date).toFormat('dd / MM / yyyy')
  

  const columns = [
    {
      name: 'Sl. No.',
      selector: 'slNo',
      sortable: true,
    },
    {
      name: 'Id',
      selector: 'id',
      sortable: true,
    },
    {
      name: 'Project Manager',
      selector: 'display_name',
      sortable: true,
    },
    {
      name: 'Department',
      selector: 'dept_name',
      sortable: true,
    },
    {
      name: 'Start Date',
      selector: 'start_date',
      // eslint-disable-next-line react/display-name
      cell: (SdRow) => <StartDate row={SdRow} />,
      sortable: true,
    },
    {
      name: 'End Date',
      selector: 'end_date',
      // eslint-disable-next-line react/display-name
      cell: (EdRow) => <EndDate row={EdRow} />,
      sortable: true,
    },
    {
      name: 'Status',
      selector: 'status',
      // eslint-disable-next-line react/display-name
      cell: (row) => <StatusCell row={row} />,
      sortable: true,
    },
    {
      name: 'Action',
      // eslint-disable-next-line react/display-name
      cell: (row) => <ActionTag row={row} />,
    },
  ]

  const singleData = (id) => {
    API.get(`/wp-jwt/v1/apply-leave-details/${id}`)
      .then((res) => {
        console.log('singleData', res.data.data)
        setSingleLeave(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const viewDetail = (id) => {
    setVisible(!visible)
    singleData(id)
  }
  const viewModalClose = (e) =>{
    e.preventDefault()
    setVisible(false)
  }

  const ActionTag = ({ row }) => {
    // eslint-disable-next-line no-unused-expressions
    return (
      <>
        <CButton
          color="info"
          shape="round"
          className="custom-btn"
          onClick={() => viewDetail(row.id)}
        >
          <ViewIcon />
        </CButton>
      </>
    )
  }

  const getData = () => {
    API.get('/wp-jwt/v1/apply-leave-details')
      .then((res) => {
        setPosts(
          res.data.data.map((m, i) => {
            return { ...m, ...{ slNo: i + 1 } }
          }),
        )
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <CModal visible={visible} onDismiss={() => setVisible(false)}>
        <CModalHeader onDismiss={viewModalClose}>
          <CModalTitle>Leave details of {singleLeave[0]?.display_name}</CModalTitle>
        </CModalHeader>
        <CModalBody>
        <CRow className="row gy-2 gx-3">
        
        <CCol xs>
          <div className="mb-3">
            <CFormLabel htmlFor="start_date">Start Date</CFormLabel>
            <CFormControl
              type="text"
              value={DateTime.fromISO(singleLeave[0]?.start_date).toFormat('dd / MM / yyyy')}
              disabled
            />
          </div>
        </CCol>
        
        <CCol xs>
          <div className="mb-3">
            <CFormLabel htmlFor="start_date">End Date</CFormLabel>
            <CFormControl
              type="text"
              value={DateTime.fromISO(singleLeave[0]?.end_date).toFormat('dd / MM / yyyy')}
              disabled
            />
          </div>
        </CCol>
        
        <CCol>
          <div className="mb-3">
            <CFormLabel htmlFor="start_date">Department</CFormLabel>
            <CFormControl
              type="text"
              value={singleLeave[0]?.dept_name}
              disabled
            />
          </div>
        </CCol>
        </CRow>
          
        <CRow xs={{ gutterX: 6 }}>
        
        <CCol>
          <div className="mb-3">
            <CFormLabel htmlFor="start_date">Reason of leave</CFormLabel>
            <CFormControl
              component="textarea"
              value={(singleLeave[0]?.reason)}
              disabled
            />
          </div>
        </CCol>
        </CRow>
          
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" style={{color: '#fff'}} onClick={viewModalClose}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
      <CContainer className="overflow-hidden">
        <CRow xs={{ gutterY: 5 }}>
          <CCol xs={{ span: 12 }}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Leave Application Details</strong>
              </CCardHeader>
              <CCardBody className="custom-class">
                {!posts ? (
                  <CSpinner color="primary" />
                ) : (
                  <>
                    {posts.length === 0 ? (
                      <h3 className="d-flex justify-content-center">No leave found!</h3>
                    ) : (
                      <>
                        <DataTable
                          columns={columns}
                          data={posts}
                          pagination
                          paginationPerPage={5}
                          paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
                        />
                      </>
                    )}
                  </>
                )}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
      <style>{customCss}</style>
    </>
  )
}

export default LeaveDetails

const customCss = `
  .custom-class .sc-fnVZcZ.cDmETx.rdt_TableHeader {
    display: none;
  }
  .custom-btn .custom_icon {
    color: #ffffffd1;
}
`
