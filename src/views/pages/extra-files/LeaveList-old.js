/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { DateTime } from 'luxon'
import DataTable from 'react-data-table-component';
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CNav,
  CSpinner
} from '@coreui/react'
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
      break;
  }
}

const StatusCell = ({ row }) => (
	<p className={switchClasses(row?.status*1)}>
    {row?.status*1 === 0 && 'Pending'}
    {row?.status*1 === 1 && 'Complected'}
    {row?.status*1 === 2 && 'In Progress'}
  </p>
);


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
		sortable: true,
	},
  {
		name: 'End Date',
		selector: 'end_date',
		sortable: true,
	},
  {
		name: 'Status',
		selector: 'status',
    // eslint-disable-next-line react/display-name
    cell: row => <StatusCell row={row} />,
		sortable: true,
	},
];

const LeaveList = () => {
  const pageSize = 7
  const [posts, setPosts] = useState()
  const [paginatedPosts, setPaginatedPosts] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const getData = () => {
    API
      .get('/wp-jwt/v1/apply-leave-list')
      .then((res) => {
        console.log('res', res)
        console.log(res.data.data)
        setPosts(res.data.data.map((m, i) => {return {...m, ...{slNo: i+1}}}))
        setPaginatedPosts(_(res.data.data).slice(0).take(pageSize).value())
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    getData()
  }, [])

  // return float value convert to integer by Math.ceil
  const pageCount = posts ? Math.ceil(posts.length / pageSize) : 0
  if (pageCount === 1) {
    return null
  }
  const pages = _.range(1, pageCount + 1)

  const pagination = (pageNO) => {
    setCurrentPage(pageNO)
    const startIndex = (pageNO - 1) * pageSize
    const paginatedPost = _(posts).slice(startIndex).take(pageSize).value()
    setPaginatedPosts(paginatedPost)
  }

  return (
    <>
      <CContainer className="overflow-hidden">
        <CRow xs={{ gutterY: 5 }}>
          <CCol xs={{ span: 12 }}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Leave Application List</strong>
              </CCardHeader>
              <CCardBody>
                {/* {!posts ? (
                'No data found!'
                ) : ( */}
                {!paginatedPosts ? (
                  <CSpinner color="primary" />
                ) : (
                  <>
                  {paginatedPosts.length === 0 ? (
                    <h3 className="d-flex justify-content-center">No data found!</h3>
                    ) : (
                      <>
                      <CTable striped>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">#Sl.No</CTableHeaderCell>
                            <CTableHeaderCell scope="col">#Id</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Project Manager</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
                            <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {paginatedPosts &&
                            paginatedPosts.map((post, index) => (
                              <CTableRow key={post.id}>
                                <CTableHeaderCell scope="row">{index +1}</CTableHeaderCell>
                                <CTableHeaderCell>{post.id}</CTableHeaderCell>
                                <CTableDataCell>{post.display_name}</CTableDataCell>
                                <CTableDataCell>{DateTime.fromISO(post.start_date).toFormat('dd / MM / yyyy')}</CTableDataCell>
                                <CTableDataCell>{DateTime.fromISO(post.end_date).toFormat('dd / MM / yyyy')}</CTableDataCell>
                                <CTableDataCell>
                                  <p className={switchClasses(post.status*1)}>
                                    {post.status*1 === 0 && 'Pending'}
                                    {post.status*1 === 1 && 'Complected'}
                                    {post.status*1 === 2 && 'In Progress'}
                                  </p>
                                </CTableDataCell>
                              </CTableRow>
                            ))}
                        </CTableBody>
                      </CTable>
                      <hr />
                      <DataTable
                        title="Leave Application List"
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
                <CNav className="d-flex justify-content-center">
                  <ul className="pagination">
                    {pages &&
                      pages.map((page) => (
                        // eslint-disable-next-line react/jsx-key
                        <li className={page === currentPage ? 'page-item active' : 'page-item'}>
                          <p className="page-link" onClick={() => pagination(page)}>
                            {page}
                          </p>
                        </li>
                      ))}
                  </ul>
                </CNav>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </>
  )
}

export default LeaveList