/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { DateTime } from 'luxon'
import DataTable, { createTheme } from 'react-data-table-component'
import { CContainer, CRow, CCol, CCard, CCardHeader, CCardBody, CSpinner } from '@coreui/react'
import API from '../../../api'

const switchClasses = (type) => {
  switch (type) {
    case 0:
      return 'btn btn-danger'
    case 1:
      return 'btn btn-success'
    case 2:
      return 'btn btn-warning'
    default:
      break
  }
}

const StatusCell = ({ row }) => (
  <p className={switchClasses(row?.status * 1)}>
    {row?.status * 1 === 0 && 'Pending'}
    {row?.status * 1 === 1 && 'Complected'}
    {row?.status * 1 === 2 && 'In Progress'}
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
]

const LeaveList = () => {
  const [posts, setPosts] = useState()
  const getData = () => {
    API.get('/wp-jwt/v1/apply-leave-list')
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
      <CContainer className="overflow-hidden">
        <CRow xs={{ gutterY: 5 }}>
          <CCol xs={{ span: 12 }}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Leave Application List</strong>
              </CCardHeader>
              <CCardBody className="custom-class">
                {!posts ? (
                  <CSpinner color="primary" />
                ) : (
                  <>
                    {posts.length === 0 ? (
                      <h3 className="d-flex justify-content-center">No data found!</h3>
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

export default LeaveList

const customCss = `
  .custom-class .sc-fnVZcZ.cDmETx.rdt_TableHeader {
    display: none;
  }
`
