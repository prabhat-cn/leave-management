/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import _ from 'lodash'
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
        setPosts(res.data.data)
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
                              <CTableDataCell>{post.start_date}</CTableDataCell>
                              <CTableDataCell>{post.end_date}</CTableDataCell>
                              <CTableDataCell>
                                <p className={post.status == 1 ? 'btn btn-success' : 'btn btn-danger'}>
                                  {post.status == 1 ? 'Completed' : 'Pending'}
                                </p>
                                {/* <p
                                  className={post.completed ? 'btn btn-success' : 'btn btn-danger'}
                                >
                                  {post.completed ? 'Completed' : 'Pending'}
                                </p> */}
                              </CTableDataCell>
                            </CTableRow>
                          ))}
                      </CTableBody>
                    </CTable>
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
