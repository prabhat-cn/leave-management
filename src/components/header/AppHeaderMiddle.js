/* eslint-disable prettier/prettier */
import React from 'react'
import { NavLink } from 'react-router-dom'
import { CHeaderNav, CNavLink, CNavItem } from '@coreui/react'
import CIcon from '@coreui/icons-react'
const AppHeaderMiddle = () => {
  return (
    <>
      <CHeaderNav className="d-none d-md-flex me-auto">
        <CNavItem>
          {/* <CNavLink to="/dashboard" component={NavLink} activeClassName="active">
            Dashboard
          </CNavLink> */}
        </CNavItem>
        <CNavItem>
          {/* <CNavLink href="#">Users</CNavLink> */}
        </CNavItem>
        <CNavItem>
          {/* <CNavLink href="#">Settings</CNavLink> */}
        </CNavItem>
      </CHeaderNav>
      <CHeaderNav>
        <CNavItem>
          <CNavLink href="#">
            {/* <CIcon name="cil-bell" size="lg" /> */}
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">
            {/* <CIcon name="cil-list" size="lg" /> */}
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">
            {/* <CIcon name="cil-envelope-open" size="lg" /> */}
          </CNavLink>
        </CNavItem>
      </CHeaderNav>
    </>
  )
}

export default AppHeaderMiddle
