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
import CIcon from '@coreui/icons-react'

const BarsCell = () => {
  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Traffic {' & '} Sales</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs="12" md="6" xl="6">
                  <CRow>
                    <CCol sm="6">
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-medium-emphasis small">New Clients</div>
                        <div className="fs-5 fw-semibold">9,123</div>
                      </div>
                    </CCol>
                    <CCol sm="6">
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Recurring Clients</div>
                        <div className="fs-5 fw-semibold">22,643</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="text-medium-emphasis small">Monday</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress thin color="info" value={34} />
                      <CProgress thin color="danger" value={78} />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="text-medium-emphasis small">Tuesday</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress thin color="info" value={56} />
                      <CProgress thin color="danger" value={94} />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="text-medium-emphasis small">Wednesday</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress thin color="info" value={12} />
                      <CProgress thin color="danger" value={67} />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="text-medium-emphasis small">Thursday</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress thin color="info" value={43} />
                      <CProgress thin color="danger" value={91} />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="text-medium-emphasis small">Friday</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress thin color="info" value={22} />
                      <CProgress thin color="danger" value={73} />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="text-medium-emphasis small">Saturday</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress thin color="info" value={53} />
                      <CProgress thin color="danger" value={82} />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="text-medium-emphasis small">Sunday</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress thin color="info" value={9} />
                      <CProgress thin color="danger" value={69} />
                    </div>
                  </div>
                </CCol>

                <CCol xs="12" md="6" xl="6">
                  <CRow>
                    <CCol sm="6">
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Pageviews</div>
                        <div className="fs-5 fw-semibold">78,623</div>
                      </div>
                    </CCol>
                    <CCol sm="6">
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Organic</div>
                        <div className="fs-5 fw-semibold">49,123</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  <div className="progress-group mb-4">
                    <div className="progress-group-header">
                      <CIcon className="icon icon-lg me-2" name="cil-user" />
                      <span>Male</span>
                      <span className="ms-auto font-semibold">43%</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress thin color="warning" value={43} />
                    </div>
                  </div>
                  <div className="progress-group mb-5">
                    <div className="progress-group-header">
                      <CIcon className="icon icon-lg me-2" name="cil-user-female" />
                      <span>Female</span>
                      <span className="ms-auto font-semibold">37%</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress thin color="warning" value={37} />
                    </div>
                  </div>

                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon className="icon icon-lg me-2" name="cib-google" />
                      <span>Organic Search</span>
                      <span className="ms-auto font-semibold">
                        191,235 <span className="text-medium-emphasis small">(56%)</span>
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress thin color="success" value={56} />
                    </div>
                  </div>
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon name="cib-facebook" className="icon icon-lg me-2" />
                      <span>Facebook</span>
                      <span className="ms-auto font-semibold">
                        51,223 <span className="text-medium-emphasis small">(15%)</span>
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress thin color="success" value={15} />
                    </div>
                  </div>
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon name="cib-twitter" className="icon icon-lg me-2" />
                      <span>Twitter</span>
                      <span className="ms-auto font-semibold">
                        37,564 <span className="text-medium-emphasis small">(11%)</span>
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress thin color="success" value={11} />
                    </div>
                  </div>
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon name="cib-linkedin" className="icon icon-lg me-2" />
                      <span>LinkedIn</span>
                      <span className="ms-auto font-semibold">
                        27,319 <span className="text-medium-emphasis small">(8%)</span>
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress thin color="success" value={8} />
                    </div>
                  </div>
                </CCol>
              </CRow>

              <br />

              <CTable hover responsive align="middle" className="mb-0 border">
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon name="cil-people" />
                    </CTableHeaderCell>
                    <CTableHeaderCell>User</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Country</CTableHeaderCell>
                    <CTableHeaderCell>Usage</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Payment Method</CTableHeaderCell>
                    <CTableHeaderCell>Activity</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableDataCell className="text-center">
                      <CAvatar size="md" src="avatars/1.jpg" status="success" />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>Yiorgos Avraamu</div>
                      <div className="small text-medium-emphasis">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CIcon size="xl" name="cif-us" title="us" id="us" />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="clearfix">
                        <div className="float-start">
                          <strong>50%</strong>
                        </div>
                        <div className="float-end">
                          <small className="text-medium-emphasis">
                            Jun 11, 2015 - Jul 10, 2015
                          </small>
                        </div>
                      </div>
                      <CProgress thin color="success" value={50} />
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CIcon size="xl" name="cib-cc-mastercard" />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="small text-medium-emphasis">Last login</div>
                      <strong>10 sec ago</strong>
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell className="text-center">
                      <CAvatar size="md" src="avatars/2.jpg" status="danger" />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>Avram Tarasios</div>
                      <div className="small text-medium-emphasis">
                        <span>Recurring</span> | Registered: Jan 1, 2015
                      </div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CIcon size="xl" name="cif-br" title="br" id="br" />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="clearfix">
                        <div className="float-start">
                          <strong>10%</strong>
                        </div>
                        <div className="float-end">
                          <small className="text-medium-emphasis">
                            Jun 11, 2015 - Jul 10, 2015
                          </small>
                        </div>
                      </div>
                      <CProgress thin color="info" value={10} />
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CIcon size="xl" name="cib-cc-visa" />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="small text-medium-emphasis">Last login</div>
                      <strong>5 minutes ago</strong>
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell className="text-center">
                      <CAvatar size="md" src="avatars/3.jpg" status="warning" />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>Quintin Ed</div>
                      <div className="small text-medium-emphasis">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CIcon size="xl" name="cif-in" title="in" id="in" />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="clearfix">
                        <div className="float-start">
                          <strong>74%</strong>
                        </div>
                        <div className="float-end">
                          <small className="text-medium-emphasis">
                            Jun 11, 2015 - Jul 10, 2015
                          </small>
                        </div>
                      </div>
                      <CProgress thin color="warning" value={74} />
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CIcon size="xl" name="cib-cc-stripe" />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="small text-medium-emphasis">Last login</div>
                      <strong>1 hour ago</strong>
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell className="text-center">
                      <CAvatar size="md" src="avatars/4.jpg" status="secondary" />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>Enéas Kwadwo</div>
                      <div className="small text-medium-emphasis">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CIcon size="xl" name="cif-fr" title="fr" id="fr" />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="clearfix">
                        <div className="float-start">
                          <strong>98%</strong>
                        </div>
                        <div className="float-end">
                          <small className="text-medium-emphasis">
                            Jun 11, 2015 - Jul 10, 2015
                          </small>
                        </div>
                      </div>
                      <CProgress thin color="danger" value={98} />
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CIcon size="xl" name="cib-cc-paypal" />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="small text-medium-emphasis">Last login</div>
                      <strong>Last month</strong>
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell className="text-center">
                      <CAvatar size="md" src="avatars/5.jpg" status="success" />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>Agapetus Tadeáš</div>
                      <div className="small text-medium-emphasis">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CIcon size="xl" name="cif-es" title="es" id="es" />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="clearfix">
                        <div className="float-start">
                          <strong>22%</strong>
                        </div>
                        <div className="float-end">
                          <small className="text-medium-emphasis">
                            Jun 11, 2015 - Jul 10, 2015
                          </small>
                        </div>
                      </div>
                      <CProgress thin color="info" value={22} />
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CIcon size="xl" name="cib-cc-apple-pay" />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="small text-medium-emphasis">Last login</div>
                      <strong>Last week</strong>
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell className="text-center">
                      <CAvatar size="md" src="avatars/6.jpg" status="danger" />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>Friderik Dávid</div>
                      <div className="small text-medium-emphasis">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CIcon size="xl" name="cif-pl" title="pl" id="pl" />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="clearfix">
                        <div className="float-start">
                          <strong>43%</strong>
                        </div>
                        <div className="float-end">
                          <small className="text-medium-emphasis">
                            Jun 11, 2015 - Jul 10, 2015
                          </small>
                        </div>
                      </div>
                      <CProgress thin color="success" value={43} />
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CIcon size="xl" name="cib-cc-amex" />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="small text-medium-emphasis">Last login</div>
                      <strong>Yesterday</strong>
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default BarsCell
