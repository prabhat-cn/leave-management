/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { DateTime } from 'luxon'
import DataTable, { createTheme } from 'react-data-table-component'
import htmlToFormattedText from "html-to-formatted-text"
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
import { ViewIcon, EditIcon } from '../../../constant/icons'

const EmployeeLeaveDetails = (props) => {
  // role based auth start
  if (localStorage.getItem('lMuserDataToken') !== null) {
    const userData = JSON.parse(localStorage.getItem('lMuserDataToken'))
    if(userData.user_role === 'employee'){
      if(props){
        // eslint-disable-next-line react/prop-types
        props.history.push('/dashboard')
      }
    }
    
  }
  // role based auth end
  const [visible, setVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [singleLeave, setSingleLeave] = useState([{
    'dept_name': '',
    'display_name': '',
    'end_date': '',
    'reason': '',
    'start_date': '',
    'status': '',
  }])
  const [posts, setPosts] = useState()
  const [editvalue, setEditvalues] = useState({})
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
      name: 'Employee Name',
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
        &nbsp;&nbsp;
        <CButton
          color="success"
          shape="round"
          className="custom-btn"
          onClick={() => editLeave(row)}
        >
          <EditIcon />
        </CButton>
      </>
    )
  }

  const getData = () => {
    API.get('/wp-jwt/v1/applied-leave-details')
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

  //  View
  const viewDetail = (id) => {
    setVisible(!visible)
    console.log(id)
    singleData(id)
  }

  const viewModalClose = () => {
    setVisible(false)
    setSingleLeave([{
      'dept_name': '',
      'display_name': '',
      'end_date': '',
      'reason': '',
      'start_date': '',
      'status': '',
    }])
  }

  // this is for edit & view get data
  const singleData = (id) => {
    API.get(`/wp-jwt/v1/applied-leave-details/${id}`)
      .then((res) => {
        console.log('singleData', res.data.data)
        setSingleLeave(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Edit
  const editSubmit = (e) => {
    e.preventDefault()
    saveEdit({
      leave_edit_date: {
        start_date: DateTime.fromISO(editvalue.start_date).toFormat('dd / MM / yyyy'),
        end_date: DateTime.fromISO(editvalue.end_date).toFormat('dd / MM / yyyy'),
      },
      leave_edit: {
        id: editvalue.id
      }
    })
  }

  const saveEdit = (editData) => {
    API.post(`/wp-jwt/v1/date-edit/${editData.leave_edit.id}`, editData.leave_edit_date)
      .then(() => {
        editDismiss();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const editDismiss = () => {
    setEditVisible(!editVisible)
    getData()
  }

  const editLeave = (row) => {
    setEditVisible(true)
    const modifiedData = {
      id: row.id,
      display_name: row.display_name,
      start_date: row.start_date,
      end_date: row.end_date,
      reason: row.reason,
      dept_name: row.dept_name,
    }
    setEditvalues(modifiedData);
  }

const editModalClose = () => {
  setEditVisible(false)
}

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <CModal name="view-modal" visible={visible} onDismiss={viewModalClose}>
        <CModalHeader onDismiss={viewModalClose}>
          <CModalTitle>View Leave Detail</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {/*  any blank string pass here */}
          {singleLeave[0].display_name === '' ? (
            <div className="text-center">
              <CSpinner color="primary" />
            </div>
          ): (
            <>
              <CRow className="row">
                <CCol className="mb-2">
                <strong>[Employee- {singleLeave[0]?.display_name}]</strong>
                </CCol>
              </CRow>
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
                    <CFormLabel htmlFor="dept_name">Department</CFormLabel>
                    <CFormControl type="text" value={singleLeave[0]?.dept_name} disabled />
                  </div>
                </CCol>
              </CRow>

              <CRow xs={{ gutterX: 6 }}>
              <CCol>
                <div className="mb-3">
                  <CFormLabel htmlFor="reason">Reason of leave</CFormLabel>
                  <CFormControl component="textarea" value={htmlToFormattedText(singleLeave[0]?.reason)} disabled />
                </div>
              </CCol>
            </CRow>
            </>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" style={{ color: '#fff' }} onClick={viewModalClose}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal name="edit-modal" visible={editVisible} onDismiss={editModalClose}>
        <CModalHeader onDismiss={editDismiss}>
          <CModalTitle>Edit Leave Detail</CModalTitle>
        </CModalHeader>
        <CForm id="edit" onSubmit={(editSubmit)}>
          <CModalBody>
            <CRow className="row">
              <CCol className="mb-2">
                <strong>Employee- {editvalue.display_name}</strong>
              </CCol>
            </CRow>
              <CRow className="row gy-2 gx-3">
              <CCol xs>
                <div className="mb-3">
                  <CFormLabel htmlFor="start_date">Start Date</CFormLabel>
                  <CFormControl
                    className="custom-date"
                    type="date" value={editvalue.start_date}
                    name="start_date"
                    id="start_date"
                    onChange={e=>setEditvalues({...editvalue,start_date:e.target.value})}
                  />
                </div>
              </CCol>

              <CCol xs>
                <div className="mb-3">
                  <CFormLabel htmlFor="end_date">End Date</CFormLabel>
                  <CFormControl
                    className="custom-date"
                    type="date"
                    value={editvalue.end_date}
                    name="end_date"
                    id="end_date"
                    onChange={e=>setEditvalues({...editvalue,end_date:e.target.value})}
                  />
                </div>
              </CCol>

              <CCol>
                <div className="mb-3">
                  <CFormLabel htmlFor="dept_name">Department</CFormLabel>
                  <CFormControl type="text" value={editvalue.dept_name} disabled />
                </div>
              </CCol>
            </CRow>
            <CRow xs={{ gutterX: 6 }}>
              <CCol>
                <div className="mb-3">
                  <CFormLabel htmlFor="reason">Reason of leave</CFormLabel>
                  <CFormControl component="textarea" value={htmlToFormattedText(editvalue.reason)} disabled />
                </div>
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="danger" style={{ color: '#fff' }} onClick={editModalClose}>
              Close
            </CButton>
            <CButton type="submit" color="primary">Save</CButton>
          </CModalFooter>
        </CForm>
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

export default EmployeeLeaveDetails

const customCss = `
  .custom-class .sc-fnVZcZ.cDmETx.rdt_TableHeader {
    display: none;
  }
  .custom-btn .custom_icon {
    color: #ffffffd1;
  }
  button.btn.btn-info.round.custom-btn,
    button.btn.btn-success.round.custom-btn{
    border-radius: 50px;
    height: 40px;
  }
  .custom-date {
    width: 160px;
  }
`
