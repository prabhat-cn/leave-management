/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
  CCreateNavItem,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  // sidebar Block by user Role start
  let navArray = navigation
  let result = []
  if (localStorage.getItem('lMuserDataToken') !== null) {
    const userData = JSON.parse(localStorage.getItem('lMuserDataToken'))
    if (userData.user_role === 'project_manager') {
      result = navArray.map((arrayValue) => {
        arrayValue = Object.assign({}, arrayValue)
        if (arrayValue.items) {
          arrayValue.items = arrayValue.items.filter(
            (anchorName) =>
              anchorName.anchor !== 'Apply Leave' && anchorName.anchor !== 'My Details',
          )
          return arrayValue
        } else {
          return arrayValue
        }
      })
    } else if (userData.user_role === 'employee') {
      result = navArray.map((arrayValue) => {
        arrayValue = Object.assign({}, arrayValue)
        if (arrayValue.items) {
          arrayValue.items = arrayValue.items.filter(
            (anchorName) => anchorName.anchor !== 'Employee Leave',
          )
          return arrayValue
        } else {
          return arrayValue
        }
      })
    } else {
      result = navArray
    }
  }
  // console.log(navigation)
  // sidebar Block by user Role end
  return (
    <CSidebar
      position="fixed"
      selfHiding="md"
      unfoldable={unfoldable}
      show={sidebarShow}
      onShow={() => console.log('show')}
      onHide={() => {
        dispatch({ type: 'set', sidebarShow: false })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <p>
          &nbsp;&nbsp;
          <img src="/logo.png" width="10%" /> Leave Management System
        </p>
        {/* <CIcon className="sidebar-brand-full" name="logo-negative" height={35} />
        <CIcon className="sidebar-brand-narrow" name="sygnet" height={35} /> */}
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          {/* <CCreateNavItem items={navigation} /> */}
          <CCreateNavItem items={result} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
