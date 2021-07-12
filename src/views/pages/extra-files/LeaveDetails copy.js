/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { DateTime } from 'luxon'
import DataTable from 'react-data-table-component'
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
  CTooltip,
} from '@coreui/react'
import Switch from 'react-switch'
import API from '../../../api'
import { ViewIcon, ChatIcon } from '../../../constant/icons'
import Chat from '../leave-application/Chat'

const LeaveDetails = () => {
  const [visible, setVisible] = useState(false)
  const [openChat, toggleChat] = useState(false)
  const [singleLeave, setSingleLeave] = useState([{
    'dept_name': '',
    'display_name': '',
    'end_date': '',
    'reason': '',
    'start_date': '',
    'status': '',
  }])
  const [posts, setPosts] = useState()
  const [cancelChecked, setCancelChecked] = useState(false)
  const switchClasses = (type) => {
    switch (type) {
      case 0:
        return 'btn btn-warning'
      case 1:
        return 'btn btn-success'
      case 2:
        return 'btn btn-danger'
      case 3:
        return 'btn btn-light'
      case 4:
        return 'btn btn-secondary'
      case 5:
        return 'btn btn-dark'
      default:
        break
    }
  }

  const StatusCell = ({ row }) => (
    // incoming "status" value is string
    <p className={'Status-cell' + ' ' +(switchClasses(parseInt(row?.status)))}>
      {parseInt(row?.status) === 0 && 'Pending'}
      {parseInt(row?.status) === 1 && 'Approved'}
      {parseInt(row?.status) === 2 && 'Rejected'}
      {parseInt(row?.status) === 3 && 'On Hold'}
      {parseInt(row?.status) === 4 && 'Modified'}
      {parseInt(row?.status) === 5 && 'Cancelled'}
    </p>
  )

  const StartDate = ({ row }) => DateTime.fromISO(row.start_date).toFormat('dd-MM-yyyy')
  const EndDate = ({ row }) => DateTime.fromISO(row.end_date).toFormat('dd-MM-yyyy')

  const columns = [
    {
      name: 'Sl. No.',
      selector: 'slNo',
      sortable: true,
    },
    // {
    //   name: 'Id',
    //   selector: 'id',
    //   sortable: true,
    // },
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
      name: 'View/Chat',
      // eslint-disable-next-line react/display-name
      cell: (row) => <ViewChatTag row={row} />,
    },
    {
      name: 'Action',
      // eslint-disable-next-line react/display-name
      cell: (row) => <ActionTag row={row} />,
    },
  ]

  const ViewChatTag = ({ row }) => {
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
        &nbsp;
        <CButton
          style={{backgroundColor: '#2db67c', }}
          shape="round"
          className="custom-btn"
          onClick={() => viewChat(row.id)}
        >
          <ChatIcon />
        </CButton>
      </>
    )
  }

  const ActionTag = ({ row }) => {
    // eslint-disable-next-line no-unused-expressions
    return (
      <>
      {
        row.status === '1' ? (
          <Switch
            onColor="#e55353"
            height={20}
            width={48}
            onChange={(e) => handleCancelChange(e, row.id)}
            checked={ row.status === '5' ? true : false }
            className="react-switch custom-switch-class"
            disabled
          />
        ):(
          <>
            <Switch
              onColor="#e55353"
              height={20}
              width={48}
              onChange={(e) => handleCancelChange(e, row.id)}
              checked={ row.status === '5' ? true : false }
              className="react-switch custom-switch-class"
            />
        </>
        )
      }

      </>
    )
  }

  const leaveCancel = (id) => {
    API.post(`/wp-jwt/v1/leave-application-cancel/${id}`)
      .then((res) => {
        getData()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleCancelChange = (val, id) => {
    leaveCancel(id)
    setCancelChecked(val)
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

  //  View
  const viewDetail = (id) => {
    setVisible(!visible)
    console.log(id)
    singleData(id)
  }

  //  View
  const viewChat = (id) => {
    console.log(id)
    singleData(id)
    toggleChat(true);
  }

  const closeChat = () => {
    toggleChat(false);
  }

  const viewModalClose = () => {
    setVisible(false)
    // after close modal pass blank string
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
    API.get(`/wp-jwt/v1/apply-leave-details/${id}`)
      .then((res) => {
        setSingleLeave(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }



  useEffect(() => {
    getData()
  }, [])

  const customStyles = {
    headCells: {
      style: {
        fontWeight: '500',
        fontSize: '14px'
      },
    },
    cells: {
      style: {
        fontSize: '14px'
      },
    },
  };

  return (
    <>
      <CModal name="view-modal" visible={visible} onDismiss={viewModalClose}>
        <CModalHeader onDismiss={viewModalClose}>
          <CModalTitle>View Leave Detail</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {/*  any blank string pass here */}
          {singleLeave[0]?.start_date === '' ? (
            <div className="text-center">
              <CSpinner color="primary" />
            </div>
          ) : (
            <>
              <CRow className="row">
                <CCol className="mb-2">
                <strong>[P.M- {singleLeave[0]?.display_name}]</strong>
                </CCol>
              </CRow>
              <CRow className="row gy-2 gx-3">
                <CCol xs>
                  <div className="mb-3">
                    <CFormLabel htmlFor="start_date">Start Date</CFormLabel>
                    <CFormControl
                      type="text"
                      value={DateTime.fromISO(singleLeave[0]?.start_date).toFormat('dd-MM-yyyy')}
                      disabled
                    />
                  </div>
                </CCol>

                <CCol xs>
                  <div className="mb-3">
                    <CFormLabel htmlFor="start_date">End Date</CFormLabel>
                    <CFormControl
                      type="text"
                      value={DateTime.fromISO(singleLeave[0]?.end_date).toFormat('dd-MM-yyyy')}
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
                          customStyles={customStyles}
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
      {/* Chat ui */}
      {openChat && <Chat close={closeChat} openChat={openChat} /> }
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
  button.btn.round.custom-btn,
    button.btn.btn-success.round.custom-btn{
    border-radius: 50px;
    height: 40px;
  }
  .Status-cell {
    margin-top: 8px;
    margin-bottom: 8px;
    padding: 5px 0px;
    max-width: 100px;
    width: 100%;
  }
`
