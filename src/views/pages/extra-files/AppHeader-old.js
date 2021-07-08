import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppBreadcrumb } from '../../../components/index'

import { AppHeaderDropdown } from '../../../components/header/index'
import AppHeaderMiddle from '../../../components/header/AppHeaderMiddle'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ms-md-3 d-lg-none"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon name="cil-menu" size="lg" />
        </CHeaderToggler>
        <CHeaderBrand
          className="mx-auto d-md-none"
          to="/"
          style={{ top: '8px', position: 'relative' }}
        >
          {/* <CIcon name="logo" height="48" alt="Logo" /> */}
          <p style={{ fontSize: '16.5px' }}>
            &nbsp;&nbsp;
            <img src="/logo.png" width="10%" /> Leave Management System
          </p>
        </CHeaderBrand>
        {/* App Header Middle start */}
        <AppHeaderMiddle />
        {/* App Header Middle End */}

        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
